import React, { useState, useEffect } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  Shield,
  GraduationCap,
  UserCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import confetti from 'canvas-confetti';

export const AuthModal: React.FC = () => {
  const {
    showAuthModal,
    setShowAuthModal,
    isLoggedOut,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    users
  } = useApp();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('siswa');
  const [regHeadline, setRegHeadline] = useState('');
  const [regFeedback, setRegFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  useEffect(() => {
    if (showAuthModal) {
      setLoginEmail('');
      setLoginPassword('');
      setShowPassword(false);
      setLoginFeedback(null);
      setRegFeedback(null);
    }
  }, [showAuthModal]);

  if (!showAuthModal) return null;

  const handleClose = () => {
    setShowAuthModal(false);
    setLoginFeedback(null);
    setRegFeedback(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginFeedback(null);

    const res = login(loginEmail, loginPassword);
    if (res.success) {
      setLoginFeedback({ type: 'success', text: res.message });
      try {
        confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
      setTimeout(() => {
        handleClose();
      }, 900);
    } else {
      setLoginFeedback({ type: 'error', text: res.message });
    }
  };

  const handleQuickLogin = (email: string) => {
    const res = login(email);
    if (res.success) {
      setLoginFeedback({ type: 'success', text: res.message });
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
      setTimeout(() => {
        handleClose();
      }, 700);
    } else {
      setLoginFeedback({ type: 'error', text: res.message });
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegFeedback(null);

    if (!regFullName.trim() || !regEmail.trim()) {
      setRegFeedback({ type: 'error', text: 'Nama lengkap dan email wajib diisi.' });
      return;
    }

    const res = register({
      full_name: regFullName.trim(),
      email: regEmail.trim(),
      role: regRole,
      headline: regHeadline.trim() || undefined,
      password: regPassword || 'password123'
    });

    if (res.success) {
      setRegFeedback({ type: 'success', text: res.message });
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
      } catch {
        // ignore
      }
      setTimeout(() => {
        handleClose();
      }, 1200);
    } else {
      setRegFeedback({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0E1424] text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-[#1E2942] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Title and Mode Switcher */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 dark:border-[#1A2338] relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#161F33] transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {authModalMode === 'login' ? 'Masuk ke SKILLUP' : 'Daftar Akun Baru'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {authModalMode === 'login'
                  ? isLoggedOut
                    ? 'Masukkan email dan kata sandi akun terdaftar Anda.'
                    : 'Pilih akun demo cepat atau masukkan email terdaftar Anda.'
                  : 'Bergabunglah untuk belajar atau mulai mengajar sebagai instruktur.'}
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-slate-100 dark:bg-[#141C30] p-1 rounded-2xl mt-4 border border-slate-200/60 dark:border-[#1E2A44]">
            <button
              onClick={() => {
                setAuthModalMode('login');
                setLoginFeedback(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authModalMode === 'login'
                  ? 'bg-white dark:bg-[#20293E] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk (Login)</span>
            </button>
            <button
              onClick={() => {
                setAuthModalMode('register');
                setRegFeedback(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authModalMode === 'register'
                  ? 'bg-white dark:bg-[#20293E] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar (Register)</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {authModalMode === 'login' ? (
            <>
              {!isLoggedOut && (
                <>
                  {/* Quick Login Section (Presetted Demo Accounts for Instant Testing) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Akses Cepat Akun Demo (1-Klik)
                      </span>
                      <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-semibold">
                        Langsung aktif
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {/* Admin Demo Button */}
                      <button
                        type="button"
                        onClick={() => handleQuickLogin('admin@skillup.id')}
                        className="p-3 rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/20 hover:border-rose-400 dark:hover:border-rose-600 transition-all text-left group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                            <Shield className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/50 px-1.5 py-0.5 rounded">
                            Admin
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                          Administrator
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          admin@skillup.id
                        </div>
                      </button>

                      {/* Instruktur Demo Button */}
                      <button
                        type="button"
                        onClick={() => handleQuickLogin('budi@skillup.id')}
                        className="p-3 rounded-2xl border border-sky-200 dark:border-sky-900/40 bg-sky-50/60 dark:bg-sky-950/20 hover:border-sky-400 dark:hover:border-sky-600 transition-all text-left group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-black uppercase text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/50 px-1.5 py-0.5 rounded">
                            Instruktur
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          Budi Santoso
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          budi@skillup.id
                        </div>
                      </button>

                      {/* Siswa Demo Button */}
                      <button
                        type="button"
                        onClick={() => handleQuickLogin('skilup1515@gmail.com')}
                        className="p-3 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all text-left group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <UserCheck className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-1.5 py-0.5 rounded">
                            Siswa
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Imam Hambali
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          skilup1515@gmail.com
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-[#1E2940]" />
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                      atau masuk dengan email
                    </span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-[#1E2940]" />
                  </div>
                </>
              )}

              {/* Feedback Alert */}
              {loginFeedback && (
                <div
                  className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                    loginFeedback.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {loginFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  )}
                  <span>{loginFeedback.text}</span>
                </div>
              )}

              {/* Email Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Kata Sandi
                    </label>
                    {!isLoggedOut && (
                      <span className="text-[11px] text-slate-400">Demo: sembarang / password123</span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 outline-hidden transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk ke Akun</span>
                </button>
              </form>
            </>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {regFeedback && (
                <div
                  className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                    regFeedback.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {regFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  )}
                  <span>{regFeedback.text}</span>
                </div>
              )}

              {/* Role Selection Option */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Daftar Sebagai:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRegRole('siswa')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      regRole === 'siswa'
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-[#1E2940] hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        regRole === 'siswa'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Siswa / Pelajar
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        Belajar kursus, quiz, dan klaim sertifikat
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('instruktur')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      regRole === 'instruktur'
                        ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/20 ring-1 ring-sky-500'
                        : 'border-slate-200 dark:border-[#1E2940] hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        regRole === 'instruktur'
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Instruktur / Mentor
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        Buat materi, bimbing siswa, beri review tugas
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Ahmad Zaky atau Dr. Maya"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 outline-hidden transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Alamat Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 outline-hidden transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 outline-hidden transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Bidang Keahlian / Minat
                </label>
                <input
                  type="text"
                  placeholder="Misal: Data Science, Frontend React, UI/UX"
                  value={regHeadline}
                  onChange={(e) => setRegHeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 outline-hidden transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Daftar Sekarang & Mulai</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-400 pt-1">
                Sudah memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="text-indigo-500 dark:text-indigo-400 font-bold hover:underline"
                >
                  Masuk di sini
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 dark:bg-[#0A0E1A] border-t border-slate-100 dark:border-[#1A2338] text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Terdaftar: {users.length} pengguna</span>
          <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
            <span>SKILLUP Learning Ecosystem</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
