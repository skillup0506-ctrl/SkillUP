import React, { useState, useMemo } from 'react';
import {
  Users,
  UserCheck,
  Shield,
  GraduationCap,
  Search,
  Filter,
  PlusCircle,
  MoreVertical,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Megaphone,
  FileCheck2,
  Calendar,
  Send,
  Award,
  BookOpen,
  ArrowRight,
  UserPlus,
  LogIn,
  ExternalLink,
  Lock,
  Mail,
  Phone,
  HelpCircle,
  ListOrdered,
  LayoutGrid
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User, UserRole, SystemBroadcast, AssignmentSubmission } from '../../types';
import confetti from 'canvas-confetti';

export const UsersView: React.FC = () => {
  const {
    currentUser,
    users,
    switchRole,
    switchUser,
    addUser,
    updateUserRole,
    toggleUserStatus,
    deleteUser,
    openLoginModal,
    openRegisterModal,
    broadcasts,
    addBroadcast,
    deleteBroadcast,
    submissions,
    gradeSubmission,
    submitAssignment,
    courses,
    openClassroom,
    openCertificate
  } = useApp();

  // Active sub-tab in Users view
  const [activeSubTab, setActiveSubTab] = useState<'directory' | 'role_features' | 'profile'>('directory');

  // View Mode: 'table' (default, ordered 1, 2, 3 as requested in screenshot) vs 'grid'
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Helper to extract 2-letter uppercase initials matching screenshot badge (AD, PE, BU, RI, etc.)
  const getInitials = (name: string) => {
    if (!name) return 'US';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Search & Filters for directory
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'aktif' | 'nonaktif'>('all');

  // Add User Modal State (Admin)
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('siswa');
  const [newUserHeadline, setNewUserHeadline] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [addFeedback, setAddFeedback] = useState<string | null>(null);

  // Broadcast Form State (Admin)
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [broadcastPriority, setBroadcastPriority] = useState<'info' | 'penting' | 'sistem'>('info');
  const [broadcastTarget, setBroadcastTarget] = useState<'all' | 'siswa' | 'instruktur'>('all');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Grading Form State (Instructor)
  const [gradingSubId, setGradingSubId] = useState<string | null>(null);
  const [gradingScore, setGradingScore] = useState<number>(85);
  const [gradingFeedback, setGradingFeedback] = useState<string>('');

  // Student Project Submission Form State (Student)
  const [studentCourseId, setStudentCourseId] = useState<number>(courses[0]?.id || 1);
  const [studentProjectTitle, setStudentProjectTitle] = useState('');
  const [studentRepoUrl, setStudentRepoUrl] = useState('');
  const [studentProjectDesc, setStudentProjectDesc] = useState('');
  const [studentSubmitSuccess, setStudentSubmitSuccess] = useState(false);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      const matchStatus = statusFilter === 'all' || (u.status || 'aktif') === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        u.full_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        (u.headline && u.headline.toLowerCase().includes(q));
      return matchRole && matchStatus && matchQuery;
    });
  }, [users, roleFilter, statusFilter, searchQuery]);

  // Statistics
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === 'admin').length;
  const instructorCount = users.filter((u) => u.role === 'instruktur').length;
  const studentCount = users.filter((u) => u.role === 'siswa').length;
  const activeCount = users.filter((u) => (u.status || 'aktif') === 'aktif').length;

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      setAddFeedback('Nama lengkap dan email wajib diisi.');
      return;
    }

    addUser({
      username: newUserEmail.split('@')[0],
      full_name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      headline: newUserHeadline.trim() || undefined,
      phone: newUserPhone.trim() || undefined,
      status: 'aktif'
    });

    setAddFeedback('Pengguna baru berhasil ditambahkan!');
    setTimeout(() => {
      setShowAddModal(false);
      setAddFeedback(null);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserHeadline('');
      setNewUserPhone('');
    }, 1000);
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastContent.trim()) return;

    addBroadcast({
      title: broadcastTitle.trim(),
      content: broadcastContent.trim(),
      priority: broadcastPriority,
      target_role: broadcastTarget
    });

    setBroadcastSuccess(true);
    setBroadcastTitle('');
    setBroadcastContent('');
    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch {
      // ignore
    }
    setTimeout(() => setBroadcastSuccess(false), 2500);
  };

  const handleGradeSubmit = (subId: string) => {
    if (!gradingFeedback.trim()) return;
    gradeSubmission(subId, Number(gradingScore), gradingFeedback.trim());
    setGradingSubId(null);
    setGradingFeedback('');
    try {
      confetti({ particleCount: 50, spread: 70 });
    } catch {
      // ignore
    }
  };

  const handleStudentSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentProjectTitle.trim() || !studentProjectDesc.trim()) return;

    const course = courses.find((c) => c.id === Number(studentCourseId));

    submitAssignment({
      course_id: Number(studentCourseId),
      course_title: course ? course.title : 'Kursus SKILLUP',
      student_id: currentUser.id,
      project_title: studentProjectTitle.trim(),
      repository_url: studentRepoUrl.trim() || undefined,
      submission_text: studentProjectDesc.trim()
    });

    setStudentSubmitSuccess(true);
    setStudentProjectTitle('');
    setStudentRepoUrl('');
    setStudentProjectDesc('');
    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch {
      // ignore
    }
    setTimeout(() => setStudentSubmitSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Banner: Role Context, Role Switching, & Quick Auth Actions */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438] p-5 sm:p-7 shadow-xs">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 ${
                  currentUser.role === 'admin'
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    : currentUser.role === 'instruktur'
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {currentUser.role === 'admin' && <Shield className="w-3.5 h-3.5" />}
                {currentUser.role === 'instruktur' && <GraduationCap className="w-3.5 h-3.5" />}
                {currentUser.role === 'siswa' && <UserCheck className="w-3.5 h-3.5" />}
                <span>
                  Login Sebagai: {currentUser.role === 'admin' ? 'Administrator' : currentUser.role === 'instruktur' ? 'Instruktur' : 'Pengguna / Siswa'}
                </span>
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                • {currentUser.full_name} ({currentUser.email})
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Manajemen Pengguna & Ekosistem Komunitas
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {currentUser.role === 'admin' &&
                'Akses Penuh Administrator: Kelola hak akses seluruh pengguna, moderasi akun, dan siarkan pengumuman sistem.'}
              {currentUser.role === 'instruktur' &&
                'Panel Instruktur: Pantau aktivitas siswa di kelas Anda, evaluasi tugas akhir, dan atur ketersediaan bimbingan.'}
              {currentUser.role === 'siswa' &&
                'Ruang Belajar & Komunitas: Jelajahi profil mentor, terhubung dengan sesama siswa, dan kumpulkan portfolio belajar.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              onClick={openLoginModal}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-[#151D2F] dark:hover:bg-[#1E2940] text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700/80 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-slate-500" />
              <span>Ganti Akun / Masuk</span>
            </button>

            <button
              onClick={openRegisterModal}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar Akun Baru</span>
            </button>
          </div>
        </div>

        {/* Quick Role Switcher Strip */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#1E2940] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Uji Coba Peran (Role Switcher Cepat):
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => switchRole('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentUser.role === 'admin'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#141C30] text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => switchRole('instruktur')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentUser.role === 'instruktur'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#141C30] text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Instruktur</span>
            </button>

            <button
              onClick={() => switchRole('siswa')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentUser.role === 'siswa'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#141C30] text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Siswa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Terdaftar</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalUsers}</div>
          <div className="text-[11px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{activeCount} akun aktif</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Siswa Belajar</span>
            <UserCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{studentCount}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            {Math.round((studentCount / totalUsers) * 100)}% dari komunitas
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Instruktur</span>
            <GraduationCap className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{instructorCount}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            Pakar & Mentor Industri
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Administrator</span>
            <Shield className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{adminCount}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            Pengelola Sistem
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#1A2438] pb-1">
        <button
          onClick={() => setActiveSubTab('directory')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'directory'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Direktori Pengguna</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-slate-200/50 dark:bg-slate-700 text-current">
            {filteredUsers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('role_features')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'role_features'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          {currentUser.role === 'admin' ? (
            <Shield className="w-4 h-4 text-rose-500" />
          ) : currentUser.role === 'instruktur' ? (
            <GraduationCap className="w-4 h-4 text-sky-500" />
          ) : (
            <Sparkles className="w-4 h-4 text-emerald-500" />
          )}
          <span>
            {currentUser.role === 'admin'
              ? 'Fitur Khusus Admin'
              : currentUser.role === 'instruktur'
              ? 'Fitur Khusus Instruktur'
              : 'Fitur Khusus Siswa'}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('profile')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'profile'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Profil & Akun Saya</span>
        </button>
      </div>

      {/* SUB-TAB 1: USER DIRECTORY & MANAGEMENT */}
      {activeSubTab === 'directory' && (
        <div className="space-y-4">
          {/* Search, Filters, and Add Button Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari pengguna berdasarkan nama, email, headline..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1E2940] rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 outline-hidden transition-colors"
              />
            </div>

            {/* Filter buttons & View Mode Switcher */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Role filter buttons */}
              <div className="flex items-center bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1E2940] p-1 rounded-2xl">
                {(['all', 'admin', 'instruktur', 'siswa'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                      roleFilter === r
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {r === 'all' ? 'Semua Role' : r}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle: Table (default 1, 2, 3...) vs Grid */}
              <div className="flex items-center bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1E2940] p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                  title="Tampilan Tabel Berurutan 1, 2, 3..."
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>Tabel (1, 2, 3, ...)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                  title="Tampilan Kartu Grid"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Kartu</span>
                </button>
              </div>

              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Tambah Pengguna</span>
                </button>
              )}
            </div>
          </div>

          {/* VIEW MODE 1: WHITE NUMBERED TABLE (1, 2, 3, ...) AS SHOWN IN USER ATTACHED SCREENSHOT */}
          {viewMode === 'table' ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden dark:bg-[#0B101D] dark:border-[#1A2438]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] dark:bg-[#111827] border-b border-slate-200 dark:border-[#1E293B] text-slate-700 dark:text-slate-200 text-xs font-bold">
                      <th className="py-3.5 px-4 text-center w-16">No</th>
                      <th className="py-3.5 px-5 min-w-[220px]">Nama Lengkap</th>
                      <th className="py-3.5 px-5 min-w-[200px]">Username & Kontak</th>
                      <th className="py-3.5 px-4 min-w-[160px]">Role & Status</th>
                      <th className="py-3.5 px-5 text-right min-w-[180px]">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#162032] text-xs">
                    {filteredUsers.map((user, index) => {
                      const isCurrentUser = user.id === currentUser.id;
                      const isUserActive = (user.status || 'aktif') === 'aktif';
                      const initials = getInitials(user.full_name);
                      const userPhone = user.phone || '0812-3456-7890';

                      return (
                        <tr
                          key={user.id}
                          className={`hover:bg-slate-50/70 dark:hover:bg-[#121929] transition-colors ${
                            isCurrentUser ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                          }`}
                        >
                          {/* 1. No Column: 1, 2, 3, 4, 5, 6, ... */}
                          <td className="py-4 px-4 text-center font-semibold text-slate-600 dark:text-slate-400 text-sm">
                            {index + 1}
                          </td>

                          {/* 2. Nama Lengkap: Circle Badge with 2 Initials (AD, PE, BU, RI, etc.) + Name + Email */}
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3.5">
                              {/* Circle Initial Badge matching reference screenshot */}
                              <div className="w-10 h-10 rounded-full bg-[#E8EEF8] dark:bg-[#1A253A] text-[#1E3A8A] dark:text-[#93C5FD] font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200/70 dark:border-slate-700 shadow-xs">
                                {initials}
                              </div>

                              <div>
                                <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5 leading-snug">
                                  <span>{user.full_name}</span>
                                  {isCurrentUser && (
                                    <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/70 px-1.5 py-0.2 rounded-md">
                                      Kamu
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-slate-400 dark:text-slate-400 font-normal mt-0.5">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* 3. Username & Kontak */}
                          <td className="py-4 px-5">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                              @{user.username || user.email.split('@')[0]}
                            </div>
                            <div className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">
                              {userPhone}
                            </div>
                          </td>

                          {/* 4. Role & Status Badges */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                  user.role === 'admin'
                                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
                                    : user.role === 'instruktur'
                                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400 border border-sky-200 dark:border-sky-900/50'
                                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50'
                                }`}
                              >
                                {user.role}
                              </span>

                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                  isUserActive
                                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50'
                                    : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/50'
                                }`}
                              >
                                {isUserActive ? 'Aktif' : 'Nonaktif'}
                              </span>
                            </div>
                          </td>

                          {/* 5. Aksi: Masuk Sebagai Ini + Admin Controls */}
                          <td className="py-4 px-5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => switchUser(user.id)}
                                disabled={isCurrentUser}
                                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                                  isCurrentUser
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                                    : 'bg-slate-900 hover:bg-slate-800 dark:bg-[#1E293B] dark:hover:bg-[#28354D] text-white shadow-xs'
                                }`}
                                title="Masuk sebagai akun ini untuk mencoba tampilannya"
                              >
                                <LogIn className="w-3.5 h-3.5" />
                                <span>{isCurrentUser ? 'Aktif' : 'Masuk'}</span>
                              </button>

                              {currentUser.role === 'admin' && (
                                <div className="flex items-center gap-1 ml-1">
                                  <select
                                    value={user.role}
                                    onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                                    className="text-[11px] font-bold bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 outline-hidden"
                                    title="Ubah peran pengguna ini"
                                  >
                                    <option value="siswa">Siswa</option>
                                    <option value="instruktur">Instruktur</option>
                                    <option value="admin">Admin</option>
                                  </select>

                                  <button
                                    onClick={() => toggleUserStatus(user.id)}
                                    className={`p-1.5 rounded-lg border transition-colors ${
                                      isUserActive
                                        ? 'border-slate-200 text-slate-400 hover:text-rose-500'
                                        : 'border-emerald-300 text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                                    }`}
                                    title={isUserActive ? 'Nonaktifkan pengguna' : 'Aktifkan pengguna'}
                                  >
                                    {isUserActive ? (
                                      <XCircle className="w-3.5 h-3.5" />
                                    ) : (
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                    )}
                                  </button>

                                  {!isCurrentUser && user.id !== 1 && (
                                    <button
                                      onClick={() => {
                                        if (confirm(`Yakin ingin menghapus ${user.full_name}?`)) {
                                          deleteUser(user.id);
                                        }
                                      }}
                                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                                      title="Hapus pengguna"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* VIEW MODE 2: CARDS GRID */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredUsers.map((user) => {
              const isCurrentUser = user.id === currentUser.id;
              const isUserActive = (user.status || 'aktif') === 'aktif';

              return (
                <div
                  key={user.id}
                  className={`p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0B101D] border transition-all flex flex-col justify-between ${
                    isCurrentUser
                      ? 'border-indigo-500/60 dark:border-indigo-500/40 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-[#1A2438] hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Top Row: Avatar + Role Badge + Status */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            user.avatar ||
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                          }
                          alt={user.full_name}
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-slate-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                              {user.full_name}
                            </h3>
                            {isCurrentUser && (
                              <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.2 rounded">
                                Kamu
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[170px]">
                            {user.email}
                          </div>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                          isUserActive
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {isUserActive ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </div>

                    {/* Headline / Bio */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 min-h-[32px] mb-3">
                      {user.headline || user.bio || 'Pengguna aktif di platform pembelajaran SKILLUP.'}
                    </p>

                    {/* Meta info tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[10px]">
                      <span
                        className={`font-black uppercase px-2 py-0.5 rounded-md ${
                          user.role === 'admin'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                            : user.role === 'instruktur'
                            ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                        }`}
                      >
                        {user.role}
                      </span>
                      {user.joined_at && (
                        <span className="text-slate-400 bg-slate-100 dark:bg-[#141C30] px-2 py-0.5 rounded-md">
                          Bergabung: {user.joined_at}
                        </span>
                      )}
                      {user.badges && user.badges.length > 0 && (
                        <span className="text-amber-500 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-md">
                          ★ {user.badges[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Controls for User */}
                  <div className="pt-3 border-t border-slate-100 dark:border-[#1E2940] flex items-center justify-between gap-2">
                    {/* Fast Login / Switch to this user */}
                    <button
                      onClick={() => switchUser(user.id)}
                      disabled={isCurrentUser}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        isCurrentUser
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#141C30] dark:hover:bg-[#1C2640] text-slate-800 dark:text-white'
                      }`}
                      title="Masuk sebagai akun ini untuk mencoba tampilannya"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>{isCurrentUser ? 'Sedang Digunakan' : 'Masuk Sebagai Ini'}</span>
                    </button>

                    {/* Admin Actions Dropdown / Direct Controls */}
                    {currentUser.role === 'admin' && (
                      <div className="flex items-center gap-1">
                        {/* Change role selector */}
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                          className="text-[11px] font-bold bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 outline-hidden"
                          title="Ubah peran pengguna ini"
                        >
                          <option value="siswa">Siswa</option>
                          <option value="instruktur">Instruktur</option>
                          <option value="admin">Admin</option>
                        </select>

                        {/* Toggle active / suspend */}
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isUserActive
                              ? 'border-slate-200 text-slate-400 hover:text-rose-500'
                              : 'border-emerald-300 text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                          }`}
                          title={isUserActive ? 'Nonaktifkan pengguna' : 'Aktifkan pengguna'}
                        >
                          {isUserActive ? (
                            <XCircle className="w-3.5 h-3.5" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Delete button (cannot delete self or primary admin) */}
                        {!isCurrentUser && user.id !== 1 && (
                          <button
                            onClick={() => {
                              if (confirm(`Yakin ingin menghapus ${user.full_name}?`)) {
                                deleteUser(user.id);
                              }
                            }}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                            title="Hapus pengguna"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-[#0B101D] rounded-3xl border border-slate-200 dark:border-[#1A2438] p-8">
              <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tidak ada pengguna ditemukan</h3>
              <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter role.</p>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: ROLE SPECIFIC FEATURES */}
      {activeSubTab === 'role_features' && (
        <div className="space-y-6">
          {/* ======================================================== */}
          {/* ROLE: ADMIN ONLY FEATURES */}
          {/* ======================================================== */}
          {currentUser.role === 'admin' && (
            <div className="space-y-6">
              {/* Feature 1: Broadcast Announcements Center */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      Siarkan Pengumuman Sistem Global (Broadcast)
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Kirim pesan penting atau pembaruan platform ke seluruh siswa dan instruktur.
                    </p>
                  </div>
                </div>

                {broadcastSuccess && (
                  <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pengumuman berhasil disiarkan ke seluruh platform!</span>
                  </div>
                )}

                <form onSubmit={handleBroadcastSubmit} className="space-y-3.5 max-w-2xl">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Judul Pengumuman
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Pembaruan Kurikulum 2026 atau Maintenance Server"
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white focus:border-rose-500 outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Prioritas Pengumuman
                      </label>
                      <select
                        value={broadcastPriority}
                        onChange={(e) => setBroadcastPriority(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white focus:border-rose-500 outline-hidden"
                      >
                        <option value="info">Info Umum</option>
                        <option value="penting">Penting / Urgent</option>
                        <option value="sistem">Pembaruan Sistem</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Target Audiens
                      </label>
                      <select
                        value={broadcastTarget}
                        onChange={(e) => setBroadcastTarget(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white focus:border-rose-500 outline-hidden"
                      >
                        <option value="all">Semua Pengguna (Siswa & Instruktur)</option>
                        <option value="siswa">Hanya Siswa</option>
                        <option value="instruktur">Hanya Instruktur</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Isi Pesan Pengumuman
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tuliskan detail pengumuman resmi platform di sini..."
                      value={broadcastContent}
                      onChange={(e) => setBroadcastContent(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white focus:border-rose-500 outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Siarkan Pengumuman Sekarang</span>
                  </button>
                </form>

                {/* List of active broadcasts */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-[#1E2940]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Pengumuman Yang Sedang Aktif ({broadcasts.length})
                  </h3>
                  <div className="space-y-2.5">
                    {broadcasts.map((bc) => (
                      <div
                        key={bc.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                                bc.priority === 'penting'
                                  ? 'bg-rose-500 text-white'
                                  : bc.priority === 'sistem'
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-indigo-500 text-white'
                              }`}
                            >
                              {bc.priority}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{bc.title}</h4>
                            <span className="text-[10px] text-slate-400">• {bc.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{bc.content}</p>
                        </div>
                        <button
                          onClick={() => deleteBroadcast(bc.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title="Hapus pengumuman"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feature 2: Platform Security & Policy Controls */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      Kontrol Keamanan & Izin Platform SKILLUP
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Pengaturan hak akses, proteksi pendaftaran instruktur baru, dan kuota sertifikasi.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44]">
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                      Pendaftaran Mandiri Instruktur
                    </div>
                    <p className="text-[11px] text-slate-400 mb-3">
                      Izinkan pengguna mendaftar langsung sebagai Instruktur tanpa verifikasi manual.
                    </p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                      Aktif (Mode Terbuka)
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44]">
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                      Penerbitan Sertifikat Otomatis
                    </div>
                    <p className="text-[11px] text-slate-400 mb-3">
                      Sertifikat resmi terbit otomatis saat siswa lulus seluruh modul dan quiz (&gt;75%).
                    </p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                      Aktif dengan Validasi QR
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44]">
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                      Sandbox Code Playground
                    </div>
                    <p className="text-[11px] text-slate-400 mb-3">
                      Isolasi eksekusi kode Python dan query MySQL di browser siswa secara real-time.
                    </p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                      Normal Uptime 99.9%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ROLE: INSTRUKTUR ONLY FEATURES */}
          {/* ======================================================== */}
          {currentUser.role === 'instruktur' && (
            <div className="space-y-6">
              {/* Feature 1: Assignment Reviews & Grading */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438] shadow-xs">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                        Review & Penilaian Tugas Praktikum Siswa
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Evaluasi kode proyek akhir siswa, berikan nilai kelulusan, dan feedback konstruktif.
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-3 py-1 rounded-xl border border-sky-200 dark:border-sky-900">
                    {submissions.filter((s) => s.status === 'pending').length} Menunggu Review
                  </span>
                </div>

                {/* Submissions List */}
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] transition-all"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              sub.student_avatar ||
                              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                            }
                            alt={sub.student_name}
                            className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-300 dark:ring-slate-700"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">
                              {sub.student_name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Kursus: <span className="font-semibold text-slate-300">{sub.course_title}</span> • {sub.submitted_at}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                            sub.status === 'graded'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {sub.status === 'graded' ? `Dinilai: ${sub.score}/100` : 'Menunggu Dinilai'}
                        </span>
                      </div>

                      <div className="bg-white dark:bg-[#0B101D] p-3 rounded-xl border border-slate-200 dark:border-[#1A2438] mt-2 mb-3">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                          {sub.project_title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                          {sub.submission_text}
                        </p>
                        {sub.repository_url && (
                          <a
                            href={sub.repository_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-400 hover:underline"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Buka Repositori Kode ({sub.repository_url})</span>
                          </a>
                        )}
                      </div>

                      {/* If already graded, show grade and feedback */}
                      {sub.status === 'graded' && sub.feedback && (
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                          <div>
                            <span className="font-bold">Feedback Instruktur: </span>
                            <span>{sub.feedback}</span>
                            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
                              Oleh {sub.graded_by} ({sub.graded_at})
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Grading Input Form */}
                      {gradingSubId === sub.id ? (
                        <div className="mt-3 p-3.5 rounded-xl bg-sky-50/50 dark:bg-[#152035] border border-sky-200 dark:border-sky-900 space-y-3">
                          <div className="flex items-center gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                                Berikan Nilai (0 - 100):
                              </label>
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={gradingScore}
                                onChange={(e) => setGradingScore(Number(e.target.value))}
                                className="w-24 px-3 py-1.5 bg-white dark:bg-[#0B101D] border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white"
                              />
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-4">
                              Nilai &gt;= 75 memenuhi syarat sertifikat kelulusan.
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                              Komentar & Saran Feedback:
                            </label>
                            <textarea
                              rows={2}
                              placeholder="Tulis saran perbaikan atau pujian mengenai implementasi kodenya..."
                              value={gradingFeedback}
                              onChange={(e) => setGradingFeedback(e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-[#0B101D] border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white outline-hidden"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleGradeSubmit(sub.id)}
                              className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs cursor-pointer"
                            >
                              Simpan Penilaian
                            </button>
                            <button
                              onClick={() => setGradingSubId(null)}
                              className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        sub.status === 'pending' && (
                          <div className="mt-3 flex justify-end">
                            <button
                              onClick={() => {
                                setGradingSubId(sub.id);
                                setGradingFeedback('Kode tersusun rapi, fungsionalitas utama berjalan sangat baik.');
                              }}
                              className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Beri Penilaian & Feedback</span>
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature 2: Mentoring Availability & Office Hours */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      Jadwal Bimbingan Live 1-on-1 (Office Hours)
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Siswa dapat memesan sesi konsultasi karir dan review kode sesuai ketersediaan Anda.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44]">
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                      Selasa & Kamis
                    </div>
                    <div className="text-[11px] text-slate-400">19:30 - 21:00 WIB</div>
                    <span className="mt-3 inline-block text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                      2 Siswa Terdaftar
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44]">
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                      Sabtu Pagi
                    </div>
                    <div className="text-[11px] text-slate-400">10:00 - 12:00 WIB</div>
                    <span className="mt-3 inline-block text-[10px] font-bold text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded">
                      1 Slot Tersedia
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] flex flex-col justify-center items-center text-center">
                    <PlusCircle className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Tambah Slot Jadwal Baru
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ROLE: SISWA / PENGGUNA LAINNYA ONLY FEATURES */}
          {/* ======================================================== */}
          {currentUser.role === 'siswa' && (
            <div className="space-y-6">
              {/* Feature 1: Submit Project / Assignment to Instructor */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      Kirim Tugas & Portofolio Proyek Kursus
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Kirimkan hasil latihan atau link GitHub kode Anda untuk direview dan dinilai langsung oleh mentor instruktur.
                    </p>
                  </div>
                </div>

                {studentSubmitSuccess && (
                  <div className="mb-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Tugas berhasil dikirim! Instruktur akan segera memeriksa dan memberikan nilai.</span>
                  </div>
                )}

                <form onSubmit={handleStudentSubmitProject} className="space-y-3.5 max-w-2xl">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Pilih Kursus
                    </label>
                    <select
                      value={studentCourseId}
                      onChange={(e) => setStudentCourseId(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 outline-hidden"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title} ({c.instructor_name})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Judul Proyek / Tugas
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Implementasi Query Multi-Join atau Data Cleaning Penjualan"
                      value={studentProjectTitle}
                      onChange={(e) => setStudentProjectTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Link Repositori GitHub / Demo (Opsional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/project-repo"
                      value={studentRepoUrl}
                      onChange={(e) => setStudentRepoUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Penjelasan & Catatan Kode
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Jelaskan ringkasan apa yang telah Anda selesaikan, tantangan yang dihadapi, serta hasil output..."
                      value={studentProjectDesc}
                      onChange={(e) => setStudentProjectDesc(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Tugas ke Instruktur</span>
                  </button>
                </form>
              </div>

              {/* Feature 2: My Learning Badges & Certificates Ready */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      Pencapaian Lencana & Kelulusan Sertifikat
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Lencana yang Anda peroleh melalui ketekunan belajar dan kuis di SKILLUP.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                    <div className="text-2xl mb-1">🔥</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Streak Belajar 12 Hari
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Konsisten membuka materi setiap hari tanpa terputus.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Python Playground Master
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Berhasil menjalankan 15+ script interaktif di code editor.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                    <div className="text-2xl mb-1">🎓</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Sertifikat Terverifikasi
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 mb-2">
                      Siap diunduh ber-QR Code resmi.
                    </p>
                    <button
                      onClick={() => openCertificate(courses[0])}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Lihat Sertifikat</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: USER OWN PROFILE */}
      {activeSubTab === 'profile' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-[#1A2438] max-w-3xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-200 dark:border-[#1E2940]">
            <img
              src={
                currentUser.avatar ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
              }
              alt={currentUser.full_name}
              className="w-20 h-20 rounded-3xl object-cover ring-4 ring-slate-200 dark:ring-slate-700"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {currentUser.full_name}
                </h2>
                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    currentUser.role === 'admin'
                      ? 'bg-rose-500 text-white'
                      : currentUser.role === 'instruktur'
                      ? 'bg-sky-500 text-white'
                      : 'bg-emerald-500 text-white'
                  }`}
                >
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-400">@{currentUser.username} • {currentUser.email}</p>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300 pt-1">
                {currentUser.headline || 'Belum ada headline profil.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44]">
              <span className="text-slate-400 block mb-1 font-semibold">Status Akun:</span>
              <span className="font-bold text-emerald-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Terverifikasi & Aktif</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44]">
              <span className="text-slate-400 block mb-1 font-semibold">Tanggal Terdaftar:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {currentUser.joined_at || 'Januari 2026'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44]">
              <span className="text-slate-400 block mb-1 font-semibold">Nomor Telepon:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {currentUser.phone || '+62 812-3456-7890'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44]">
              <span className="text-slate-400 block mb-1 font-semibold">Departemen / Bidang:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {currentUser.department || 'Teknologi Informasi'}
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-2 font-bold uppercase tracking-wider">
              Tentang Saya (Bio):
            </span>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentUser.bio || 'Tidak ada deskripsi bio.'}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Tambah Pengguna Baru (Khusus Admin) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-[#0E1424] text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-[#1E2942] shadow-2xl p-6">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">
              Tambah Pengguna Baru
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Buat akun pengguna baru dengan menetapkan role (Admin, Instruktur, Siswa).
            </p>

            {addFeedback && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{addFeedback}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Pengguna"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="pengguna@skillup.id"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Peran / Role Pengguna *
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white outline-hidden focus:border-indigo-500"
                >
                  <option value="siswa">Siswa (Pelajar Kursus)</option>
                  <option value="instruktur">Instruktur (Pengajar & Mentor)</option>
                  <option value="admin">Administrator (Super User)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Headline / Jabatan
                </label>
                <input
                  type="text"
                  placeholder="Misal: Data Analyst / Frontend Developer"
                  value={newUserHeadline}
                  onChange={(e) => setNewUserHeadline(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nomor HP
                </label>
                <input
                  type="text"
                  placeholder="+62 8..."
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#12192B] border border-slate-200 dark:border-[#202C44] rounded-xl text-xs text-slate-900 dark:text-white outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white cursor-pointer"
                >
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
