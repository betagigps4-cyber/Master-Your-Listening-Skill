import React, { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  Volume2,
  VolumeX,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Compass,
  ArrowRight,
  Activity,
  Clock
} from 'lucide-react';
import { Question, AIExplanation, ConfidenceLevel } from '../types';
import { AIExplanationService } from '../services/aiExplanationService';
import { AudioEngine } from '../services/audioEngine';
import { TranscriptContextInspector } from './TranscriptContextInspector';

interface InteractiveQuizProps {
  questions: Question[];
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  onSelectOption: (questionId: string, option: string) => void;
  onCheckAnswer: (questionId: string) => void;
  confidenceRatings?: Record<string, ConfidenceLevel>;
  onConfidenceChange?: (questionId: string, confidence: ConfidenceLevel) => void;
  transcript?: string;
  level?: string;
  onSeekToAudio?: (percent: number) => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  questions,
  answers,
  checked,
  onSelectOption,
  onCheckAnswer,
  confidenceRatings,
  onConfidenceChange,
  transcript = '',
  level = 'Intermediate',
  onSeekToAudio
}) => {
  // Store AI explanations per questionId
  const [explanations, setExplanations] = useState<Record<string, AIExplanation>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [showFullInspector, setShowFullInspector] = useState<Record<string, boolean>>({});
  const [playingSnippetKey, setPlayingSnippetKey] = useState<string | null>(null);
  const [localConfidence, setLocalConfidence] = useState<Record<string, ConfidenceLevel>>({});

  const handleSetConfidence = (questionId: string, level: ConfidenceLevel) => {
    setLocalConfidence((prev) => ({ ...prev, [questionId]: level }));
    if (onConfidenceChange) {
      onConfidenceChange(questionId, level);
    }
  };

  const getConfidence = (questionId: string): ConfidenceLevel => {
    return (confidenceRatings && confidenceRatings[questionId]) || localConfidence[questionId] || 'medium';
  };

  // Trigger AI explanation generation for incorrect answers
  const triggerExplanation = useCallback(
    async (q: Question, userAnswer: string, forceRefresh = false) => {
      if (!transcript || !userAnswer || userAnswer === q.correct) return;
      if (!forceRefresh && (explanations[q.id] || loading[q.id])) return;

      setLoading((prev) => ({ ...prev, [q.id]: true }));

      try {
        const result = await AIExplanationService.fetchExplanation({
          questionId: q.id,
          question: q.text,
          options: q.options,
          userAnswer,
          correctAnswer: q.correct,
          transcript,
          category: q.category,
          level
        });

        setExplanations((prev) => ({ ...prev, [q.id]: result }));
        // Expand by default when explanation arrives
        setCollapsed((prev) => ({ ...prev, [q.id]: false }));
      } catch (err) {
        console.error('Failed to generate AI explanation:', err);
      } finally {
        setLoading((prev) => ({ ...prev, [q.id]: false }));
      }
    },
    [transcript, level, explanations, loading]
  );

  // Monitor checked status in real time to generate explanations as soon as an incorrect answer is submitted
  useEffect(() => {
    questions.forEach((q) => {
      const isChecked = checked[q.id];
      const sel = answers[q.id];
      if (isChecked && sel && sel !== q.correct) {
        if (!explanations[q.id] && !loading[q.id]) {
          triggerExplanation(q, sel);
        }
      }
    });
  }, [checked, answers, questions, triggerExplanation, explanations, loading]);

  // Handle playing acoustic excerpt quote
  const handlePlayQuote = (snippetKey: string, quote: string) => {
    if (playingSnippetKey === snippetKey) {
      AudioEngine.stop();
      setPlayingSnippetKey(null);
    } else {
      setPlayingSnippetKey(snippetKey);
      AudioEngine.speakSnippet(quote, () => {
        setPlayingSnippetKey(null);
      });
    }
  };

  // Render highlighted cue inside transcript quote
  const renderHighlightedQuote = (quote: string, cue?: string, markColorClass: string = 'bg-emerald-500/30 text-emerald-200 border-b-2 border-emerald-400') => {
    if (!quote) return '';
    const cleanQuote = quote.replace(/\[(F[1-5]|M[1-5])\]/g, '').trim();
    if (!cue || !cleanQuote.toLowerCase().includes(cue.toLowerCase())) {
      return <span>"{cleanQuote}"</span>;
    }
    const escaped = cue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = cleanQuote.split(regex);
    return (
      <span>
        "
        {parts.map((part, i) =>
          part.toLowerCase() === cue.toLowerCase() ? (
            <mark
              key={i}
              className={`px-1 py-0.5 rounded font-bold not-italic ${markColorClass}`}
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
        "
      </span>
    );
  };

  // Helper to extract speaker tag if present
  const extractSpeakerBadge = (text: string) => {
    const match = text.match(/\[(F[1-5]|M[1-5])\]/);
    if (!match) return null;
    return match[1];
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {questions.map((q, idx) => {
        const sel = answers[q.id];
        const isChecked = checked[q.id];
        const isCorrect = isChecked && sel === q.correct;
        const isWrong = isChecked && sel && sel !== q.correct;
        const explanation = explanations[q.id];
        const isLoadingExplanation = loading[q.id];
        const isCollapsed = collapsed[q.id];

        return (
          <div
            key={q.id}
            id={`q-${q.id}`}
            className="space-y-4 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm transition-all"
          >
            {/* Question Header */}
            <div className="flex items-start gap-3 sm:gap-4">
              <span
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono text-sm sm:text-base font-bold shrink-0 border transition-all"
                style={{
                  backgroundColor: isChecked
                    ? isCorrect
                      ? 'rgba(34,197,94,0.15)'
                      : isWrong
                      ? 'rgba(239,68,68,0.15)'
                      : 'rgba(245,158,11,0.15)'
                    : 'rgba(255,255,255,0.04)',
                  borderColor: isChecked
                    ? isCorrect
                      ? 'rgba(34,197,94,0.4)'
                      : isWrong
                      ? 'rgba(239,68,68,0.4)'
                      : 'rgba(245,158,11,0.4)'
                    : 'rgba(255,255,255,0.08)',
                  color: isChecked
                    ? isCorrect
                      ? '#22C55E'
                      : isWrong
                      ? '#EF4444'
                      : '#F59E0B'
                    : '#FB923C'
                }}
              >
                {isChecked ? (isCorrect ? '✓' : isWrong ? '✗' : '!') : idx + 1}
              </span>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-white/30">
                    Question {idx + 1} of {questions.length}
                  </span>
                  {q.category && (
                    <span className="text-[8px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/40 border border-white/5">
                      {q.category}
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg text-white/90 font-medium leading-relaxed">
                  {q.text}
                </h3>
              </div>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-0 sm:pl-14">
              {q.options.map((opt) => {
                const isSelected = sel === opt;
                let optClasses =
                  'px-4 py-3 sm:py-3.5 rounded-xl text-left text-sm font-medium transition-all flex items-center justify-between border cursor-pointer';

                if (isChecked) {
                  if (opt === q.correct) {
                    optClasses +=
                      ' bg-emerald-500/20 border-emerald-500/50 text-emerald-200 shadow-md shadow-emerald-500/10';
                  } else if (isWrong && isSelected) {
                    optClasses +=
                      ' bg-red-500/20 border-red-500/50 text-red-200 shadow-md shadow-red-500/10';
                  } else {
                    optClasses +=
                      ' bg-white/[0.02] border-white/[0.05] text-white/30 opacity-40 cursor-default';
                  }
                } else if (isSelected) {
                  optClasses +=
                    ' bg-orange-500/20 border-orange-500 text-orange-200 shadow-md shadow-orange-500/15';
                } else {
                  optClasses +=
                    ' bg-white/[0.03] border-white/[0.08] text-white/70 hover:bg-white/[0.06] hover:border-white/20 hover:text-white';
                }

                return (
                  <button
                    key={opt}
                    disabled={isChecked}
                    onClick={() => onSelectOption(q.id, opt)}
                    className={optClasses}
                  >
                    <span>{opt}</span>
                    {isChecked && opt === q.correct && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {isChecked && isWrong && isSelected && (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Confidence Level Tagging for Metacognitive Calibration */}
            <div className="pl-0 sm:pl-14 pt-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span>Auditory Confidence Tag:</span>
                </div>

                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
                  <button
                    type="button"
                    disabled={isChecked}
                    onClick={() => handleSetConfidence(q.id, 'high')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      getConfidence(q.id) === 'high'
                        ? 'bg-emerald-500/25 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                    title="Certain - Clear auditory recognition"
                  >
                    <span>Certain</span>
                    <span className="text-[10px] opacity-70">100%</span>
                  </button>

                  <button
                    type="button"
                    disabled={isChecked}
                    onClick={() => handleSetConfidence(q.id, 'medium')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      getConfidence(q.id) === 'medium'
                        ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                    title="Likely - Fairly confident"
                  >
                    <span>Likely</span>
                    <span className="text-[10px] opacity-70">75%</span>
                  </button>

                  <button
                    type="button"
                    disabled={isChecked}
                    onClick={() => handleSetConfidence(q.id, 'low')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      getConfidence(q.id) === 'low'
                        ? 'bg-purple-500/25 text-purple-300 font-bold border border-purple-500/40 shadow-sm'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                    title="Guessing - Unsure / ambiguous acoustics"
                  >
                    <span>Guessing</span>
                    <span className="text-[10px] opacity-70">50%</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Check button or Result feedback */}
            <div className="pl-0 sm:pl-14 pt-1">
              {!isChecked ? (
                <button
                  disabled={!sel}
                  onClick={() => onCheckAnswer(q.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono transition-all ${
                    sel
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 cursor-pointer active:scale-95'
                      : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
                  }`}
                >
                  Verify Answer
                </button>
              ) : (
                <div className="space-y-3 anim-fade">
                  {/* Status Banner */}
                  {isCorrect ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Accurately Decoded</span>
                      </div>

                      {/* Metacognitive Calibration Badge */}
                      {getConfidence(q.id) === 'high' ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
                          🎯 Calibrated Mastery (+Adaptive Rating Bonus)
                        </div>
                      ) : getConfidence(q.id) === 'low' ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium">
                          🍀 Lucky Guess (Damped Rating Surge)
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
                          ⚖️ Calibrated Confidence
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-xs font-medium">
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span>Incorrect Perception</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/10">
                          <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            Target Answer: <strong>{q.correct}</strong>
                          </span>
                        </div>

                        {/* Metacognitive Calibration Badge for Incorrect */}
                        {getConfidence(q.id) === 'high' ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-medium">
                            ⚠️ Overconfidence Trap (Acoustic Blindspot Penalty)
                          </div>
                        ) : getConfidence(q.id) === 'low' ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono font-medium">
                            🔍 Calibrated Uncertainty (Self-Aware Ambiguity)
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
                            ⚖️ Moderate Calibration
                          </div>
                        )}
                      </div>

                      {/* Real-Time AI Explanation Loading State */}
                      {isLoadingExplanation && (
                        <div className="p-4 rounded-2xl bg-amber-500/[0.05] border border-amber-500/20 space-y-2.5 anim-fade">
                          <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                            <span>Synthesizing real-time AI auditory explanation from transcript...</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 bg-white/10 rounded animate-pulse w-3/4" />
                            <div className="h-2.5 bg-white/5 rounded animate-pulse w-full" />
                            <div className="h-2.5 bg-white/5 rounded animate-pulse w-5/6" />
                          </div>
                        </div>
                      )}

                      {/* Real-Time AI-Generated Explanation Panel */}
                      {explanation && !isLoadingExplanation && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/[0.08] via-orange-500/[0.04] to-black/30 border border-amber-500/30 space-y-4 shadow-lg shadow-amber-500/5 anim-fade">
                          {/* Top Header of Explanation */}
                          <div className="flex items-center justify-between gap-2 border-b border-white/[0.07] pb-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                                <Sparkles className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-amber-200">
                                Context-Aware Acoustic Feedback
                              </span>
                              {explanation.misinterpretationType && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/25 flex items-center gap-1">
                                  <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
                                  {explanation.misinterpretationType}
                                </span>
                              )}
                              {explanation.source === 'gemini' && (
                                <span className="text-[9px] font-mono text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                  Gemini 3.8 Flash
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {/* Refresh AI Analysis */}
                              <button
                                type="button"
                                onClick={() => triggerExplanation(q, sel, true)}
                                className="p-1.5 rounded-lg text-white/40 hover:text-amber-300 hover:bg-white/5 transition-colors cursor-pointer"
                                title="Re-generate explanation with AI"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>

                              {/* Collapse/Expand Toggle */}
                              <button
                                type="button"
                                onClick={() =>
                                  setCollapsed((prev) => ({ ...prev, [q.id]: !isCollapsed }))
                                }
                                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                                title={isCollapsed ? 'Expand explanation' : 'Collapse explanation'}
                              >
                                {isCollapsed ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronUp className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>

                          {!isCollapsed && (
                            <div className="space-y-4 anim-fade">
                              {/* Acoustic Contrast Summary Banner */}
                              {explanation.contrastSummary && (
                                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-2.5">
                                  <Compass className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                                  <div className="space-y-0.5 text-xs">
                                    <span className="font-mono font-bold uppercase text-[10px] tracking-wider text-orange-300 block">
                                      Auditory Contrast Summary
                                    </span>
                                    <p className="text-white/90 leading-relaxed font-mono text-[11px] sm:text-xs">
                                      {explanation.contrastSummary}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Misinterpretation Narrative */}
                              <div className="space-y-1">
                                <span className="text-[11px] uppercase tracking-wider font-mono text-amber-400 font-semibold block">
                                  ⚡ Distractor Trap & Misperception Analysis:
                                </span>
                                <p className="text-xs sm:text-sm text-white/85 leading-relaxed pl-1">
                                  {explanation.distractorAnalysis}
                                </p>
                              </div>

                              {/* Comparative Transcript Part Cards */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {/* CARD 1: Misinterpreted Audio Part (The Trap) */}
                                {explanation.misinterpretedQuote && (
                                  <div className="p-3.5 rounded-xl bg-gradient-to-b from-rose-500/[0.12] to-black/40 border border-rose-500/30 space-y-2.5 flex flex-col justify-between">
                                    <div className="space-y-1.5">
                                      <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-rose-300 border-b border-rose-500/20 pb-1.5">
                                        <span className="flex items-center gap-1 font-bold">
                                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                                          Where The Audio Misled You
                                        </span>
                                        {extractSpeakerBadge(explanation.misinterpretedQuote) && (
                                          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                                            [{extractSpeakerBadge(explanation.misinterpretedQuote)}]
                                          </span>
                                        )}
                                      </div>

                                      <div className="text-[11px] text-rose-200/70 font-mono">
                                        You selected: <span className="font-bold text-rose-200 bg-rose-500/20 px-1 py-0.5 rounded">"{explanation.misinterpretedCue || sel}"</span>
                                      </div>

                                      <blockquote className="text-xs sm:text-sm text-rose-100 font-mono italic leading-relaxed pl-2 border-l-2 border-rose-500/50 py-1">
                                        {renderHighlightedQuote(
                                          explanation.misinterpretedQuote,
                                          explanation.misinterpretedCue || sel,
                                          'bg-rose-500/40 text-rose-100 border-b-2 border-rose-400'
                                        )}
                                      </blockquote>

                                      {explanation.misinterpretationReason && (
                                        <p className="text-[11px] text-rose-200/80 leading-relaxed italic pt-1">
                                          💡 {explanation.misinterpretationReason}
                                        </p>
                                      )}
                                    </div>

                                    {/* Action Buttons for Misinterpreted Quote */}
                                    <div className="flex items-center gap-2 pt-2 border-t border-rose-500/20">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handlePlayQuote(`${q.id}-mis`, explanation.misinterpretedQuote!)
                                        }
                                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                                          playingSnippetKey === `${q.id}-mis`
                                            ? 'bg-rose-500 text-white border-rose-400 font-bold shadow-md shadow-rose-500/30'
                                            : 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20'
                                        }`}
                                        title="Listen to the trap part you misinterpreted"
                                      >
                                        {playingSnippetKey === `${q.id}-mis` ? (
                                          <>
                                            <VolumeX className="w-3 h-3" />
                                            <span>Stop Audio</span>
                                          </>
                                        ) : (
                                          <>
                                            <Volume2 className="w-3 h-3" />
                                            <span>Hear Trap Audio</span>
                                          </>
                                        )}
                                      </button>

                                      {onSeekToAudio && explanation.misinterpretedTimePercentEstimate !== undefined && (
                                        <button
                                          type="button"
                                          onClick={() => onSeekToAudio(explanation.misinterpretedTimePercentEstimate!)}
                                          className="px-2 py-1 rounded-lg text-[10px] font-mono border border-rose-500/20 bg-rose-500/5 text-rose-300/70 hover:text-rose-200 hover:bg-rose-500/15 transition-colors flex items-center gap-1 cursor-pointer"
                                          title="Seek primary audio player to this sentence"
                                        >
                                          <Activity className="w-3 h-3 text-rose-400" />
                                          <span>Seek Player</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* CARD 2: Correct Spoken Resolution */}
                                {explanation.acousticQuote && (
                                  <div className="p-3.5 rounded-xl bg-gradient-to-b from-emerald-500/[0.12] to-black/40 border border-emerald-500/30 space-y-2.5 flex flex-col justify-between">
                                    <div className="space-y-1.5">
                                      <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-emerald-300 border-b border-emerald-500/20 pb-1.5">
                                        <span className="flex items-center gap-1 font-bold">
                                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                          Target Spoken Proof
                                        </span>
                                        {extractSpeakerBadge(explanation.acousticQuote) && (
                                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                                            [{extractSpeakerBadge(explanation.acousticQuote)}]
                                          </span>
                                        )}
                                      </div>

                                      <div className="text-[11px] text-emerald-200/70 font-mono">
                                        Spoken cue: <span className="font-bold text-emerald-200 bg-emerald-500/20 px-1 py-0.5 rounded">"{explanation.cueHighlight || q.correct}"</span>
                                      </div>

                                      <blockquote className="text-xs sm:text-sm text-emerald-100 font-mono italic leading-relaxed pl-2 border-l-2 border-emerald-500/50 py-1">
                                        {renderHighlightedQuote(
                                          explanation.acousticQuote,
                                          explanation.cueHighlight || q.correct,
                                          'bg-emerald-500/40 text-emerald-100 border-b-2 border-emerald-400'
                                        )}
                                      </blockquote>

                                      <p className="text-[11px] text-emerald-200/80 leading-relaxed italic pt-1">
                                        💡 Target resolution confirmed by speaker.
                                      </p>
                                    </div>

                                    {/* Action Buttons for Correct Quote */}
                                    <div className="flex items-center gap-2 pt-2 border-t border-emerald-500/20">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handlePlayQuote(`${q.id}-cor`, explanation.acousticQuote!)
                                        }
                                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                                          playingSnippetKey === `${q.id}-cor`
                                            ? 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-md shadow-emerald-500/30'
                                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                                        }`}
                                        title="Listen to the authentic resolution quote"
                                      >
                                        {playingSnippetKey === `${q.id}-cor` ? (
                                          <>
                                            <VolumeX className="w-3 h-3" />
                                            <span>Stop Audio</span>
                                          </>
                                        ) : (
                                          <>
                                            <Volume2 className="w-3 h-3" />
                                            <span>Hear Target Proof</span>
                                          </>
                                        )}
                                      </button>

                                      {onSeekToAudio && explanation.correctTimePercentEstimate !== undefined && (
                                        <button
                                          type="button"
                                          onClick={() => onSeekToAudio(explanation.correctTimePercentEstimate!)}
                                          className="px-2 py-1 rounded-lg text-[10px] font-mono border border-emerald-500/20 bg-emerald-500/5 text-emerald-300/70 hover:text-emerald-200 hover:bg-emerald-500/15 transition-colors flex items-center gap-1 cursor-pointer"
                                          title="Seek primary audio player to this sentence"
                                        >
                                          <Activity className="w-3 h-3 text-emerald-400" />
                                          <span>Seek Player</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Toggle Detailed Full Transcript Inspector */}
                              <div className="pt-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowFullInspector((prev) => ({
                                      ...prev,
                                      [q.id]: !prev[q.id]
                                    }))
                                  }
                                  className="w-full py-2 px-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-white/70 hover:text-white transition-all text-xs font-mono flex items-center justify-between cursor-pointer"
                                >
                                  <span className="flex items-center gap-2">
                                    <Compass className="w-3.5 h-3.5 text-orange-400" />
                                    <span>
                                      {showFullInspector[q.id]
                                        ? 'Hide Full Transcript Context Map'
                                        : 'Inspect Misinterpretation in Full Spoken Dialogue'}
                                    </span>
                                  </span>
                                  <span className="text-[10px] font-mono text-white/40">
                                    {showFullInspector[q.id] ? '▲ Close Map' : '▼ Expand Map'}
                                  </span>
                                </button>

                                {showFullInspector[q.id] && transcript && (
                                  <div className="mt-3 anim-fade">
                                    <TranscriptContextInspector
                                      transcript={transcript}
                                      explanation={explanation}
                                      userAnswer={sel}
                                      correctAnswer={q.correct}
                                      onSeekToPercent={onSeekToAudio}
                                    />
                                  </div>
                                )}
                              </div>

                              {/* High-Impact Listening Strategy Tip */}
                              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                <div className="space-y-0.5">
                                  <span className="font-semibold text-[11px] uppercase tracking-wider font-mono text-amber-300 block">
                                    Auditory Exam Strategy:
                                  </span>
                                  <p className="text-xs text-white/80 leading-relaxed">
                                    {explanation.listeningTip}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
