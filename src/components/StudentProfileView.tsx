import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Sunrise,
  Sparkles,
  Flame,
  Zap,
  Crown,
  Hash,
  Moon,
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Lock,
  Clock,
  Target,
  BarChart3,
  Calendar,
  Layers,
  ChevronRight,
  Filter,
  User,
  Mail,
  ShieldCheck,
  Percent,
  TrendingUp
} from 'lucide-react';
import { StudentProfile, AttemptRecord, EvaluatedBadge, BadgeTier, BadgeCategory } from '../types';
import { BadgeService } from '../services/badgeService';
import { AdaptiveEngine } from '../services/adaptiveEngine';
import { StorageService } from '../services/storageService';
import { PhonemeHeatMap } from './PhonemeHeatMap';
import { SavedWordsHistoryLog } from './SavedWordsHistoryLog';

interface StudentProfileViewProps {
  student: StudentProfile;
  attempts: AttemptRecord[];
  onUpdateStudent: (updated: StudentProfile) => void;
  onNavigateToPractice?: () => void;
  onNavigateToPhonemeDrill?: (problemAreaKey?: string) => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  student,
  attempts,
  onUpdateStudent,
  onNavigateToPractice,
  onNavigateToPhonemeDrill
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<EvaluatedBadge | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(student.name);
  const [cohortInput, setCohortInput] = useState(student.cohort);

  // Evaluate real badges
  const evaluatedBadges = useMemo(() => {
    return BadgeService.evaluateBadges(student, attempts);
  }, [student, attempts]);

  // Statistics
  const unlockedCount = evaluatedBadges.filter((b) => b.isUnlocked).length;
  const totalBadges = evaluatedBadges.length;
  const badgeProgressPct = Math.round((unlockedCount / totalBadges) * 100);

  const cefrInfo = AdaptiveEngine.getCefrLevel(student.adaptiveRating);

  // Filtered badges
  const filteredBadges = useMemo(() => {
    return evaluatedBadges.filter((b) => {
      // Category filter
      if (activeCategoryFilter !== 'all' && b.category !== activeCategoryFilter) {
        return false;
      }
      // Status filter
      if (activeStatusFilter === 'unlocked' && !b.isUnlocked) {
        return false;
      }
      if (activeStatusFilter === 'locked' && b.isUnlocked) {
        return false;
      }
      return true;
    });
  }, [evaluatedBadges, activeCategoryFilter, activeStatusFilter]);

  // Render Icon dynamically
  const renderBadgeIcon = (iconName: string, tier: BadgeTier, isUnlocked: boolean) => {
    const iconProps = { className: `w-6 h-6 ${isUnlocked ? 'text-white' : 'text-white/40'}` };
    switch (iconName) {
      case 'Trophy':
        return <Trophy {...iconProps} />;
      case 'Sunrise':
        return <Sunrise {...iconProps} />;
      case 'Sparkles':
        return <Sparkles {...iconProps} />;
      case 'Flame':
        return <Flame {...iconProps} />;
      case 'Zap':
        return <Zap {...iconProps} />;
      case 'Crown':
        return <Crown {...iconProps} />;
      case 'Hash':
        return <Hash {...iconProps} />;
      case 'Moon':
        return <Moon {...iconProps} />;
      case 'GraduationCap':
        return <GraduationCap {...iconProps} />;
      case 'BookOpen':
        return <BookOpen {...iconProps} />;
      default:
        return <Award {...iconProps} />;
    }
  };

  // Tier color styling
  const getTierStyles = (tier: BadgeTier, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return {
        cardBorder: 'border-white/[0.06]',
        bg: 'bg-white/[0.01]',
        iconBg: 'bg-white/5 border border-white/10',
        glow: 'none',
        labelColor: 'text-white/40',
        badgeBg: 'bg-white/5 text-white/40 border-white/10'
      };
    }

    switch (tier) {
      case 'platinum':
        return {
          cardBorder: 'border-cyan-400/40 hover:border-cyan-400/70',
          bg: 'bg-gradient-to-br from-cyan-950/40 via-[#0C121E] to-[#07090E]',
          iconBg: 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30',
          glow: '0 0 24px rgba(6, 182, 212, 0.2)',
          labelColor: 'text-cyan-300',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
        };
      case 'gold':
        return {
          cardBorder: 'border-amber-400/40 hover:border-amber-400/70',
          bg: 'bg-gradient-to-br from-amber-950/40 via-[#18130B] to-[#07090E]',
          iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30',
          glow: '0 0 24px rgba(245, 158, 11, 0.2)',
          labelColor: 'text-amber-300',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
        };
      case 'silver':
        return {
          cardBorder: 'border-slate-300/40 hover:border-slate-300/70',
          bg: 'bg-gradient-to-br from-slate-900/50 via-[#11141C] to-[#07090E]',
          iconBg: 'bg-gradient-to-br from-slate-200 to-slate-400 shadow-lg shadow-slate-300/20',
          glow: '0 0 20px rgba(148, 163, 184, 0.15)',
          labelColor: 'text-slate-200',
          badgeBg: 'bg-slate-400/20 text-slate-200 border-slate-400/30'
        };
      case 'bronze':
        return {
          cardBorder: 'border-orange-500/40 hover:border-orange-500/70',
          bg: 'bg-gradient-to-br from-orange-950/40 via-[#160E08] to-[#07090E]',
          iconBg: 'bg-gradient-to-br from-orange-400 to-amber-600 shadow-lg shadow-orange-500/25',
          glow: '0 0 20px rgba(249, 115, 22, 0.18)',
          labelColor: 'text-orange-300',
          badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
        };
    }
  };

  const handleSaveProfile = () => {
    const updated: StudentProfile = {
      ...student,
      name: nameInput.trim() || student.name,
      cohort: cohortInput.trim() || student.cohort
    };
    StorageService.saveCurrentStudent(updated);
    onUpdateStudent(updated);
    setIsEditingProfile(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Student Identity Banner */}
      <div className="rounded-3xl p-6 sm:p-8 border border-white/[0.08] bg-gradient-to-br from-[#10141D] via-[#0C0F16] to-[#07090E] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Profile Details */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-500 p-0.5 shadow-xl shadow-orange-500/20">
                <div className="w-full h-full rounded-[15px] sm:rounded-[22px] bg-[#0A0D14] flex items-center justify-center text-xl sm:text-2xl font-bold font-mono text-orange-300">
                  {student.name.split(' ').map((n) => n[0]).join('')}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-emerald-500 text-black text-[9px] font-mono font-bold uppercase tracking-wider shadow">
                Active
              </div>
            </div>

            <div className="space-y-1">
              {isEditingProfile ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="px-3 py-1.5 bg-black/60 border border-white/20 rounded-lg text-white text-base font-bold focus:outline-none focus:border-orange-400"
                    placeholder="Candidate Name"
                  />
                  <input
                    type="text"
                    value={cohortInput}
                    onChange={(e) => setCohortInput(e.target.value)}
                    className="px-3 py-1 bg-black/60 border border-white/20 rounded-lg text-white/70 text-xs focus:outline-none focus:border-orange-400 block"
                    placeholder="Cohort Name"
                  />
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleSaveProfile}
                      className="px-3 py-1 rounded bg-orange-500 text-black font-semibold text-xs hover:bg-orange-400"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-3 py-1 rounded bg-white/10 text-white/70 text-xs hover:bg-white/20"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl sm:text-3xl font-extrabold text-white font-grotesk tracking-tight">
                      {student.name}
                    </h1>
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="text-[10px] font-mono text-white/40 hover:text-white/80 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-white/50 flex items-center gap-2 font-mono">
                    <Mail className="w-3 h-3 text-white/30" />
                    {student.email} • {student.cohort}
                  </p>
                  <p className="text-[11px] text-orange-400/80 font-mono">
                    Focus: {student.focusArea}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-[10px] font-mono text-white/40 uppercase">Listener Elo</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-amber-400 mt-0.5">
                {student.adaptiveRating}
              </div>
              <div className="text-[9px] font-mono text-amber-400/70">{cefrInfo.code} Standard</div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-[10px] font-mono text-white/40 uppercase">Accuracy</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-0.5">
                {student.averageAccuracy}%
              </div>
              <div className="text-[9px] font-mono text-emerald-400/70">Historical Avg</div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-[10px] font-mono text-white/40 uppercase">Streak</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-orange-400 mt-0.5 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                {student.streakDays}d
              </div>
              <div className="text-[9px] font-mono text-orange-400/70">Daily Habit</div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-[10px] font-mono text-white/40 uppercase">Listening</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400 mt-0.5">
                {Math.round(student.totalListeningSeconds / 60)}m
              </div>
              <div className="text-[9px] font-mono text-cyan-400/70">{student.completedSectionsCount} Scenarios</div>
            </div>
          </div>
        </div>
      </div>

      {/* D3-based Problem Area Phonemes & Word Types Heat Map */}
      <PhonemeHeatMap
        attempts={attempts}
        onLaunchPhonemeDrills={onNavigateToPhonemeDrill}
      />

      {/* Saved Words History Log from Quick Dictionary */}
      <SavedWordsHistoryLog onNavigateToPractice={onNavigateToPractice} />

      {/* Trophies & Milestones Showcase Header */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Trophy className="w-3.5 h-3.5" />
              Digital Trophy Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-grotesk">
              Earned Badges & Milestone Trophies
            </h2>
            <p className="text-xs sm:text-sm text-white/50 max-w-2xl">
              Real-time milestone achievements awarded for acoustic precision, speed calibration, habitual consistency, and advanced cognitive inference tasks.
            </p>
          </div>

          {/* Trophy Completion Progress Bar */}
          <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/[0.08] min-w-[260px] space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white/60">Trophies Unlocked</span>
              <span className="text-amber-400 font-bold">
                {unlockedCount} / {totalBadges} ({badgeProgressPct}%)
              </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${badgeProgressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Status filter: All vs Unlocked vs Locked */}
          <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
            <button
              onClick={() => setActiveStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeStatusFilter === 'all'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              All Trophies ({totalBadges})
            </button>
            <button
              onClick={() => setActiveStatusFilter('unlocked')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeStatusFilter === 'unlocked'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Unlocked ({unlockedCount})
            </button>
            <button
              onClick={() => setActiveStatusFilter('locked')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeStatusFilter === 'locked'
                  ? 'bg-white/10 text-white font-bold border border-white/20'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Locked ({totalBadges - unlockedCount})
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {[
              { key: 'all', label: 'All Categories' },
              { key: 'accuracy', label: 'Accuracy' },
              { key: 'consistency', label: 'Consistency' },
              { key: 'speed', label: 'Speed' },
              { key: 'mastery', label: 'Mastery' }
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategoryFilter(cat.key)}
                className={`px-2.5 py-1 rounded-lg transition-colors border ${
                  activeCategoryFilter === cat.key
                    ? 'bg-white/10 text-white border-white/20 font-bold'
                    : 'bg-transparent text-white/40 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trophies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredBadges.map((badge) => {
            const styles = getTierStyles(badge.tier, badge.isUnlocked);
            const isSelected = selectedBadge?.id === badge.id;

            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                style={{ boxShadow: styles.glow }}
                className={`p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between gap-4 ${styles.bg} ${styles.cardBorder} ${
                  isSelected ? 'ring-2 ring-amber-400/80 scale-[1.01]' : 'hover:scale-[1.01]'
                }`}
              >
                {/* Top Row: Tier badge & Unlock Status */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border ${styles.badgeBg}`}>
                    {badge.tier} Tier
                  </span>

                  {badge.isUnlocked ? (
                    <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Unlocked</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-white/30 text-xs font-mono">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </div>
                  )}
                </div>

                {/* Trophy Medallion & Title */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${styles.iconBg}`}
                  >
                    {renderBadgeIcon(badge.icon, badge.tier, badge.isUnlocked)}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {badge.title}
                    </h3>
                    <p className={`text-xs font-mono ${styles.labelColor}`}>
                      {badge.subtitle}
                    </p>
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                      {badge.description}
                    </p>
                  </div>
                </div>

                {/* Progress Bar & Metric */}
                <div className="pt-2 border-t border-white/[0.06] space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-white/40">Milestone Progress</span>
                    <span className={badge.isUnlocked ? 'text-emerald-400 font-bold' : 'text-white/70'}>
                      {badge.currentCount} / {badge.targetCount} {badge.unit}
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        badge.isUnlocked
                          ? 'bg-emerald-400'
                          : 'bg-gradient-to-r from-amber-500 to-orange-400'
                      }`}
                      style={{ width: `${badge.progressPercent}%` }}
                    />
                  </div>

                  {badge.isUnlocked && badge.unlockedAt && (
                    <p className="text-[10px] font-mono text-white/30 text-right">
                      Earned on {new Date(badge.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Badge Milestone Inspection Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md anim-fade">
          <div className="w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#0D1017] border border-white/10 shadow-2xl relative space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                    getTierStyles(selectedBadge.tier, selectedBadge.isUnlocked).iconBg
                  }`}
                >
                  {renderBadgeIcon(selectedBadge.icon, selectedBadge.tier, selectedBadge.isUnlocked)}
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-white/10 text-white/60">
                    {selectedBadge.tier} Tier • {selectedBadge.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedBadge.title}</h3>
                  <p className="text-xs text-amber-400 font-mono">{selectedBadge.subtitle}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="text-xs font-mono uppercase text-white/40">Criteria & Objectives</div>
              <p className="text-sm text-white/80 leading-relaxed">{selectedBadge.description}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/50">Current Progress</span>
                <span className="text-white font-bold">
                  {selectedBadge.currentCount} / {selectedBadge.targetCount} {selectedBadge.unit} ({selectedBadge.progressPercent}%)
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    selectedBadge.isUnlocked ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                  style={{ width: `${selectedBadge.progressPercent}%` }}
                />
              </div>
            </div>

            {selectedBadge.isUnlocked ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="font-bold">Digital Trophy Verified in Student Registry</p>
                  <p className="text-[11px] opacity-80">
                    Officially recorded in your academic audit trail and exportable in official candidate transcripts.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold">Milestone Pending</p>
                  <p className="text-[11px] opacity-80">
                    Complete targeted exercises in Practice or Adaptive Mode to unlock this trophy.
                  </p>
                </div>
                {onNavigateToPractice && (
                  <button
                    onClick={() => {
                      setSelectedBadge(null);
                      onNavigateToPractice();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-semibold text-xs shrink-0 hover:bg-amber-400 transition-colors"
                  >
                    Practice Now
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
