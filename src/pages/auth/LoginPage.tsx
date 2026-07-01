import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, LogIn, AlertCircle, User, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useStageStore } from '../../store/stageStore';

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const { login } = useAuthStore();
  const { students } = useStageStore();

  const [email, setEmail] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) return;

    const detectedRole = email.toLowerCase().trim() === 'admin@hrskills.com' ? 'admin' : 'student';

    if (detectedRole === 'admin') {
      const success = login(email, 'admin');
      if (success) {
        navigate('/dashboard/admin');
      } else {
        setErrorMsg(currentLang === 'fr' ? 'Identifiants admin incorrects. Utilisez admin@hrskills.com' : 'Invalid admin credentials. Use admin@hrskills.com');
      }
    } else {
      const success = login(email, 'student', students);
      if (success) {
        navigate('/dashboard/student');
      } else {
        setErrorMsg(currentLang === 'fr' ? 'Aucun stagiaire trouvé avec cette adresse e-mail.' : 'No student found with this email address.');
      }
    }
  };

  // Quick test prefiller
  const handleQuickFill = (testEmail: string) => {
    setEmail(testEmail);
    setErrorMsg('');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">{t('auth.loginTitle')}</h2>
        <p className="text-xs text-[#64748B] mt-1">
          {currentLang === 'fr' ? 'Accédez à votre dossier de stage' : 'Access your internship folder'}
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
            {t('auth.emailLabel')}
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 translate-y-[-50%] w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@ecole.com"
              className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              {t('auth.passwordLabel')}
            </label>
            <span className="text-[10px] text-[#15803D] font-semibold hover:underline cursor-pointer">
              {currentLang === 'fr' ? 'Mot de passe oublié ?' : 'Forgot Password?'}
            </span>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 translate-y-[-50%] w-4 h-4 text-slate-400" />
            <input
              type="password"
              placeholder="••••••••"
              defaultValue="password"
              className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#15803D] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#15803D]/15"
        >
          <LogIn className="w-4 h-4" />
          <span>{t('auth.submitLogin')}</span>
        </button>
      </form>

      {/* Register switch link */}
      <div className="text-center text-xs">
        <span className="text-[#64748B]">
          {t('auth.noAccount')}
        </span>
        <button
          onClick={() => navigate('/register')}
          className="text-[#15803D] font-bold hover:underline ml-1.5 cursor-pointer"
        >
          {t('nav.register')}
        </button>
      </div>

      {/* QUICK TESTING LINKS CONTAINER */}
      <div className="bg-[#FAF9F5] border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-1 text-[#0C1630] font-extrabold text-[10px] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
          <span>{currentLang === 'fr' ? 'Comptes de Test Rapides' : 'Quick Test Accounts'}</span>
        </div>
        <p className="text-[10px] text-[#64748B] leading-normal">
          {currentLang === 'fr' 
            ? 'Cliquez sur l’un de ces comptes de simulation pour vous connecter instantanément et explorer l’application :'
            : 'Click any of these simulation accounts to log in instantly and test the workflow:'}
        </p>
        
        <div className="space-y-2 pt-1">
          {/* Admin */}
          <button
            onClick={() => handleQuickFill('admin@hrskills.com')}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#15803D] hover:bg-white text-[10px] text-left transition-all cursor-pointer"
          >
            <span className="font-bold text-[#0F172A]">Directeur Général (Admin)</span>
            <span className="text-[#D97706] font-mono font-bold text-[9px] bg-amber-50 px-1.5 py-0.5 rounded-md">admin@hrskills.com</span>
          </button>

          {/* Active Student */}
          <button
            onClick={() => handleQuickFill('arnaud.ngoa@gmail.com')}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#15803D] hover:bg-white text-[10px] text-left transition-all cursor-pointer"
          >
            <span className="font-bold text-[#0F172A]">Arnaud Ngoa (Actif)</span>
            <span className="text-[#15803D] font-mono font-bold text-[9px] bg-emerald-50 px-1.5 py-0.5 rounded-md">arnaud.ngoa@gmail.com</span>
          </button>

          {/* Suspended Student */}
          <button
            onClick={() => handleQuickFill('brenda.ekani@yahoo.fr')}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#15803D] hover:bg-white text-[10px] text-left transition-all cursor-pointer"
          >
            <span className="font-bold text-[#0F172A]">Brenda Ekani (Suspendu)</span>
            <span className="text-rose-500 font-mono font-bold text-[9px] bg-rose-50 px-1.5 py-0.5 rounded-md">brenda.ekani@yahoo.fr</span>
          </button>

          {/* Pending Student */}
          <button
            onClick={() => handleQuickFill('cedric.talla@live.com')}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#15803D] hover:bg-white text-[10px] text-left transition-all cursor-pointer"
          >
            <span className="font-bold text-[#0F172A]">Cedric Talla (Incomplet / En attente)</span>
            <span className="text-amber-500 font-mono font-bold text-[9px] bg-amber-50 px-1.5 py-0.5 rounded-md">cedric.talla@live.com</span>
          </button>
        </div>
      </div>
    </div>
  );
}
