import React, { useState, useEffect, useCallback } from 'react';
import {
  Timer,
  Target,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  X,
  Award,
  Bell
} from 'lucide-react';
import { DeepWorkSession, DeepWorkPreset, DeepWorkStatus } from '../types';
import { SoundEffects } from '../services/soundEffects';

const PRESETS: DeepWorkPreset[] = [
  {
    id: 'sprint',
    label: 'Quick Sprint',
    targetQuestions: 3,
    targetMinutes: 4,
    description: 'Complete 1 scenario with high acoustic focus',
    tag: '3 Qs • 4m'
  },
  {
    id: 'focus',
    label: 'Focus Block',
    targetQuestions: 6,
    targetMinutes: 8,
    description: 'Solve 2 full units maintaining steady rhythm',
    tag: '6 Qs • 8m'
  },
  {
    id: 'mastery',
    label: 'Mastery Stamina',
    targetQuestions: 9,
    targetMinutes: 12,
    description: 'Tackle 3 units under timed academic conditions',
    tag: '9 Qs • 12m'
  },
  {
    id: 'immersion',
    label: 'Deep Immersion',
    targetQuestions: 15,
    targetMinutes: 20,
    description: 'Extended Pomodoro sprint across progressive levels',
    tag: '15 Qs • 20m'
  }
];

interface DeepWorkTimerProps {
  session: DeepWorkSession;
  onUpdateSession: (updater: (prev: DeepWorkSession) => DeepWorkSession) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  onGoalMet: (session: DeepWorkSession) => void;
}

export const DeepWorkTimer: React.FC<DeepWorkTimerProps> = ({
  session,
  onUpdateSession,
  isOpen,
  onToggleOpen,
  onGoalMet
}) => {
  const [customQuestions, setCustomQuestions] = useState<number>(session.targetQuestions || 6);
  const [customMinutes, setCustomMinutes] = useState<number>(session.targetMinutes || 8);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [notificationPermissionRequested, setNotificationPermissionRequested] = useState<boolean>(false);

  // Sync sound setting
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    SoundEffects.setSoundEnabled(next);
  };

  // Timer Tick Engine
  useEffect(() => {
    if (session.status !== 'running') return;

    const timer = setInterval(() => {
      onUpdateSession((prev) => {
        if (prev.status !== 'running') return prev;

        const nextRemaining = prev.timeRemainingSeconds - 1;

        // Warning at 60 seconds
        if (nextRemaining === 60) {
          SoundEffects.playTimeWarningChime();
        }

        // Time Expired
        if (nextRemaining <= 0) {
          SoundEffects.playTimeExpiredChime();
          return {
            ...prev,
            timeRemainingSeconds: 0,
            status: 'expired'
          };
        }

        return {
          ...prev,
          timeRemainingSeconds: nextRemaining
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session.status, onUpdateSession]);

  // Request browser notification permission once user initiates
  const handleRequestNotifications = async () => {
    setNotificationPermissionRequested(true);
    await SoundEffects.requestNotificationPermission();
  };

  // Start Session with selected parameters
  const handleStartSession = (questionsCount: number, minutesCount: number) => {
    const totalSecs = minutesCount * 60;
    SoundEffects.playStartChime();
    handleRequestNotifications();

    onUpdateSession(() => ({
      targetQuestions: questionsCount,
      targetMinutes: minutesCount,
      totalDurationSeconds: totalSecs,
      timeRemainingSeconds: totalSecs,
      completedQuestionsCount: 0,
      correctQuestionsCount: 0,
      status: 'running',
      startedAt: Date.now(),
      completedAt: null
    }));
  };

  // Pause / Resume
  const handleTogglePlayPause = () => {
    if (session.status === 'running') {
      onUpdateSession((prev) => ({ ...prev, status: 'paused' }));
    } else if (session.status === 'paused') {
      onUpdateSession((prev) => ({ ...prev, status: 'running' }));
    }
  };

  // Quick Time Extension (+2 Minutes)
  const handleAddMinutes = (additionalMinutes: number) => {
    onUpdateSession((prev) => {
      const addedSecs = additionalMinutes * 60;
      return {
        ...prev,
        totalDurationSeconds: prev.totalDurationSeconds + addedSecs,
        timeRemainingSeconds: prev.timeRemainingSeconds + addedSecs,
        status: prev.status === 'expired' ? 'running' : prev.status
      };
    });
  };

  // Reset Session
  const handleResetSession = () => {
    onUpdateSession((prev) => ({
      ...prev,
      timeRemainingSeconds: prev.totalDurationSeconds,
      completedQuestionsCount: 0,
      correctQuestionsCount: 0,
      status: 'idle',
      startedAt: null,
      completedAt: null
    }));
  };

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPct = session.targetQuestions > 0
    ? Math.min(100, Math.round((session.completedQuestionsCount / session.targetQuestions) * 100))
    : 0;

  const timeUsedSeconds = Math.max(0, session.totalDurationSeconds - session.timeRemainingSeconds);
  const timeProgressPct = session.totalDurationSeconds > 0
    ? Math.min(100, Math.round((timeUsedSeconds / session.totalDurationSeconds) * 100))
    : 0;

  const isWarning = session.status === 'running' && session.timeRemainingSeconds <= 60;
  const accuracyPct = session.completedQuestionsCount > 0
    ? Math.round((session.correctQuestionsCount / session.completedQuestionsCount) * 100)
    : 100;

  // Render minimized floating bar if active and user minimized
  if (session.status !== 'idle' && isMinimized) {
    return (
      <div className="p-3 rounded-2xl bg-[#0D111A]/95 border border-orange-500/40 shadow-xl backdrop-blur-md flex items-center justify-between gap-3 text-xs anim-fade">
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${session.status === 'running' ? 'bg-orange-500 animate-ping' : 'bg-amber-400'}`} />
          <div className="font-mono">
            <span className="text-white/40 uppercase text-[10px] mr-1.5">Deep Work:</span>
            <span className={`font-bold ${isWarning ? 'text-rose-400 animate-pulse' : 'text-orange-300'}`}>
              {formatTime(session.timeRemainingSeconds)}
            </span>
          </div>
          <span className="text-white/30">•</span>
          <div className="text-white/70 font-mono">
            {session.completedQuestionsCount}/{session.targetQuestions} Qs ({progressPct}%)
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleTogglePlayPause}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
            title={session.status === 'running' ? 'Pause' : 'Resume'}
          >
            {session.status === 'running' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsMinimized(false)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/70 hover:text-white transition-colors text-[10px] font-mono flex items-center gap-1"
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <span>Expand</span>
          </button>
        </div>
      </div>
    );
  }

  // If closed and idle, don't show the large card (the toggle button lives in the header)
  if (!isOpen && session.status === 'idle') {
    return null;
  }

  return (
    <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-b from-[#101420] to-[#0A0D15] p-5 sm:p-6 shadow-2xl relative overflow-hidden anim-fade space-y-5">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white font-grotesk">
                Deep Work Focus Timer
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Listening Sprint
              </span>
            </div>
            <p className="text-xs text-white/50">
              Complete target questions before time runs out to cultivate speed & accuracy.
            </p>
          </div>
        </div>

        {/* Header Utilities */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-white/[0.04] text-white/80 border-white/[0.08] hover:text-white'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}
            title={soundEnabled ? 'Sound alerts on' : 'Sound alerts muted'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {session.status !== 'idle' && (
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/60 hover:text-white transition-colors text-xs"
              title="Minimize to floating pill"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onToggleOpen}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/50 hover:text-white transition-colors text-xs"
            title="Hide Deep Work panel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mode A: Setup (When session is idle) */}
      {session.status === 'idle' && (
        <div className="space-y-5">
          {/* Presets Grid */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-orange-400" />
              <span>Select Focus Sprint Preset</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {PRESETS.map((preset) => {
                const isSelected =
                  customQuestions === preset.targetQuestions &&
                  customMinutes === preset.targetMinutes;

                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setCustomQuestions(preset.targetQuestions);
                      setCustomMinutes(preset.targetMinutes);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer group relative overflow-hidden ${
                      isSelected
                        ? 'bg-orange-500/20 border-orange-500/50 shadow-md shadow-orange-500/10'
                        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white group-hover:text-orange-200">
                        {preset.label}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-300 font-semibold">
                        {preset.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-snug line-clamp-2">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Steppers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            {/* Questions Target Stepper */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60 font-medium">Target Questions:</span>
                <span className="font-mono font-bold text-orange-300 text-sm">
                  {customQuestions} Questions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCustomQuestions((q) => Math.max(1, q - 1))}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 hover:text-white transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="flex-1 py-1.5 px-3 rounded-xl bg-black/40 border border-white/[0.06] text-center font-mono text-sm text-white">
                  {customQuestions}
                </div>
                <button
                  onClick={() => setCustomQuestions((q) => Math.min(30, q + 1))}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-white/40 block font-mono">
                ~{Math.round(customQuestions / 3)} scenario units (3 questions per unit)
              </span>
            </div>

            {/* Time Target Stepper */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60 font-medium">Time Frame:</span>
                <span className="font-mono font-bold text-orange-300 text-sm">
                  {customMinutes} Minutes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCustomMinutes((m) => Math.max(1, m - 1))}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 hover:text-white transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="flex-1 py-1.5 px-3 rounded-xl bg-black/40 border border-white/[0.06] text-center font-mono text-sm text-white">
                  {customMinutes} min
                </div>
                <button
                  onClick={() => setCustomMinutes((m) => Math.min(60, m + 1))}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-white/40 block font-mono">
                Pacing budget: ~{Math.round((customMinutes * 60) / customQuestions)} seconds per question
              </span>
            </div>
          </div>

          {/* Launch Sprint Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="text-xs text-white/50 flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-orange-400" />
              <span>Includes goal celebration chime & completion summary notification</span>
            </div>

            <button
              onClick={() => handleStartSession(customQuestions, customMinutes)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Begin Deep Work Sprint</span>
            </button>
          </div>
        </div>
      )}

      {/* Mode B: Active / Running / Paused / Expired */}
      {session.status !== 'idle' && (
        <div className="space-y-4">
          {/* Status & Clock Hero Display */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] items-center">
            {/* Clock */}
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                  session.status === 'expired'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    : isWarning
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 animate-pulse'
                    : 'bg-orange-500/15 border-orange-500/30 text-orange-400'
                }`}
              >
                <Timer className="w-7 h-7" />
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase text-white/40 flex items-center gap-1.5">
                  <span>Time Remaining</span>
                  {session.status === 'paused' && (
                    <span className="text-amber-400 font-bold">[PAUSED]</span>
                  )}
                  {session.status === 'expired' && (
                    <span className="text-rose-400 font-bold">[EXPIRED]</span>
                  )}
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${
                    session.status === 'expired'
                      ? 'text-rose-400'
                      : isWarning
                      ? 'text-amber-300'
                      : 'text-white'
                  }`}
                >
                  {formatTime(session.timeRemainingSeconds)}
                </div>
                <div className="text-[9px] font-mono text-white/30">
                  Total Budget: {session.targetMinutes}m
                </div>
              </div>
            </div>

            {/* Questions Progress */}
            <div className="space-y-1.5 sm:border-l sm:border-r border-white/[0.06] sm:px-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/40 uppercase text-[10px]">Target Questions</span>
                <span className="font-bold text-orange-300">
                  {session.completedQuestionsCount} / {session.targetQuestions}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>{progressPct}% Completed</span>
                <span className="text-emerald-400">
                  {session.correctQuestionsCount} Correct ({accuracyPct}%)
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-end gap-2">
              {session.status !== 'expired' && (
                <button
                  onClick={handleTogglePlayPause}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    session.status === 'running'
                      ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {session.status === 'running' ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Resume</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={() => handleAddMinutes(2)}
                className="px-3 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                title="Add 2 minutes to countdown"
              >
                <Plus className="w-3.5 h-3.5 text-orange-400" />
                <span>+2m</span>
              </button>

              <button
                onClick={handleResetSession}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-rose-500/10 hover:text-rose-300 border border-white/[0.08] text-white/40 transition-colors cursor-pointer"
                title="Reset or configure new sprint"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Time Expired Notice if expired */}
          {session.status === 'expired' && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 anim-fade">
              <div className="flex items-center gap-2 text-xs text-rose-300 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  Time budget expired! You solved {session.completedQuestionsCount} of {session.targetQuestions} questions ({progressPct}%).
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddMinutes(3)}
                  className="px-3 py-1.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+3m (Keep Going)</span>
                </button>
                <button
                  onClick={handleResetSession}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Start New Session
                </button>
              </div>
            </div>
          )}

          {/* Real-time Motivation Banner */}
          {session.status === 'running' && (
            <div className="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-black/30 border border-white/[0.04]">
              <span className="text-white/60 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Sprint active across sections: questions answered in any exercise count toward your goal!
                </span>
              </span>
              <span className="text-orange-400 font-mono text-[11px] font-bold">
                {session.targetQuestions - session.completedQuestionsCount} remaining
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
