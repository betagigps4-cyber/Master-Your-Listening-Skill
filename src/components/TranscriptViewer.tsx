import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, BookOpen, Volume2, Info, Eye, Layers } from 'lucide-react';
import { QuickDictionaryPopover } from './QuickDictionaryPopover';
import { AudioEngine } from '../services/audioEngine';
import { VOICE_PROFILES } from '../data/scenariosData';
import { VoiceId } from '../types';

interface TranscriptViewerProps {
  transcript: string;
  onWordLookup?: (word: string) => void;
  className?: string;
  showSpeakerBadges?: boolean;
}

interface SelectionState {
  word: string;
  position: { x: number; y: number };
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({
  transcript,
  onWordLookup,
  className = '',
  showSpeakerBadges = true
}) => {
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse turns with speaker badges or pure text
  const turns = React.useMemo(() => {
    if (!transcript) return [];
    const turnRegex = /\[(F[1-5]|M[1-5])\]([\s\S]*?)(?=\[(?:F[1-5]|M[1-5])\]|$)/g;
    let match: RegExpExecArray | null;
    const results: { voiceId: VoiceId; speakerName: string; speakerColor: string; text: string }[] = [];

    while ((match = turnRegex.exec(transcript)) !== null) {
      const voiceId = match[1] as VoiceId;
      const text = match[2].trim();
      const profile = VOICE_PROFILES[voiceId] || VOICE_PROFILES['F1'];
      results.push({
        voiceId,
        speakerName: profile.name,
        speakerColor: profile.color,
        text
      });
    }

    // Fallback if no tags
    if (results.length === 0) {
      results.push({
        voiceId: 'F1',
        speakerName: 'Narrator',
        speakerColor: '#F59E0B',
        text: transcript
      });
    }

    return results;
  }, [transcript]);

  // Listen for user text selection inside the transcript container
  const handleMouseUp = () => {
    const activeSel = window.getSelection();
    if (!activeSel || activeSel.isCollapsed || !activeSel.toString().trim()) {
      return;
    }

    const selectedText = activeSel.toString().trim();
    // Validate that the selection is inside this container
    if (containerRef.current && containerRef.current.contains(activeSel.anchorNode)) {
      // Pick first word if multi-word or just single word
      const words = selectedText.split(/\s+/).filter(Boolean);
      const targetWord = words[0].replace(/^[^\w]+|[^\w]+$/g, '');

      if (targetWord && targetWord.length >= 2) {
        try {
          const range = activeSel.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          setSelection({
            word: targetWord,
            position: {
              x: rect.left + rect.width / 2,
              y: rect.bottom
            }
          });

          if (onWordLookup) {
            onWordLookup(targetWord);
          }
        } catch (e) {
          console.warn('Error computing selection rect', e);
        }
      }
    }
  };

  // Allow double-clicking any word directly
  const handleWordDoubleClick = (e: React.MouseEvent<HTMLSpanElement>, rawWord: string) => {
    e.stopPropagation();
    const clean = rawWord.replace(/^[^\w]+|[^\w]+$/g, '');
    if (!clean) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setSelection({
      word: clean,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.bottom
      }
    });

    if (onWordLookup) {
      onWordLookup(clean);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseUp={handleMouseUp}
      className={`relative select-text ${className}`}
    >
      {/* Visual Quick Dictionary helper tooltip banner */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-[10px] font-mono text-white/40">
        <div className="flex items-center gap-1.5 text-amber-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Quick Dictionary Active</span>
        </div>
        <span className="hidden sm:inline">Highlight or double-click any word for definitions & pronunciation</span>
      </div>

      {/* Transcript Turns */}
      <div className="space-y-3 font-mono text-xs sm:text-sm leading-relaxed">
        {turns.map((turn, tIdx) => {
          // Tokenize into words to allow discrete double-click interactions
          const words = turn.text.split(/(\s+)/);

          return (
            <div
              key={tIdx}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-start gap-2.5"
            >
              {showSpeakerBadges && (
                <div className="flex items-center gap-1.5 sm:w-28 shrink-0 select-none">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: turn.speakerColor }}
                  />
                  <span
                    className="text-[11px] font-bold truncate"
                    style={{ color: turn.speakerColor }}
                  >
                    [{turn.voiceId}] {turn.speakerName}
                  </span>
                </div>
              )}

              <div className="flex-1 text-white/80 leading-relaxed">
                {words.map((chunk, wIdx) => {
                  const isWord = /^\w+$/.test(chunk.replace(/^[^\w]+|[^\w]+$/g, ''));
                  if (!isWord) {
                    return <span key={wIdx}>{chunk}</span>;
                  }

                  return (
                    <span
                      key={wIdx}
                      onDoubleClick={(e) => handleWordDoubleClick(e, chunk)}
                      className="cursor-pointer hover:bg-orange-500/20 hover:text-orange-200 rounded px-0.5 transition-colors"
                      title="Double-click or highlight for quick definition & pronunciation"
                    >
                      {chunk}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Popover overlay */}
      {selection && (
        <QuickDictionaryPopover
          word={selection.word}
          position={selection.position}
          onClose={() => setSelection(null)}
        />
      )}
    </div>
  );
};
