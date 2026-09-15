import React, { useMemo } from 'react';
import { Mic, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PhonemeWarmupService } from '../services/phonemeWarmupService';

interface VoiceWarmupCardProps {
  transcript: string;
  scenarioTitle: string;
  onOpenWarmup: () => void;
  warmupScore?: number | null;
}

export const VoiceWarmupCard: React.FC<VoiceWarmupCardProps> = ({
  transcript,
  scenarioTitle,
  onOpenWarmup,
  warmupScore
}) => {
  const phonemes = useMemo(() => {
    return PhonemeWarmupService.extractScenarioPhonemes(transcript, scenarioTitle);
  }, [transcript, scenarioTitle]);

  const isCompleted = typeof warmupScore === 'number' && warmupScore > 0;

  return (
    <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/[0.07] via-amber-500/[0.04] to-black/20 backdrop-blur-sm space-y-3.5 anim-fade">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold">
                Voice Warmup Mode
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Primed ({warmupScore}%)</span>
                </span>
              )}
            </div>
            <p className="text-xs text-white/70">
              Practice speaking key phonemes in this scenario before listening to prime your auditory perception.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenWarmup}
          className={`px-4 py-2 sm:py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 ${
            isCompleted
              ? 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
              : 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 active:scale-95'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>{isCompleted ? 'Re-practice Sounds' : 'Start Voice Warmup'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Target Phonemes Mini Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/[0.06]">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
          Phonemes in this Dialogue:
        </span>
        {phonemes.map((p, idx) => (
          <span
            key={p.id ? `${p.id}-${idx}` : `warmup-${idx}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/[0.08] text-xs font-mono"
          >
            <strong className="text-amber-300">{p.phoneme}</strong>
            <span className="text-white/50 text-[11px]">in "{p.targetWord}"</span>
          </span>
        ))}
      </div>
    </div>
  );
};
