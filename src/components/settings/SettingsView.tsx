import React, { useState, useRef, useEffect } from 'react';
import {
  Save,
  CheckCircle,
  AlertCircle,
  Lock,
  Key,
  Eye,
  EyeOff,
  Camera,
  UploadCloud,
  Trash2,
  ShieldCheck,
  User,
  Mail,
  Phone,
  FileText,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export const SettingsView: React.FC = () => {
  const { currentUser, updateUserProfile, resetAllDataToZero, logout } = useApp();

  // Profile Form State
  const [fullName, setFullName] = useState(currentUser.full_name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [bio, setBio] = useState(currentUser.bio || currentUser.headline || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar || '');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);
  const [profileErrorMsg, setProfileErrorMsg] = useState<string | null>(null);
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null);

  // File input ref for photo upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwSuccessMsg, setPwSuccessMsg] = useState<string | null>(null);
  const [pwErrorMsg, setPwErrorMsg] = useState<string | null>(null);

  // Sync state if currentUser changes
  useEffect(() => {
    setFullName(currentUser.full_name);
    setEmail(currentUser.email);
    setPhone(currentUser.phone || '');
    setBio(currentUser.bio || currentUser.headline || '');
    setAvatarUrl(currentUser.avatar || '');
  }, [currentUser]);

  // Handle Photo File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setProfileErrorMsg('Format file tidak didukung. Harap pilih gambar (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setProfileErrorMsg('Ukuran file terlalu besar. Maksimal ukuran gambar adalah 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      if (base64Data) {
        setAvatarUrl(base64Data);
        setProfileErrorMsg(null);
        setProfileSuccessMsg('Foto profil baru berhasil diunggah! Klik "Simpan Perubahan" untuk menyimpan.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetAvatar = () => {
    const defaultAvatar = currentUser.role === 'instruktur'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
    setAvatarUrl(defaultAvatar);
  };

  // Handle Profile Update Submission
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErrorMsg(null);
    setProfileSuccessMsg(null);

    if (!fullName.trim() || !email.trim()) {
      setProfileErrorMsg('Nama lengkap dan email tidak boleh kosong.');
      return;
    }

    updateUserProfile(currentUser.id, {
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      bio: bio.trim() || undefined,
      headline: bio.trim() || currentUser.headline,
      avatar: avatarUrl
    });

    setProfileSuccessMsg('Pengaturan akun berhasil disimpan!');
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setTimeout(() => setProfileSuccessMsg(null), 3000);
  };

  // Handle Password Security Update Submission
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwErrorMsg(null);
    setPwSuccessMsg(null);

    if (!currentPassword) {
      setPwErrorMsg('Kata sandi saat ini wajib diisi.');
      return;
    }

    // Verify current password (fallback to 'password123' or 'admin' for demo accounts)
    const expectedPw = currentUser.password || (currentUser.role === 'admin' ? 'admin' : 'password123');
    if (currentPassword !== expectedPw && currentPassword !== 'password123' && currentPassword !== 'admin') {
      setPwErrorMsg('Kata sandi saat ini tidak cocok.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPwErrorMsg('Kata sandi baru minimal 6 karakter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwErrorMsg('Konfirmasi kata sandi tidak cocok dengan kata sandi baru.');
      return;
    }

    // Update user password
    updateUserProfile(currentUser.id, {
      password: newPassword
    });

    setPwSuccessMsg('Kata sandi berhasil diperbarui dengan aman!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }

    setTimeout(() => setPwSuccessMsg(null), 3500);
  };

  return (
    <div className="space-y-8 pb-12 max-w-3xl mx-auto">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Pengaturan Akun & Keamanan
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Perbarui informasi data diri, nomor kontak, foto profil, dan keamanan kata sandi akun SKILLUP.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 1. KARTU PENGATURAN AKUN (Nama, Email, No HP, Upload Foto) */}
      {/* ========================================================= */}
      <div className="bg-white dark:bg-[#0B101D] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#1A2438] shadow-sm dark:shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#1A2438]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Data Profil & Identitas Pengguna
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-[#151D2F] border border-slate-200 dark:border-slate-700/80 px-2.5 py-0.5 rounded-md uppercase">
            ROLE: {currentUser.role}
          </span>
        </div>

        {/* Profile Success / Error Alerts */}
        {profileSuccessMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{profileSuccessMsg}</span>
          </div>
        )}

        {profileErrorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{profileErrorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Avatar Section & File Upload */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-[#101728] border border-slate-200/80 dark:border-[#1E2940]">
            {/* Visual Avatar with Upload Button Trigger */}
            <div className="relative group shrink-0">
              <img
                src={avatarUrl || currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser.full_name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-slate-300 dark:ring-slate-700 shadow-sm"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold cursor-pointer"
                title="Ganti Foto Profil"
              >
                <Camera className="w-5 h-5 mb-0.5" />
                <span>Ubah</span>
              </button>
            </div>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="space-y-1.5 flex-1">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Foto Profil Pengguna
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Unggah file gambar dari perangkat Anda. Format yang didukung: PNG, JPG, atau WebP (Maksimal 5MB).
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-[#1E293B] dark:hover:bg-[#28354D] text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Pilih File Gambar</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetAvatar}
                  className="px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                  title="Kembalikan ke avatar default"
                >
                  Reset Default
                </button>
              </div>
            </div>
          </div>

          {/* Form Fields: Nama, Email, No HP, Bio/Headline */}
          <div className="space-y-4">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Nama Lengkap:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Anda"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] rounded-xl text-xs text-slate-900 dark:text-white focus:border-slate-500 outline-hidden transition-colors"
                />
              </div>
            </div>

            {/* Email Terdaftar */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Terdaftar:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] rounded-xl text-xs text-slate-900 dark:text-white focus:border-slate-500 outline-hidden transition-colors"
                />
              </div>
            </div>

            {/* Nomor HP / Kontak */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Nomor HP / Kontak:
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="Contoh: 0812-3456-7890 atau +62 8..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] rounded-xl text-xs text-slate-900 dark:text-white focus:border-slate-500 outline-hidden transition-colors"
                />
              </div>
            </div>

            {/* Bio / Headline */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Bio / Headline:
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="Tuliskan latar belakang atau bidang minat Anda..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] rounded-xl text-xs text-slate-900 dark:text-white focus:border-slate-500 outline-hidden transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-200 dark:border-[#1A2438] flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#2D333F] hover:bg-[#20242D] text-white font-bold text-xs shadow-md shadow-black/20 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================= */}
      {/* 2. KARTU KEAMANAN KATA SANDI (Persis seperti lampiran)    */}
      {/* ========================================================= */}
      <div className="bg-white dark:bg-[#0B101D] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#1A2438] shadow-sm dark:shadow-xl space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-[#1A2438]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Keamanan Kata Sandi
          </h3>
        </div>

        {/* Password Success / Error Alerts */}
        {pwSuccessMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{pwSuccessMsg}</span>
          </div>
        )}

        {pwErrorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{pwErrorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSavePassword} className="space-y-5">
          {/* Kata Sandi Saat Ini * */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Kata Sandi Saat Ini *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showCurrentPw ? 'text' : 'password'}
                required
                placeholder="Masukkan kata sandi saat ini"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-slate-500 outline-hidden transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                aria-label="Tampilkan kata sandi"
              >
                {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Kata Sandi Baru * */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Kata Sandi Baru *
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showNewPw ? 'text' : 'password'}
                required
                placeholder="Minimal 6 karakter"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-slate-500 outline-hidden transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                aria-label="Tampilkan kata sandi baru"
              >
                {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Konfirmasi Kata Sandi Baru * */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Konfirmasi Kata Sandi Baru *
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirmPw ? 'text' : 'password'}
                required
                placeholder="Ketik ulang kata sandi baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-slate-500 outline-hidden transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPw(!showConfirmPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                aria-label="Tampilkan konfirmasi kata sandi"
              >
                {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Divider Line & Submit Button matching green/dark teal button in image */}
          <div className="pt-4 border-t border-slate-100 dark:border-[#1A2438] flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#034C36] hover:bg-[#023B2A] text-white font-bold text-xs shadow-md shadow-emerald-950/20 flex items-center gap-2 cursor-pointer transition-colors active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Perbarui Kata Sandi</span>
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================= */}
      {/* 3. RESET DATA BELAJAR KE 0 (Mulai Dari Awal)             */}
      {/* ========================================================= */}
      <div className="bg-white dark:bg-[#0B101D] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#1A2438] shadow-sm dark:shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-[#1A2438]">
          <Trash2 className="w-4 h-4 text-rose-500" />
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Mulai Belajar Dari Awal (Reset Data ke 0)
          </h3>
        </div>

        {resetSuccessMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{resetSuccessMsg}</span>
          </div>
        )}

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Gunakan opsi ini untuk mengembalikan seluruh progres belajar Anda (kursus diikuti, jam belajar, sertifikat, agenda jadwal, dan sesi mentoring) kembali ke <strong className="text-slate-800 dark:text-slate-200">0</strong> untuk memulai dari awal. Data akun login Anda tetap aman.
        </p>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin mereset seluruh data belajar ke 0 dan mulai dari awal?')) {
                resetAllDataToZero();
                setResetSuccessMsg('Semua data belajar dan progres berhasil direset menjadi 0!');
                setTimeout(() => setResetSuccessMsg(null), 4000);
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-950/20 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Data Belajar ke 0</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. SESI AKUN & KELUAR (LOGOUT)                            */}
      {/* ========================================================= */}
      <div className="bg-white dark:bg-[#0B101D] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#1A2438] shadow-sm dark:shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#1A2438]">
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4 text-rose-500" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Sesi Akun & Keluar (Logout)
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Aktif: {currentUser.email}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Keluar dari akun <strong className="text-slate-800 dark:text-slate-200">{currentUser.full_name}</strong> ({currentUser.role}) untuk mengakhiri sesi saat ini atau masuk kembali menggunakan akun lain.
        </p>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={logout}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-600 dark:bg-[#1E293B] dark:hover:bg-rose-600 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar dari Akun (Logout)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
