import React from 'react';
import {
  Target,
  Trophy,
  Sparkles,
  Clock,
  CheckCircle2,
  Zap,
  ArrowRight,
  RotateCcw,
  PlusCircle,
  X
} from 'lucide-react';
import { DeepWorkSession } from '../types';

interface DeepWorkGoalModalProps {
  session: DeepWorkSession | null;
  onClose: () => void;
  onStartNewSession: () => void;
  onExtendSession: (additionalQuestions: number, additionalMinutes: number) => void;
}

export const DeepWorkGoalModal: React.FC<DeepWorkGoalModalProps> = ({
  session,
  onClose,
  onStartNewSession,
  onExtendSession
}) => {
  if (!session || session.status !== 'completed') return null;

  const timeSpentSeconds = Math.max(1, session.totalDurationSeconds - session.timeRemainingSeconds);
  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;
  const timeFormatted = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  const timeSavedSeconds = Math.max(0, session.timeRemainingSeconds);
  const savedMinutes = Math.floor(timeSavedSeconds / 60);
  const savedSecs = timeSavedSeconds % 60;
  const savedFormatted = savedMinutes > 0 ? `${savedMinutes}m ${savedSecs}s` : `${savedSecs}s`;

  const accuracyPct = session.completedQuestionsCount > 0
    ? Math.round((session.correctQuestionsCount / session.completedQuestionsCount) * 100)
    : 0;

  const avgSecsPerQ = Math.round(timeSpentSeconds / Math.max(1, session.completedQuestionsCount));

  // Determine encouragement feedback
  let feedbackBadge = 'Flawless Auditory Precision';
  let feedbackDesc = 'Outstanding focus! You maintained high listening comprehension under time pressure.';

  if (accuracyPct === 100) {
    feedbackBadge = 'Perfect Accuracy & Focus';
    feedbackDesc = '100% correct answers with prompt auditory parsing. Superb deep work execution!';
  } else if (accuracyPct >= 75) {
    feedbackBadge = 'High Retention & Speed';
    feedbackDesc = 'Solid mastery of acoustic cues and numerical signposts while meeting strict pacing goals.';
  } else {
    feedbackBadge = 'Stamina & Discipline';
    feedbackDesc = 'Great dedication to the time block. Review any distractor answers to sharpen acoustic retention.';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md anim-fade">
      <div className="w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#141824] via-[#0E121B] to-[#07090E] border border-orange-500/40 shadow-2xl relative overflow-hidden text-center space-y-6">
        {/* Background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-orange-500/20 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-10 w-60 h-60 bg-amber-500/15 rounded-full filter blur-3xl pointer-events-none" />

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          title="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Deep Work Goal Achieved</span>
        </div>

        {/* Centered Achievement Medallion */}
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 p-1 shadow-2xl shadow-orange-500/30 flex items-center justify-center">
          <div className="w-full h-full rounded-[22px] bg-[#0A0D14] flex flex-col items-center justify-center">
            <Target className="w-11 h-11 text-orange-400 drop-shadow-md" />
            <span className="text-[10px] font-mono uppercase font-bold text-amber-300 tracking-wider mt-1">
              Goal Met
            </span>
          </div>
        </div>

        {/* Title and Feedback */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-grotesk tracking-tight">
            Target Completed!
          </h2>
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            {feedbackBadge}
          </div>
          <p className="text-xs sm:text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
            {feedbackDesc}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-[10px] font-mono text-white/40 uppercase">Questions</div>
            <div className="text-lg font-bold text-white font-mono mt-0.5">
              {session.completedQuestionsCount} <span className="text-xs text-white/40 font-normal">/ {session.targetQuestions}</span>
            </div>
            <div className="text-[9px] font-mono text-emerald-400">100% Target</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-[10px] font-mono text-white/40 uppercase">Time Used</div>
            <div className="text-lg font-bold text-orange-400 font-mono mt-0.5">
              {timeFormatted}
            </div>
            <div className="text-[9px] font-mono text-white/40">of {session.targetMinutes}m budget</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-[10px] font-mono text-white/40 uppercase">Accuracy</div>
            <div className={`text-lg font-bold font-mono mt-0.5 ${accuracyPct >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {accuracyPct}%
            </div>
            <div className="text-[9px] font-mono text-white/40">
              {session.correctQuestionsCount} of {session.completedQuestionsCount} correct
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-[10px] font-mono text-white/40 uppercase">Average Pace</div>
            <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">
              {avgSecsPerQ}s
            </div>
            <div className="text-[9px] font-mono text-white/40">per question</div>
          </div>
        </div>

        {/* Time saved bonus note if ahead of schedule */}
        {timeSavedSeconds > 0 && (
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 py-2 px-3 rounded-xl">
            <Zap className="w-3.5 h-3.5" />
            <span>Beat the clock by {savedFormatted}! Stellar pace.</span>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => onExtendSession(3, 4)}
              className="flex-1 py-3 px-4 rounded-xl border border-orange-500/40 bg-orange-500/15 hover:bg-orange-500/25 text-orange-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-orange-400" />
              <span>Extend (+3 Qs, +4 Min)</span>
            </button>

            <button
              onClick={onStartNewSession}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black text-xs font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Session Sprint</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Close & Continue Regular Practice
          </button>
        </div>
      </div>
    </div>
  );
};
