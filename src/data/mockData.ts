import { User, Course, Lesson, Quiz, Mentor, DiscussionMessage, StudyScheduleItem, NotificationItem, SystemBroadcast, AssignmentSubmission } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    full_name: 'Administrator SKILLUP',
    email: 'admin@skillup.id',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    headline: 'Chief Academic & Platform Operations',
    bio: 'Mengelola operasional platform, moderasi kursus, dan sertifikasi talenta digital di seluruh Indonesia.',
    status: 'aktif',
    joined_at: '2025-01-10',
    last_login: 'Hari ini, 08:30 WIB',
    phone: '+62 812-9988-7711',
    password: 'admin',
    badges: ['Super Admin', 'Platform Leader', 'Security Verified'],
    department: 'Operasional & Kurikulum'
  },
  {
    id: 2,
    username: 'instruktur1',
    full_name: 'Budi Santoso, M.Kom',
    email: 'budi@skillup.id',
    role: 'instruktur',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    headline: 'Senior Principal Data Engineer & Certified Mentor',
    bio: 'Praktisi teknologi 10+ tahun, ex-Tech Lead di Tokopedia & GoTo. Telah membimbing lebih dari 15.000 talenta digital.',
    status: 'aktif',
    joined_at: '2025-02-14',
    last_login: 'Kemarin, 21:15 WIB',
    phone: '+62 813-4455-6677',
    password: 'password123',
    badges: ['Top Instructor 2026', 'Data Guru', '5-Star Mentor'],
    department: 'Data & AI Academy'
  },
  {
    id: 3,
    username: 'instruktur2',
    full_name: 'Sarah Amalia, S.Ds',
    email: 'sarah@skillup.id',
    role: 'instruktur',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    headline: 'Head of Product Design & Design Systems Expert',
    bio: 'Spesialis UI/UX, Design Thinking, dan Figma Interactive Prototyping. Telah melatih ratusan desainer produk startup.',
    status: 'aktif',
    joined_at: '2025-03-01',
    last_login: '2 hari lalu',
    phone: '+62 815-7788-9900',
    password: 'password123',
    badges: ['Design Master', 'Figma Certified'],
    department: 'Product & Design'
  },
  {
    id: 4,
    username: 'instruktur3',
    full_name: 'Kevin Pratama, S.Kom',
    email: 'kevin@skillup.id',
    role: 'instruktur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    headline: 'Senior Fullstack Engineer & Cloud Architect',
    bio: 'Fokus pada arsitektur React, Next.js, Node.js, dan optimasi database relasional skala tinggi.',
    status: 'aktif',
    joined_at: '2025-04-18',
    last_login: '3 jam lalu',
    phone: '+62 811-2233-4455',
    password: 'password123',
    badges: ['React Specialist', 'Cloud Architect'],
    department: 'Software Engineering'
  },
  {
    id: 5,
    username: 'siswa1',
    full_name: 'Imam Hambali',
    email: 'skilup1515@gmail.com',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    headline: 'Aspiring Data Scientist & Developer',
    bio: 'Sedang giat mempelajari Python, SQL, dan Machine Learning untuk akselerasi karir profesional.',
    status: 'aktif',
    joined_at: '2026-01-05',
    last_login: 'Sedang online',
    phone: '+62 857-1122-3344',
    password: 'password123',
    badges: ['Fast Learner', 'Python Enthusiast', 'Streak 12 Hari'],
    department: 'Teknik Informatika'
  },
  {
    id: 6,
    username: 'siswa2',
    full_name: 'Nabila Zahra',
    email: 'nabila.zahra@gmail.com',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    headline: 'Junior UI/UX Designer & Frontend Explorer',
    bio: 'Senang merancang antarmuka ramah pengguna dan mengimplementasikannya ke dalam kode React modern.',
    status: 'aktif',
    joined_at: '2026-02-11',
    last_login: '5 jam lalu',
    phone: '+62 819-3344-5566',
    password: 'password123',
    badges: ['Top Quizzer', 'Design Sprint Winner'],
    department: 'Desain Komunikasi Visual'
  },
  {
    id: 7,
    username: 'siswa3',
    full_name: 'Dimas Ramadhan',
    email: 'dimas.ramadhan@outlook.com',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    headline: 'Backend Developer Enthusiast & Database Geek',
    bio: 'Mendalami perancangan query MySQL dan arsitektur database relasional berskala besar.',
    status: 'aktif',
    joined_at: '2026-02-20',
    last_login: '1 hari lalu',
    phone: '+62 821-6677-8899',
    password: 'password123',
    badges: ['SQL Master Candidate'],
    department: 'Sistem Informasi'
  },
  {
    id: 8,
    username: 'siswa4',
    full_name: 'Jessica Tanuwijaya',
    email: 'jessica.tan@gmail.com',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    headline: 'Product Growth & Digital Marketing Analyst',
    bio: 'Mempelajari analisa data untuk mengoptimalkan konversi bisnis dan strategi pemasaran digital.',
    status: 'aktif',
    joined_at: '2026-03-02',
    last_login: '4 hari lalu',
    phone: '+62 878-9900-1122',
    password: 'password123',
    badges: ['Marketing Analyst'],
    department: 'Manajemen Bisnis'
  },
  {
    id: 9,
    username: 'siswa5',
    full_name: 'Rian Saputra',
    email: 'rian.saputra@student.ac.id',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    headline: 'Computer Science Undergraduate',
    bio: 'Menyelesaikan modul pemrograman dasar dan mempersiapkan magang industri semester depan.',
    status: 'nonaktif',
    joined_at: '2025-11-19',
    last_login: '2 minggu lalu',
    phone: '+62 896-1234-5678',
    password: 'password123',
    badges: ['Newbie'],
    department: 'Ilmu Komputer'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 1,
    title: 'Python untuk Data Science',
    description: 'Pelajari dasar-dasar pemrograman Python, pengolahan dataframe dengan Pandas, komputasi numerik NumPy, dan visualisasi data menggunakan Matplotlib dari nol hingga siap kerja.',
    instructor_id: 2,
    instructor_name: 'Budi Santoso, M.Kom',
    instructor_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Data Science',
    level: 'pemula',
    price: 0,
    rating: 4.8,
    review_count: 12480,
    total_hours: 12,
    total_lessons: 5,
    thumbnail_icon: 'python',
    is_popular: true
  },
  {
    id: 2,
    title: 'MySQL Database Fundamental',
    description: 'Kuasai perancangan database relasional, query DDL, DML, relasi join tabel, indexing, transaksi, dan optimasi performa query database modern.',
    instructor_id: 2,
    instructor_name: 'Budi Santoso, M.Kom',
    instructor_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Programming',
    level: 'pemula',
    price: 0,
    rating: 4.7,
    review_count: 9820,
    total_hours: 8,
    total_lessons: 4,
    thumbnail_icon: 'mysql',
    is_popular: true
  },
  {
    id: 3,
    title: 'Web Development with React',
    description: 'Bangun web aplikasi modern berkinerja tinggi menggunakan React 19, TypeScript, state management kontemporer, Tailwind CSS, dan integrasi RESTful API.',
    instructor_id: 2,
    instructor_name: 'Sarah Pratama',
    instructor_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Programming',
    level: 'menengah',
    price: 150000,
    rating: 4.8,
    review_count: 8430,
    total_hours: 15,
    total_lessons: 6,
    thumbnail_icon: 'react',
    is_popular: true
  },
  {
    id: 4,
    title: 'Data Analysis with Python',
    description: 'Lakukan eksplorasi data mendalam (EDA), data cleaning, statistical hypothesis testing, serta pembuatan interactive insight dashboard bisnis.',
    instructor_id: 2,
    instructor_name: 'Budi Santoso, M.Kom',
    instructor_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Data Science',
    level: 'pemula',
    price: 0,
    rating: 4.7,
    review_count: 11200,
    total_hours: 10,
    total_lessons: 4,
    thumbnail_icon: 'data',
    is_popular: false
  },
  {
    id: 5,
    title: 'Dasar UI/UX Design & Prototyping',
    description: 'Pelajari metodologi Design Thinking, wireframing interaktif di Figma, user research, heuristic evaluation, dan design system profesional.',
    instructor_id: 2,
    instructor_name: 'Maya Anindya',
    instructor_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    category: 'Design',
    level: 'pemula',
    price: 150000,
    rating: 4.9,
    review_count: 7650,
    total_hours: 10,
    total_lessons: 5,
    thumbnail_icon: 'design',
    is_popular: true
  },
  {
    id: 6,
    title: 'Digital Business & Product Strategy',
    description: 'Panduan strategis merancang MVP, product-market fit, unit economics, conversion rate optimization, dan scaling produk digital di Indonesia.',
    instructor_id: 1,
    instructor_name: 'Rian Dewantara',
    instructor_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Business',
    level: 'menengah',
    price: 200000,
    rating: 4.7,
    review_count: 4320,
    total_hours: 14,
    total_lessons: 4,
    thumbnail_icon: 'business',
    is_popular: false
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  // Course 1: Python untuk Data Science (Matching mockup bottom-left: Pendahuluan, Import Library, Analisis Data, Latihan Soal)
  {
    id: 101,
    course_id: 1,
    title: 'Pendahuluan',
    order_num: 1,
    duration_minutes: 5,
    content: `Selamat datang di kursus Python untuk Data Science!

Pada modul pembuka ini, Anda akan memahami mengapa Python menjadi bahasa pemrograman de-facto terpopuler dalam dunia data science, machine learning, dan automasi.

Poin Pembahasan:
1. Ekosistem Python untuk pengolahan data.
2. Filosofi kode yang bersih dan mudah dibaca (Zen of Python).
3. Struktur kerja data scientist di industri teknologi.
4. Setup environment Google Colab, Jupyter Notebook, dan VS Code.`,
    video_url: 'https://www.youtube-nocookie.com/embed/kqtD5dpn9C8',
    code_language: 'python',
    code_snippet: `# Selamat datang di SKILLUP Python Interactive Sandbox!
name = "Imam"
role = "Data Science Explorer"
print(f"Halo {name}! Selamat datang di dunia {role}.")

tools = ["Pandas", "NumPy", "Matplotlib", "Seaborn"]
print(f"Alat utama yang akan kita pelajari: {', '.join(tools)}")`,
    expected_output: `Halo Imam! Selamat datang di dunia Data Science Explorer.\nAlat utama yang akan kita pelajari: Pandas, NumPy, Matplotlib, Seaborn`
  },
  {
    id: 102,
    course_id: 1,
    title: 'Import Library',
    order_num: 2,
    duration_minutes: 10,
    content: `Memahami Library Esensial Data Science

Library Python adalah kumpulan modul yang mempercepat pengembangan aplikasi tanpa harus menulis kode dari nol.

Library Standar Industri:
- pandas (pd): Manipulasi dataset tabular (DataFrames).
- numpy (np): Operasi vektor dan komputasi array multi-dimensi.
- matplotlib.pyplot (plt): Pembuatan grafik dan visualisasi dasar.`,
    video_url: 'https://www.youtube-nocookie.com/embed/vmEHCJofslg',
    code_language: 'python',
    code_snippet: `import pandas as pd
import numpy as np

# Membuat simulasi dataset penjualan mingguan
data = {
    'Hari': ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    'Penjualan_Unit': [120, 145, 110, 195, 230, 310, 280],
    'Pengunjung': [350, 410, 320, 520, 680, 920, 850]
}

df = pd.DataFrame(data)
print("Preview DataFrame:")
print(df.to_string(index=False))`,
    expected_output: `Preview DataFrame:
   Hari  Penjualan_Unit  Pengunjung
  Senin             120         350
 Selasa             145         410
   Rabu             110         320
  Kamis             195         520
  Jumat             230         680
  Sabtu             310         920
 Minggu             280         850`
  },
  {
    id: 103,
    course_id: 1,
    title: 'Analisis Data',
    order_num: 3,
    duration_minutes: 15,
    content: `Eksplorasi dan Kalkulasi Metrik Agregasi

Dalam modul ini, kita menghitung metrik statistik ringkasan seperti mean, median, standard deviation, dan conversion rate.

Langkah-langkah Analisis:
1. Menghitung Conversion Rate (Penjualan / Pengunjung * 100).
2. Menemukan hari dengan performa tertinggi.
3. Melakukan agregasi ringkasan data.`,
    video_url: 'https://www.youtube-nocookie.com/embed/dcqPhpY7tWk',
    code_language: 'python',
    code_snippet: `import pandas as pd

# Load dataset simulasi metrik
data = {
    'Produk': ['Kursus Python', 'Kursus React', 'Kursus MySQL', 'Kursus UI/UX'],
    'Siswa_Aktif': [1420, 890, 1150, 960],
    'Tingkat_Penyelesaian_%': [78.5, 82.1, 74.0, 91.2]
}

df = pd.DataFrame(data)
print("Statistik Deskriptif:")
print(f"Rata-rata Siswa per Kursus: {df['Siswa_Aktif'].mean():.1f}")
print(f"Kursus dengan Kelulusan Tertinggi: {df.loc[df['Tingkat_Penyelesaian_%'].idxmax()]['Produk']}")`,
    expected_output: `Statistik Deskriptif:
Rata-rata Siswa per Kursus: 1105.0
Kursus dengan Kelulusan Tertinggi: Kursus UI/UX`
  },
  {
    id: 104,
    course_id: 1,
    title: 'Latihan Soal',
    order_num: 4,
    duration_minutes: 10,
    content: `Uji Pemahaman: Querying dan Filtering DataFrame

Selesaikan studi kasus interaktif untuk menyaring transaksi di atas batas nominal tertentu dan cetak hasilnya.`,
    video_url: 'https://www.youtube-nocookie.com/embed/e60ItwlZTKM',
    code_language: 'python',
    code_snippet: `# Tantangan: Filter kursus dengan rating di atas 4.7
kursus_list = [
    {"nama": "Python Data Science", "rating": 4.8, "level": "Pemula"},
    {"nama": "MySQL Fundamental", "rating": 4.7, "level": "Pemula"},
    {"nama": "React Development", "rating": 4.8, "level": "Menengah"},
    {"nama": "UI/UX Masterclass", "rating": 4.9, "level": "Pemula"}
]

rekomendasi = [k for k in kursus_list if k["rating"] >= 4.8]
print(f"Ditemukan {len(rekomendasi)} kursus unggulan:")
for k in rekomendasi:
    print(f"- {k['nama']} (Rating: {k['rating']})")`,
    expected_output: `Ditemukan 3 kursus unggulan:
- Python Data Science (Rating: 4.8)
- React Development (Rating: 4.8)
- UI/UX Masterclass (Rating: 4.9)`
  },
  {
    id: 105,
    course_id: 1,
    title: 'Visualisasi Data dengan Matplotlib',
    order_num: 5,
    duration_minutes: 20,
    content: `Membuat Grafik Batang & Tren Garis

Visualisasi data memungkinkan pengambil keputusan memahami pola dan anomali secara instan.

Tipe grafik utama:
- Line Plot: Menampilkan perubahan terhadap waktu (Time Series).
- Bar Chart: Perbandingan kategori diskrit.
- Histogram: Distribusi probabilitas variabel kontinu.`,
    video_url: 'https://www.youtube-nocookie.com/embed/3ZWYJ3hVQeU',
    code_language: 'python',
    code_snippet: `hari = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
jam_belajar = [1.5, 2.0, 1.2, 2.5, 3.0, 4.5, 3.8]

print("Visualisasi ASCII Distribusi Jam Belajar Mingguan:")
for h, jam in zip(hari, jam_belajar):
    bar = "█" * int(jam * 5)
    print(f"{h} [{jam:3.1f}h] {bar}")`,
    expected_output: `Visualisasi ASCII Distribusi Jam Belajar Mingguan:
Sen [1.5h] ███████
Sel [2.0h] ██████████
Rab [1.2h] ██████
Kam [2.5h] ████████████
Jum [3.0h] ███████████████
Sab [4.5h] ██████████████████████
Min [3.8h] ███████████████████`
  },

  // Course 2: MySQL Database Fundamental
  {
    id: 201,
    course_id: 2,
    title: 'Pengantar Basis Data Relasional & RDBMS',
    order_num: 1,
    duration_minutes: 25,
    content: 'Mempelajari arsitektur DBMS, tabel, primary key, foreign key, dan prinsip normalisasi bentuk 1NF, 2NF, dan 3NF.',
    code_language: 'sql',
    code_snippet: `-- Perancangan Relasi Siswa & Kursus
CREATE TABLE siswa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

SELECT "Table siswa created successfully!" AS status;`,
    expected_output: `status
Table siswa created successfully!`
  },
  {
    id: 202,
    course_id: 2,
    title: 'Sintaks DDL & DML Dasar',
    order_num: 2,
    duration_minutes: 30,
    content: 'Mengoperasikan perintah CREATE TABLE, ALTER TABLE, INSERT INTO, UPDATE, dan DELETE dengan klausul WHERE yang aman.',
    code_language: 'sql',
    code_snippet: `INSERT INTO siswa (nama, email) VALUES
('Imam Hambali', 'imam@skillup.id'),
('Ani Wijaya', 'ani@skillup.id');

SELECT * FROM siswa;`,
    expected_output: `id | nama         | email
1  | Imam Hambali | imam@skillup.id
2  | Ani Wijaya   | ani@skillup.id`
  },
  {
    id: 203,
    course_id: 2,
    title: 'Query Relasi JOIN (INNER, LEFT, RIGHT)',
    order_num: 3,
    duration_minutes: 40,
    content: 'Menggabungkan beberapa tabel relasional untuk mengekstrak data komprehensif tanpa redundansi data.',
    code_language: 'sql',
    code_snippet: `SELECT e.id, u.full_name, c.title, e.status
FROM enrollments e
INNER JOIN users u ON u.id = e.user_id
INNER JOIN courses c ON c.id = e.course_id;`,
    expected_output: `id | full_name    | title                    | status
1  | Imam Hambali | Python untuk Data Science| aktif
2  | Ani Wijaya   | Dasar UI/UX Design       | selesai`
  },
  {
    id: 204,
    course_id: 2,
    title: 'Studi Kasus & Optimasi Indexing',
    order_num: 4,
    duration_minutes: 35,
    content: 'Menganalisis query plan dengan EXPLAIN dan mengimplementasikan B-Tree Indexing untuk query throughput jutaan baris.',
    code_language: 'sql',
    code_snippet: `EXPLAIN SELECT * FROM users WHERE email = 'budi@skillup.id';`,
    expected_output: `select_type: SIMPLE | table: users | type: const | possible_keys: unique_email | key: unique_email | rows: 1`
  },

  // Course 5: Dasar UI/UX Design & Prototyping
  {
    id: 501,
    course_id: 5,
    title: 'Pengantar UI/UX & Metodologi Design Thinking',
    order_num: 1,
    duration_minutes: 15,
    content: `Memahami Perbedaan UI vs UX dan 5 Tahap Design Thinking
    
User Experience (UX) berfokus pada emosi, kepuasan, kemudahan navigasi, dan efisiensi pengguna saat menyelesaikan tugas.
User Interface (UI) adalah elemen visual indrawi: tipografi, hierarki visual, warna, spacing, ikonografi, dan affordance interaktif.

5 Tahap Design Thinking:
1. Empathize: Mengamati dan mewawancarai calon pengguna nyata.
2. Define: Merumuskan problem statement dan user persona.
3. Ideate: Brainstorming ragam solusi kreatif tanpa batasan awal.
4. Prototype: Membangun artefak interaktif low-to-high fidelity di Figma.
5. Test: Menguji prototype kepada user untuk memvalidasi hipotesis.`,
    video_url: 'https://www.youtube-nocookie.com/embed/c9Wg6Cb_YlU',
    code_language: 'javascript',
    code_snippet: `// Design Tokens Definition: Primary & Semantic Palette
const DesignTokens = {
  palette: {
    primary: '#7C3AED', // Brand Purple
    secondary: '#EC4899', // Accent Pink
    background: '#090D16', // Dark Canvas
    surface: '#101728', // Elevated Card
  },
  typography: {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    scale: { h1: '32px', h2: '24px', body: '14px', caption: '12px' }
  },
  spacing: [0, 4, 8, 12, 16, 24, 32, 48]
};

console.log("Tokens loaded: Primary ->", DesignTokens.palette.primary);`,
    expected_output: `Tokens loaded: Primary -> #7C3AED`
  },
  {
    id: 502,
    course_id: 5,
    title: 'Wireframing & Information Architecture di Figma',
    order_num: 2,
    duration_minutes: 20,
    content: `Merancang User Flow dan Wireframe Low-Fidelity
    
Wireframe adalah cetak biru struktural layar sebelum menambahkan elemen visual dekoratif.
Prinsip Wireframing:
- Fokus pada hierarchy & content layout
- Gunakan 8-pt Grid System konsisten
- Tentukan Clear Primary Call-to-Action (CTA) pada tiap viewport`,
    video_url: 'https://www.youtube-nocookie.com/embed/FTFaQWZBqQ8',
    code_language: 'javascript',
    code_snippet: `// Menghitung 8-pt Grid alignment
function snapTo8ptGrid(px) {
  return Math.round(px / 8) * 8;
}

const inputDimensions = [15, 23, 47, 98];
console.log("Grid 8-pt Aligned:", inputDimensions.map(snapTo8ptGrid));`,
    expected_output: `Grid 8-pt Aligned: [ 16, 24, 48, 96 ]`
  },
  {
    id: 503,
    course_id: 5,
    title: 'Design System & Component Atomic Design',
    order_num: 3,
    duration_minutes: 25,
    content: `Membangun Komponen Reusable dengan Auto-Layout Figma
    
Atomic Design membagi sistem UI menjadi:
1. Atoms (Tombol, Input, Ikon)
2. Molecules (Search Box dengan Icon + Button)
3. Organisms (Navbar Header, Hero Card)
4. Templates (Struktur Grid Halaman)
5. Pages (Halaman final dengan data aktual)`,
    video_url: 'https://www.youtube-nocookie.com/embed/e60ItwlZTKM',
    code_language: 'javascript',
    code_snippet: `const atomicStats = {
  atoms: 24,
  molecules: 12,
  organisms: 6,
  pages: 4
};
console.log("Total Reusable Components:", atomicStats.atoms + atomicStats.molecules + atomicStats.organisms);`,
    expected_output: `Total Reusable Components: 42`
  },
  {
    id: 504,
    course_id: 5,
    title: 'Usability Testing & Heuristic Evaluation',
    order_num: 4,
    duration_minutes: 20,
    content: `10 Heuristik Nielsen Norman Group untuk Audit Desain
    
1. Visibility of system status
2. Match between system and the real world
3. User control and freedom (Undo/Redo)
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize, diagnose, and recover from errors
10. Help and documentation`,
    video_url: 'https://www.youtube-nocookie.com/embed/3ZWYJ3hVQeU',
    code_language: 'javascript',
    code_snippet: `// Kalkulasi System Usability Scale (SUS) Score
const susResponses = [4, 2, 4, 1, 5, 2, 4, 1, 5, 2];
console.log("Audit Usability: Siap diimplementasikan!");`,
    expected_output: `Audit Usability: Siap diimplementasikan!`
  },

  // Course 6: Digital Business & Product Strategy
  {
    id: 601,
    course_id: 6,
    title: 'Merancang Minimum Viable Product (MVP) & Product-Market Fit',
    order_num: 1,
    duration_minutes: 20,
    content: `Strategi Validasi Ide Bisnis dan Framework Lean Startup
    
Membangun produk digital diawali dari menemukan masalah nyata yang dialami audiens target dengan willingness to pay yang tinggi.
Pilar MVP:
1. Riset Validasi Masalah & Customer Interview
2. Menentukan Core Value Proposition unik
3. Build-Measure-Learn Feedback Loop kilat`,
    video_url: 'https://www.youtube-nocookie.com/embed/dcqPhpY7tWk',
    code_language: 'javascript',
    code_snippet: `// Menghitung Product-Market Fit (Sean Ellis Score)
const respondents = 150;
const veryDisappointed = 66; // user yang sangat kecewa jika produk tutup

const pmfScore = (veryDisappointed / respondents) * 100;
console.log(\`PMF Score: \${pmfScore.toFixed(1)}% (\${pmfScore >= 40 ? 'Lolos PMF! 🚀' : 'Perlu Iterasi'})\`);`,
    expected_output: `PMF Score: 44.0% (Lolos PMF! 🚀)`
  },
  {
    id: 602,
    course_id: 6,
    title: 'Unit Economics: CAC, LTV, dan Payback Period',
    order_num: 2,
    duration_minutes: 25,
    content: `Membedah Fundamental Finansial Startup Digital
    
- Customer Acquisition Cost (CAC): Biaya marketing dan sales untuk memperoleh 1 user berbayar.
- Customer Lifetime Value (LTV): Total keuntungan rata-rata dari 1 user selama menggunakan produk.
- Rasio Emas Industri: LTV / CAC harus minimal 3x untuk pertumbuhan sehat berkelanjutan.`,
    video_url: 'https://www.youtube-nocookie.com/embed/vmEHCJofslg',
    code_language: 'javascript',
    code_snippet: `const arpuMonthly = 150000; // Average Revenue Per User
const churnRate = 0.05; // 5% churn per bulan
const grossMargin = 0.8; // 80%

const ltv = (arpuMonthly * grossMargin) / churnRate;
const cac = 600000;
const ltvCacRatio = ltv / cac;

console.log(\`Estimated LTV: Rp \${ltv.toLocaleString('id-ID')}\`);
console.log(\`LTV:CAC Ratio: \${ltvCacRatio.toFixed(1)}x\`);`,
    expected_output: `Estimated LTV: Rp 2.400.000\nLTV:CAC Ratio: 4.0x`
  },
  {
    id: 603,
    course_id: 6,
    title: 'Funnel Conversion Rate Optimization (CRO)',
    order_num: 3,
    duration_minutes: 20,
    content: `Optimasi Funnel AARRR (Acquisition, Activation, Retention, Referral, Revenue)
    
Mengurangi friction pada proses onboarding dan checkout dapat meningkatkan pendapatan berlipat ganda tanpa menambah biaya marketing.`,
    video_url: 'https://www.youtube-nocookie.com/embed/kqtD5dpn9C8',
    code_language: 'javascript',
    code_snippet: `const funnel = {
  visitors: 10000,
  signups: 1800,
  activated: 900,
  paidCustomers: 180
};

console.log(\`Overall Conversion: \${((funnel.paidCustomers / funnel.visitors) * 100).toFixed(2)}%\`);
console.log(\`Signup to Paid: \${((funnel.paidCustomers / funnel.signups) * 100).toFixed(1)}%\`);`,
    expected_output: `Overall Conversion: 1.80%\nSignup to Paid: 10.0%`
  }
];

export const INITIAL_QUIZZES: Record<number, Quiz> = {
  1: {
    course_id: 1,
    title: 'Evaluasi Kompetensi: Python untuk Data Science',
    passingScore: 80,
    questions: [
      {
        id: 1,
        question: 'Library Python manakah yang paling utama digunakan untuk manipulasi dan analisis data tabular berbentuk DataFrame?',
        options: ['Pandas', 'Requests', 'Flask', 'Turtle'],
        correctIndex: 0,
        explanation: 'Pandas menyediakan struktur data DataFrame dan Series yang dirancang khusus untuk manipulasi data tabular berkecepatan tinggi.'
      },
      {
        id: 2,
        question: 'Apa fungsi dari method `df.head()` pada pustaka Pandas?',
        options: [
          'Menghapus baris paling atas dari DataFrame',
          'Menampilkan 5 baris pertama dari DataFrame secara default',
          'Menghitung total jumlah memori yang terpakai',
          'Mengubah nama kolom header tabel'
        ],
        correctIndex: 1,
        explanation: '`df.head()` secara default menampilkan 5 baris pertama untuk inspeksi data kilat.'
      },
      {
        id: 3,
        question: 'Manakah cara yang tepat untuk menghitung rata-rata dari kolom numerik "Nilai" pada DataFrame `df`?',
        options: ['df["Nilai"].average()', 'df["Nilai"].mean()', 'mean(df["Nilai"])', 'df.calc("Nilai")'],
        correctIndex: 1,
        explanation: 'Pada Pandas, fungsi untuk menghitung rata-rata aritmetika kolom adalah method `.mean()`.'
      },
      {
        id: 4,
        question: 'Dalam modul visualisasi data Matplotlib, perintah apa yang digunakan untuk menampilkan canvas grafik ke layar?',
        options: ['plt.render()', 'plt.draw()', 'plt.show()', 'plt.canvas()'],
        correctIndex: 2,
        explanation: '`plt.show()` digunakan untuk merender dan menampilkan plot visualisasi secara interaktif.'
      }
    ]
  },
  5: {
    course_id: 5,
    title: 'Evaluasi Kompetensi: Dasar UI/UX Design & Prototyping',
    passingScore: 80,
    questions: [
      {
        id: 1,
        question: 'Metodologi Design Thinking terdiri dari 5 tahapan berurutan, yaitu?',
        options: [
          'Empathize, Define, Ideate, Prototype, Test',
          'Code, Build, Test, Deploy, Monitor',
          'Sketch, Wireframe, Mockup, Vector, Export',
          'Research, Budget, Contract, Pitch, Launch'
        ],
        correctIndex: 0,
        explanation: 'Design Thinking diawali dari memahami empati kebutuhan user (Empathize) hingga pengujian prototype (Test).'
      },
      {
        id: 2,
        question: 'Apa tujuan utama menerapkan 8-pt Grid System dalam perancangan antarmuka pengguna?',
        options: [
          'Membuat resolusi gambar menjadi 8K Ultra HD',
          'Menjamin konsistensi ritme vertikal, margin, padding, dan keterbacaan antar layar',
          'Membatasi jumlah warna maksimal hanya 8 macam',
          'Menghilangkan kebutuhan prototyping interaktif'
        ],
        correctIndex: 1,
        explanation: '8-pt grid system memudahkan perataan komponen secara teratur dan selaras dengan density layar perangkat modern.'
      },
      {
        id: 3,
        question: 'Dalam metodologi Atomic Design, tingkatan manakah yang merepresentasikan kumpulan atom seperti Search Bar (input + search icon + button)?',
        options: ['Organism', 'Molecule', 'Template', 'Atom'],
        correctIndex: 1,
        explanation: 'Molecule adalah gabungan fungsional dari beberapa atom sederhana yang bekerja sama sebagai satu unit UI.'
      }
    ]
  },
  6: {
    course_id: 6,
    title: 'Evaluasi Kompetensi: Digital Business & Product Strategy',
    passingScore: 80,
    questions: [
      {
        id: 1,
        question: 'Berapa rasio minimal LTV (Customer Lifetime Value) terhadap CAC (Customer Acquisition Cost) yang dianggap sehat untuk model bisnis produk digital berkelanjutan?',
        options: ['1:1', '3:1 (3x)', '0.5:1', '100:1'],
        correctIndex: 1,
        explanation: 'Rasio LTV:CAC 3x dianggap benchmark standar industri modal ventura dan startup untuk bisnis berdaya tahan tinggi.'
      },
      {
        id: 2,
        question: 'Pada framework metrik AARRR (Pirate Metrics), huruf pertama A mewakili?',
        options: ['Accounting', 'Acquisition', 'Artificial', 'Agile'],
        correctIndex: 1,
        explanation: 'Acquisition berfokus pada bagaimana user pertama kali menemukan dan mengunjungi produk digital Anda.'
      }
    ]
  }
};

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 1,
    name: 'Budi Santoso, M.Kom',
    role_title: 'Senior Principal Data Engineer',
    company: 'Ex-Tokopedia / GoTo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews_count: 342,
    expertise: ['Python', 'Big Data', 'MySQL', 'System Design'],
    hourly_rate: 150000,
    available_slots: ['Senin, 19:30 WIB', 'Rabu, 20:00 WIB', 'Sabtu, 14:00 WIB'],
    bio: 'Fokus membimbing transisi karir ke Data Science, persiapan technical interview FAANG, dan bedah portfolio nyata.'
  },
  {
    id: 2,
    name: 'Sarah Pratama',
    role_title: 'Staff Frontend Architect',
    company: 'Traveloka',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews_count: 289,
    expertise: ['React 19', 'TypeScript', 'Next.js', 'Web Performance'],
    hourly_rate: 175000,
    available_slots: ['Selasa, 19:00 WIB', 'Kamis, 20:30 WIB', 'Minggu, 10:00 WIB'],
    bio: 'Membantu developer menguasai Clean Code, architecture design pattern, dan arsitektur aplikasi berskala jutaan pengguna.'
  },
  {
    id: 3,
    name: 'Maya Anindya',
    role_title: 'Lead Product Designer',
    company: 'Bukalapak',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews_count: 215,
    expertise: ['UI/UX', 'Figma Systems', 'User Research', 'Design Sprint'],
    hourly_rate: 125000,
    available_slots: ['Jumat, 16:00 WIB', 'Sabtu, 11:00 WIB'],
    bio: 'Spesialis kurasi portofolio UI/UX berstandar global, usability testing, dan navigasi karir desainer produk.'
  },
  {
    id: 4,
    name: 'Kevin Pratama, S.Kom',
    role_title: 'Senior Cloud & Fullstack Architect',
    company: 'DANA Indonesia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews_count: 198,
    expertise: ['Cloud Architecture', 'React & Node', 'Microservices', 'Docker & K8s'],
    hourly_rate: 160000,
    available_slots: ['Selasa, 20:00 WIB', 'Sabtu, 16:30 WIB'],
    bio: 'Panduan menyeluruh arsitektur microservices, high-traffic system design, dan akselerasi karir software engineer.'
  },
  {
    id: 5,
    name: 'Reza Firmansyah, M.Sc',
    role_title: 'AI & Machine Learning Specialist',
    company: 'GoTo AI Labs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews_count: 174,
    expertise: ['Deep Learning', 'PyTorch & TensorFlow', 'NLP', 'LLM Fine-tuning'],
    hourly_rate: 180000,
    available_slots: ['Rabu, 19:00 WIB', 'Minggu, 14:00 WIB'],
    bio: 'Bimbingan riset terapan AI, machine learning pipeline production, dan optimalisasi inferensi model berskala masif.'
  },
  {
    id: 6,
    name: 'Nabila Zahra',
    role_title: 'UX Researcher & Agile Product Lead',
    company: 'Blibli.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews_count: 162,
    expertise: ['User Research', 'Product Discovery', 'Design Thinking', 'Scrum Agile'],
    hourly_rate: 130000,
    available_slots: ['Kamis, 19:30 WIB', 'Sabtu, 10:00 WIB'],
    bio: 'Kupas tuntas riset pengguna kualitatif & kuantitatif, usability testing mendalam, dan prioritization framework produk.'
  }
];

export const INITIAL_DISCUSSIONS: DiscussionMessage[] = [
  {
    id: 'disc-1',
    course_id: 1,
    user_name: 'Imam Hambali',
    user_role: 'siswa',
    user_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    timestamp: '2 jam yang lalu',
    message: 'Halo Mentor Budi! Pada bagian manipulasi dataframe, kapan sebaiknya kita memakai `df.loc[]` dibandingkan `df.iloc[]`?'
  },
  {
    id: 'disc-2',
    course_id: 1,
    user_name: 'Budi Santoso, M.Kom',
    user_role: 'instruktur',
    user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    timestamp: '1 jam yang lalu',
    message: 'Pertanyaan bagus sekali, Imam! Singkatnya: `.loc[]` berbasis label (nama kolom dan index nama), sedangkan `.iloc[]` berbasis index integer angka (posisi urutan 0, 1, 2). Jika ingin memilih kolom bernama "Gaji", gunakan `df.loc[:, "Gaji"]`. Terus semangat belajarnya!',
    is_mentor_reply: true
  }
];

export const INITIAL_SCHEDULE: StudyScheduleItem[] = [
  {
    id: 'sch-1',
    day: 'Senin',
    time: '19:00 - 20:30',
    course_title: 'Python untuk Data Science',
    topic: 'Pendahuluan & Setup Library',
    completed: true
  },
  {
    id: 'sch-2',
    day: 'Rabu',
    time: '19:30 - 21:00',
    course_title: 'Python untuk Data Science',
    topic: 'Analisis Data & Agregasi',
    completed: true
  },
  {
    id: 'sch-3',
    day: 'Jumat',
    time: '20:00 - 21:30',
    course_title: 'Python untuk Data Science',
    topic: 'Latihan Soal & Quiz Kelulusan',
    completed: true
  },
  {
    id: 'sch-4',
    day: 'Sabtu',
    time: '14:00 - 15:30',
    course_title: 'Bimbingan Mentor 1-on-1',
    topic: 'Review Portofolio Data bersama Mentor Budi',
    completed: false
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Mentor Membalas Diskusimu',
    message: 'Budi Santoso, M.Kom menjawab pertanyaanmu tentang manipulasi DataFrame.',
    time: '1 jam yang lalu',
    read: false,
    type: 'mentor'
  },
  {
    id: 'notif-2',
    title: 'Materi Baru Tersedia',
    message: 'Modul "Visualisasi Data dengan Matplotlib" telah dibuka pada kursus Python.',
    time: '3 jam yang lalu',
    read: false,
    type: 'course'
  },
  {
    id: 'notif-3',
    title: 'Selamat! Target Belajar Tercapai',
    message: 'Kamu telah mempertahankan 12 hari beruntun belajar di SKILLUP.',
    time: '1 hari yang lalu',
    read: true,
    type: 'system'
  }
];

export const INITIAL_BROADCASTS: SystemBroadcast[] = [
  {
    id: 'bc-1',
    title: 'Pengumuman Kurikulum Baru 2026',
    content: 'Seluruh materi praktikum pemrograman kini telah diperbarui ke standar industri terbaru. Mohon instruktur memeriksa kurikulum kelas masing-masing.',
    author_name: 'Administrator SKILLUP',
    date: 'Hari ini, 09:00 WIB',
    priority: 'penting',
    target_role: 'all'
  },
  {
    id: 'bc-2',
    title: 'Pemeliharaan Server & Code Sandbox',
    content: 'Sandbox Python dan MySQL interaktif telah dioptimasi dengan kecepatan eksekusi 2x lebih cepat.',
    author_name: 'Administrator SKILLUP',
    date: 'Kemarin',
    priority: 'info',
    target_role: 'all'
  }
];

export const INITIAL_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: 'sub-1',
    course_id: 1,
    course_title: 'Python untuk Data Science',
    student_id: 5,
    student_name: 'Imam Hambali',
    student_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    submitted_at: '2026-11-06 14:20 WIB',
    project_title: 'Analisis Data Penjualan Retail dengan Pandas & Seaborn',
    repository_url: 'https://github.com/imamhambali/project-retail-analysis',
    submission_text: 'Saya telah menyelesaikan analisis data 10.000 transaksi penjualan retail, membersihkan missing value, dan menghasilkan 4 visualisasi korelasi.',
    status: 'pending'
  },
  {
    id: 'sub-2',
    course_id: 1,
    course_title: 'Python untuk Data Science',
    student_id: 6,
    student_name: 'Nabila Zahra',
    student_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    submitted_at: '2026-11-05 10:15 WIB',
    project_title: 'Exploratory Data Analysis Data Pelanggan E-Commerce',
    repository_url: 'https://github.com/nabilaz/eda-ecommerce',
    submission_text: 'Model segmentasi pelanggan menggunakan K-Means dan visualisasi scatter plot matplotlib.',
    status: 'graded',
    score: 95,
    feedback: 'Analisis sangat mendalam, kode rapi dengan komentar jelas. Sangat siap untuk portofolio industri!',
    graded_by: 'Budi Santoso, M.Kom',
    graded_at: '2026-11-05 16:30 WIB'
  },
  {
    id: 'sub-3',
    course_id: 2,
    course_title: 'MySQL Database Fundamental',
    student_id: 7,
    student_name: 'Dimas Ramadhan',
    student_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    submitted_at: '2026-11-06 18:45 WIB',
    project_title: 'Desain Skema Database Rumah Sakit Terintegrasi (3NF)',
    repository_url: 'https://github.com/dimasram/db-hospital-schema',
    submission_text: 'Normalisasi tabel hingga 3NF dengan relasi 1-to-many, composite keys, serta indeks performa tinggi.',
    status: 'pending'
  }
];
