import React, { useState, useEffect, useRef } from 'react';
import { Volume2, BookOpen, X, Sparkles, HelpCircle } from 'lucide-react';
import { WordDefinition, DictionaryService } from '../services/dictionaryService';
import { AudioEngine } from '../services/audioEngine';

interface QuickDictionaryPopoverProps {
  word: string;
  position: { x: number; y: number } | null;
  onClose: () => void;
}

export const QuickDictionaryPopover: React.FC<QuickDictionaryPopoverProps> = ({
  word,
  position,
  onClose
}) => {
  const [definitionData, setDefinitionData] = useState<WordDefinition | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!word) return;
    let isMounted = true;
    setLoading(true);

    DictionaryService.lookupWord(word).then((data) => {
      if (isMounted) {
        setDefinitionData(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [word]);

  // Pronounce word using AudioEngine
  const handlePronounce = (speed: number = 0.9) => {
    if (!definitionData) return;
    setIsSpeaking(true);
    AudioEngine.speakSnippet(definitionData.word, () => {
      setIsSpeaking(false);
    }, undefined, speed);
  };

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!position || !word) return null;

  // Position calculation to stay within viewport bounds
  const popoverWidth = 320;
  const leftPos = Math.max(16, Math.min(window.innerWidth - popoverWidth - 20, position.x - popoverWidth / 2));
  // Position above the selection if near bottom, otherwise below
  const isNearBottom = position.y > window.innerHeight - 250;
  const topPos = isNearBottom ? Math.max(16, position.y - 220) : position.y + 12;

  return (
    <div
      ref={popoverRef}
      style={{
        position: 'fixed',
        left: `${leftPos}px`,
        top: `${topPos}px`,
        zIndex: 9999
      }}
      className="w-80 rounded-2xl bg-[#0E121A] border border-orange-500/40 shadow-2xl shadow-black/80 p-4 text-white text-xs anim-fade select-none"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-2.5">
        <div className="flex items-center gap-1.5 text-orange-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Quick Dictionary</span>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Close dictionary popover (Esc)"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {loading ? (
        <div className="py-6 flex flex-col items-center justify-center gap-2 text-white/50 font-mono text-xs">
          <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span>Looking up "{word}"...</span>
        </div>
      ) : definitionData ? (
        <div className="space-y-3">
          {/* Word title, phonetic IPA, and speak buttons */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-2">
                <h4 className="text-base font-extrabold text-white capitalize font-grotesk tracking-tight">
                  {definitionData.word}
                </h4>
                <span className="text-[10px] font-mono text-amber-300 font-medium">
                  {definitionData.phonetic}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/40 italic">
                {definitionData.partOfSpeech}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePronounce(0.9)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-orange-500 text-black font-bold animate-pulse border-orange-400'
                    : 'bg-white/5 text-orange-400 border-white/10 hover:bg-white/15'
                }`}
                title="Pronounce at normal speed (0.9x)"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePronounce(0.7)}
                className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white border border-white/10 font-mono text-[10px] cursor-pointer"
                title="Pronounce slowly (0.7x) to study phonemes"
              >
                Slow
              </button>
            </div>
          </div>

          {/* Definition */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/80 leading-relaxed text-xs">
            {definitionData.definition}
          </div>

          {/* Acoustic Tip / Example */}
          {definitionData.acousticTip && (
            <div className="text-[11px] font-mono text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2 flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{definitionData.acousticTip}</span>
            </div>
          )}

          {definitionData.exampleSentence && (
            <div className="text-[11px] text-white/50 italic border-l-2 border-white/20 pl-2">
              "{definitionData.exampleSentence}"
            </div>
          )}
        </div>
      ) : (
        <div className="py-4 text-center text-white/40 font-mono text-xs">
          No definition found for "{word}".
        </div>
      )}
    </div>
  );
};
