import React from 'react';
import {
  Home,
  BookOpen,
  Calendar,
  Award,
  Users,
  MessageSquare,
  Settings,
  Rocket,
  LayoutDashboard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    closeClassroom,
    currentUser,
    setShowUpgradeModal
  } = useApp();

  const handleNavClick = (tab: string) => {
    closeClassroom();
    setActiveTab(tab);
  };

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'kursus', label: 'Kursus', icon: BookOpen },
    { id: 'rencana', label: 'Rencana Belajar', icon: Calendar },
    { id: 'sertifikat', label: 'Sertifikat', icon: Award },
    { id: 'komunitas', label: 'Bimbingan Mentor', icon: MessageSquare },
    ...(currentUser.role === 'admin' ? [{ id: 'pengguna', label: 'Pengguna', icon: Users }] : []),
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile, fixed 76px on desktop) */}
      <aside
        className="hidden md:flex w-[76px] shrink-0 bg-white dark:bg-[#0B101D] border-r border-slate-200 dark:border-[#1A2438] flex-col justify-between items-center py-5 h-screen sticky top-0 text-slate-700 dark:text-slate-200 select-none z-20 transition-colors overflow-y-auto"
        aria-label="Sidebar Navigation"
      >
        {/* Top Section: Brand Logo */}
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('beranda')}
            className="cursor-pointer group flex items-center justify-center p-1"
            title="SKILLUP - Beranda"
          >
            <img
              src="/assets/aistudio/skillup_logo_clean.png"
              alt="SKILLUP Logo"
              className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Navigation Icons Stack */}
          <nav className="flex flex-col items-center gap-2.5 w-full pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <div key={item.id} className="relative group flex justify-center w-full">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    aria-label={item.label}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#232938] text-white shadow-md shadow-black/25 font-bold border border-slate-600/60'
                        : 'text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-[#141B2A]'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`}
                    />
                  </button>

                  {/* Floating Tooltip */}
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 pointer-events-none px-3 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-bold shadow-xl border border-slate-700/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 backdrop-blur-xs">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Separator, Admin Portal & Upgrade Pro */}
        <div className="flex flex-col items-center gap-3 w-full">
          {/* Subtle Horizontal Divider Line */}
          <div className="w-9 h-px bg-slate-200 dark:bg-[#1A2438] my-1" />

          {/* Admin / Instructor Portal Link */}
          {(currentUser.role === 'instruktur' || currentUser.role === 'admin') && (
            <div className="relative group flex justify-center w-full">
              <button
                onClick={() => handleNavClick('instructor_panel')}
                aria-label={currentUser.role === 'admin' ? 'Admin Portal' : 'Panel Instruktur'}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer border ${
                  activeTab === 'instructor_panel'
                    ? 'bg-[#232938] text-white shadow-md shadow-black/25 font-bold border-slate-500'
                    : 'bg-transparent border-slate-300 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-[#141B2A]'
                }`}
              >
                <LayoutDashboard className="w-5 h-5 shrink-0" />
              </button>

              {/* Floating Tooltip */}
              <div className="absolute left-16 top-1/2 -translate-y-1/2 pointer-events-none px-3 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-bold shadow-xl border border-slate-700/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 backdrop-blur-xs">
                {currentUser.role === 'admin' ? 'Admin Portal' : 'Panel Instruktur'}
              </div>
            </div>
          )}

          {/* Upgrade Pro Rocket Button in Gold/Amber */}
          <div className="relative group flex justify-center w-full">
            <button
              onClick={() => setShowUpgradeModal(true)}
              aria-label="Upgrade SKILLUP Pro"
              className="w-12 h-12 rounded-2xl border border-slate-300 dark:border-slate-700/80 bg-slate-100 dark:bg-[#141B2A] hover:border-amber-400/60 hover:scale-105 transition-all flex items-center justify-center shadow-md shadow-black/20 cursor-pointer"
            >
              <Rocket className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            </button>

            {/* Floating Tooltip */}
            <div className="absolute left-16 top-1/2 -translate-y-1/2 pointer-events-none px-3 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-bold shadow-xl border border-amber-500/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 backdrop-blur-xs flex items-center gap-1.5">
              <span className="text-amber-400">✨</span>
              <span>Upgrade SKILLUP Pro</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (active on screen width < 768px / HP) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0B101D]/95 backdrop-blur-md border-t border-slate-200 dark:border-[#1A2438] px-2 py-1.5 flex items-center justify-around shadow-2xl transition-colors"
        aria-label="Mobile Navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center p-1.5 min-w-[44px] min-h-[44px] rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-[#1B2232]'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] font-semibold mt-0.5 leading-tight tracking-tight">
                {item.id === 'rencana' ? 'Jadwal' : item.id === 'komunitas' ? 'Mentor' : item.label}
              </span>
            </button>
          );
        })}

        {/* Instructor/Admin panel button for mobile if permitted */}
        {(currentUser.role === 'instruktur' || currentUser.role === 'admin') && (
          <button
            onClick={() => handleNavClick('instructor_panel')}
            aria-label="Panel Admin"
            className={`flex flex-col items-center justify-center p-1.5 min-w-[44px] min-h-[44px] rounded-xl transition-all cursor-pointer ${
              activeTab === 'instructor_panel'
                ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-[#1B2232]'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0 stroke-[2]" />
            <span className="text-[10px] font-semibold mt-0.5 leading-tight tracking-tight">Panel</span>
          </button>
        )}

        {/* Upgrade Pro button for mobile */}
        <button
          onClick={() => setShowUpgradeModal(true)}
          aria-label="Upgrade Pro"
          className="flex flex-col items-center justify-center p-1.5 min-w-[44px] min-h-[44px] rounded-xl text-amber-500 hover:text-amber-400 transition-all cursor-pointer"
        >
          <Rocket className="w-5 h-5 shrink-0 fill-amber-500/20" />
        </button>
      </nav>
    </>
  );
};
