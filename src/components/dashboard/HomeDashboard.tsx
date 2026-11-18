import React from 'react';
import { ArrowRight, Award, Users, Shield, GraduationCap, UserCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HeroBanner } from './HeroBanner';
import { CategoryFilter } from './CategoryFilter';
import { CourseCard } from './CourseCard';
import { ProgressWidget } from './ProgressWidget';

export const HomeDashboard: React.FC = () => {
  const { courses, setActiveTab, openCertificate, selectedCategory, currentUser, users, submissions, getCourseProgress, isEnrolled, completedQuizzes } = useApp();

  // Find if user has unlocked any certificate
  const completedCourse = courses.find((c) => {
    const prog = getCourseProgress(c.id);
    return isEnrolled(c.id) && (prog.isCompleted || (prog.percentage === 100 && completedQuizzes[c.id]?.passed));
  });

  // Filter recommendations based on selected category (if any) or show top 4 from mockup
  const recommendedCourses = courses
    .filter((c) => selectedCategory === 'Semua' || c.category === selectedCategory)
    .slice(0, 4);

  const pendingSubmissionsCount = submissions.filter((s) => s.status === 'pending').length;

  return (
    <div className="space-y-7 pb-12 transition-colors">
      {/* 1. Hero Banner matching showcase */}
      <HeroBanner />

      {/* Role-Specific Banner Alert */}
      {currentUser.role === 'admin' ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-slate-900 dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase text-rose-600 dark:text-rose-400">
                Mode Administrator Aktif
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300">
                Anda memiliki akses penuh mengelola {users.length} pengguna, moderasi kursus, dan broadcast pengumuman.
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('pengguna')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Buka Fitur Pengguna</span>
          </button>
        </div>
      ) : currentUser.role === 'instruktur' ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-slate-900 dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase text-sky-600 dark:text-sky-400">
                Mode Instruktur Terverifikasi
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300">
                {pendingSubmissionsCount > 0
                  ? `Terdapat ${pendingSubmissionsCount} tugas praktikum siswa yang menunggu penilaian, atau kelola materi kursus Anda.`
                  : 'Kelola kursus, publikasikan materi kurikulum, dan pantau statistik belajar siswa Anda.'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('instructor_panel')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Buka Panel Instruktur</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-slate-900 dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400">
                Selamat Datang, {currentUser.full_name}!
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300">
                Lanjutkan modul belajar interaktif, kerjakan kuis kelulusan, atau jadwalkan bimbingan bersama mentor.
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('komunitas')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Bimbingan Mentor</span>
          </button>
        </div>
      )}

      {/* 2. Rekomendasi Untukmu Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Rekomendasi Untukmu
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Dipilih berdasarkan minat belajar dan tren industri teknologi terkini
            </p>
          </div>

          <button
            onClick={() => setActiveTab('kursus')}
            className="text-xs font-bold text-slate-800 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white flex items-center gap-1 group transition-colors cursor-pointer"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <CategoryFilter />

        {/* Courses Grid:
            - Python untuk Data Science
            - MySQL Database Fundamental
            - Web Development with React
            - Data Analysis with Python
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-1">
          {recommendedCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>

      {/* 3. Bottom Grid: Progress Belajarmu Widget & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Progress Belajarmu */}
        <div className="lg:col-span-8">
          <ProgressWidget />
        </div>

        {/* Quick Certificate & Mentoring Spotlight */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-5">
          {/* Certificate Quick Card */}
          <div className="bg-white dark:bg-[#101728] rounded-3xl p-6 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl flex flex-col justify-between transition-colors">
            {completedCourse ? (
              <>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <Award className="w-5 h-5 fill-white" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                    Klaim Sertifikat Kelulusanmu!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Selamat! Kursus <strong className="text-slate-900 dark:text-white">{completedCourse.title}</strong> siap diterbitkan sertifikat resminya atas nama Anda!
                  </p>
                </div>

                <button
                  onClick={() => openCertificate(completedCourse)}
                  className="mt-4 w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-4 h-4 fill-white" />
                  <span>Lihat Sertifikat Saya</span>
                </button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-[#1C273D] text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                    Raih Sertifikat Kompetensimu
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Selesaikan 100% modul pelajaran dan raih nilai kuis minimal 75% untuk mendapatkan kredensial resmi terverifikasi.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('kursus')}
                  className="mt-4 w-full py-2.5 px-3 rounded-xl bg-[#2D333F] hover:bg-[#20242D] text-white font-bold text-xs shadow-md shadow-black/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Mulai Belajar Kursus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Mentoring 1-on-1 Quick Card */}
          <div className="bg-white dark:bg-[#101728] rounded-3xl p-6 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl flex flex-col justify-between transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#2D333F] text-white flex items-center justify-center shadow-md shadow-black/20">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                Butuh Bimbingan Mentor?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mentor <strong className="text-slate-900 dark:text-white">Budi Santoso</strong> dan praktisi lainnya membuka slot konsultasi pekan ini.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('komunitas')}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Jadwalkan Sesi Mentor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
