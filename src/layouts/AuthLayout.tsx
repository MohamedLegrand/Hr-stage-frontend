import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Globe } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLang = i18n.language;

  return (
    <div className="min-h-screen bg-[#FBF7F0] flex flex-col justify-between font-sans text-[#0F172A] relative overflow-hidden">
      {/* Decorative background shapes mimicking the Riipen organic geometrics */}
      <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#15803D]/5 blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#E57B24]/5 blur-3xl -z-10" />

      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] shadow-sm hover:bg-slate-50 hover:text-[#15803D] transition-colors font-semibold text-xs text-[#64748B]"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentLang === 'fr' ? 'Retour' : 'Back'}
        </button>

        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            {/* Logo */}
            <div className="flex items-center font-sans select-none scale-90">
              <span className="text-[#0C1630] font-black text-xl leading-none tracking-tight">HRsk</span>
              <span className="relative text-[#0C1630] font-extrabold text-xl leading-none select-none inline-flex">
                <span className="text-transparent">i</span>
                <span className="absolute bottom-0 left-0 text-[#0C1630] font-extrabold text-xl leading-none">ı</span>
                <span className="absolute top-[2px] left-[1px] w-[3px] h-[3px] bg-[#E57B24] rounded-full" />
              </span>
              <span className="text-[#0C1630] font-extrabold text-xl leading-none tracking-tight">lls</span>
            </div>
          </Link>

          {/* Lang switch */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-[#E2E8F0]">
            <button
              onClick={() => changeLanguage('fr')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                currentLang === 'fr' ? 'bg-[#0C1630] text-white shadow-xs' : 'text-[#64748B]'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                currentLang === 'en' ? 'bg-[#0C1630] text-white shadow-xs' : 'text-[#64748B]'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Content wrapper */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        <div className="w-full max-w-md bg-white border border-[#E2E8F0] shadow-xl shadow-slate-200/50 rounded-2xl p-6 sm:p-8 relative">
          {/* Subtle line decoration at the top of the card using our primary theme colors */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#15803D] via-[#E57B24] to-[#0C1630] rounded-t-2xl" />
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-xs text-[#64748B] border-t border-[#E2E8F0] z-10 bg-white/50 backdrop-blur-xs">
        <p>© {new Date().getFullYear()} HR Skills SARL. Yaoundé, Cameroun.</p>
      </footer>
    </div>
  );
}
