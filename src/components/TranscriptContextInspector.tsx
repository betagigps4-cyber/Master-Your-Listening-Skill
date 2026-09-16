import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Compass,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  Eye,
  Activity
} from 'lucide-react';
import { VoiceId, AIExplanation } from '../types';
import { VOICE_PROFILES } from '../data/scenariosData';
import { AudioEngine } from '../services/audioEngine';
import { QuickDictionaryPopover } from './QuickDictionaryPopover';

interface TranscriptSegment {
  id: string;
  index: number;
  voiceId: VoiceId | null;
  speakerName: string;
  speakerColor: string;
  rawText: string;
  cleanText: string;
  percentStart: number;
  estimatedSeconds: number;
  isMisinterpreted: boolean;
  isCorrectProof: boolean;
}

interface TranscriptContextInspectorProps {
  transcript: string;
  explanation: AIExplanation;
  userAnswer: string;
  correctAnswer: string;
  onSeekToPercent?: (percent: number) => void;
  compact?: boolean;
}

export const TranscriptContextInspector: React.FC<TranscriptContextInspectorProps> = ({
  transcript,
  explanation,
  userAnswer,
  correctAnswer,
  onSeekToPercent,
  compact = false
}) => {
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'focused' | 'full'>('full');
  const [dictionarySelection, setDictionarySelection] = useState<{
    word: string;
    position: { x: number; y: number };
  } | null>(null);

  // Estimate total audio duration
  const estimatedTotalSeconds = Math.round(AudioEngine.getEstimatedDuration(transcript));

  // Parse transcript into structured dialogue turns
  const segments: TranscriptSegment[] = React.useMemo(() => {
    if (!transcript) return [];

    // Split by speaker tag or sentences
    const rawParts = transcript.split(/(?<=[.?!])\s+/).filter(Boolean);
    const total = Math.max(1, rawParts.length);

    let currentVoice: VoiceId | null = null;

    return rawParts.map((part, idx) => {
      // Check for voice tag like [F4] or [M3]
      const voiceMatch = part.match(/\[(F[1-5]|M[1-5])\]/);
      if (voiceMatch) {
        currentVoice = voiceMatch[1] as VoiceId;
      }

      const cleanText = part.replace(/\[(F[1-5]|M[1-5])\]/g, '').trim();
      const profile = currentVoice ? VOICE_PROFILES[currentVoice] : null;

      const percentStart = Math.round((idx / total) * 100);
      const estimatedSeconds = Math.round((percentStart / 100) * estimatedTotalSeconds);

      // Check matching against explanation quotes
      const cleanMisQuote = (explanation.misinterpretedQuote || '').replace(/\[(F[1-5]|M[1-5])\]/g, '').trim().toLowerCase();
      const cleanCorQuote = (explanation.acousticQuote || '').replace(/\[(F[1-5]|M[1-5])\]/g, '').trim().toLowerCase();
      const lowerCleanText = cleanText.toLowerCase();

      // Check if this segment contains the misinterpreted quote or cue
      const isMis =
        (cleanMisQuote && (lowerCleanText.includes(cleanMisQuote) || cleanMisQuote.includes(lowerCleanText))) ||
        (explanation.misinterpretedCue && lowerCleanText.includes(explanation.misinterpretedCue.toLowerCase()) && !lowerCleanText.includes(explanation.cueHighlight?.toLowerCase() || ''));

      // Check if this segment contains the correct proof quote or cue
      const isCor =
        (cleanCorQuote && (lowerCleanText.includes(cleanCorQuote) || cleanCorQuote.includes(lowerCleanText))) ||
        (explanation.cueHighlight && lowerCleanText.includes(explanation.cueHighlight.toLowerCase()));

      return {
        id: `seg-${idx}`,
        index: idx,
        voiceId: currentVoice,
        speakerName: profile ? profile.name : currentVoice || 'Narrator',
        speakerColor: profile ? profile.color : '#F59E0B',
        rawText: part,
        cleanText,
        percentStart,
        estimatedSeconds,
        isMisinterpreted: Boolean(isMis),
        isCorrectProof: Boolean(isCor && !isMis) // Prioritize distinct marking
      };
    });
  }, [transcript, explanation, estimatedTotalSeconds]);

  // Handle playing individual audio segment
  const handlePlaySegment = (seg: TranscriptSegment) => {
    if (activePlayingId === seg.id) {
      AudioEngine.stop();
      setActivePlayingId(null);
    } else {
      setActivePlayingId(seg.id);
      AudioEngine.speakSnippet(
        seg.rawText,
        () => setActivePlayingId(null),
        seg.voiceId || undefined
      );
    }
  };

  // Helper to highlight cue within text
  const renderHighlightedSegmentText = (
    text: string,
    cue?: string,
    highlightClass: string = 'bg-amber-400/25 text-amber-200 border-b border-amber-400'
  ) => {
    if (!text) return '';
    if (!cue || !text.toLowerCase().includes(cue.toLowerCase())) {
      return <span>{text}</span>;
    }
    const escaped = cue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((p, i) =>
          p.toLowerCase() === cue.toLowerCase() ? (
            <mark
              key={i}
              className={`px-1 py-0.5 rounded font-semibold not-italic ${highlightClass}`}
            >
              {p}
            </mark>
          ) : (
            <span key={i}>{p}</span>
          )
        )}
      </>
    );
  };

  const displayedSegments =
    viewMode === 'focused'
      ? segments.filter((s) => s.isMisinterpreted || s.isCorrectProof)
      : segments;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/40 p-4 sm:p-5 space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Transcript Audio Map & Misinterpretation Tracer
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">
                {segments.length} Speech Turns
              </span>
            </div>
            <p className="text-[11px] text-white/50">
              Pinpoints exactly where your acoustic perception diverged from the spoken evidence.
            </p>
          </div>
        </div>

        {/* View toggle & Timeline badge */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'full' ? 'focused' : 'full')}
            className="px-2.5 py-1 rounded-lg text-[11px] font-mono border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3 h-3 text-orange-400" />
            <span>{viewMode === 'full' ? 'Show Focused Traps Only' : 'Show Full Dialogue'}</span>
          </button>
        </div>
      </div>

      {/* Chronological Contrast Timeline */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/40">
          <span>Acoustic Chronology</span>
          <span>Duration: ~{estimatedTotalSeconds}s</span>
        </div>
        <div className="relative h-2 rounded-full bg-white/5 overflow-hidden flex items-center">
          {segments.map((seg) => (
            <div
              key={seg.id}
              className={`h-full transition-all ${
                seg.isMisinterpreted
                  ? 'bg-rose-500/80 shadow-md shadow-rose-500/50 z-10 w-3'
                  : seg.isCorrectProof
                  ? 'bg-emerald-500/80 shadow-md shadow-emerald-500/50 z-10 w-3'
                  : 'bg-white/10 flex-1 border-r border-black/40'
              }`}
              title={`Turn ${seg.index + 1}: ${seg.cleanText.slice(0, 40)}...`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-white/50 pt-0.5">
          <div className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Misinterpreted Audio Trap: "{explanation.misinterpretedCue || userAnswer}"</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Spoken Proof: "{explanation.cueHighlight || correctAnswer}"</span>
          </div>
        </div>
      </div>

      {/* Structured Dialogue Turns */}
      <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
        {displayedSegments.map((seg) => {
          const isPlayingThis = activePlayingId === seg.id;

          let containerStyle =
            'p-3 sm:p-3.5 rounded-xl border transition-all relative flex flex-col sm:flex-row sm:items-start gap-3 ';
          if (seg.isMisinterpreted) {
            containerStyle +=
              'bg-gradient-to-r from-rose-500/[0.12] via-rose-500/[0.04] to-transparent border-rose-500/40 shadow-md shadow-rose-500/5 ring-1 ring-rose-500/30';
          } else if (seg.isCorrectProof) {
            containerStyle +=
              'bg-gradient-to-r from-emerald-500/[0.12] via-emerald-500/[0.04] to-transparent border-emerald-500/40 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/30';
          } else {
            containerStyle +=
              'bg-white/[0.02] border-white/[0.05] text-white/70 hover:bg-white/[0.04] hover:border-white/10';
          }

          return (
            <div key={seg.id} className={containerStyle}>
              {/* Speaker pill & time marker */}
              <div className="flex items-center gap-2 sm:flex-col sm:items-start sm:w-28 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: seg.speakerColor }}
                  />
                  <span
                    className="text-[11px] font-mono font-bold truncate"
                    style={{ color: seg.speakerColor }}
                  >
                    {seg.voiceId ? `[${seg.voiceId}]` : ''} {seg.speakerName}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-white/40">
                  <Clock className="w-2.5 h-2.5" />
                  <span>~{seg.estimatedSeconds}s ({seg.percentStart}%)</span>
                </div>
              </div>

              {/* Text content with targeted cue highlighting */}
              <div className="flex-1 space-y-1.5">
                {/* Misinterpreted Trap Badge */}
                {seg.isMisinterpreted && (
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-bold tracking-wide">
                    <AlertTriangle className="w-3 h-3 text-rose-400" />
                    <span>WHERE YOU GOT MISLED • Trap Mention</span>
                    {explanation.misinterpretationType && (
                      <span className="text-rose-400/80 font-normal">
                        ({explanation.misinterpretationType})
                      </span>
                    )}
                  </div>
                )}

                {/* Correct Spoken Resolution Badge */}
                {seg.isCorrectProof && (
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold tracking-wide">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>TARGET AUDIO EVIDENCE • Resolution</span>
                  </div>
                )}

                <p
                  className="text-xs sm:text-sm leading-relaxed text-white/90 font-mono select-text"
                  onMouseUp={(e) => {
                    e.stopPropagation();
                    const sel = window.getSelection();
                    if (sel && !sel.isCollapsed) {
                      const text = sel.toString().trim();
                      const word = text.split(/\s+/)[0]?.replace(/^[^\w]+|[^\w]+$/g, '');
                      if (word && word.length >= 2) {
                        const range = sel.getRangeAt(0);
                        const rect = range.getBoundingClientRect();
                        setDictionarySelection({
                          word,
                          position: {
                            x: rect.left + rect.width / 2,
                            y: rect.bottom
                          }
                        });
                      }
                    }
                  }}
                >
                  {seg.isMisinterpreted
                    ? renderHighlightedSegmentText(
                        seg.cleanText,
                        explanation.misinterpretedCue,
                        'bg-rose-500/30 text-rose-200 border-b-2 border-rose-400 font-bold'
                      )
                    : seg.isCorrectProof
                    ? renderHighlightedSegmentText(
                        seg.cleanText,
                        explanation.cueHighlight,
                        'bg-emerald-500/30 text-emerald-200 border-b-2 border-emerald-400 font-bold'
                      )
                    : seg.cleanText}
                </p>

                {/* Micro-Annotation for Misinterpreted Line */}
                {seg.isMisinterpreted && explanation.misinterpretationReason && (
                  <p className="text-[11px] text-rose-300/80 italic font-sans pl-2 border-l border-rose-500/30">
                    💡 <strong>Trap Analysis:</strong> {explanation.misinterpretationReason}
                  </p>
                )}
              </div>

              {/* Action Buttons for this segment */}
              <div className="flex items-center gap-1.5 self-end sm:self-start shrink-0 pt-1 sm:pt-0">
                {/* Play single speech turn */}
                <button
                  type="button"
                  onClick={() => handlePlaySegment(seg)}
                  className={`p-1.5 sm:px-2 sm:py-1 rounded-lg text-[11px] font-mono flex items-center gap-1 border transition-all cursor-pointer ${
                    isPlayingThis
                      ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-md shadow-amber-400/20'
                      : seg.isMisinterpreted
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/30 hover:bg-rose-500/30'
                      : seg.isCorrectProof
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                      : 'bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                  title="Listen to this exact speech line"
                >
                  {isPlayingThis ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Play</span>
                    </>
                  )}
                </button>

                {/* Seek main player to this timestamp */}
                {onSeekToPercent && (
                  <button
                    type="button"
                    onClick={() => onSeekToPercent(seg.percentStart)}
                    className="p-1.5 sm:px-2 sm:py-1 rounded-lg text-[11px] font-mono border border-white/10 bg-white/5 text-white/40 hover:text-orange-300 hover:border-orange-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                    title={`Seek main audio player to ~${seg.estimatedSeconds}s`}
                  >
                    <Activity className="w-3.5 h-3.5 text-orange-400" />
                    <span className="hidden sm:inline">Seek</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Dictionary Popover for Inspector selections */}
      {dictionarySelection && (
        <QuickDictionaryPopover
          word={dictionarySelection.word}
          position={dictionarySelection.position}
          onClose={() => setDictionarySelection(null)}
          scenarioTranscript={transcript}
        />
      )}
    </div>
  );
};
