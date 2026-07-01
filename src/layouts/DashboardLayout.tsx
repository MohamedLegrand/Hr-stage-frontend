import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Users, CreditCard, FolderOpen, Settings, LogOut, Globe, User, Shield, ArrowRight, Bell, Compass } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useStageStore } from '../store/stageStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { students } = useStageStore();
  const currentLang = i18n.language;

  // Protect route
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const isAdmin = 'isAdmin' in user;

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'fr' ? 'en' : 'fr');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] font-sans flex flex-col md:flex-row">
      
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-64 bg-[#0C1630] text-[#FBF7F0] border-r border-[#1E293B] shrink-0 flex flex-col justify-between p-6">
        <div className="space-y-8">
          {/* Brand/Logo */}
          <Link to="/" className="flex items-center gap-1 font-sans select-none">
            <span className="text-white font-black text-[22px] leading-none tracking-tight">HRsk</span>
            <span className="relative text-white font-extrabold text-[22px] leading-none select-none inline-flex">
              <span className="text-transparent">i</span>
              <span className="absolute bottom-0 left-0 text-white font-extrabold text-[22px] leading-none">ı</span>
              <span className="absolute top-[2.5px] left-[2px] w-[4px] h-[4px] bg-[#E57B24] rounded-full" />
            </span>
            <span className="text-white font-extrabold text-[22px] leading-none tracking-tight">lls</span>
            <span className="ml-1 text-[9px] bg-[#15803D] text-white px-1.5 py-0.5 rounded-sm font-bold tracking-widest uppercase">PORTAL</span>
          </Link>

          {/* User Info Capsule */}
          <div className="bg-[#1E293B] rounded-xl p-4 border border-slate-700/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#15803D]/10 border border-[#15803D]/30 flex items-center justify-center text-[#15803D]">
              {isAdmin ? <Shield className="w-5 h-5 text-[#D97706]" /> : <User className="w-5 h-5 text-[#15803D]" />}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-xs text-white truncate leading-none mb-1">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-[10px] text-[#94A3B8] font-medium truncate">
                {isAdmin ? 'Admin' : 'Stagiaire'}
              </p>
            </div>
          </div>

          {/* Navigation Items (represented as quick information but in full layouts we provide router navigation) */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block px-3 mb-2">
              Menu
            </span>
            {isAdmin ? (
              <>
                <Link
                  to="/dashboard/admin"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    window.location.pathname === '/dashboard/admin'
                      ? 'bg-[#15803D] text-white shadow-md shadow-[#15803D]/15'
                      : 'text-[#94A3B8] hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{t('adminDashboard.overview')}</span>
                </Link>
                {/* For mock tabs support, the links all resolve to /dashboard/admin and state switches tabs internally, or we declare individual routes */}
              </>
            ) : (
              <>
                <Link
                  to="/dashboard/student"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    window.location.pathname === '/dashboard/student'
                      ? 'bg-[#15803D] text-white shadow-md shadow-[#15803D]/15'
                      : 'text-[#94A3B8] hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{t('studentDashboard.home')}</span>
                </Link>
              </>
            )}

            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-[#94A3B8] hover:bg-slate-800 hover:text-white transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>{currentLang === 'fr' ? 'Site Public' : 'Public Website'}</span>
            </Link>
          </div>
        </div>

        {/* Footer actions of Sidebar */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          {/* Lang switch */}
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {currentLang === 'fr' ? 'Français' : 'English'}
            </span>
            <span className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded text-white font-bold">
              {currentLang === 'fr' ? 'EN' : 'FR'}
            </span>
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header - top bar with notifications, profile & quick test switcher */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-sm tracking-tight text-[#0F172A] hidden sm:block">
              {isAdmin ? t('auth.adminAccess') : t('auth.studentAccess')}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Simulation indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#15803D]/10 border border-[#15803D]/20 text-[#15803D] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-pulse" />
              <span>{currentLang === 'fr' ? 'Mode Démo Connecté' : 'Demo Mode Connected'}</span>
            </div>

            {/* Quick Lang Switch */}
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 sm:hidden cursor-pointer"
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
