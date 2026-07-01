import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Menu, X, ChevronRight, Phone, Mail, Award, Shield, Compass, Linkedin, Instagram, Facebook, Twitter, Youtube, HelpCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLang = i18n.language;

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${sectionId}`);
      // Wait for navigation and then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#0F172A] font-sans selection:bg-[#15803D]/20 selection:text-[#15803D]">
      {/* Top Notification bar */}
      <div className="bg-[#0C1630] text-slate-100 text-xs py-2.5 px-4 text-center border-b border-[#1E293B] flex items-center justify-center gap-2">
        <p className="font-semibold text-[11px] sm:text-xs">
          {currentLang === 'fr' 
            ? "Partenariats Écoles & Stages d'Excellence 2026 — Session active en cours à Yaoundé." 
            : "University Partnerships & Elite Internships 2026 — Active session ongoing in Yaounde."}
        </p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-[#FBF7F0]/95 backdrop-blur-md border-b border-slate-200/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo in Brand Primary / Accent 1 */}
            <Link to="/" className="flex items-center gap-1 group cursor-pointer select-none">
              <span className="text-[#0F172A] font-black text-2xl tracking-tighter">HR</span>
              <span className="text-[#15803D] font-black text-2xl tracking-tighter">Skills</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#15803D] self-end mb-2 ml-0.5" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 font-bold text-[13px] text-slate-600 uppercase tracking-wider">
              <button onClick={() => handleNavClick('home')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                {currentLang === 'fr' ? 'Qui nous servons' : 'Who we serve'}
              </button>
              <button onClick={() => handleNavClick('stages')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                {currentLang === 'fr' ? 'Programmes' : 'Programs'}
              </button>
              <button onClick={() => handleNavClick('process')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                {currentLang === 'fr' ? 'Notre Impact' : 'Impact'}
              </button>
              <button onClick={() => handleNavClick('fees')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                {currentLang === 'fr' ? 'Solutions & Tarifs' : 'Solutions & Fees'}
              </button>
              <button onClick={() => handleNavClick('contact')} className="hover:text-[#15803D] transition-colors cursor-pointer">
                {currentLang === 'fr' ? 'À Propos' : 'About'}
              </button>
            </nav>

            {/* Right CTAs / i18n */}
            <div className="hidden md:flex items-center gap-5">
              {/* Language switcher */}
              <button
                onClick={() => changeLanguage(currentLang === 'fr' ? 'en' : 'fr')}
                className="text-xs font-bold text-slate-600 hover:text-[#15803D] hover:border-[#15803D] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-slate-200 bg-white flex items-center gap-1 cursor-pointer transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentLang.toUpperCase()}</span>
              </button>

              {/* Space Actions */}
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to={user && 'isAdmin' in user ? '/dashboard/admin' : '/dashboard/student'}
                    className="px-5 py-2.5 rounded-full border border-[#15803D] text-[#15803D] font-bold text-xs hover:bg-[#15803D]/5 transition-colors flex items-center gap-1.5"
                  >
                    <Compass className="w-4 h-4" />
                    {t('nav.mySpace')}
                  </Link>
                  <button
                    onClick={logout}
                    className="px-5 py-2.5 rounded-full bg-slate-200 hover:bg-slate-300 text-[#0F172A] font-bold text-xs transition-colors border border-slate-300"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-slate-600 hover:text-[#15803D] font-bold text-sm transition-colors px-3 py-2"
                  >
                    {currentLang === 'fr' ? 'Se connecter' : 'Log in'}
                  </Link>
                  
                  {/* Get started button */}
                  <Link
                    to="/register"
                    className="bg-[#15803D] hover:bg-[#166534] text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 group shadow-md"
                  >
                    <span>{currentLang === 'fr' ? "S'inscrire" : "Get started"}</span>
                    <span className="text-lg font-bold leading-none transform transition-transform group-hover:translate-x-1 duration-300">→</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-3 md:hidden">
              {/* Quick Language switch */}
              <button
                onClick={() => changeLanguage(currentLang === 'fr' ? 'en' : 'fr')}
                className="p-2 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-600 flex items-center gap-1 shadow-xs"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                {currentLang.toUpperCase()}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#15803D]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-[#FBF7F0] absolute top-full left-0 w-full shadow-2xl">
            <div className="px-4 pt-3 pb-6 space-y-3">
              <button
                onClick={() => handleNavClick('home')}
                className="block w-full text-left py-2.5 px-4 font-bold text-sm rounded-lg hover:bg-slate-100 text-[#15803D] transition-colors uppercase tracking-wider"
              >
                {currentLang === 'fr' ? 'Qui nous servons' : 'Who we serve'}
              </button>
              <button
                onClick={() => handleNavClick('stages')}
                className="block w-full text-left py-2.5 px-4 font-bold text-sm rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#15803D] transition-colors uppercase tracking-wider"
              >
                {currentLang === 'fr' ? 'Programmes' : 'Programs'}
              </button>
              <button
                onClick={() => handleNavClick('process')}
                className="block w-full text-left py-2.5 px-4 font-bold text-sm rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#15803D] transition-colors uppercase tracking-wider"
              >
                {currentLang === 'fr' ? 'Notre Impact' : 'Impact'}
              </button>
              <button
                onClick={() => handleNavClick('fees')}
                className="block w-full text-left py-2.5 px-4 font-bold text-sm rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#15803D] transition-colors uppercase tracking-wider"
              >
                {currentLang === 'fr' ? 'Solutions & Tarifs' : 'Solutions & Fees'}
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="block w-full text-left py-2.5 px-4 font-bold text-sm rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#15803D] transition-colors uppercase tracking-wider"
              >
                {currentLang === 'fr' ? 'À Propos' : 'About'}
              </button>

              <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to={user && 'isAdmin' in user ? '/dashboard/admin' : '/dashboard/student'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-3 rounded-full border border-[#15803D] text-[#15803D] font-bold text-sm bg-white shadow-xs"
                    >
                      {t('nav.mySpace')}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-center py-3 rounded-full bg-slate-200 text-slate-700 font-bold text-sm"
                    >
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-3 rounded-full border border-slate-200 text-slate-700 font-bold text-sm bg-white"
                    >
                      {currentLang === 'fr' ? 'Se connecter' : 'Log in'}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-3 rounded-full bg-[#15803D] text-white font-extrabold text-sm shadow-md"
                    >
                      {currentLang === 'fr' ? "S'inscrire" : 'Get started'}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main page content */}
      <main className="relative overflow-hidden">{children}</main>

      {/* Global Footer (Deep Navy matching Riipen Design Reference) */}
      <footer className="bg-[#040914] text-slate-300 pt-20 pb-12 font-sans border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 items-start">
            
            {/* Left Column: Brand & Social Outlines */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-8">
              {/* Riipen Homage Logo: Dotless "i" with Orange Dots */}
              <div className="flex items-center font-sans select-none">
                <span className="text-white font-black text-[38px] leading-none tracking-tight">HRsk</span>
                <span className="relative text-white font-extrabold text-[38px] leading-none select-none inline-flex">
                  <span className="text-transparent">i</span>
                  <span className="absolute bottom-0 left-0 text-white font-extrabold text-[38px] leading-none">ı</span>
                  <span className="absolute top-[4px] left-[3px] w-[6.5px] h-[6.5px] bg-[#E57B24] rounded-full" />
                </span>
                <span className="text-white font-extrabold text-[38px] leading-none tracking-tight">lls</span>
              </div>

              {/* Social Icons row exactly styled as white outlines in reference */}
              <div className="flex items-center gap-7 text-white/90">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E57B24] transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5 stroke-[2]" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E57B24] transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5 stroke-[2]" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E57B24] transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5 stroke-[2]" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E57B24] transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5 stroke-[2]" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E57B24] transition-colors" aria-label="YouTube">
                  <Youtube className="w-5 h-5 stroke-[2]" />
                </a>
              </div>
            </div>

            {/* Right Column: 4-Column navigation links from reference image */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {/* Column 1: Product */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm tracking-wide">
                  {currentLang === 'fr' ? 'Produit' : 'Product'}
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                  <li>
                    <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors text-left cursor-pointer">
                      {currentLang === 'fr' ? 'Pour Écoles & Universités' : 'For colleges & universities'}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('stages')} className="hover:text-white transition-colors text-left cursor-pointer">
                      {currentLang === 'fr' ? 'Pour Entreprises & Associations' : 'For businesses & non-profits'}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('stages')} className="hover:text-white transition-colors text-left cursor-pointer">
                      {currentLang === 'fr' ? 'Pour les Apprenants' : 'For learners'}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 2: Resources */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm tracking-wide">
                  {currentLang === 'fr' ? 'Ressources' : 'Resources'}
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                  <li>
                    <button onClick={() => handleNavClick('process')} className="hover:text-white transition-colors text-left cursor-pointer">
                      Blog
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('process')} className="hover:text-white transition-colors text-left cursor-pointer">
                      Webinars
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('process')} className="hover:text-white transition-colors text-left cursor-pointer">
                      {currentLang === 'fr' ? 'Témoignages' : 'Testimonials'}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 3: Company */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm tracking-wide">
                  {currentLang === 'fr' ? 'Entreprise' : 'Company'}
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                  <li>
                    <button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors text-left cursor-pointer">
                      {currentLang === 'fr' ? 'À propos' : 'About us'}
                    </button>
                  </li>
                  <li>
                    <Link to="/register" className="hover:text-white transition-colors text-left block">
                      {currentLang === 'fr' ? 'Recrutements' : 'Careers'}
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors text-left cursor-pointer">
                      {currentLang === 'fr' ? 'Actualités' : 'News'}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('fees')} className="hover:text-white transition-colors text-left cursor-pointer">
                      {currentLang === 'fr' ? 'Partenaires' : 'Partners'}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 4: Help */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm tracking-wide">
                  {currentLang === 'fr' ? 'Aide' : 'Help'}
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                  <li>
                    <a href="#/dashboard/student" className="hover:text-white transition-colors text-left block">
                      {currentLang === 'fr' ? 'Statut de la Plateforme' : 'Status'}
                    </a>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('fees')} className="hover:text-white transition-colors text-left cursor-pointer">
                      {currentLang === 'fr' ? 'Mises à jour' : 'Product updates'}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('process')} className="hover:text-white transition-colors text-left cursor-pointer">
                      {currentLang === 'fr' ? "Guides d'aide" : 'Help guides'}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors text-left cursor-pointer">
                      {currentLang === 'fr' ? 'Nous contacter' : 'Contact us'}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Thin horizontal separator line */}
          <div className="border-t border-white/10 my-8" />

          {/* Bottom Bar: Language selector & Terms of use mimicking the design */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-slate-400">
            {/* Styled Language Selector mimicking the British flag / French flag dropdown box in reference */}
            <button
              onClick={() => changeLanguage(currentLang === 'fr' ? 'en' : 'fr')}
              className="px-4 py-2 bg-[#090F1E] border border-white/10 hover:border-white/20 rounded-md text-white font-semibold flex items-center gap-2.5 transition-all cursor-pointer group"
            >
              {currentLang === 'fr' ? (
                <>
                  <span className="text-sm">🇫🇷</span>
                  <span>Français</span>
                </>
              ) : (
                <>
                  <span className="text-sm">🇬🇧</span>
                  <span>English</span>
                </>
              )}
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Terms and conditions exactly styled as reference */}
            <div className="flex items-center gap-3">
              <span className="text-slate-500">|</span>
              <span className="hover:text-white transition-colors cursor-pointer font-medium">
                {currentLang === 'fr' ? 'Conditions d’utilisation' : 'Terms and Conditions'}
              </span>
            </div>
          </div>
        </div>

        {/* Support Question mark widget floating inside footer area */}
        <div className="absolute bottom-8 right-6 lg:right-8">
          <button 
            onClick={() => handleNavClick('contact')}
            className="w-9 h-9 rounded-full bg-[#090F1E] hover:bg-[#111A2E] border border-white/10 flex items-center justify-center text-white hover:text-[#E57B24] transition-all cursor-pointer shadow-lg"
            title="Help Support"
          >
            <HelpCircle className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </footer>
    </div>
  );
}
