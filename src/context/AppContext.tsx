import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  User,
  UserRole,
  Course,
  Lesson,
  Enrollment,
  LessonProgress,
  Mentor,
  DiscussionMessage,
  StudyScheduleItem,
  NotificationItem,
  Quiz,
  SystemBroadcast,
  AssignmentSubmission
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_LESSONS,
  INITIAL_QUIZZES,
  INITIAL_MENTORS,
  INITIAL_DISCUSSIONS,
  INITIAL_SCHEDULE,
  INITIAL_NOTIFICATIONS,
  INITIAL_BROADCASTS,
  INITIAL_SUBMISSIONS
} from '../data/mockData';

interface MentorBooking {
  id: string;
  mentorId: number;
  mentorName: string;
  date: string;
  timeSlot: string;
  notes: string;
  status: 'confirmed' | 'completed';
}

interface AppContextType {
  currentUser: User;
  users: User[];
  switchRole: (role: UserRole) => void;
  switchUser: (userId: number) => void;
  login: (email: string, password?: string) => { success: boolean; message: string; user?: User };
  register: (newUser: { full_name: string; email: string; role: UserRole; headline?: string; password?: string }) => { success: boolean; message: string; user?: User };
  logout: () => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUserRole: (userId: number, newRole: UserRole) => void;
  toggleUserStatus: (userId: number) => void;
  deleteUser: (userId: number) => { success: boolean; message: string };
  updateUserProfile: (userId: number, updates: Partial<User>) => void;
  showAuthModal: boolean;
  setShowAuthModal: (open: boolean) => void;
  isLoggedOut: boolean;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;

  // Broadcasts (Admin feature) & Submissions (Instructor feature)
  broadcasts: SystemBroadcast[];
  addBroadcast: (broadcast: Omit<SystemBroadcast, 'id' | 'author_name' | 'date'>) => void;
  deleteBroadcast: (id: string) => void;
  submissions: AssignmentSubmission[];
  gradeSubmission: (id: string, score: number, feedback: string) => void;
  submitAssignment: (sub: Omit<AssignmentSubmission, 'id' | 'submitted_at' | 'status' | 'student_name' | 'student_avatar'>) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Courses
  courses: Course[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  createCourse: (newCourse: Omit<Course, 'id' | 'instructor_name' | 'instructor_avatar' | 'review_count' | 'total_lessons'>) => number;
  deleteCourse: (id: number) => void;
  
  // Classroom
  activeCourseId: number | null;
  activeLessonId: number | null;
  openClassroom: (courseId: number, lessonId?: number) => void;
  closeClassroom: () => void;
  setActiveLessonId: (lessonId: number) => void;
  
  // Lessons
  lessons: Lesson[];
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  
  // Enrollments & Progress
  enrollments: Enrollment[];
  enrollCourse: (courseId: number) => { success: boolean; message: string };
  isEnrolled: (courseId: number) => boolean;
  progressList: LessonProgress[];
  markLesson: (courseId: number, lessonId: number, completed: boolean) => void;
  getCourseProgress: (courseId: number) => { total: number; done: number; percentage: number; isCompleted: boolean };
  
  // Bookmarks
  savedCourses: number[];
  toggleBookmark: (courseId: number) => void;
  
  // Quizzes
  quizzes: Record<number, Quiz>;
  completedQuizzes: Record<number, { score: number; passed: boolean }>;
  submitQuizScore: (courseId: number, score: number, passed: boolean) => void;
  
  // Mentors & Community
  mentors: Mentor[];
  mentorBookings: MentorBooking[];
  bookMentorSession: (mentorId: number, date: string, timeSlot: string, notes: string) => void;
  discussions: DiscussionMessage[];
  addDiscussion: (courseId: number, message: string) => void;
  
  // Schedule
  schedule: StudyScheduleItem[];
  toggleScheduleItem: (id: string) => void;
  addScheduleItem: (item: { day: string; time: string; course_title: string; topic: string }) => void;
  deleteScheduleItem: (id: string) => void;
  resetAllDataToZero: () => void;
  
  // Certificate
  showCertificateModal: boolean;
  certificateCourse: Course | null;
  openCertificate: (course: Course) => void;
  closeCertificate: () => void;
  
  // Notifications & UI modals
  notifications: NotificationItem[];
  unreadNotifCount: number;
  markAllNotificationsAsRead: () => void;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (open: boolean) => void;
  showMobileSimulator: boolean;
  setShowMobileSimulator: (open: boolean) => void;
  showQrModal: boolean;
  setShowQrModal: (open: boolean) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  isSidebarCollapsed: boolean;
  toggleSidebarCollapse: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: dark by default as requested in screenshot
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('skillup_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('skillup_theme', next);
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Flexible resizable sidebar width state with persistence
  const [sidebarWidth, setSidebarWidthState] = useState<number>(76);

  const setSidebarWidth = (w: number) => {
    setSidebarWidthState(w);
  };

  const isSidebarCollapsed = true;

  const toggleSidebarCollapse = () => {
    // Fixed compact sidebar
  };

  // Users state with persistence
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('skillup_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse saved users', e);
      }
    }
    return INITIAL_USERS;
  });

  useEffect(() => {
    localStorage.setItem('skillup_users', JSON.stringify(users));
  }, [users]);

  // Current user ID with persistence
  const [currentUserId, setCurrentUserId] = useState<number>(() => {
    const saved = localStorage.getItem('skillup_active_user_id');
    if (saved) {
      const parsed = Number(saved);
      if (!isNaN(parsed)) return parsed;
    }
    return 1; // Default to Administrator
  });

  useEffect(() => {
    localStorage.setItem('skillup_active_user_id', String(currentUserId));
  }, [currentUserId]);

  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const currentUser = useMemo(() => {
    return users.find(u => u.id === currentUserId) || users[0] || INITIAL_USERS[0];
  }, [users, currentUserId]);

  // Auth modal state (persists across refresh if user logged out)
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem('skillup_logged_out') === 'true';
  });
  const [showAuthModal, setShowAuthModalState] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem('skillup_logged_out') === 'true';
  });
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const setShowAuthModal = (open: boolean) => {
    setShowAuthModalState(open);
    if (!open && typeof window !== 'undefined') {
      localStorage.removeItem('skillup_logged_out');
      setIsLoggedOut(false);
    }
  };

  const openLoginModal = () => {
    setAuthModalMode('login');
    setShowAuthModalState(true);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setShowAuthModalState(true);
  };

  const switchUser = (userId: number) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUserId(userId);
      localStorage.setItem('skillup_role', found.role);
      localStorage.removeItem('skillup_logged_out');
      setIsLoggedOut(false);
    }
  };

  const switchRole = (role: UserRole) => {
    localStorage.removeItem('skillup_logged_out');
    setIsLoggedOut(false);
    if (currentUser.role === role) return;
    const targetUser = users.find(u => u.role === role);
    if (targetUser) {
      setCurrentUserId(targetUser.id);
      localStorage.setItem('skillup_role', targetUser.role);
    } else {
      updateUserRole(currentUser.id, role);
      localStorage.setItem('skillup_role', role);
    }
  };

  const login = (email: string, password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return { success: false, message: 'Email tidak ditemukan. Silakan periksa kembali atau daftar akun baru.' };
    }
    if (user.status === 'nonaktif') {
      return { success: false, message: 'Akun ini dinonaktifkan oleh Administrator. Hubungi bantuan teknis SKILLUP.' };
    }
    setCurrentUserId(user.id);
    localStorage.setItem('skillup_role', user.role);
    localStorage.removeItem('skillup_logged_out');
    setIsLoggedOut(false);
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, last_login: 'Hari ini, baru saja' } : u));
    return { success: true, message: `Selamat datang kembali, ${user.full_name}!`, user };
  };

  const register = (newUserData: { full_name: string; email: string; role: UserRole; headline?: string; password?: string }) => {
    const cleanEmail = newUserData.email.trim().toLowerCase();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain atau langsung masuk.' };
    }
    const newId = Date.now();
    const username = cleanEmail.split('@')[0] || `user_${newId}`;
    const defaultAvatar = newUserData.role === 'instruktur'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

    const createdUser: User = {
      id: newId,
      username,
      full_name: newUserData.full_name.trim(),
      email: cleanEmail,
      role: newUserData.role,
      avatar: defaultAvatar,
      headline: newUserData.headline?.trim() || (newUserData.role === 'instruktur' ? 'Instruktur Teknologi' : 'Pelajar Mandiri'),
      bio: newUserData.role === 'instruktur' ? 'Berpengalaman di industri dan siap membimbing talenta digital.' : 'Sedang fokus belajar di platform SKILLUP.',
      status: 'aktif',
      joined_at: new Date().toISOString().split('T')[0],
      last_login: 'Hari ini, baru saja',
      password: newUserData.password || 'password123',
      badges: newUserData.role === 'instruktur' ? ['Instruktur Baru'] : ['Siswa Baru']
    };

    setUsers(prev => [createdUser, ...prev]);
    setCurrentUserId(newId);
    localStorage.setItem('skillup_role', createdUser.role);
    localStorage.removeItem('skillup_logged_out');
    setIsLoggedOut(false);
    return { success: true, message: `Akun berhasil didaftarkan! Selamat datang di SKILLUP, ${createdUser.full_name}.`, user: createdUser };
  };

  const logout = () => {
    // Switch to default student view in background, reset tab to beranda, and keep Masuk ke SKILLUP modal open
    const defaultStudent = users.find(u => u.role === 'siswa') || users[0];
    if (defaultStudent) {
      setCurrentUserId(defaultStudent.id);
      localStorage.setItem('skillup_role', defaultStudent.role);
    }
    localStorage.setItem('skillup_logged_out', 'true');
    setIsLoggedOut(true);
    setActiveCourseId(null);
    setActiveLessonId(null);
    setActiveTab('beranda');
    setAuthModalMode('login');
    setShowAuthModalState(true);
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newId = Date.now();
    const newUser: User = {
      ...userData,
      id: newId,
      status: userData.status || 'aktif',
      joined_at: userData.joined_at || new Date().toISOString().split('T')[0],
      avatar: userData.avatar || (userData.role === 'instruktur' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80')
    };
    setUsers(prev => [newUser, ...prev]);
  };

  const updateUserRole = (userId: number, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'nonaktif' ? 'aktif' : 'nonaktif';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const deleteUser = (userId: number) => {
    if (userId === currentUser.id) {
      return { success: false, message: 'Tidak dapat menghapus akun yang sedang aktif digunakan.' };
    }
    if (userId === 1) {
      return { success: false, message: 'Akun Super Admin utama tidak dapat dihapus demi proteksi sistem.' };
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
    return { success: true, message: 'Pengguna berhasil dihapus dari sistem.' };
  };

  const updateUserProfile = (userId: number, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
  };

  // One-time automatic cleanup to fulfill user instruction: reset pre-entered data to 0
  if (typeof window !== 'undefined' && localStorage.getItem('skillup_clean_zero_v1') !== 'true') {
    localStorage.removeItem('skillup_enrollments');
    localStorage.removeItem('skillup_progress');
    localStorage.removeItem('skillup_saved');
    localStorage.removeItem('skillup_mentor_bookings');
    localStorage.removeItem('skillup_submissions');
    localStorage.removeItem('skillup_broadcasts');
    localStorage.removeItem('skillup_schedule');
    localStorage.removeItem('skillup_quizzes');
    localStorage.setItem('skillup_clean_zero_v1', 'true');
  }

  // Broadcasts state (Starts at 0, updates dynamically when admin creates announcement)
  const [broadcasts, setBroadcasts] = useState<SystemBroadcast[]>(() => {
    const saved = localStorage.getItem('skillup_broadcasts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('skillup_broadcasts', JSON.stringify(broadcasts));
  }, [broadcasts]);

  const addBroadcast = (broadcast: Omit<SystemBroadcast, 'id' | 'author_name' | 'date'>) => {
    const newBroadcast: SystemBroadcast = {
      ...broadcast,
      id: `bc-${Date.now()}`,
      author_name: currentUser.full_name,
      date: 'Baru saja'
    };
    setBroadcasts(prev => [newBroadcast, ...prev]);
  };

  const deleteBroadcast = (id: string) => {
    setBroadcasts(prev => prev.filter(b => b.id !== id));
  };

  // Submissions state (Starts at 0, updates dynamically when student submits assignment)
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(() => {
    const saved = localStorage.getItem('skillup_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('skillup_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const gradeSubmission = (id: string, score: number, feedback: string) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          status: 'graded',
          score,
          feedback,
          graded_by: currentUser.full_name,
          graded_at: 'Hari ini, baru saja'
        };
      }
      return sub;
    }));
  };

  const submitAssignment = (sub: Omit<AssignmentSubmission, 'id' | 'submitted_at' | 'status' | 'student_name' | 'student_avatar'>) => {
    const newSub: AssignmentSubmission = {
      ...sub,
      id: `sub-${Date.now()}`,
      student_id: currentUser.id,
      student_name: currentUser.full_name,
      student_avatar: currentUser.avatar,
      submitted_at: 'Baru saja',
      status: 'pending'
    };
    setSubmissions(prev => [newSub, ...prev]);
  };

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>('beranda');

  useEffect(() => {
    if (activeTab === 'pengguna' && currentUser.role !== 'admin') {
      setActiveTab('beranda');
    }
  }, [activeTab, currentUser.role]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Courses
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('skillup_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  useEffect(() => {
    localStorage.setItem('skillup_courses', JSON.stringify(courses));
  }, [courses]);

  // Lessons
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem('skillup_lessons');
    return saved ? JSON.parse(saved) : INITIAL_LESSONS;
  });

  useEffect(() => {
    localStorage.setItem('skillup_lessons', JSON.stringify(lessons));
  }, [lessons]);

  // Enrollments (Starts at 0 - clean slate for new learners)
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    const saved = localStorage.getItem('skillup_enrollments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('skillup_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  // Progress (Starts at 0 - clean slate for new learners)
  const [progressList, setProgressList] = useState<LessonProgress[]>(() => {
    const saved = localStorage.getItem('skillup_progress');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('skillup_progress', JSON.stringify(progressList));
  }, [progressList]);

  // Classroom State
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  const openClassroom = (courseId: number, lessonId?: number) => {
    // If not enrolled, auto-enroll student seamlessly
    if (!isEnrolled(courseId)) {
      enrollCourse(courseId);
    }
    setActiveCourseId(courseId);
    const courseLessons = lessons.filter(l => l.course_id === courseId);
    if (lessonId) {
      setActiveLessonId(lessonId);
    } else if (courseLessons.length > 0) {
      setActiveLessonId(courseLessons[0].id);
    }
  };

  const closeClassroom = () => {
    setActiveCourseId(null);
    setActiveLessonId(null);
  };

  // Saved / Bookmarked (Starts at 0)
  const [savedCourses, setSavedCourses] = useState<number[]>(() => {
    const saved = localStorage.getItem('skillup_saved');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (courseId: number) => {
    setSavedCourses(prev => {
      const next = prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId];
      localStorage.setItem('skillup_saved', JSON.stringify(next));
      return next;
    });
  };

  const isEnrolled = (courseId: number) => {
    return enrollments.some(e => e.course_id === courseId && e.user_id === currentUser.id && e.status !== 'batal');
  };

  const enrollCourse = (courseId: number) => {
    if (isEnrolled(courseId)) {
      return { success: false, message: 'Sudah terdaftar di kursus ini.' };
    }
    const newEnrollment: Enrollment = {
      id: Date.now(),
      user_id: currentUser.id,
      course_id: courseId,
      enrolled_at: new Date().toISOString().split('T')[0],
      status: 'aktif'
    };
    setEnrollments(prev => [...prev, newEnrollment]);
    return { success: true, message: 'Berhasil mendaftar kursus! Selamat belajar.' };
  };

  const markLesson = (courseId: number, lessonId: number, completed: boolean) => {
    const userEnrollment = enrollments.find(e => e.course_id === courseId && e.user_id === currentUser.id);
    const enrollmentId = userEnrollment ? userEnrollment.id : 1;

    setProgressList(prev => {
      const existingIndex = prev.findIndex(p => p.enrollment_id === enrollmentId && p.lesson_id === lessonId);
      let updated: LessonProgress[];
      if (existingIndex >= 0) {
        updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          is_completed: completed,
          completed_at: completed ? new Date().toISOString() : undefined
        };
      } else {
        updated = [
          ...prev,
          {
            id: Date.now(),
            enrollment_id: enrollmentId,
            lesson_id: lessonId,
            is_completed: completed,
            completed_at: completed ? new Date().toISOString() : undefined
          }
        ];
      }

      // Check if all lessons are completed to auto-update enrollment status to 'selesai'
      const courseLessons = lessons.filter(l => l.course_id === courseId);
      const completedCount = courseLessons.filter(l => {
        if (l.id === lessonId) return completed;
        const prog = updated.find(p => p.enrollment_id === enrollmentId && p.lesson_id === l.id);
        return prog ? prog.is_completed : false;
      }).length;

      if (courseLessons.length > 0 && completedCount === courseLessons.length) {
        setEnrollments(prevEnr =>
          prevEnr.map(e => e.id === enrollmentId ? { ...e, status: 'selesai' } : e)
        );
      } else {
        setEnrollments(prevEnr =>
          prevEnr.map(e => e.id === enrollmentId && e.status === 'selesai' ? { ...e, status: 'aktif' } : e)
        );
      }

      return updated;
    });
  };

  const getCourseProgress = (courseId: number) => {
    const courseLessons = lessons.filter(l => l.course_id === courseId);
    if (courseLessons.length === 0) return { total: 0, done: 0, percentage: 0, isCompleted: false };

    const userEnrollment = enrollments.find(e => e.course_id === courseId && e.user_id === currentUser.id);
    if (!userEnrollment) return { total: courseLessons.length, done: 0, percentage: 0, isCompleted: false };

    const doneCount = courseLessons.filter(l => {
      const prog = progressList.find(p => p.enrollment_id === userEnrollment.id && p.lesson_id === l.id);
      return prog ? prog.is_completed : false;
    }).length;

    const percentage = Math.round((doneCount / courseLessons.length) * 100);
    return {
      total: courseLessons.length,
      done: doneCount,
      percentage,
      isCompleted: userEnrollment.status === 'selesai' || doneCount === courseLessons.length
    };
  };

  // Quizzes
  const [quizzes] = useState<Record<number, Quiz>>(INITIAL_QUIZZES);
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<number, { score: number; passed: boolean }>>(() => {
    const saved = localStorage.getItem('skillup_quizzes');
    return saved ? JSON.parse(saved) : {};
  });

  const submitQuizScore = (courseId: number, score: number, passed: boolean) => {
    setCompletedQuizzes(prev => {
      const next = { ...prev, [courseId]: { score, passed } };
      localStorage.setItem('skillup_quizzes', JSON.stringify(next));
      return next;
    });
  };

  // Mentors & Bookings (Starts at 0 bookings)
  const [mentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [mentorBookings, setMentorBookings] = useState<MentorBooking[]>(() => {
    const saved = localStorage.getItem('skillup_mentor_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const bookMentorSession = (mentorId: number, date: string, timeSlot: string, notes: string) => {
    const mentor = mentors.find(m => m.id === mentorId);
    const newBooking: MentorBooking = {
      id: `mb-${Date.now()}`,
      mentorId,
      mentorName: mentor ? mentor.name : 'Mentor SKILLUP',
      date,
      timeSlot,
      notes,
      status: 'confirmed'
    };
    setMentorBookings(prev => {
      const updated = [newBooking, ...prev];
      localStorage.setItem('skillup_mentor_bookings', JSON.stringify(updated));
      return updated;
    });
  };

  // Discussions
  const [discussions, setDiscussions] = useState<DiscussionMessage[]>(() => {
    const saved = localStorage.getItem('skillup_discussions');
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const addDiscussion = (courseId: number, message: string) => {
    const newMsg: DiscussionMessage = {
      id: `disc-${Date.now()}`,
      course_id: courseId,
      user_name: currentUser.full_name,
      user_role: currentUser.role,
      user_avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      timestamp: 'Baru saja',
      message
    };
    setDiscussions(prev => {
      const updated = [...prev, newMsg];
      localStorage.setItem('skillup_discussions', JSON.stringify(updated));
      return updated;
    });

    // If student asked question, simulate mentor helpful response after a short moment
    if (currentUser.role === 'siswa') {
      setTimeout(() => {
        const mentorReply: DiscussionMessage = {
          id: `disc-reply-${Date.now()}`,
          course_id: courseId,
          user_name: 'Budi Santoso, M.Kom',
          user_role: 'instruktur',
          user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          timestamp: '1 menit yang lalu',
          message: `Pertanyaan yang sangat relevan, ${currentUser.full_name.split(' ')[0]}! Terus eksplorasi kodenya ya. Jangan ragu bookmark modul ini dan coba langsung di code editor interaktif di atas!`,
          is_mentor_reply: true
        };
        setDiscussions(curr => {
          const withReply = [...curr, mentorReply];
          localStorage.setItem('skillup_discussions', JSON.stringify(withReply));
          return withReply;
        });
      }, 1200);
    }
  };

  // Schedule (Starts at 0, user can create & remove study agendas)
  const [schedule, setSchedule] = useState<StudyScheduleItem[]>(() => {
    const saved = localStorage.getItem('skillup_schedule');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleScheduleItem = (id: string) => {
    setSchedule(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s);
      localStorage.setItem('skillup_schedule', JSON.stringify(updated));
      return updated;
    });
  };

  const addScheduleItem = (item: { day: string; time: string; course_title: string; topic: string }) => {
    const newItem: StudyScheduleItem = {
      ...item,
      id: `sch-${Date.now()}`,
      completed: false
    };
    setSchedule(prev => {
      const updated = [newItem, ...prev];
      localStorage.setItem('skillup_schedule', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteScheduleItem = (id: string) => {
    setSchedule(prev => {
      const updated = prev.filter(s => s.id !== id);
      localStorage.setItem('skillup_schedule', JSON.stringify(updated));
      return updated;
    });
  };

  // Reset all learning and progression data to 0 (Fresh start)
  const resetAllDataToZero = () => {
    localStorage.removeItem('skillup_enrollments');
    localStorage.removeItem('skillup_progress');
    localStorage.removeItem('skillup_saved');
    localStorage.removeItem('skillup_mentor_bookings');
    localStorage.removeItem('skillup_submissions');
    localStorage.removeItem('skillup_broadcasts');
    localStorage.removeItem('skillup_schedule');
    localStorage.removeItem('skillup_quizzes');

    setEnrollments([]);
    setProgressList([]);
    setSavedCourses([]);
    setCompletedQuizzes({});
    setMentorBookings([]);
    setSubmissions([]);
    setBroadcasts([]);
    setSchedule([]);
  };

  // Certificate Modal
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [certificateCourse, setCertificateCourse] = useState<Course | null>(null);

  const openCertificate = (course: Course) => {
    setCertificateCourse(course);
    setShowCertificateModal(true);
  };

  const closeCertificate = () => {
    setShowCertificateModal(false);
    setCertificateCourse(null);
  };

  // UI Modals
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [showMobileSimulator, setShowMobileSimulator] = useState<boolean>(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Instructor Methods (from PDF specification)
  const createCourse = (newCourseData: Omit<Course, 'id' | 'instructor_name' | 'instructor_avatar' | 'review_count' | 'total_lessons'>) => {
    const newId = Date.now();
    const created: Course = {
      ...newCourseData,
      id: newId,
      instructor_id: currentUser.id,
      instructor_name: currentUser.full_name,
      instructor_avatar: currentUser.avatar,
      review_count: 0,
      total_lessons: 0
    };
    setCourses(prev => [created, ...prev]);
    return newId;
  };

  const deleteCourse = (id: number) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setLessons(prev => prev.filter(l => l.course_id !== id));
  };

  const addLesson = (lessonData: Omit<Lesson, 'id'>) => {
    const newId = Date.now();
    const newLesson: Lesson = {
      ...lessonData,
      id: newId
    };
    setLessons(prev => [...prev, newLesson]);
    setCourses(prev => prev.map(c => c.id === lessonData.course_id ? { ...c, total_lessons: c.total_lessons + 1 } : c));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        switchRole,
        switchUser,
        login,
        register,
        logout,
        addUser,
        updateUserRole,
        toggleUserStatus,
        deleteUser,
        updateUserProfile,
        showAuthModal,
        setShowAuthModal,
        isLoggedOut,
        authModalMode,
        setAuthModalMode,
        openLoginModal,
        openRegisterModal,
        broadcasts,
        addBroadcast,
        deleteBroadcast,
        submissions,
        gradeSubmission,
        submitAssignment,
        activeTab,
        setActiveTab,
        courses,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        createCourse,
        deleteCourse,
        activeCourseId,
        activeLessonId,
        openClassroom,
        closeClassroom,
        setActiveLessonId,
        lessons,
        addLesson,
        enrollments,
        enrollCourse,
        isEnrolled,
        progressList,
        markLesson,
        getCourseProgress,
        savedCourses,
        toggleBookmark,
        quizzes,
        completedQuizzes,
        submitQuizScore,
        mentors,
        mentorBookings,
        bookMentorSession,
        discussions,
        addDiscussion,
        schedule,
        toggleScheduleItem,
        addScheduleItem,
        deleteScheduleItem,
        resetAllDataToZero,
        showCertificateModal,
        certificateCourse,
        openCertificate,
        closeCertificate,
        notifications,
        unreadNotifCount,
        markAllNotificationsAsRead,
        showUpgradeModal,
        setShowUpgradeModal,
        showMobileSimulator,
        setShowMobileSimulator,
        showQrModal,
        setShowQrModal,
        theme,
        toggleTheme,
        sidebarWidth,
        setSidebarWidth,
        isSidebarCollapsed,
        toggleSidebarCollapse
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
