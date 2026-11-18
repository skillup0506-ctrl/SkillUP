import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  Flame,
  Clock,
  Target,
  Sparkles,
  BookOpen,
  Trash2,
  X,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudyPlanner: React.FC = () => {
  const {
    schedule,
    toggleScheduleItem,
    addScheduleItem,
    deleteScheduleItem,
    courses,
    openClassroom,
    enrollments,
    progressList,
    lessons,
    currentUser
  } = useApp();

  const [weeklyGoalHours, setWeeklyGoalHours] = useState<number>(10);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New schedule form state
  const [day, setDay] = useState('Senin');
  const [time, setTime] = useState('19:00 - 20:30 WIB');
  const [courseTitle, setCourseTitle] = useState(courses[0]?.title || 'Python untuk Data Science');
  const [topic, setTopic] = useState('');

  // Calculate real metrics from completed lessons
  const userEnrollments = enrollments.filter(e => e.user_id === currentUser.id && e.status !== 'batal');
  const userEnrollmentIds = new Set(userEnrollments.map(e => e.id));
  const completedLessonsForUser = progressList.filter(
    p => userEnrollmentIds.has(p.enrollment_id) && p.is_completed
  );
  
  const completedLessonDetails = lessons.filter(l => 
    completedLessonsForUser.some(p => p.lesson_id === l.id)
  );
  const totalMinutes = completedLessonDetails.reduce((acc, l) => acc + (l.duration_minutes || 15), 0);
  const currentCompletedHours = totalMinutes > 0 ? Number((totalMinutes / 60).toFixed(1)) : 0;
  const targetPercentage = Math.min(100, Math.round((currentCompletedHours / weeklyGoalHours) * 100));
  const remainingHours = Math.max(0, Number((weeklyGoalHours - currentCompletedHours).toFixed(1)));

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    addScheduleItem({
      day,
      time,
      course_title: courseTitle,
      topic: topic.trim()
    });

    setTopic('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 pb-12 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Rencana & Jadwal Belajar
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Atur rutinitas belajarmu secara teratur untuk mencapai target karir impian.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#2D333F] hover:bg-[#20242D] text-white text-xs font-bold shadow-md shadow-black/20 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Jadwal Baru</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-600/40 text-amber-700 dark:text-amber-300 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{completedLessonsForUser.length > 0 ? `${completedLessonsForUser.length} Modul Selesai!` : 'Mulai Ritme Belajarmu!'}</span>
          </div>
        </div>
      </div>

      {/* Target Progress Card */}
      <div className="bg-white dark:bg-[#101728] rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span>Target Jam Mingguan</span>
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {currentCompletedHours} / {weeklyGoalHours} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">Jam Selesai</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {remainingHours === 0
                ? 'Target jam mingguanmu telah tercapai penuh! Kerja bagus!'
                : `Tersisa ${remainingHours} jam lagi untuk mencapai target mingguanmu.`}
            </p>
          </div>

          <div className="md:col-span-2 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Pencapaian Target</span>
              <span className="text-slate-800 dark:text-slate-200">{targetPercentage}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-[#1C263D] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-slate-600 to-[#2D333F] rounded-full transition-all duration-700"
                style={{ width: `${targetPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Items List */}
      <div className="bg-white dark:bg-[#101728] rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl space-y-4 transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1E2940]">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>Agenda Pembelajaran Pekan Ini</span>
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            {schedule.filter(s => s.completed).length} dari {schedule.length} Selesai
          </span>
        </div>

        {schedule.length === 0 ? (
          <div className="p-8 text-center space-y-3 bg-slate-50 dark:bg-[#0E1524] rounded-2xl border border-slate-200 dark:border-[#1A2336]">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Belum ada jadwal belajar yang ditambahkan (0 Agenda)
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Bangun konsistensi belajar dengan menambahkan topik dan jam belajar yang ingin Anda capai pekan ini.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-[#2D333F] hover:bg-[#20242D] text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Jadwal Pertama</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {schedule.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${
                  item.completed
                    ? 'bg-slate-100/60 dark:bg-[#0E1524]/60 border-slate-200 dark:border-[#1A2336] opacity-60'
                    : 'bg-slate-50 dark:bg-[#141C30] border-slate-200 dark:border-[#1E2940] hover:border-slate-400 dark:hover:border-slate-500 shadow-xs'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-3.5">
                  <button
                    onClick={() => toggleScheduleItem(item.id)}
                    className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                    title={item.completed ? 'Tandai belum selesai' : 'Tandai selesai'}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className={`text-sm font-bold ${item.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                      {item.topic}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{item.day}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.time}
                      </span>
                      <span>•</span>
                      <span className="text-slate-600 dark:text-slate-300">{item.course_title}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      const matched = courses.find(c => c.title === item.course_title) || courses[0];
                      openClassroom(matched.id);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Buka Kelas</span>
                  </button>

                  <button
                    onClick={() => deleteScheduleItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                    title="Hapus Agenda"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Tambah Jadwal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0F1626] rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-200 dark:border-[#22304A] shadow-2xl relative text-slate-900 dark:text-white">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">
              Tambah Jadwal Belajar Baru
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Rencanakan topik dan alokasi waktu belajarmu secara teratur.
            </p>

            <form onSubmit={handleCreateSchedule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Pilih Hari:
                </label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white font-medium"
                >
                  {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Alokasi Jam Belajar:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 19:30 - 21:00 WIB"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kursus:
                </label>
                <select
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white font-medium"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                  <option value="Bimbingan Mentor 1-on-1">Bimbingan Mentor 1-on-1</option>
                  <option value="Latihan Mandiri & Eksplorasi Code">Latihan Mandiri & Eksplorasi Code</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Topik Pembelajaran:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Latihan Soal Pandas & Quiz Evaluasi"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#1E283F]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2D333F] hover:bg-[#20242D] text-white text-xs font-bold shadow-md shadow-black/20 transition-colors cursor-pointer"
                >
                  Simpan ke Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
