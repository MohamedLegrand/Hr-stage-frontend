import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useStageStore } from '../../store/stageStore';

export default function EmailVerificationPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const { registrationDraft, setRegistrationDraft, login } = useAuthStore();
  const { verifyStudentEmail, students } = useStageStore();

  const handleVerify = () => {
    if (!registrationDraft || !('id' in registrationDraft)) {
      navigate('/login');
      return;
    }

    const studentId = registrationDraft.id as string;
    const studentEmail = registrationDraft.email as string;

    // Verify email in store
    verifyStudentEmail(studentId);

    // Refresh students list and log them in
    const updatedStudents = useStageStore.getState().students;
    login(studentEmail, 'student', updatedStudents);

    // Clear registration draft
    setRegistrationDraft(null);

    // Redirect to Student dashboard
    navigate('/dashboard/student');
  };

  React.useEffect(() => {
    // If no draft exists, redirect to login
    if (!registrationDraft) {
      navigate('/login');
    }
  }, [registrationDraft, navigate]);

  if (!registrationDraft) return null;

  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-[#15803D]">
        <Mail className="w-8 h-8 animate-bounce" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">{t('auth.emailVerifyTitle')}</h2>
        <p className="text-xs text-[#64748B] leading-relaxed max-w-sm mx-auto">
          {t('auth.emailVerifyDesc')}
        </p>
      </div>

      {/* Information Box */}
      <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl text-left space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
          <ShieldCheck className="w-4 h-4 text-[#15803D]" />
          <span>{currentLang === 'fr' ? 'Destinataire' : 'Recipient'} :</span>
        </div>
        <p className="text-xs text-[#64748B] font-mono bg-white p-2 rounded-lg border border-slate-100">
          {registrationDraft.firstName} {registrationDraft.lastName} ({registrationDraft.email})
        </p>
      </div>

      <button
        onClick={handleVerify}
        className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#15803D]/15"
      >
        <CheckCircle className="w-4 h-4" />
        <span>{t('auth.emailVerifyBtn')}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="text-[10px] text-[#64748B] flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>{currentLang === 'fr' ? 'Simulation d’envoi d’email sécurisé' : 'Secure mock email delivery activated'}</span>
      </div>
    </div>
  );
}
