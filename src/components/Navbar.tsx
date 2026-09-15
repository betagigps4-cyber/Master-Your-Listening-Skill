import React from 'react';
import {
  Headphones,
  Brain,
  BookOpen,
  LineChart,
  FileSpreadsheet,
  Zap,
  Trophy,
  Flame,
  Award,
  User,
  Ear
} from 'lucide-react';
import { StudentProfile } from '../types';

export type AppTab = 'practice' | 'adaptive' | 'drill' | 'guide' | 'educator' | 'export' | 'profile';

interface NavbarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  student: StudentProfile;
  totalQuestionsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  student,
  totalQuestionsCount
}) => {
  const badgeCount = student.unlockedBadgeIds?.length || 0;

  return (
    <nav className="relative z-30 border-b border-white/[0.07] bg-[#06080C]/85 backdrop-blur-2xl sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => onSelectTab('practice')}
          className="flex items-center gap-3 group focus:outline-none text-left"
          aria-label="Home"
        >
          <div className="p-2 sm:p-2.5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl sm:rounded-2xl shadow-lg shadow-orange-500/25 transform -rotate-3 group-hover:rotate-0 transition-transform">
            <Headphones className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight font-grotesk text-white">
                ListenMaster<span className="text-orange-400">.</span>
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Adaptive
              </span>
            </div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-mono hidden sm:block">
              Cognitive Auditory Ecosystem
            </p>
          </div>
        </button>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 bg-white/[0.03] p-1 rounded-2xl border border-white/[0.06]">
          <button
            onClick={() => onSelectTab('practice')}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
              currentTab === 'practice'
                ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 border border-orange-500/30 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Practice</span>
          </button>

          <button
            onClick={() => onSelectTab('adaptive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
              currentTab === 'adaptive'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Adaptive Mode</span>
          </button>

          <button
            onClick={() => onSelectTab('drill')}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
              currentTab === 'drill'
                ? 'bg-gradient-to-r from-orange-500/25 to-amber-500/25 text-orange-300 border border-orange-500/40 shadow-sm font-semibold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Ear className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden md:inline">Phoneme Drill</span>
          </button>

          <button
            onClick={() => onSelectTab('guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
              currentTab === 'guide'
                ? 'bg-gradient-to-r from-emerald-500/20 to-lime-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">How to Improve</span>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
              currentTab === 'profile'
                ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/20 text-amber-300 border border-amber-500/30 shadow-sm font-semibold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Badges</span>
            {badgeCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {badgeCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('educator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
              currentTab === 'educator'
                ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300 border border-violet-500/30 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Educator Portal</span>
          </button>

          <button
            onClick={() => onSelectTab('export')}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
              currentTab === 'export'
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reports</span>
          </button>
        </div>

        {/* User Stats / Badges Profile Widget */}
        <button
          onClick={() => onSelectTab('profile')}
          className="hidden lg:flex items-center gap-3 p-1 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] transition-all text-left focus:outline-none group cursor-pointer"
          title="Open Student Profile & Trophy Showcase"
        >
          <div className="flex items-center gap-2 pl-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-0.5 shadow-sm">
              <div className="w-full h-full rounded-[10px] bg-[#0A0D14] flex items-center justify-center text-xs font-bold font-mono text-amber-300 group-hover:text-white transition-colors">
                {student.name.split(' ').map((n) => n[0]).join('')}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                {student.name}
              </div>
              <div className="text-[9px] text-white/40 font-mono flex items-center gap-1">
                <span>{student.adaptiveRating} Elo</span>
                <span>•</span>
                <span className="text-amber-400 font-semibold">{badgeCount}/10 Trophies</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 border-l border-white/10 pl-3 pr-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-xs font-mono font-bold">
              <Flame className="w-3 h-3 fill-current" />
              <span>{student.streakDays}d</span>
            </div>
          </div>
        </button>
      </div>
    </nav>
  );
};
