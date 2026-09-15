import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Flame,
  Trophy,
  Ear,
  Target,
  ChevronRight,
  Sliders,
  HelpCircle,
  Activity,
  Layers,
  Award
} from 'lucide-react';
import { AttemptRecord } from '../types';
import {
  PhonemeDrillService,
  PhonemeDrillSet,
  PhonemeDrillChallenge
} from '../services/phonemeDrillService';
import { AudioEngine } from '../services/audioEngine';
import { SoundEffects } from '../services/soundEffects';

interface PhonemeDrillTabProps {
  attempts: AttemptRecord[];
  onGoToHeatMap?: () => void;
}

export const PhonemeDrillTab: React.FC<PhonemeDrillTabProps> = ({
  attempts,
  onGoToHeatMap
}) => {
  // Load dynamic drill sets tailored from the D3 heat map analysis
  const drillSets = useMemo(() => {
    return PhonemeDrillService.getDrillSetsForProblemAreas(attempts);
  }, [attempts]);

  // Active Selected Drill Set
  const [selectedSetKey, setSelectedSetKey] = useState<string>(() => {
    return drillSets.length > 0 ? drillSets[0].problemAreaKey : '';
  });

  // Ensure selectedSetKey is always valid
  useEffect(() => {
    if (!drillSets.some((s) => s.problemAreaKey === selectedSetKey) && drillSets.length > 0) {
      setSelectedSetKey(drillSets[0].problemAreaKey);
    }
  }, [drillSets, selectedSetKey]);

  const activeSet: PhonemeDrillSet | undefined = useMemo(() => {
    return drillSets.find((s) => s.problemAreaKey === selectedSetKey) || drillSets[0];
  }, [drillSets, selectedSetKey]);

  // Challenge Session State
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [sessionAnswers, setSessionAnswers] = useState<Record<number, boolean>>({});
  const [isSessionComplete, setIsSessionComplete] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.9);
  const [repetitionCount, setRepetitionCount] = useState<number>(0);
  const sessionStartTimeRef = useRef<number>(Date.now());

  // Current Challenge
  const currentChallenge: PhonemeDrillChallenge | undefined = activeSet?.drills[challengeIndex];

  // Reset challenge when switching sets
  const handleSelectSet = (key: string) => {
    setSelectedSetKey(key);
    setChallengeIndex(0);
    setSelectedOptionId(null);
    setIsChecked(false);
    setSessionScore(0);
    setSessionAnswers({});
    setIsSessionComplete(false);
    setRepetitionCount(0);
    sessionStartTimeRef.current = Date.now();
    AudioEngine.stop();
  };

  // Play target audio snippet
  const handlePlayAudio = (repeatNotice = true) => {
    if (!currentChallenge) return;
    setIsSpeaking(true);
    if (repeatNotice) {
      setRepetitionCount((prev) => prev + 1);
    }

    AudioEngine.speakSnippet(
      currentChallenge.audioPromptSnippet,
      () => {
        setIsSpeaking(false);
      }
    );
  };

  // Auto-play sound on index change or set switch
  useEffect(() => {
    if (currentChallenge && !isSessionComplete) {
      // Small timeout to allow component mount
      const timer = setTimeout(() => {
        handlePlayAudio(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [challengeIndex, selectedSetKey]);

  // Verify Choice
  const handleCheckAnswer = () => {
    if (!selectedOptionId || !currentChallenge || isChecked) return;

    const isCorrect = selectedOptionId === currentChallenge.correctOptionId;
    setIsChecked(true);
    setSessionAnswers((prev) => ({ ...prev, [challengeIndex]: isCorrect }));

    if (isCorrect) {
      setSessionScore((prev) => prev + 1);
      SoundEffects.playQuestionTick(true);
    } else {
      SoundEffects.playQuestionTick(false);
    }
  };

  // Next Challenge or Complete
  const handleNextChallenge = () => {
    if (!activeSet) return;
    if (challengeIndex < activeSet.drills.length - 1) {
      setChallengeIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsChecked(false);
      setRepetitionCount(0);
    } else {
      // Complete Session
      setIsSessionComplete(true);
      SoundEffects.playGoalAchievedFanfare();

      const timeSpent = Math.round((Date.now() - sessionStartTimeRef.current) / 1000);
      const totalCount = activeSet.drills.length;
      const finalScore = Math.round(((sessionScore + (selectedOptionId === currentChallenge?.correctOptionId ? 0 : 0)) / totalCount) * 100);

      PhonemeDrillService.saveDrillHistory({
        id: `drill-${Date.now()}`,
        problemAreaKey: activeSet.problemAreaKey,
        phonemeSymbol: activeSet.phonemeSymbol,
        timestamp: Date.now(),
        totalChallenges: totalCount,
        correctChallenges: sessionScore,
        scorePercent: finalScore,
        timeSpentSeconds: timeSpent
      });
    }
  };

  // Restart Current Drill Set
  const handleRestartSet = () => {
    setChallengeIndex(0);
    setSelectedOptionId(null);
    setIsChecked(false);
    setSessionScore(0);
    setSessionAnswers({});
    setIsSessionComplete(false);
    setRepetitionCount(0);
    sessionStartTimeRef.current = Date.now();
    handlePlayAudio(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-orange-500/[0.04] via-black/40 to-black/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Ear className="w-3.5 h-3.5" />
              Targeted Acoustic Rehabilitation
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-grotesk tracking-tight flex items-center gap-3">
              Phoneme Isolation Drills
            </h1>
            <p className="text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
              These high-repetition listening challenges directly isolate the acoustic bottleneck phonemes and distractors flagged as <strong className="text-rose-400 font-semibold">problem areas</strong> in your D3 Heat Map analysis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onGoToHeatMap && (
              <button
                onClick={onGoToHeatMap}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Heat Map Analysis</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Problem Selector Sidebar + Drill Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Problem Areas Identified from Heat Map (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono uppercase tracking-wider text-white/40 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-orange-400" />
              Heat Map Problem Areas ({drillSets.length})
            </span>
            <span className="text-[10px] font-mono text-white/30">Ranked by Error Rate</span>
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {drillSets.map((set) => {
              const isSelected = set.problemAreaKey === selectedSetKey;
              const isCritical = set.heatMapErrorRate >= 50;

              return (
                <button
                  key={set.problemAreaKey}
                  onClick={() => handleSelectSet(set.problemAreaKey)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-orange-500/15 border-orange-500/40 shadow-lg shadow-orange-500/10'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md font-mono text-xs font-bold bg-white/10 text-white">
                        {set.phonemeSymbol}
                      </span>
                      <span className="font-semibold text-xs text-white truncate max-w-[150px]">
                        {set.phonemeName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isCritical
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {set.heatMapErrorRate}% Error
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed">
                    {set.diagnosticRationale}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-white/30 pt-1 border-t border-white/[0.04]">
                    <span>{set.drills.length} High-Rep Challenges</span>
                    <span className="capitalize">{set.category}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Drill Arena (lg:col-span-8) */}
        <div className="lg:col-span-8">
          {activeSet && !isSessionComplete ? (
            <div className="p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] space-y-6">
              {/* Challenge Header & Progress Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      {activeSet.phonemeSymbol}
                    </span>
                    <h2 className="text-lg font-bold text-white font-grotesk">{activeSet.phonemeName}</h2>
                  </div>

                  <div className="text-xs font-mono text-white/40">
                    Challenge {challengeIndex + 1} of {activeSet.drills.length}
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-1.5">
                  {activeSet.drills.map((_, idx) => {
                    const isPassed = sessionAnswers[idx] === true;
                    const isFailed = sessionAnswers[idx] === false;
                    const isCurrent = idx === challengeIndex;

                    return (
                      <div
                        key={idx}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          isCurrent
                            ? 'bg-orange-400'
                            : isPassed
                            ? 'bg-emerald-400'
                            : isFailed
                            ? 'bg-rose-500'
                            : 'bg-white/10'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Acoustic Audio Playback Panel */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-orange-400 flex items-center justify-center sm:justify-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    High-Repetition Acoustic Stream
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-white">
                    {currentChallenge?.promptQuestion}
                  </h3>
                  <div className="text-xs font-mono text-white/40">
                    Listen to the distinct acoustic cues, vowel length, and consonant releases.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlayAudio(true)}
                    className={`px-5 py-3 rounded-xl font-mono text-xs flex items-center gap-2.5 transition-all cursor-pointer shadow-lg ${
                      isSpeaking
                        ? 'bg-orange-500 text-black font-bold animate-pulse shadow-orange-500/30'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isSpeaking ? 'Playing...' : 'Play Audio'}</span>
                  </button>

                  <div className="text-[10px] font-mono text-white/30 hidden sm:block">
                    Replays: {repetitionCount}
                  </div>
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-white/40 tracking-wider">
                  Select the Correct Phonetic Formulation:
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {currentChallenge?.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    const isCorrect = opt.id === currentChallenge.correctOptionId;

                    let btnStyle = 'bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/5';
                    if (isChecked) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-500/15 border-rose-500/50 text-rose-300 line-through';
                      } else {
                        btnStyle = 'bg-white/[0.01] border-white/[0.04] text-white/30';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-orange-500/20 border-orange-500/50 text-orange-200 font-semibold';
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={isChecked}
                        onClick={() => setSelectedOptionId(opt.id)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-white/70">
                            {opt.id.slice(-1).toUpperCase()}
                          </span>
                          <span className="font-medium">{opt.text}</span>
                        </div>

                        {isChecked && (
                          <div>
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-rose-400" />
                            ) : null}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Diagnostic Feedback / Trap Analysis on Verification */}
              {isChecked && currentChallenge && (
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    {selectedOptionId === currentChallenge.correctOptionId ? (
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono uppercase">
                        <CheckCircle2 className="w-4 h-4" />
                        Accurate Acoustic Discrimination!
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-rose-400 font-bold text-xs font-mono uppercase">
                        <AlertTriangle className="w-4 h-4" />
                        Phonetic Distractor Trap Triggered
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-white/90 leading-relaxed">
                    {currentChallenge.explanation}
                  </p>

                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs font-mono text-orange-300">
                    <span className="text-[10px] uppercase text-orange-400/70 block mb-0.5 font-bold">
                      Acoustic Trap Tip:
                    </span>
                    {currentChallenge.acousticTrapTip}
                  </div>
                </div>
              )}

              {/* Action Bar (Check Answer / Next Challenge) */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <button
                  onClick={() => handlePlayAudio(true)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-listen</span>
                </button>

                {!isChecked ? (
                  <button
                    disabled={!selectedOptionId}
                    onClick={handleCheckAnswer}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-xs font-mono tracking-wide transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
                  >
                    Verify Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold text-xs font-mono tracking-wide flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    <span>{challengeIndex < activeSet.drills.length - 1 ? 'Next Challenge' : 'Complete Drill'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : isSessionComplete && activeSet ? (
            /* SESSION COMPLETION MASTERY REPORT */
            <div className="p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-emerald-500/10 via-black/40 to-black/60 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center mx-auto shadow-xl">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                  Phoneme Drill Completed
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-grotesk">
                  {activeSet.phonemeName} ({activeSet.phonemeSymbol})
                </h2>
                <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                  You successfully executed the high-repetition listening challenges targeting this acoustic problem area.
                </p>
              </div>

              {/* Score Metric Ring */}
              <div className="inline-flex items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 gap-6">
                <div>
                  <div className="text-3xl font-extrabold font-grotesk text-emerald-400">
                    {Math.round((sessionScore / activeSet.drills.length) * 100)}%
                  </div>
                  <div className="text-[10px] font-mono text-white/40 uppercase mt-0.5">Accuracy Score</div>
                </div>

                <div className="w-px h-10 bg-white/10" />

                <div>
                  <div className="text-3xl font-extrabold font-grotesk text-white">
                    {sessionScore}/{activeSet.drills.length}
                  </div>
                  <div className="text-[10px] font-mono text-white/40 uppercase mt-0.5">Challenges Correct</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestartSet}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Repeat This Drill</span>
                </button>

                {drillSets.length > 1 && (
                  <button
                    onClick={() => {
                      const nextIndex = (drillSets.findIndex((s) => s.problemAreaKey === selectedSetKey) + 1) % drillSets.length;
                      handleSelectSet(drillSets[nextIndex].problemAreaKey);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-semibold font-mono text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                  >
                    <span>Practice Next Problem Area</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-white/40 font-mono">
              No problem area selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
