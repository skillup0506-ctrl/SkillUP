import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroBanner: React.FC = () => {
  const { openClassroom } = useApp();

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#242A38] via-[#2F3647] to-[#1E232F] text-white shadow-xl shadow-black/25 dark:shadow-none p-5 sm:p-10 mb-6 sm:mb-8 border border-slate-700/60">
      {/* Semi-transparent Tech Code Matrix Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="/assets/aistudio/image_3b4adc30.png"
          alt="Tech Matrix Background"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-screen scale-105 transition-opacity"
        />
        {/* Dark grey atmospheric gradient wash for transparent sleek look */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C212D]/90 via-[#282F3E]/75 to-[#161A23]/85" />
      </div>

      {/* Subtle backdrop decorative glow circles */}
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 right-1/3 w-80 h-80 rounded-full bg-slate-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading, Subtitle & Action Button */}
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Platform Pembelajaran Karir No. 1</span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Tingkatkan Skillmu <br className="hidden sm:inline" />
            Bersama <span className="text-amber-300">SKILLUP!</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-lg leading-relaxed font-normal">
            Akses ribuan materi pembelajaran berkualitas industri untuk masa depan yang lebih baik, dibimbing langsung oleh praktisi berpengalaman.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openClassroom(1)} // Opens Python untuk Data Science
              className="group px-5 sm:px-6 py-3 sm:py-3.5 bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-black/20 hover:bg-slate-100 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>100% Interaktif & Bersertifikat</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-fidelity Vector Illustration matching the showcase screenshot */}
        <div className="md:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-[240px] sm:max-w-[280px] aspect-4/3 flex items-center justify-center">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-600/20 to-amber-300/10 rounded-full blur-xl" />

            {/* Floating Graphic Badges: Lively Animated Python Logo (No White Background) */}
            <div
              onClick={() => openClassroom(1)}
              title="Mulai Belajar Python untuk Data Science"
              className="absolute -top-4 left-2 sm:left-4 z-20 group cursor-pointer animate-python-alive"
            >
              {/* Dual-tone Ambient Pulsing Glow Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-400/40 via-amber-400/35 to-blue-500/40 rounded-full blur-md animate-python-glow pointer-events-none" />

              {/* Glassmorphic Badge Shell with 0% White Background */}
              <div className="relative p-2.5 sm:p-3 rounded-2xl bg-[#0B1120]/80 backdrop-blur-md border border-sky-400/50 group-hover:border-amber-400/70 shadow-xl shadow-sky-950/50 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                {/* Twinkling energetic star sparkle */}
                <div className="absolute -top-1 -right-1 text-amber-300 animate-python-twinkle pointer-events-none">
                  <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
                </div>

                {/* Authentic Lively Python Vector Graphic (Fully Alpha-Transparent) */}
                <svg
                  viewBox="0 0 128 128"
                  className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:rotate-6 drop-shadow-[0_2px_10px_rgba(56,189,248,0.55)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="heroPyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="50%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#1E40AF" />
                    </linearGradient>
                    <linearGradient id="heroPyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDE047" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                    <radialGradient id="eyeGleam" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#94A3B8" />
                    </radialGradient>
                  </defs>

                  {/* Top Blue Snake */}
                  <path
                    fill="url(#heroPyBlue)"
                    d="M63.5 12.3c-23.7 0-22.2 10.3-22.2 10.3l.1 10.7h22.6v3.2H32.6S17 34.7 17 58.4c0 23.6 13.6 22.8 13.6 22.8h8.1v-11.4s-.4-13.6 13.3-13.6h22.8s12.9.2 12.9-12.6V25.2s1.8-12.9-24.2-12.9z"
                  />
                  {/* Blue Snake Lively Eye with reflection */}
                  <circle cx="50.2" cy="23.6" r="4.2" fill="url(#eyeGleam)" />
                  <circle cx="51" cy="23" r="1.8" fill="#0F172A" />
                  <circle cx="52" cy="22.2" r="0.7" fill="#FFFFFF" />

                  {/* Bottom Yellow Snake */}
                  <path
                    fill="url(#heroPyYellow)"
                    d="M64.5 115.7c23.7 0 22.2-10.3 22.2-10.3l-.1-10.7H64v-3.2h31.4s15.6 1.8 15.6-21.9c0-23.6-13.6-22.8-13.6-22.8h-8.1v11.4s.4 13.6-13.3 13.6H53.2s-12.9-.2-12.9 12.6v19.8s-1.8 12.9 24.2 12.9zm13.3-6.9c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4-2 4.4-4.4 4.4-4.4 4.4-4.4z"
                  />
                  {/* Yellow Snake Lively Eye with reflection */}
                  <circle cx="77.8" cy="104.4" r="4.2" fill="url(#eyeGleam)" />
                  <circle cx="78.6" cy="103.8" r="1.8" fill="#0F172A" />
                  <circle cx="79.6" cy="103" r="0.7" fill="#FFFFFF" />

                  {/* Sleek Gloss Highlights */}
                  <path
                    d="M63 15c-15 0-18 6-18 10l.1 4h18v-4s1-10 18-10H63z"
                    fill="#FFFFFF"
                    opacity="0.22"
                  />
                  <path
                    d="M65 113c15 0 18-6 18-10l-.1-4H65v4s-1 10-18 10h18z"
                    fill="#FFFFFF"
                    opacity="0.28"
                  />
                </svg>

                {/* Micro tooltip label */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  Python 3.12 🐍
                </span>
              </div>
            </div>

            {/* Floating Graphic Badges: Lively Animated MySQL Logo (No White Background, Replacing Play button) */}
            <div
              onClick={() => openClassroom(2)}
              title="Mulai Belajar MySQL Database Fundamental"
              className="absolute -top-2 right-1 sm:right-3 z-20 group cursor-pointer animate-mysql-alive"
            >
              {/* Dual-tone Ocean Blue & Amber Ambient Glow Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/35 via-blue-500/30 to-amber-500/35 rounded-full blur-md animate-mysql-glow pointer-events-none" />

              {/* Glassmorphic Badge Shell with 0% White Background */}
              <div className="relative p-2 sm:p-2.5 rounded-2xl bg-[#0B1120]/80 backdrop-blur-md border border-cyan-400/50 group-hover:border-amber-400/70 shadow-xl shadow-cyan-950/50 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                {/* Twinkling energetic water droplet sparkle */}
                <div className="absolute -top-1 -left-1 text-cyan-300 animate-mysql-twinkle pointer-events-none">
                  <Sparkles className="w-3.5 h-3.5 fill-cyan-300" />
                </div>

                {/* Transparent MySQL Logo (White Background Removed) */}
                <img
                  src="/assets/aistudio/mysql_logo_transparent.png"
                  alt="MySQL Logo"
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_2px_10px_rgba(0,117,143,0.6)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
                />

                {/* Micro tooltip label */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  MySQL 8.0 🐬
                </span>
              </div>
            </div>

            {/* Floating Graphic Badges: Lively Animated React Logo (No White Background, Replacing BarChart button) */}
            <div
              onClick={() => openClassroom(3)}
              title="Mulai Belajar Web Development with React"
              className="absolute bottom-1 -right-2 sm:-right-3 z-20 group cursor-pointer animate-react-alive"
            >
              {/* Electric Cyan Ambient Glow Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/40 via-sky-500/35 to-indigo-500/40 rounded-full blur-md animate-react-glow pointer-events-none" />

              {/* Glassmorphic Badge Shell with 0% White Background */}
              <div className="relative p-2 sm:p-2.5 rounded-2xl bg-[#0B1120]/80 backdrop-blur-md border border-cyan-400/50 group-hover:border-cyan-300/80 shadow-xl shadow-cyan-950/50 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                {/* Twinkling energetic electron sparkle */}
                <div className="absolute -top-1 -right-1 text-cyan-300 animate-react-twinkle pointer-events-none">
                  <Sparkles className="w-3.5 h-3.5 fill-cyan-300" />
                </div>

                {/* Transparent React Logo with Slow Lively Spin and Glow */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center animate-react-spin">
                  <img
                    src="/assets/aistudio/react_logo_transparent.png"
                    alt="React Logo"
                    className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,216,255,0.75)]"
                  />
                </div>

                {/* Micro tooltip label */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  React 19 ⚛️
                </span>
              </div>
            </div>

            {/* Floating Graphic Badges: Lively Animated 3D Data Analysis Bar Chart (No White Background) */}
            <div
              onClick={() => openClassroom(4)}
              title="Mulai Belajar Data Analysis with Python"
              className="absolute bottom-1 -left-2 sm:-left-3 z-20 group cursor-pointer animate-chart-alive"
            >
              {/* Dual-tone Cyan & Teal Ambient Glow Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/40 via-blue-500/35 to-teal-400/40 rounded-full blur-md animate-chart-glow pointer-events-none" />

              {/* Glassmorphic Badge Shell with 0% White Background */}
              <div className="relative p-2 sm:p-2.5 rounded-2xl bg-[#0B1120]/80 backdrop-blur-md border border-cyan-400/50 group-hover:border-teal-300/80 shadow-xl shadow-cyan-950/50 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                {/* Twinkling energetic chart sparkle */}
                <div className="absolute -top-1 -left-1 text-teal-300 animate-python-twinkle pointer-events-none">
                  <Sparkles className="w-3.5 h-3.5 fill-teal-300" />
                </div>

                {/* Transparent 3D Bar Chart with lively undulating animation */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center animate-chart-bars">
                  <img
                    src="/assets/aistudio/data_analysis_chart_transparent.png"
                    alt="Data Analysis with Python"
                    className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(6,182,212,0.65)]"
                  />
                </div>

                {/* Micro tooltip label */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-teal-400/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  Data Analysis 📊
                </span>
              </div>
            </div>

            {/* Central Student & Laptop Vector Illustration */}
            <svg
              className="w-full h-auto drop-shadow-2xl"
              viewBox="0 0 320 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Desk / Base */}
              <ellipse cx="160" cy="215" rx="130" ry="16" fill="rgba(255,255,255,0.12)" />

              {/* Student Body (Dark Grey Charcoal Hoodie) */}
              <path
                d="M100 220C100 170 120 150 160 150C200 150 220 170 220 220H100Z"
                fill="#2B313E"
              />
              <path
                d="M125 150C125 150 140 170 160 170C180 170 195 150 195 150"
                stroke="#4B5563"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Student Face / Hair */}
              <circle cx="160" cy="115" r="28" fill="#FCD34D" />
              {/* Hair */}
              <path
                d="M135 110C135 90 150 82 170 82C188 82 192 92 192 105C186 100 176 100 168 103C155 107 142 106 135 110Z"
                fill="#1E232F"
              />
              {/* Friendly Eyes and Smile */}
              <circle cx="152" cy="116" r="2.5" fill="#1E232F" />
              <circle cx="168" cy="116" r="2.5" fill="#1E232F" />
              <path
                d="M156 126C158 129 162 129 164 126"
                stroke="#1E232F"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Modern Sleek Laptop */}
              <path
                d="M120 185L135 140H185L200 185H120Z"
                fill="#0F172A"
              />
              <rect
                x="133"
                y="143"
                width="54"
                height="36"
                rx="3"
                fill="#1E293B"
              />
              {/* Code lines on laptop screen */}
              <line x1="138" y1="151" x2="160" y2="151" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <line x1="138" y1="157" x2="175" y2="157" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="144" y1="163" x2="168" y2="163" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
              <line x1="138" y1="169" x2="154" y2="169" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />

              {/* Laptop Keyboard Base */}
              <path
                d="M110 185H210L220 200H100L110 185Z"
                fill="#374151"
              />
              <rect x="145" y="190" width="30" height="4" rx="2" fill="#94A3B8" />

              {/* Coffee Cup / Learning accessory */}
              <rect x="228" y="180" width="16" height="20" rx="3" fill="#F8FAFC" />
              <path d="M244 184H248C250 184 251 186 251 188V192C251 194 250 196 248 196H244" stroke="#F8FAFC" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
