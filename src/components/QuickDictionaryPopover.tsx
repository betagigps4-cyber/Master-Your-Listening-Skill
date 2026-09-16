import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Volume2,
  BookOpen,
  X,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Check,
  Headphones,
  MessageSquare,
  Repeat,
  Layers,
  HelpCircle,
  History,
  CheckCircle2,
  XCircle,
  GraduationCap
} from 'lucide-react';
import { WordDefinition, DictionaryService, WordQuiz } from '../services/dictionaryService';
import { AudioEngine } from '../services/audioEngine';
import { StorageService } from '../services/storageService';

interface QuickDictionaryPopoverProps {
  word: string;
  position: { x: number; y: number } | null;
  onClose: () => void;
  scenarioTranscript?: string;
  scenarioTitle?: string;
  onWordSavedChange?: (isSaved: boolean) => void;
}

export const QuickDictionaryPopover: React.FC<QuickDictionaryPopoverProps> = ({
  word,
  position,
  onClose,
  scenarioTranscript,
  scenarioTitle,
  onWordSavedChange
}) => {
  const [definitionData, setDefinitionData] = useState<WordDefinition | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSpeakingWord, setIsSpeakingWord] = useState<boolean>(false);
  const [isReadingDefinition, setIsReadingDefinition] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<boolean>(false);
  const [definitionMode, setDefinitionMode] = useState<'simple' | 'advanced'>('simple');
  const [showEtymology, setShowEtymology] = useState<boolean>(false);
  
  // Interactive quiz state
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [activeQuiz, setActiveQuiz] = useState<WordQuiz | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizAnswerChecked, setQuizAnswerChecked] = useState<boolean>(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  // Extract scenario usage snippet
  const scenarioSnippet = useMemo(() => {
    return DictionaryService.extractScenarioUsage(word, scenarioTranscript);
  }, [word, scenarioTranscript]);

  useEffect(() => {
    if (!word) return;
    let isMounted = true;
    setLoading(true);
    setQuizMode(false);
    setActiveQuiz(null);
    setSelectedQuizOption(null);
    setQuizAnswerChecked(false);

    // Stop any in-progress speech synthesis when switching words
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsReadingDefinition(false);

    // Check if word is already saved in history
    const savedWords = StorageService.getSavedWords();
    const cleanWord = DictionaryService.sanitizeWord(word);
    const existing = savedWords.find((w) => w.word.toLowerCase() === cleanWord);
    setIsSaved(!!existing);

    DictionaryService.lookupWord(word).then((data) => {
      if (isMounted) {
        setDefinitionData(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [word]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Pronounce word using AudioEngine
  const handlePronounce = (speed: number = 0.9) => {
    if (!definitionData) return;
    setIsSpeakingWord(true);
    AudioEngine.speakSnippet(definitionData.word, () => {
      setIsSpeakingWord(false);
    }, undefined, speed);
  };

  // Pronounce snippet in scenario
  const handlePronounceSnippet = () => {
    if (!scenarioSnippet) return;
    setIsSpeakingWord(true);
    AudioEngine.speakSnippet(scenarioSnippet, () => {
      setIsSpeakingWord(false);
    }, undefined, 0.95);
  };

  // Native SpeechSynthesis API: Read the definition aloud based on simple/advanced mode
  const handleReadDefinitionAloud = () => {
    if (!definitionData || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isReadingDefinition) {
      window.speechSynthesis.cancel();
      setIsReadingDefinition(false);
      return;
    }

    // Cancel any previous utterances
    window.speechSynthesis.cancel();

    const activeDefText =
      definitionMode === 'simple'
        ? (definitionData.simpleDefinition || definitionData.definition)
        : (definitionData.advancedDefinition || definitionData.definition);

    const textToRead = `${definitionData.word}. Defined as: ${activeDefText}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.default)
    );
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      setIsReadingDefinition(true);
    };

    utterance.onend = () => {
      setIsReadingDefinition(false);
    };

    utterance.onerror = () => {
      setIsReadingDefinition(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Toggle saving to user profile history
  const handleToggleSave = () => {
    if (!definitionData) return;
    const cleanWord = DictionaryService.sanitizeWord(definitionData.word);

    if (isSaved) {
      const savedWords = StorageService.getSavedWords();
      const match = savedWords.find((w) => w.word.toLowerCase() === cleanWord);
      if (match) {
        StorageService.removeSavedWord(match.id);
      }
      setIsSaved(false);
      onWordSavedChange?.(false);
    } else {
      StorageService.saveWord({
        word: cleanWord,
        phonetic: definitionData.phonetic,
        partOfSpeech: definitionData.partOfSpeech,
        definition: definitionData.definition,
        simpleDefinition: definitionData.simpleDefinition,
        advancedDefinition: definitionData.advancedDefinition,
        etymology: definitionData.etymology,
        cefrLevel: definitionData.cefrLevel,
        exampleSentence: definitionData.exampleSentence,
        acousticTip: definitionData.acousticTip,
        scenarioUsageSnippet: scenarioSnippet,
        scenarioTitle: scenarioTitle || 'Active Listening Scenario',
        synonyms: definitionData.synonyms
      });
      setIsSaved(true);
      setSaveSuccessNotice(true);
      setTimeout(() => setSaveSuccessNotice(false), 2200);
      onWordSavedChange?.(true);
    }
  };

  // Launch interactive Quiz
  const handleLaunchQuiz = () => {
    if (!definitionData) return;
    const quiz = DictionaryService.generateQuizForWord(word, definitionData, scenarioSnippet);
    setActiveQuiz(quiz);
    setSelectedQuizOption(null);
    setQuizAnswerChecked(false);
    setQuizMode(true);
  };

  // Submit quiz answer
  const handleSelectQuizOption = (option: string) => {
    if (quizAnswerChecked) return;
    setSelectedQuizOption(option);
    setQuizAnswerChecked(true);
  };

  // Close on outside click or Esc
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
  const popoverWidth = 380;
  const leftPos = Math.max(16, Math.min(window.innerWidth - popoverWidth - 20, position.x - popoverWidth / 2));
  // Position above the selection if near bottom, otherwise below
  const isNearBottom = position.y > window.innerHeight - 380;
  const topPos = isNearBottom ? Math.max(16, position.y - 410) : position.y + 12;

  // Highlight the target word inside the scenario snippet
  const renderHighlightedSnippet = (snippet: string, targetWord: string) => {
    const cleanWord = DictionaryService.sanitizeWord(targetWord);
    if (!cleanWord) return snippet;
    const parts = snippet.split(new RegExp(`(\\b${cleanWord}(?:s|ed|ing)?\\b)`, 'gi'));
    return parts.map((part, i) => {
      if (part.toLowerCase().startsWith(cleanWord)) {
        return (
          <span key={i} className="bg-amber-400/25 text-amber-200 font-bold px-1 py-0.5 rounded border border-amber-400/30">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div
      ref={popoverRef}
      style={{
        position: 'fixed',
        left: `${leftPos}px`,
        top: `${topPos}px`,
        zIndex: 9999
      }}
      className="w-[380px] max-w-[95vw] rounded-2xl bg-[#0E121A] border border-orange-500/40 shadow-2xl shadow-black/90 p-4 text-white text-xs anim-popover-enter select-none"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-orange-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Quick Dictionary</span>
          </div>

          {/* CEFR Level Badge if available */}
          {definitionData?.cefrLevel && (
            <span
              className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-[10px] font-bold"
              title={`Common European Framework Level: ${definitionData.cefrLevel}`}
            >
              CEFR {definitionData.cefrLevel}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Create Quiz Button */}
          {!quizMode && !loading && definitionData && (
            <button
              type="button"
              onClick={handleLaunchQuiz}
              className="px-2 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors cursor-pointer"
              title="Generate a quick fill-in-the-blank retention quiz for this word"
            >
              <HelpCircle className="w-3 h-3 text-amber-400" />
              <span>Create Quiz</span>
            </button>
          )}

          {/* Save to History Button */}
          <button
            type="button"
            onClick={handleToggleSave}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1 border transition-all cursor-pointer ${
              isSaved
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10'
            }`}
            title={isSaved ? 'Remove from Saved Words in User Profile' : 'Save to Profile History for Review'}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
            title="Close dictionary popover (Esc)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {saveSuccessNotice && (
        <div className="mb-2 p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono flex items-center justify-between anim-fade">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-400" />
            Word added to your Profile Saved Words log!
          </span>
        </div>
      )}

      {loading ? (
        <div className="py-6 flex flex-col items-center justify-center gap-2 text-white/50 font-mono text-xs">
          <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span>Looking up "{word}"...</span>
        </div>
      ) : quizMode && activeQuiz ? (
        /* Fill-in-the-blank Quiz Mode */
        <div className="space-y-3 anim-fade">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Retention Quiz: Fill in the Blank</span>
            </div>
            <button
              type="button"
              onClick={() => setQuizMode(false)}
              className="text-[10px] font-mono text-white/40 hover:text-white transition-colors"
            >
              Back to Definition
            </button>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/90 text-xs leading-relaxed font-sans italic">
            "{activeQuiz.questionSentence}"
          </div>

          <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">
            Select the correct target word:
          </div>

          <div className="grid grid-cols-2 gap-2">
            {activeQuiz.options.map((option, idx) => {
              const isSelected = selectedQuizOption === option;
              const isCorrect = option.toLowerCase() === activeQuiz.targetWord.toLowerCase();
              let btnClass = 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08] text-white';

              if (quizAnswerChecked) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-500/20 border-rose-500/50 text-rose-300 line-through';
                } else {
                  btnClass = 'opacity-40 border-white/5 text-white/40';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={quizAnswerChecked}
                  onClick={() => handleSelectQuizOption(option)}
                  className={`p-2 rounded-xl border text-xs font-mono text-left flex items-center justify-between transition-all cursor-pointer ${btnClass}`}
                >
                  <span className="capitalize">{option}</span>
                  {quizAnswerChecked && isCorrect && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  )}
                  {quizAnswerChecked && isSelected && !isCorrect && (
                    <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {quizAnswerChecked && (
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs space-y-1 anim-fade">
              <div className="font-bold font-mono text-[11px] flex items-center gap-1.5">
                {selectedQuizOption?.toLowerCase() === activeQuiz.targetWord.toLowerCase() ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Correct!
                  </span>
                ) : (
                  <span className="text-rose-400">Review Note</span>
                )}
              </div>
              <p className="text-[11px] text-white/80 leading-relaxed">
                {activeQuiz.explanation}
              </p>
              <button
                type="button"
                onClick={handleLaunchQuiz}
                className="mt-1 text-[10px] font-mono text-amber-400 hover:text-amber-300 underline"
              >
                Try another variation
              </button>
            </div>
          )}
        </div>
      ) : definitionData ? (
        <div className="space-y-3">
          {/* Word title, phonetic IPA, pronunciation audio, and definition reader */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <h4 className="text-base font-extrabold text-white capitalize font-grotesk tracking-tight truncate">
                  {definitionData.word}
                </h4>
                <span className="text-[11px] font-mono text-amber-300 font-medium shrink-0">
                  {definitionData.phonetic}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/40 italic">
                {definitionData.partOfSpeech}
              </span>
            </div>

            {/* Pronunciation & Native Speech Synthesis Controls */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Native SpeechSynthesis Play Audio button to read definition aloud */}
              <button
                type="button"
                onClick={handleReadDefinitionAloud}
                className={`px-2 py-1.5 rounded-xl border text-[10px] font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                  isReadingDefinition
                    ? 'bg-amber-400 text-black font-bold border-amber-300 shadow-md shadow-amber-400/20 animate-pulse'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25 hover:text-amber-200'
                }`}
                title="Play Audio: Read definition aloud using Browser SpeechSynthesis"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isReadingDefinition ? 'animate-bounce' : 'text-amber-400'}`} />
                <span>{isReadingDefinition ? 'Reading...' : 'Read Def'}</span>
              </button>

              {/* Word pronunciation via AudioEngine */}
              <button
                type="button"
                onClick={() => handlePronounce(0.9)}
                className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                  isSpeakingWord
                    ? 'bg-orange-500 text-black font-bold animate-pulse border-orange-400'
                    : 'bg-white/5 text-orange-400 border-white/10 hover:bg-white/15'
                }`}
                title="Pronounce word (0.9x)"
              >
                <Headphones className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handlePronounce(0.7)}
                className="px-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white border border-white/10 font-mono text-[9px] cursor-pointer"
                title="Pronounce slowly (0.7x) to study phonemes"
              >
                Slow
              </button>
            </div>
          </div>

          {/* Simple vs Advanced CEFR Definition Toggle */}
          <div className="flex items-center justify-between bg-white/[0.02] p-1 rounded-xl border border-white/[0.06] text-[10px] font-mono">
            <span className="text-white/40 pl-1.5">CEFR Complexity:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDefinitionMode('simple')}
                className={`px-2.5 py-0.5 rounded-lg transition-all cursor-pointer ${
                  definitionMode === 'simple'
                    ? 'bg-orange-500 text-black font-bold shadow'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                Simple (A1-B1)
              </button>
              <button
                type="button"
                onClick={() => setDefinitionMode('advanced')}
                className={`px-2.5 py-0.5 rounded-lg transition-all cursor-pointer ${
                  definitionMode === 'advanced'
                    ? 'bg-orange-500 text-black font-bold shadow'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                Advanced (B2-C2)
              </button>
            </div>
          </div>

          {/* Definition Box */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/90 leading-relaxed text-xs">
            {definitionMode === 'simple'
              ? (definitionData.simpleDefinition || definitionData.definition)
              : (definitionData.advancedDefinition || definitionData.definition)}
          </div>

          {/* Etymology / Word Origin Section */}
          {definitionData.etymology && (
            <div className="p-2.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/25 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-semibold">
                <div className="flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-amber-400" />
                  <span className="uppercase tracking-wider">Word Etymology & Linguistic Origin</span>
                </div>
                <span className="text-[9px] text-amber-300/70 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20 font-mono">
                  Etymology
                </span>
              </div>
              <p className="text-white/85 text-[11px] leading-relaxed font-sans pt-0.5">
                {definitionData.etymology}
              </p>
            </div>
          )}

          {/* Synonyms Section */}
          {definitionData.synonyms && definitionData.synonyms.length > 0 && (
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-orange-400 uppercase tracking-wider font-semibold">
                <Layers className="w-3 h-3 text-orange-400" />
                <span>Contextual Synonyms</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {definitionData.synonyms.map((syn, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-200 border border-orange-500/25 text-[11px] font-mono lowercase"
                  >
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Current Transcript Scenario Usage Example */}
          {scenarioSnippet && (
            <div className="p-2.5 rounded-xl bg-amber-500/[0.07] border border-amber-500/25 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3 text-amber-400" />
                  <span>Current Scenario Usage</span>
                </div>
                <button
                  type="button"
                  onClick={handlePronounceSnippet}
                  className="hover:text-amber-200 flex items-center gap-1 cursor-pointer font-normal normal-case"
                  title="Listen to full phrase as spoken in scenario"
                >
                  <Headphones className="w-3 h-3" />
                  <span>Listen phrase</span>
                </button>
              </div>
              <p className="text-xs text-white/90 leading-relaxed font-sans italic border-l-2 border-amber-400/50 pl-2">
                "{renderHighlightedSnippet(scenarioSnippet, definitionData.word)}"
              </p>
            </div>
          )}

          {/* Acoustic Tip */}
          {definitionData.acousticTip && (
            <div className="text-[11px] font-mono text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2 flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{definitionData.acousticTip}</span>
            </div>
          )}

          {/* Standard Lexical Example Sentence (if no scenario snippet or as additional) */}
          {!scenarioSnippet && definitionData.exampleSentence && (
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
