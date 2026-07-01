import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  User, Mail, School, BookOpen, Layers, Check, ChevronRight, Upload, FileText, 
  Trash2, AlertCircle, Eye, EyeOff, ShieldAlert, CheckCircle2
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useStageStore } from '../../store/stageStore';
import { LevelType } from '../../types';

export default function RegisterPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const { setRegistrationDraft, registrationDraft } = useAuthStore();
  const { filieres, registerStudent } = useStageStore();

  const [step, setStep] = React.useState<1 | 2>(1);

  // Form states - Step 1
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [school, setSchool] = React.useState('');
  const [level, setLevel] = React.useState<LevelType>('LEVEL_1');
  const [filiereId, setFiliereId] = React.useState('');
  const [installmentsCount, setInstallmentsCount] = React.useState<1 | 2>(2);
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState('');

  // Set default filiere selection on load
  React.useEffect(() => {
    if (filieres.length > 0 && !filiereId) {
      setFiliereId(filieres[0].id);
    }
  }, [filieres, filiereId]);

  // Form states - Step 2 (Virtual Documents)
  const [motivationLetter, setMotivationLetter] = React.useState<{ name: string; size: string } | null>(null);
  const [cv, setCv] = React.useState<{ name: string; size: string } | null>(null);
  const [cni, setCni] = React.useState<{ name: string; size: string } | null>(null);
  const [studentCertificate, setStudentCertificate] = React.useState<{ name: string; size: string } | null>(null);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!firstName || !lastName || !email || !school || !filiereId) {
      setErrorMsg(currentLang === 'fr' ? 'Veuillez remplir tous les champs requis.' : 'Please fill out all required fields.');
      return;
    }

    // Save step 1 to draft and move to step 2
    const draft = {
      firstName,
      lastName,
      email,
      school,
      level,
      filiereId,
      installmentsCount,
      newsletterSubscribed
    };
    setRegistrationDraft(draft);
    setStep(2);
  };

  const triggerVirtualUpload = (type: 'motivation' | 'cv' | 'cni' | 'certificate', filename: string) => {
    const size = `${(Math.random() * (2.4 - 0.5) + 0.5).toFixed(1)} MB`;
    const docData = { name: filename, size };
    
    if (type === 'motivation') setMotivationLetter(docData);
    if (type === 'cv') setCv(docData);
    if (type === 'cni') setCni(docData);
    if (type === 'certificate') setStudentCertificate(docData);
  };

  const removeDoc = (type: 'motivation' | 'cv' | 'cni' | 'certificate') => {
    if (type === 'motivation') setMotivationLetter(null);
    if (type === 'cv') setCv(null);
    if (type === 'cni') setCni(null);
    if (type === 'certificate') setStudentCertificate(null);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Ensure all 4 documents are uploaded (mandatory and locking)
    if (!motivationLetter || !cv || !cni || !studentCertificate) {
      setErrorMsg(currentLang === 'fr' 
        ? 'Les 4 documents requis sont obligatoires pour valider votre inscription.' 
        : 'All 4 required documents are mandatory to validate your registration.');
      return;
    }

    const draft = registrationDraft;
    if (!draft || !draft.email) {
      setErrorMsg(currentLang === 'fr' ? 'Erreur de session. Veuillez recommencer.' : 'Session error. Please restart.');
      setStep(1);
      return;
    }

    try {
      // Register the student in the database store
      const newStudent = registerStudent({
        firstName: draft.firstName!,
        lastName: draft.lastName!,
        email: draft.email!,
        school: draft.school!,
        level: draft.level!,
        filiereId: draft.filiereId!,
        installmentsCount: draft.installmentsCount!,
        newsletterSubscribed: draft.newsletterSubscribed!
      });

      // Simulating documents upload to the new student
      const { uploadDocument } = useStageStore.getState();
      uploadDocument(newStudent.id, 'MOTIVATION_LETTER', motivationLetter.name);
      uploadDocument(newStudent.id, 'CV', cv.name);
      uploadDocument(newStudent.id, 'CNI', cni.name);
      uploadDocument(newStudent.id, 'STUDENT_CERTIFICATE', studentCertificate.name);

      // Log the student draft in temporarily to handle email verification page
      useAuthStore.getState().setRegistrationDraft({ ...newStudent });

      // Navigate to email verification screen
      navigate('/verify-email');
    } catch (err: any) {
      if (err.message === 'EMAIL_DUPLICATE') {
        setErrorMsg(currentLang === 'fr' 
          ? 'Cette adresse e-mail est déjà inscrite sur notre plateforme.' 
          : 'This email address is already registered on our platform.');
        setStep(1);
      } else {
        setErrorMsg(currentLang === 'fr' ? 'Une erreur est survenue lors de l’inscription.' : 'An error occurred during registration.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">{t('auth.registerTitle')}</h2>
        <p className="text-xs text-[#64748B] mt-1">
          {currentLang === 'fr' ? 'Accompagnement de stage en Informatique' : 'Computer Science Internship Mentoring'}
        </p>
      </div>

      {/* Stepper Wizard Indicator */}
      <div className="flex items-center justify-center gap-2 py-2">
        <div className="flex items-center gap-1.5">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
            step === 1 ? 'bg-[#0C1630] text-white' : 'bg-emerald-100 text-[#15803D]'
          }`}>
            {step === 1 ? '1' : <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${
            step === 1 ? 'text-[#0F172A]' : 'text-slate-400'
          }`}>
            {currentLang === 'fr' ? 'Informations' : 'Profile'}
          </span>
        </div>
        <div className="w-8 h-0.5 bg-slate-200" />
        <div className="flex items-center gap-1.5">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
            step === 2 ? 'bg-[#0C1630] text-white' : 'bg-slate-100 text-slate-400'
          }`}>
            2
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${
            step === 2 ? 'text-[#0F172A]' : 'text-slate-400'
          }`}>
            Documents
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* STEP 1: Personal info form */}
      {step === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                {t('auth.lastNameLabel')} *
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ngoa"
                className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                {t('auth.firstNameLabel')} *
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Arnaud"
                className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              {t('auth.emailLabel')} *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="arnaud.ngoa@gmail.com"
              className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              {t('auth.schoolLabel')} *
            </label>
            <input
              type="text"
              required
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="IAI Cameroun, Polytechnique..."
              className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                {t('auth.levelLabel')} *
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as LevelType)}
                className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors"
              >
                <option value="LEVEL_1">{currentLang === 'fr' ? 'Niveau 1' : 'Level 1'}</option>
                <option value="LEVEL_2">{currentLang === 'fr' ? 'Niveau 2+' : 'Level 2+'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                {t('auth.filiereLabel')} *
              </label>
              <select
                value={filiereId}
                onChange={(e) => setFiliereId(e.target.value)}
                className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors"
              >
                {filieres.map((f) => (
                  <option key={f.id} value={f.id}>
                    {currentLang === 'fr' ? f.nameFr : f.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              {t('auth.installmentsLabel')} *
            </label>
            <select
              value={installmentsCount}
              onChange={(e) => setInstallmentsCount(parseInt(e.target.value) as 1 | 2)}
              className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors"
            >
              <option value="1">{t('auth.oneInstallment')}</option>
              <option value="2">{t('auth.twoInstallments')}</option>
            </select>
          </div>

          <div className="flex items-start gap-2.5 pt-2">
            <input
              type="checkbox"
              id="newsletter"
              checked={newsletterSubscribed}
              onChange={(e) => setNewsletterSubscribed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-slate-300 text-[#15803D] focus:ring-[#15803D]"
            />
            <label htmlFor="newsletter" className="text-xs text-[#64748B] leading-snug">
              {currentLang === 'fr'
                ? 'Je souhaite recevoir la newsletter automatique contenant les dates des prochaines sessions de stage.'
                : 'I wish to receive the automatic newsletter containing upcoming internship session dates.'}
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#15803D]/15 pt-2"
          >
            <span>{t('auth.submitRegister')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* STEP 2: Document Upload form */}
      {step === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-5">
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] leading-relaxed flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <p>
              {currentLang === 'fr'
                ? "Conformément aux exigences de HR Skills SARL, les 4 documents ci-dessous sont tous OBLIGATOIRES et bloquants pour pouvoir soumettre le dossier."
                : "According to HR Skills requirements, the 4 documents below are MANDATORY and blocking for submission."}
            </p>
          </div>

          <div className="space-y-4">
            {/* Document 1: Motivation Letter */}
            <div className="p-4 border rounded-xl border-[#E2E8F0] bg-slate-50/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#0F172A]">
                  1. Lettre de motivation (DG HR Skills) *
                </span>
                {motivationLetter && (
                  <button type="button" onClick={() => removeDoc('motivation')} className="text-rose-500 hover:text-rose-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {motivationLetter ? (
                <div className="flex items-center gap-3 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium">
                  <FileText className="w-4 h-4 text-[#15803D]" />
                  <span className="truncate flex-1">{motivationLetter.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{motivationLetter.size}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => triggerVirtualUpload('motivation', 'Lettre_Motivation.pdf')}
                  className="w-full py-3 border-2 border-dashed border-[#E2E8F0] hover:border-[#15803D] rounded-xl flex items-center justify-center gap-2 bg-white text-slate-500 hover:text-[#15803D] text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>{currentLang === 'fr' ? 'Téléverser Lettre Motivation' : 'Upload Motivation Letter'}</span>
                </button>
              )}
            </div>

            {/* Document 2: CV */}
            <div className="p-4 border rounded-xl border-[#E2E8F0] bg-slate-50/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#0F172A]">
                  2. Curriculum Vitae (CV) *
                </span>
                {cv && (
                  <button type="button" onClick={() => removeDoc('cv')} className="text-rose-500 hover:text-rose-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {cv ? (
                <div className="flex items-center gap-3 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium">
                  <FileText className="w-4 h-4 text-[#15803D]" />
                  <span className="truncate flex-1">{cv.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{cv.size}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => triggerVirtualUpload('cv', 'CV_Academique.pdf')}
                  className="w-full py-3 border-2 border-dashed border-[#E2E8F0] hover:border-[#15803D] rounded-xl flex items-center justify-center gap-2 bg-white text-slate-500 hover:text-[#15803D] text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>{currentLang === 'fr' ? 'Téléverser CV' : 'Upload CV'}</span>
                </button>
              )}
            </div>

            {/* Document 3: CNI */}
            <div className="p-4 border rounded-xl border-[#E2E8F0] bg-slate-50/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#0F172A]">
                  3. Photocopie CNI / Récépissé / Carte étudiant *
                </span>
                {cni && (
                  <button type="button" onClick={() => removeDoc('cni')} className="text-rose-500 hover:text-rose-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {cni ? (
                <div className="flex items-center gap-3 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium">
                  <FileText className="w-4 h-4 text-[#15803D]" />
                  <span className="truncate flex-1">{cni.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{cni.size}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => triggerVirtualUpload('cni', 'CNI_National_ID.jpg')}
                  className="w-full py-3 border-2 border-dashed border-[#E2E8F0] hover:border-[#15803D] rounded-xl flex items-center justify-center gap-2 bg-white text-slate-500 hover:text-[#15803D] text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>{currentLang === 'fr' ? 'Téléverser ID/CNI' : 'Upload ID/CNI Card'}</span>
                </button>
              )}
            </div>

            {/* Document 4: Certificat scolarite */}
            <div className="p-4 border rounded-xl border-[#E2E8F0] bg-slate-50/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#0F172A]">
                  4. Certificat de scolarité *
                </span>
                {studentCertificate && (
                  <button type="button" onClick={() => removeDoc('certificate')} className="text-rose-500 hover:text-rose-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {studentCertificate ? (
                <div className="flex items-center gap-3 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium">
                  <FileText className="w-4 h-4 text-[#15803D]" />
                  <span className="truncate flex-1">{studentCertificate.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{studentCertificate.size}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => triggerVirtualUpload('certificate', 'Certificat_Scolarite_2026.pdf')}
                  className="w-full py-3 border-2 border-dashed border-[#E2E8F0] hover:border-[#15803D] rounded-xl flex items-center justify-center gap-2 bg-white text-slate-500 hover:text-[#15803D] text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>{currentLang === 'fr' ? 'Téléverser Certificat Scolarité' : 'Upload School Certificate'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3.5 rounded-xl transition-colors text-center cursor-pointer"
            >
              {currentLang === 'fr' ? 'Précédent' : 'Back'}
            </button>
            <button
              type="submit"
              className="flex-2 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#15803D]/15"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentLang === 'fr' ? 'Valider mon inscription' : 'Submit Registration'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Login link */}
      <div className="text-center text-xs text-[#64748B] pt-2">
        <span>{t('auth.haveAccount')}</span>
        <button
          onClick={() => navigate('/login')}
          className="text-[#15803D] font-bold hover:underline ml-1.5 cursor-pointer"
        >
          {t('auth.submitLogin')}
        </button>
      </div>
    </div>
  );
}
