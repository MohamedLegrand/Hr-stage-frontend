import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Users, CreditCard, FolderOpen, Settings2, Plus, Search, Filter, Check, X, 
  Calendar, DollarSign, Mail, AlertTriangle, FileCheck, CheckCircle2, 
  Clock, ShieldAlert, Award, ArrowUpRight, TrendingUp, Info
} from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useStageStore } from '../../../store/stageStore';
import { Stagiaire, StudentStatus, LevelType, Payment, StudentDocument, Session } from '../../../types';

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const { 
    students, filieres, sessions, documents, payments, config, subscribers, systemEmailsSent,
    addFiliere, addSession, updateConfig, reviewDocument, makePayment
  } = useStageStore();

  const [activeTab, setActiveTab] = React.useState<'overview' | 'students' | 'payments' | 'docs' | 'config'>('overview');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<string>('ALL');
  const [filterFiliere, setFilterFiliere] = React.useState<string>('ALL');
  const [filterLevel, setFilterLevel] = React.useState<string>('ALL');

  // New Specialty Form states
  const [newFilCode, setNewFilCode] = React.useState('');
  const [newFilNameFr, setNewFilNameFr] = React.useState('');
  const [newFilNameEn, setNewFilNameEn] = React.useState('');
  const [newFilDescFr, setNewFilDescFr] = React.useState('');
  const [newFilDescEn, setNewFilDescEn] = React.useState('');
  const [filiereSuccess, setFiliereSuccess] = React.useState(false);

  // New Session Form states
  const [newSesNameFr, setNewSesNameFr] = React.useState('');
  const [newSesNameEn, setNewSesNameEn] = React.useState('');
  const [newSesStart, setNewSesStart] = React.useState('');
  const [sessionSuccess, setSessionSuccess] = React.useState(false);

  // Fee Config states
  const [cfgRegFee, setCfgRegFee] = React.useState(config.registrationFee);
  const [cfgTuitLvl1, setCfgTuitLvl1] = React.useState(config.tuitionFeeLevel1);
  const [cfgTuitLvl2, setCfgTuitLvl2] = React.useState(config.tuitionFeeLevel2);
  const [configSuccess, setConfigSuccess] = React.useState(false);

  // Safeguard redirect
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!('isAdmin' in user)) {
      navigate('/dashboard/student');
    }
  }, [user, navigate]);

  if (!user || !('isAdmin' in user)) return null;

  // Calculators for Stats
  const totalStag = students.length;
  const activeStag = students.filter(s => s.status === 'ACTIF').length;
  const suspendedStag = students.filter(s => s.status === 'SUSPENDU').length;
  const overduePayments = payments.filter(p => p.status === 'PENDING' && p.dueDate && new Date(p.dueDate) < new Date());
  const totalOverdueAmount = overduePayments.reduce((acc, p) => acc + p.amount, 0);

  // Incomplete student records (missing at least one approved/uploaded document)
  const incompleteProfiles = students.filter(student => {
    const sDocs = documents.filter(d => d.studentId === student.id);
    const hasAllUploaded = sDocs.filter(d => d.name !== '').length === 4;
    return !hasAllUploaded;
  }).length;

  // Filter students
  const filteredStudents = students.filter((s) => {
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    const email = s.email.toLowerCase();
    const school = s.school.toLowerCase();
    const query = searchTerm.toLowerCase();

    const matchesSearch = fullName.includes(query) || email.includes(query) || school.includes(query);
    const matchesStatus = filterStatus === 'ALL' || s.status === filterStatus;
    const matchesFiliere = filterFiliere === 'ALL' || s.filiereId === filterFiliere;
    const matchesLevel = filterLevel === 'ALL' || s.level === filterLevel;

    return matchesSearch && matchesStatus && matchesFiliere && matchesLevel;
  });

  // Handler for Document verification
  const handleReviewDoc = (docId: string, status: 'APPROVED' | 'REJECTED') => {
    reviewDocument(docId, status);
  };

  // Handler to add specialties
  const handleCreateFiliere = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFilCode || !newFilNameFr || !newFilNameEn) return;

    addFiliere({
      code: newFilCode.toUpperCase(),
      nameFr: newFilNameFr,
      nameEn: newFilNameEn,
      descriptionFr: newFilDescFr,
      descriptionEn: newFilDescEn
    });

    setFiliereSuccess(true);
    setNewFilCode('');
    setNewFilNameFr('');
    setNewFilNameEn('');
    setNewFilDescFr('');
    setNewFilDescEn('');
    setTimeout(() => setFiliereSuccess(false), 4000);
  };

  // Handler to add Session
  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSesNameFr || !newSesNameEn || !newSesStart) return;

    addSession({
      nameFr: newSesNameFr,
      nameEn: newSesNameEn,
      startDate: newSesStart
    });

    setSessionSuccess(true);
    setNewSesNameFr('');
    setNewSesNameEn('');
    setNewSesStart('');
    setTimeout(() => setSessionSuccess(false), 4000);
  };

  // Handler to update config
  const handleUpdateConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      registrationFee: Number(cfgRegFee),
      tuitionFeeLevel1: Number(cfgTuitLvl1),
      tuitionFeeLevel2: Number(cfgTuitLvl2),
      currentSessionId: config.currentSessionId
    });
    setConfigSuccess(true);
    setTimeout(() => setConfigSuccess(false), 4000);
  };

  // Status badge style helper
  const getStatusBadge = (status: StudentStatus) => {
    switch (status) {
      case 'ACTIF':
        return <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-emerald-50 text-emerald-700 uppercase">Actif</span>;
      case 'SUSPENDU':
        return <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-rose-50 text-rose-700 uppercase animate-pulse">Suspendu</span>;
      case 'TERMINE':
        return <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-slate-100 text-slate-700 uppercase">Terminé</span>;
      case 'EN_ATTENTE_PAIEMENT':
      default:
        return <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-amber-50 text-amber-700 uppercase">En Attente</span>;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#15803D] uppercase bg-emerald-50 px-2 py-0.5 rounded-md">
            {currentLang === 'fr' ? 'ADMINISTRATION' : 'MANAGEMENT PORTAL'}
          </span>
          <h2 className="text-2xl font-black text-[#0F172A] leading-tight mt-1">
            {currentLang === 'fr' ? 'Tableau de bord de Direction' : 'Executive Dashboard'}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#64748B] font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200">
          <Calendar className="w-4 h-4 text-[#15803D]" />
          <span>{currentLang === 'fr' ? 'Date du jour :' : 'Current Date :'} <strong>30 juin 2026</strong></span>
        </div>
      </div>

      {/* Metric Cards (Bento-Grid style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Total Stagiaires */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('adminDashboard.totalStudents')}</span>
            <p className="text-2xl font-black text-[#0F172A]">{totalStag}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#15803D] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Active */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('adminDashboard.activeStudents')}</span>
            <p className="text-2xl font-black text-emerald-600">{activeStag}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Suspended */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('adminDashboard.suspendedStudents')}</span>
            <p className="text-2xl font-black text-rose-500">{suspendedStag}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Card 4: Overdue/Incomplete */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{currentLang === 'fr' ? 'Retards financiers' : 'Financial Overdues'}</span>
            <p className="text-lg font-black text-amber-600">{totalOverdueAmount} XAF</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-[#E2E8F0] gap-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview' ? 'border-[#15803D] text-[#15803D]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{t('adminDashboard.overview')}</span>
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'students' ? 'border-[#15803D] text-[#15803D]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t('adminDashboard.students')}</span>
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'payments' ? 'border-[#15803D] text-[#15803D]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>{t('adminDashboard.payments')}</span>
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'docs' ? 'border-[#15803D] text-[#15803D]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <FolderOpen className="w-4 h-4" />
          <span>{t('adminDashboard.documents')}</span>
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'config' ? 'border-[#15803D] text-[#15803D]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Settings2 className="w-4 h-4" />
          <span>{t('adminDashboard.config')}</span>
        </button>
      </div>

      {/* Tab Panels */}

      {/* PANEL 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Quick overview notice */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-[#0F172A] border-b border-[#E2E8F0] pb-3">
                {currentLang === 'fr' ? 'Dernières Activités' : 'Recent Registrations'}
              </h3>
              <div className="space-y-4">
                {students.slice(-3).reverse().map((st) => {
                  const fil = filieres.find(f => f.id === st.filiereId);
                  return (
                    <div key={st.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors text-xs">
                      <div className="space-y-0.5">
                        <p className="font-bold text-[#0F172A]">{st.firstName} {st.lastName}</p>
                        <p className="text-[#64748B]">{st.school} • <strong className="text-[#15803D]">{fil?.code}</strong></p>
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(st.status)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Dispatch logger logs */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                <h3 className="font-extrabold text-base text-[#0F172A]">
                  {currentLang === 'fr' ? 'Rapports d’envoi de Newsletter' : 'Newsletter Dispatch Logs'}
                </h3>
                <span className="text-xs bg-slate-100 text-[#0F172A] font-bold px-2 py-0.5 rounded-md">
                  {subscribers.length} {currentLang === 'fr' ? 'Abonnés' : 'Subscribers'}
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {currentLang === 'fr'
                  ? 'Dès qu’une nouvelle session de stage est créée, la plateforme fusionne automatiquement les emails des visiteurs inscrits, des stagiaires terminés et des stagiaires suspendus non désabonnés, puis simule l’envoi de la newsletter :'
                  : 'Whenever a new session is created, the system merges all visitor emails, completed students, and active suspended students and dispatches automated emails:'}
              </p>

              {systemEmailsSent.length > 0 ? (
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#15803D] rounded-xl text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{currentLang === 'fr' ? `Dernier envoi automatique : ${systemEmailsSent.length} e-mails simulés envoyés avec succès.` : `Last auto-dispatch: ${systemEmailsSent.length} mock emails dispatched successfully.`}</span>
                  </div>
                  <div className="max-h-48 overflow-y-auto border border-slate-100 rounded-xl divide-y text-[10px] bg-slate-50 p-2 font-mono space-y-2">
                    {systemEmailsSent.map((log, i) => (
                      <div key={i} className="pt-2 pb-1 text-slate-600">
                        <strong className="text-slate-800">TO:</strong> {log.to} | <strong className="text-[#15803D]">SUBJ:</strong> {log.subject.substring(0, 45)}...
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center text-xs text-slate-400">
                  {currentLang === 'fr' ? 'Aucune newsletter automatique déclenchée pour l’instant.' : 'No automated newsletters sent yet.'}
                </div>
              )}
            </div>
          </div>

          {/* Quick Config details */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
              <h3 className="font-extrabold text-base text-[#0F172A] border-b border-[#E2E8F0] pb-3">
                {currentLang === 'fr' ? 'Configuration Active' : 'Active Settings'}
              </h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center text-[#64748B]">
                  <span>Frais d’inscription :</span>
                  <strong className="text-[#0F172A]">{config.registrationFee} XAF</strong>
                </div>
                <div className="flex justify-between items-center text-[#64748B] border-t border-slate-50 pt-3">
                  <span>Scolarité Niveau 1 :</span>
                  <strong className="text-[#0F172A]">{config.tuitionFeeLevel1} XAF</strong>
                </div>
                <div className="flex justify-between items-center text-[#64748B] border-t border-slate-50 pt-3">
                  <span>Scolarité Niveau 2+ :</span>
                  <strong className="text-[#0F172A]">{config.tuitionFeeLevel2} XAF</strong>
                </div>
                <div className="flex justify-between items-center text-[#64748B] border-t border-slate-50 pt-3">
                  <span>Session Active :</span>
                  <strong className="text-[#15803D]">
                    {sessions.find(s => s.isActive)?.nameFr || 'N/A'}
                  </strong>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('config')}
                className="w-full text-center py-2.5 rounded-xl border border-slate-200 hover:border-[#15803D] text-slate-700 hover:text-[#15803D] font-bold text-xs transition-colors block cursor-pointer"
              >
                {t('adminDashboard.config')}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* PANEL 2: STUDENTS ROSTER */}
      {activeTab === 'students' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 pb-4 border-b border-[#E2E8F0]">
            {/* Search inputs */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 translate-y-[-50%] w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('adminDashboard.searchPlaceholder')}
                className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Status */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden"
              >
                <option value="ALL">{currentLang === 'fr' ? 'Tous les Statuts' : 'All Status'}</option>
                <option value="ACTIF">ACTIF</option>
                <option value="SUSPENDU">SUSPENDU</option>
                <option value="EN_ATTENTE_PAIEMENT">EN ATTENTE</option>
                <option value="TERMINE">TERMINÉ</option>
              </select>

              {/* Level */}
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden"
              >
                <option value="ALL">{currentLang === 'fr' ? 'Tous les Niveaux' : 'All Levels'}</option>
                <option value="LEVEL_1">LEVEL 1</option>
                <option value="LEVEL_2">LEVEL 2+</option>
              </select>

              {/* Specialty */}
              <select
                value={filterFiliere}
                onChange={(e) => setFilterFiliere(e.target.value)}
                className="bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden"
              >
                <option value="ALL">{currentLang === 'fr' ? 'Toutes les Spécialités' : 'All Fields'}</option>
                {filieres.map(f => (
                  <option key={f.id} value={f.id}>{f.code}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead>
                <tr className="bg-[#FAFAFA] border-b border-[#E2E8F0] text-[#0F172A] font-bold">
                  <th className="p-4">{t('adminDashboard.tableName')}</th>
                  <th className="p-4">{t('adminDashboard.tableSchool')}</th>
                  <th className="p-4">{t('adminDashboard.tableFiliere')}</th>
                  <th className="p-4">{currentLang === 'fr' ? 'Niveau d’études' : 'Study Level'}</th>
                  <th className="p-4">{t('adminDashboard.tableStatus')}</th>
                  <th className="p-4">Dossier</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((st) => {
                  const fil = filieres.find(f => f.id === st.filiereId);
                  const stDocs = documents.filter(d => d.studentId === st.id);
                  const docCount = stDocs.filter(d => d.name !== '').length;
                  return (
                    <tr key={st.id} className="border-b border-[#E2E8F0] hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#0F172A]">{st.firstName} {st.lastName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{st.email}</div>
                      </td>
                      <td className="p-4 font-semibold text-slate-700">{st.school}</td>
                      <td className="p-4">
                        <span className="font-bold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                          {fil?.code}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-[#0F172A]">{st.level === 'LEVEL_1' ? 'Niveau 1' : 'Niveau 2+'}</td>
                      <td className="p-4">{getStatusBadge(st.status)}</td>
                      <td className="p-4 font-bold text-[#0F172A]">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          docCount === 4 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                        }`}>
                          {docCount} / 4 docs
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PANEL 3: PAYMENTS HISTORY */}
      {activeTab === 'payments' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
            <div>
              <h3 className="font-extrabold text-base text-[#0F172A]">{currentLang === 'fr' ? 'Transactions & Échéances' : 'Transactions & Overdues'}</h3>
              <p className="text-xs text-[#64748B] mt-1">
                {currentLang === 'fr' ? 'Visualisez toutes les transactions financières simulées et identifiez les retards.' : 'View all simulated financial transactions and locate overdue balances.'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead>
                <tr className="bg-[#FAFAFA] border-b border-[#E2E8F0] text-[#0F172A] font-bold">
                  <th className="p-4">Stagiaire</th>
                  <th className="p-4">Frais type</th>
                  <th className="p-4">Montant</th>
                  <th className="p-4">Échéance</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Moyen</th>
                  <th className="p-4">Statut</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => {
                  const student = students.find(s => s.id === p.studentId);
                  return (
                    <tr key={p.id} className="border-b border-[#E2E8F0] hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#0F172A]">
                        {student ? `${student.firstName} ${student.lastName}` : 'N/A'}
                      </td>
                      <td className="p-4 font-bold text-slate-800">
                        {p.type === 'REGISTRATION' ? 'Inscription' : 'Tranche Scolarité'}
                      </td>
                      <td className="p-4 font-black text-[#0F172A]">{p.amount} XAF</td>
                      <td className="p-4 font-medium text-slate-400">{p.dueDate || p.date || 'N/A'}</td>
                      <td className="p-4 font-mono text-[10px] text-slate-500">{p.transactionId || '-'}</td>
                      <td className="p-4 font-bold text-slate-500">{p.paymentMethod || '-'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          p.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PANEL 4: DOCUMENTS SUBMITTED */}
      {activeTab === 'docs' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="font-extrabold text-base text-[#0F172A]">{currentLang === 'fr' ? 'Vérification des Dossiers Soumis' : 'Review Submitted Folders'}</h3>
            <p className="text-xs text-[#64748B] mt-1">
              {currentLang === 'fr' ? 'Approuvez ou rejetez les fichiers justificatifs téléversés par les étudiants.' : 'Approve or reject verification files submitted by the students.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead>
                <tr className="bg-[#FAFAFA] border-b border-[#E2E8F0] text-[#0F172A] font-bold">
                  <th className="p-4">Stagiaire</th>
                  <th className="p-4">Document Type</th>
                  <th className="p-4">Fichier</th>
                  <th className="p-4">Date dépôt</th>
                  <th className="p-4">État</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.filter(d => d.name !== '').map((doc) => {
                  const student = students.find(s => s.id === doc.studentId);
                  return (
                    <tr key={doc.id} className="border-b border-[#E2E8F0] hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#0F172A]">
                        {student ? `${student.firstName} ${student.lastName}` : 'N/A'}
                      </td>
                      <td className="p-4 font-semibold text-slate-800">
                        {doc.type === 'MOTIVATION_LETTER' && 'Lettre de motivation'}
                        {doc.type === 'CV' && 'CV'}
                        {doc.type === 'CNI' && 'Photocopie CNI'}
                        {doc.type === 'STUDENT_CERTIFICATE' && 'Certificat scolarité'}
                      </td>
                      <td className="p-4 text-[#15803D] hover:underline font-bold cursor-pointer">
                        {doc.name}
                      </td>
                      <td className="p-4 text-slate-400 font-medium">{doc.uploadDate}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          doc.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                          doc.status === 'REJECTED' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-600 animate-pulse'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-1.5 pt-4">
                        <button
                          onClick={() => handleReviewDoc(doc.id, 'APPROVED')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Approuver"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleReviewDoc(doc.id, 'REJECTED')}
                          className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Rejeter"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PANEL 5: CONFIGURATION */}
      {activeTab === 'config' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 1: Create Session & Email Newsletter dispatch */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-[#0F172A] border-b border-[#E2E8F0] pb-3">
              {currentLang === 'fr' ? '1. Ouvrir une Session de Stage' : '1. Open Internship Session'}
            </h3>
            
            <p className="text-xs text-[#64748B] leading-relaxed">
              {currentLang === 'fr'
                ? 'La création d’une nouvelle session calcule automatiquement sa date de fin (+3 mois) et déclenche l’envoi de la newsletter automatique à tous les destinataires bilingues.'
                : 'Creating a session auto-calculates its end date (+3 months) and dispatches the automatic newsletter to all subscribers.'}
            </p>

            <form onSubmit={handleCreateSession} className="space-y-4 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Nom de la Session (FR) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Session de Septembre 2026"
                  value={newSesNameFr}
                  onChange={(e) => setNewSesNameFr(e.target.value)}
                  className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Session Name (EN) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: September 2026 Session"
                  value={newSesNameEn}
                  onChange={(e) => setNewSesNameEn(e.target.value)}
                  className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Date de début *
                </label>
                <input
                  type="date"
                  required
                  value={newSesStart}
                  onChange={(e) => setNewSesStart(e.target.value)}
                  className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs focus:outline-hidden"
                />
              </div>

              {sessionSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#15803D] rounded-xl text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Session créée et newsletter automatique envoyée avec succès !</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ouvrir la Session (Déclencher l’envoi)</span>
              </button>
            </form>
          </div>

          {/* Section 2: Manage Specialties */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-[#0F172A] border-b border-[#E2E8F0] pb-3">
              {currentLang === 'fr' ? '2. Ajouter une Filière Informatique' : '2. Add IT Specialty'}
            </h3>

            <form onSubmit={handleCreateFiliere} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="CYBER"
                    value={newFilCode}
                    onChange={(e) => setNewFilCode(e.target.value)}
                    className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Nom (FR) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Cybersécurité"
                    value={newFilNameFr}
                    onChange={(e) => setNewFilNameFr(e.target.value)}
                    className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Name (EN) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cybersecurity & Defense"
                  value={newFilNameEn}
                  onChange={(e) => setNewFilNameEn(e.target.value)}
                  className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Description (FR)
                </label>
                <textarea
                  rows={2}
                  placeholder="Brève description en Français..."
                  value={newFilDescFr}
                  onChange={(e) => setNewFilDescFr(e.target.value)}
                  className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs focus:outline-hidden resize-none"
                />
              </div>

              {filiereSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#15803D] rounded-xl text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Filière enregistrée avec succès !</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter la filière informatique</span>
              </button>
            </form>
          </div>

          {/* Section 3: Pricing settings */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4 md:col-span-2">
            <h3 className="font-extrabold text-base text-[#0F172A] border-b border-[#E2E8F0] pb-3">
              {currentLang === 'fr' ? '3. Tarification Globale des Frais' : '3. Global Fee Pricing Settings'}
            </h3>

            <form onSubmit={handleUpdateConfig} className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
              <div>
                <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Frais d’inscription (XAF)
                </label>
                <input
                  type="number"
                  value={cfgRegFee}
                  onChange={(e) => setCfgRegFee(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Frais Scolarité Niveau 1 (XAF)
                </label>
                <input
                  type="number"
                  value={cfgTuitLvl1}
                  onChange={(e) => setCfgTuitLvl1(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Frais Scolarité Niveau 2+ (XAF)
                </label>
                <input
                  type="number"
                  value={cfgTuitLvl2}
                  onChange={(e) => setCfgTuitLvl2(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-3 flex justify-between items-center border-t border-slate-50 pt-4">
                {configSuccess ? (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Tarifs mis à jour avec succès !
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">
                    * Ces tarifs s’appliqueront aux nouveaux stagiaires s’inscrivant après enregistrement.
                  </span>
                )}
                <button
                  type="submit"
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  {t('adminDashboard.saveBtn')}
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
