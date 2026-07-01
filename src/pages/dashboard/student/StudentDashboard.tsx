import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Home, FileText, CreditCard, Award, AlertTriangle, Calendar, CheckCircle2, 
  Clock, ArrowRight, ShieldAlert, Upload, HelpCircle, XCircle, Check
} from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useStageStore } from '../../../store/stageStore';
import { DocumentType, StudentStatus, Payment, StudentDocument } from '../../../types';

export default function StudentDashboard() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const { user, updateUserInSession } = useAuthStore();
  const { 
    students, filieres, sessions, documents, payments, makePayment, uploadDocument, config
  } = useStageStore();

  const [activeTab, setActiveTab] = React.useState<'home' | 'docs' | 'payments' | 'stage'>('home');

  // Payment simulation dialog
  const [payDialogOpen, setPayDialogOpen] = React.useState(false);
  const [selectedPayment, setSelectedPayment] = React.useState<Payment | null>(null);
  const [paymentMethod, setPaymentMethod] = React.useState<'MTN' | 'ORANGE' | 'CARD'>('MTN');
  const [payPhone, setPayPhone] = React.useState('');
  const [payCardNum, setPayCardNum] = React.useState('');
  const [payCardExp, setPayCardExp] = React.useState('');
  const [payError, setPayError] = React.useState('');
  const [paySuccess, setPaySuccess] = React.useState(false);

  // If user is admin or not logged in, safety redirect
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if ('isAdmin' in user) {
      navigate('/dashboard/admin');
    }
  }, [user, navigate]);

  if (!user || 'isAdmin' in user) return null;

  // Retrieve fresh student data from central store to keep state in sync
  const student = students.find(s => s.id === user.id) || user;

  // Find other entities
  const studentFiliere = filieres.find(f => f.id === student.filiereId);
  const studentSession = sessions.find(s => s.id === student.sessionId);
  const studentDocs = documents.filter(d => d.studentId === student.id);
  const studentPayments = payments.filter(p => p.studentId === student.id);

  // Status badge styling
  const getStatusBadge = (status: StudentStatus) => {
    switch (status) {
      case 'ACTIF':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#15803D] text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t('studentDashboard.statusActive')}
          </span>
        );
      case 'SUSPENDU':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            {t('studentDashboard.statusSuspended')}
          </span>
        );
      case 'TERMINE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            {t('studentDashboard.statusFinished')}
          </span>
        );
      case 'EN_ATTENTE_PAIEMENT':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            {t('studentDashboard.statusPending')}
          </span>
        );
    }
  };

  // Get next due tuition payment
  const pendingTuitions = studentPayments.filter(p => p.type !== 'REGISTRATION' && p.status === 'PENDING');
  const nextPayment = pendingTuitions.length > 0 ? pendingTuitions[0] : null;

  // File upload simulation helper
  const handleVirtualUpload = (type: DocumentType) => {
    const virtualNames: Record<DocumentType, string> = {
      MOTIVATION_LETTER: 'Lettre_Motivation_Soumise.pdf',
      CV: 'CV_Ajour.pdf',
      CNI: 'Photocopie_CNI_RectoVerso.jpg',
      STUDENT_CERTIFICATE: 'Certificat_Scolarite_Officiel.pdf'
    };
    
    uploadDocument(student.id, type, virtualNames[type]);
    // Sync store user
    const updated = students.find(s => s.id === student.id);
    if (updated) updateUserInSession(updated);
  };

  // Document labels
  const getDocLabel = (type: DocumentType) => {
    switch (type) {
      case 'MOTIVATION_LETTER': return t('auth.submitRegister').includes('Motivation') ? 'Lettre de Motivation' : 'Motivation Letter';
      case 'CV': return 'Curriculum Vitae (CV)';
      case 'CNI': return 'Photocopie CNI / Récépissé / Carte Étudiant';
      case 'STUDENT_CERTIFICATE': return 'Certificat de scolarité';
    }
  };

  const getDocStatusBadge = (status: StudentDocument['status'], fileName: string) => {
    if (!fileName) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
          <XCircle className="w-3.5 h-3.5" />
          {t('studentDashboard.docMissing')}
        </span>
      );
    }
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t('studentDashboard.docApproved')}
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
            <XCircle className="w-3.5 h-3.5" />
            {t('studentDashboard.docRejected')}
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-600 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            {t('studentDashboard.docPending')}
          </span>
        );
    }
  };

  const handleOpenPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setPayError('');
    setPaySuccess(false);
    setPayPhone('');
    setPayCardNum('');
    setPayCardExp('');
    setPayDialogOpen(true);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPayError('');

    if (!selectedPayment) return;

    if (paymentMethod === 'CARD') {
      if (!payCardNum || !payCardExp) {
        setPayError(currentLang === 'fr' ? 'Veuillez saisir les coordonnées de la carte.' : 'Please enter card coordinates.');
        return;
      }
    } else {
      if (!payPhone) {
        setPayError(currentLang === 'fr' ? 'Veuillez saisir votre numéro de téléphone Mobile Money.' : 'Please enter Mobile Money phone number.');
        return;
      }
    }

    // Trigger payment in central store
    makePayment(student.id, selectedPayment.id, paymentMethod);

    setPaySuccess(true);
    
    // Sync store user state
    setTimeout(() => {
      const updated = useStageStore.getState().students.find(s => s.id === student.id);
      if (updated) {
        updateUserInSession(updated);
      }
      setPayDialogOpen(false);
      setSelectedPayment(null);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <p className="text-xs text-[#15803D] font-bold uppercase tracking-wider">
            {t('studentDashboard.welcome')},
          </p>
          <h2 className="text-2xl font-black text-[#0F172A] leading-tight">
            {student.firstName} {student.lastName}
          </h2>
          <p className="text-xs text-[#64748B] font-mono">ID: {student.id}</p>
        </div>
        <div className="shrink-0 flex flex-col items-start sm:items-end gap-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
            {t('studentDashboard.statusLabel')}
          </span>
          {getStatusBadge(student.status)}
        </div>
      </div>

      {/* Warning status alerts */}
      {student.status === 'EN_ATTENTE_PAIEMENT' && (
        <div className="p-5 bg-amber-50 border-2 border-dashed border-amber-200 text-amber-800 rounded-2xl flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-amber-950">{t('studentDashboard.unpaidWarning')}</h4>
            <p className="text-xs text-amber-900 leading-relaxed">
              {currentLang === 'fr'
                ? "Vos frais d’inscription de 5 000 XAF n’ont pas encore été réglés. Le règlement est obligatoire et bloquant pour démarrer officiellement votre stage et débloquer vos accès."
                : "Your registration fee of 5,000 XAF has not been settled yet. Payment is mandatory and blocking to officially start your internship."}
            </p>
            <button
              onClick={() => {
                const regPay = studentPayments.find(p => p.type === 'REGISTRATION' && p.status === 'PENDING');
                if (regPay) handleOpenPayment(regPay);
              }}
              className="mt-3 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              {t('studentDashboard.payRegistration')}
            </button>
          </div>
        </div>
      )}

      {student.status === 'SUSPENDU' && (
        <div className="p-5 bg-rose-50 border-2 border-dashed border-rose-200 text-rose-800 rounded-2xl flex items-start gap-4">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-rose-950">{t('studentDashboard.suspendedWarning')}</h4>
            <p className="text-xs text-rose-900 leading-relaxed">
              {currentLang === 'fr'
                ? "Votre accès à la plateforme de stage a été suspendu en raison d’un retard sur le paiement d’une tranche de vos frais de stage. Veuillez régler votre tranche ci-dessous pour lever la suspension immédiatement."
                : "Your access has been suspended due to an overdue installment. Please settle your installment below to restore your access immediately."}
            </p>
            {nextPayment && (
              <button
                onClick={() => handleOpenPayment(nextPayment)}
                className="mt-3 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                {t('studentDashboard.payInstallment')} ({nextPayment.amount} XAF)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tab Navigation Menu */}
      <div className="flex border-b border-[#E2E8F0] gap-4">
        <button
          onClick={() => setActiveTab('home')}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'home' ? 'border-[#15803D] text-[#15803D]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>{t('studentDashboard.home')}</span>
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'docs' ? 'border-[#15803D] text-[#15803D]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{t('studentDashboard.docs')}</span>
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'payments' ? 'border-[#15803D] text-[#15803D]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>{t('studentDashboard.payments')}</span>
        </button>
        <button
          onClick={() => setActiveTab('stage')}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'stage' ? 'border-[#15803D] text-[#15803D]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{t('studentDashboard.myStage')}</span>
        </button>
      </div>

      {/* Tab Panels */}

      {/* PANEL 1: HOME */}
      {activeTab === 'home' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Section details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-[#0F172A] border-b border-[#E2E8F0] pb-3">
                {currentLang === 'fr' ? 'Informations Générales' : 'General Information'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('studentDashboard.sessionLabel')}</span>
                  <p className="text-sm font-bold text-[#0F172A]">
                    {currentLang === 'fr' ? studentSession?.nameFr : studentSession?.nameEn}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('auth.filiereLabel')}</span>
                  <p className="text-sm font-bold text-[#15803D]">
                    {currentLang === 'fr' ? studentFiliere?.nameFr : studentFiliere?.nameEn}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('studentDashboard.startDate')}</span>
                  <p className="text-sm font-bold text-[#0F172A]">{studentSession?.startDate}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('studentDashboard.endDate')}</span>
                  <p className="text-sm font-bold text-[#0F172A]">{studentSession?.endDate}</p>
                </div>
              </div>
            </div>

            {/* Document summary box */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
              <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3 mb-4">
                <h3 className="font-extrabold text-base text-[#0F172A]">{t('studentDashboard.docStatusTitle')}</h3>
                <span className="text-xs text-[#64748B]">{t('studentDashboard.docStatusRequired')}</span>
              </div>
              <div className="space-y-3">
                {['MOTIVATION_LETTER', 'CV', 'CNI', 'STUDENT_CERTIFICATE'].map((type) => {
                  const d = studentDocs.find(doc => doc.type === type);
                  return (
                    <div key={type} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <span className="text-xs font-bold text-[#0F172A]">{getDocLabel(type as DocumentType)}</span>
                      <div className="flex items-center gap-3">
                        {getDocStatusBadge(d?.status || 'PENDING', d?.name || '')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Side card - summary of payments */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
              <h3 className="font-extrabold text-base text-[#0F172A] border-b border-[#E2E8F0] pb-3">
                {currentLang === 'fr' ? 'Échéancier financier' : 'Financial Schedule'}
              </h3>

              <div className="space-y-4">
                {/* Registration status */}
                {studentPayments.filter(p => p.type === 'REGISTRATION').map(p => (
                  <div key={p.id} className="flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{t('fees.registrationTitle')}</p>
                      <p className="text-[10px] text-slate-400">{p.dueDate || 'Immédiat'}</p>
                    </div>
                    <span className={`font-bold px-2.5 py-0.5 rounded-md text-[10px] uppercase ${
                      p.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {p.status === 'PAID' ? 'Payé' : 'À régler'}
                    </span>
                  </div>
                ))}

                {/* Tuition payments status */}
                {studentPayments.filter(p => p.type !== 'REGISTRATION').map((p, index) => (
                  <div key={p.id} className="flex justify-between items-center text-xs border-t border-slate-50 pt-3">
                    <div>
                      <p className="font-bold text-slate-800">
                        {currentLang === 'fr' ? `Frais de stage - Tranche ${index + 1}` : `Internship Fee - Installment ${index + 1}`}
                      </p>
                      <p className="text-[10px] text-slate-400">Due: {p.dueDate}</p>
                    </div>
                    <span className={`font-bold px-2.5 py-0.5 rounded-md text-[10px] uppercase ${
                      p.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {p.status === 'PAID' ? 'Payé' : 'À régler'}
                    </span>
                  </div>
                ))}
              </div>

              {nextPayment && (
                <button
                  onClick={() => handleOpenPayment(nextPayment)}
                  className="w-full text-center py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>{t('studentDashboard.payBtn')} ({nextPayment.amount} XAF)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* PANEL 2: DOCUMENTS */}
      {activeTab === 'docs' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="font-extrabold text-base text-[#0F172A]">{t('studentDashboard.docStatusRequired')}</h3>
            <p className="text-xs text-[#64748B] mt-1">
              {currentLang === 'fr' 
                ? "Agrémentez et gérez vos documents d’inscription. Un document rejeté par l’administration peut être téléversé à nouveau." 
                : "Manage and update your registration documents. Rejected files can be uploaded again."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['MOTIVATION_LETTER', 'CV', 'CNI', 'STUDENT_CERTIFICATE'].map((type) => {
              const d = studentDocs.find(doc => doc.type === type);
              return (
                <div key={type} className="p-4 border border-[#E2E8F0] bg-[#FAFAFA] rounded-2xl space-y-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-0.5">
                      <h4 className="font-extrabold text-xs text-[#0F172A]">{getDocLabel(type as DocumentType)}</h4>
                      <p className="text-[10px] text-slate-400">{d?.name ? `${d.name} (${d.uploadDate})` : (currentLang === 'fr' ? 'Aucun fichier' : 'No file')}</p>
                    </div>
                    {getDocStatusBadge(d?.status || 'PENDING', d?.name || '')}
                  </div>

                  {/* Upload button simulation */}
                  <button
                    onClick={() => handleVirtualUpload(type as DocumentType)}
                    className="w-full py-2.5 border border-[#E2E8F0] hover:border-[#15803D] hover:bg-emerald-50 hover:text-[#15803D] bg-white rounded-xl text-xs font-bold text-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{t('studentDashboard.uploadBtn')}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PANEL 3: PAYMENTS */}
      {activeTab === 'payments' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="font-extrabold text-base text-[#0F172A]">{currentLang === 'fr' ? 'Historique & Règlements' : 'History & Statements'}</h3>
            <p className="text-xs text-[#64748B] mt-1">
              {currentLang === 'fr' 
                ? "Visualisez l’état de vos tranches financières et effectuez vos règlements sécurisés via CinetPay." 
                : "View your financial statements and clear your balances securely via CinetPay."}
            </p>
          </div>

          <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead>
                <tr className="bg-[#FAFAFA] border-b border-[#E2E8F0] text-[#0F172A] font-bold">
                  <th className="p-4">{currentLang === 'fr' ? 'Type de frais' : 'Fee Type'}</th>
                  <th className="p-4">{currentLang === 'fr' ? 'Montant' : 'Amount'}</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentPayments.map((p) => (
                  <tr key={p.id} className="border-b border-[#E2E8F0] hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-[#0F172A]">
                      {p.type === 'REGISTRATION' 
                        ? t('fees.registrationTitle') 
                        : (currentLang === 'fr' ? 'Frais de stage' : 'Internship Tuition')}
                    </td>
                    <td className="p-4 font-bold text-[#0F172A]">{p.amount} XAF</td>
                    <td className="p-4 font-semibold text-slate-400">{p.dueDate || 'N/A'}</td>
                    <td className="p-4 font-mono text-[10px] text-slate-500">{p.transactionId || (currentLang === 'fr' ? 'En attente' : 'Pending')}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {p.status === 'PAID' ? 'PAID' : 'PENDING'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {p.status === 'PENDING' ? (
                        <button
                          onClick={() => handleOpenPayment(p)}
                          className="bg-[#15803D] hover:bg-[#166534] text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          {t('studentDashboard.payBtn')}
                        </button>
                      ) : (
                        <span className="text-emerald-600 font-bold text-xs flex items-center justify-end gap-1">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          {currentLang === 'fr' ? 'Soldé' : 'Settled'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PANEL 4: MY STAGE */}
      {activeTab === 'stage' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-4 border-b border-[#E2E8F0] pb-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#15803D] flex items-center justify-center shadow-sm shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#15803D] uppercase bg-emerald-50 px-2 py-0.5 rounded-md">
                {studentFiliere?.code}
              </span>
              <h3 className="font-extrabold text-lg text-[#0F172A] mt-1">
                {currentLang === 'fr' ? studentFiliere?.nameFr : studentFiliere?.nameEn}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-xs text-[#0F172A] uppercase tracking-wider">{currentLang === 'fr' ? 'Description de la spécialité' : 'Specialty Description'}</h4>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {currentLang === 'fr' ? studentFiliere?.descriptionFr : studentFiliere?.descriptionEn}
              </p>
            </div>

            <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4">
              <h4 className="font-bold text-xs text-[#0F172A] uppercase tracking-wider">{currentLang === 'fr' ? 'Fiche technique du stage' : 'Internship details'}</h4>
              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center text-xs text-[#64748B]">
                  <span>Durée de l’encadrement :</span>
                  <strong className="text-[#0F172A]">3 mois (Fixe, garanti)</strong>
                </div>
                <div className="flex justify-between items-center text-xs text-[#64748B] border-t border-slate-100 pt-2">
                  <span>Date d’ouverture :</span>
                  <strong className="text-[#0F172A]">{studentSession?.startDate}</strong>
                </div>
                <div className="flex justify-between items-center text-xs text-[#64748B] border-t border-slate-100 pt-2">
                  <span>Date d’échéance :</span>
                  <strong className="text-[#0F172A]">{studentSession?.endDate}</strong>
                </div>
                <div className="flex justify-between items-center text-xs text-[#64748B] border-t border-slate-100 pt-2">
                  <span>Accréditation de sortie :</span>
                  <strong className="text-[#15803D]">Attestation d’encadrement HR Skills</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* CINETPAY PAYMENT SIMULATOR MODAL DIALOG */}
      {payDialogOpen && selectedPayment && (
        <div className="fixed inset-0 bg-[#0C1630]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] shadow-2xl rounded-2xl w-full max-w-md p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Top color strap */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#15803D] to-[#E57B24]" />

            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-extrabold text-base text-[#0F172A]">
                  {t('paymentDialog.title')}
                </h3>
                <p className="text-[10px] text-[#64748B] mt-0.5">
                  {t('paymentDialog.subtitle')}
                </p>
              </div>
              <button
                onClick={() => setPayDialogOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-6 flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-500">{currentLang === 'fr' ? 'Règlement :' : 'Fee detail :'}</span>
              <span className="font-black text-[#15803D]">
                {selectedPayment.type === 'REGISTRATION' ? t('fees.registrationTitle') : (currentLang === 'fr' ? 'Frais de stage' : 'Tuition')} ({selectedPayment.amount} XAF)
              </span>
            </div>

            {/* Payment method toggle */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {['MTN', 'ORANGE', 'CARD'].map((m) => (
                <button
                   key={m}
                   type="button"
                   onClick={() => {
                     setPaymentMethod(m as any);
                     setPayError('');
                   }}
                   className={`py-3 px-2 rounded-xl border text-[10px] font-bold transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer ${
                     paymentMethod === m 
                       ? 'border-[#15803D] bg-emerald-50 text-[#15803D]' 
                       : 'border-[#E2E8F0] bg-white hover:border-slate-300 text-slate-600'
                   }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {m === 'MTN' && 'MTN MoMo'}
                    {m === 'ORANGE' && 'Orange'}
                    {m === 'CARD' && 'Bank Card'}
                  </span>
                </button>
              ))}
            </div>

            {/* Method Inputs */}
            <form onSubmit={handleConfirmPayment} className="space-y-4">
              {paymentMethod === 'CARD' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                      {t('paymentDialog.cardNumber')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="4000 1234 5678 9010"
                      value={payCardNum}
                      onChange={(e) => setPayCardNum(e.target.value)}
                      className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                        {t('paymentDialog.cardExpiry')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="12/29"
                        value={payCardExp}
                        onChange={(e) => setPayCardExp(e.target.value)}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#0F172A] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        placeholder="•••"
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#0F172A] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    {t('paymentDialog.phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={paymentMethod === 'MTN' ? '+237 670 ••• •••' : '+237 690 ••• •••'}
                    value={payPhone}
                    onChange={(e) => setPayPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D]"
                  />
                </div>
              )}

              {payError && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <p>{payError}</p>
                </div>
              )}

              {paySuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#15803D] rounded-xl text-xs font-semibold flex items-center gap-1.5 justify-center">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <p>{t('paymentDialog.paymentSuccess')}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={paySuccess}
                className="w-full bg-[#15803D] hover:bg-[#166534] disabled:bg-slate-300 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-[#15803D]/15 pt-2"
              >
                <span>{t('paymentDialog.paySubmit').replace('{amount}', selectedPayment.amount.toString())}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
