import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Bookmark,
  Volume2,
  Trash2,
  Search,
  BookOpen,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Clock,
  Filter,
  Check,
  AlertCircle,
  Layers,
  Download,
  FileText,
  FileSpreadsheet,
  History,
  ChevronDown
} from 'lucide-react';
import { SavedWordItem } from '../types';
import { StorageService } from '../services/storageService';
import { AudioEngine } from '../services/audioEngine';
import { DictionaryService } from '../services/dictionaryService';
import { VocabularyExportService } from '../services/vocabularyExportService';

interface SavedWordsHistoryLogProps {
  onNavigateToPractice?: () => void;
}

export const SavedWordsHistoryLog: React.FC<SavedWordsHistoryLogProps> = ({
  onNavigateToPractice
}) => {
  const [savedWords, setSavedWords] = useState<SavedWordItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<SavedWordItem | null>(null);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [filterPartOfSpeech, setFilterPartOfSpeech] = useState<string>('all');
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  const exportDropdownRef = useRef<HTMLDivElement>(null);

  // Load words from storage
  const loadWords = () => {
    const list = StorageService.getSavedWords();
    setSavedWords(list);
    if (list.length > 0 && !selectedWord) {
      setSelectedWord(list[0]);
    }
  };

  useEffect(() => {
    loadWords();
  }, []);

  // Listen for storage events (e.g. if updated in popover)
  useEffect(() => {
    const handleStorage = () => loadWords();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Close export dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(e.target as Node)) {
        setExportDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filtered words
  const filteredWords = useMemo(() => {
    return savedWords.filter((item) => {
      const matchesSearch =
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.scenarioTitle && item.scenarioTitle.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPOS =
        filterPartOfSpeech === 'all' ||
        item.partOfSpeech.toLowerCase().includes(filterPartOfSpeech.toLowerCase());

      return matchesSearch && matchesPOS;
    });
  }, [savedWords, searchQuery, filterPartOfSpeech]);

  // Audio pronunciation helper
  const handlePlayWord = (item: SavedWordItem, speed: number = 0.9) => {
    setActivePlayingId(item.id);
    AudioEngine.speakSnippet(item.word, () => {
      setActivePlayingId(null);
    }, undefined, speed);
  };

  // Play scenario usage sentence
  const handlePlayScenarioSnippet = (snippet: string, wordId: string) => {
    setActivePlayingId(`${wordId}-snippet`);
    AudioEngine.speakSnippet(snippet, () => {
      setActivePlayingId(null);
    }, undefined, 0.95);
  };

  // Delete word from history
  const handleDeleteWord = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    StorageService.removeSavedWord(id);
    const updated = savedWords.filter((w) => w.id !== id);
    setSavedWords(updated);
    if (selectedWord?.id === id) {
      setSelectedWord(updated[0] || null);
    }
  };

  // Clear all words
  const handleClearAll = () => {
    StorageService.clearAllSavedWords();
    setSavedWords([]);
    setSelectedWord(null);
    setClearConfirmOpen(false);
  };

  // Export handlers
  const handleExportCSV = () => {
    setExportDropdownOpen(false);
    VocabularyExportService.exportToCSV(savedWords);
  };

  const handleExportPDF = () => {
    setExportDropdownOpen(false);
    VocabularyExportService.exportToPDF(savedWords);
  };

  // Parts of speech list for filtering
  const availablePartsOfSpeech = useMemo(() => {
    const set = new Set<string>();
    savedWords.forEach((w) => {
      if (w.partOfSpeech) {
        const primary = w.partOfSpeech.split(/[\s,/]+/)[0].toLowerCase();
        if (primary) set.add(primary);
      }
    });
    return Array.from(set);
  }, [savedWords]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Bookmark className="w-3.5 h-3.5" />
            Quick Dictionary Log
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-grotesk">
            Saved Vocabulary & Lexical History
          </h2>
          <p className="text-xs sm:text-sm text-white/50 max-w-2xl">
            Review vocabulary terms highlighted during active listening scenarios. Re-listen to precise IPA pronunciation, inspect CEFR levels, historical etymology, and export for offline study.
          </p>
        </div>

        {/* Counter Card & Export Actions */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Download Vocabulary List Button with Dropdown */}
          {savedWords.length > 0 && (
            <div className="relative" ref={exportDropdownRef}>
              <button
                type="button"
                onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                className="px-3.5 py-2.5 rounded-2xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-300 hover:text-orange-200 text-xs font-mono font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/10"
                title="Download vocabulary list for offline study"
              >
                <Download className="w-4 h-4 text-orange-400" />
                <span>Download Vocabulary List</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${exportDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {exportDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#121620] border border-orange-500/30 shadow-2xl p-1.5 z-50 space-y-1 anim-fade">
                  <button
                    type="button"
                    onClick={handleExportPDF}
                    className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-semibold text-white">Export as PDF</div>
                      <div className="text-[10px] text-white/40">Printable study flashcards</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-white">Export as CSV</div>
                      <div className="text-[10px] text-white/40">Anki / Excel spreadsheet format</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Counter Badge */}
          <div className="bg-white/[0.03] p-3 rounded-2xl border border-white/[0.08] flex items-center gap-4">
            <div>
              <div className="text-[9px] font-mono text-white/40 uppercase">Saved Words</div>
              <div className="text-lg font-bold font-mono text-orange-400 leading-tight">
                {savedWords.length}
              </div>
            </div>
            {savedWords.length > 0 && (
              <button
                type="button"
                onClick={() => setClearConfirmOpen(true)}
                className="p-2 rounded-xl border border-white/10 text-white/40 hover:text-rose-400 hover:border-rose-500/30 text-xs font-mono transition-colors cursor-pointer"
                title="Clear all saved words"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Clearing */}
      {clearConfirmOpen && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 anim-fade">
          <div className="flex items-center gap-2 text-xs font-mono">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Clear your saved vocabulary history ({savedWords.length} words)?</span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleClearAll}
              className="px-3 py-1 bg-rose-500 text-black text-xs font-bold font-mono rounded-lg hover:bg-rose-400 transition-colors cursor-pointer"
            >
              Confirm Clear
            </button>
            <button
              type="button"
              onClick={() => setClearConfirmOpen(false)}
              className="px-3 py-1 bg-white/10 text-white text-xs font-mono rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Controls: Search and Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved words, definitions, or scenario..."
            className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Part of Speech Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-mono">
          <button
            type="button"
            onClick={() => setFilterPartOfSpeech('all')}
            className={`px-3 py-1.5 rounded-xl border transition-colors ${
              filterPartOfSpeech === 'all'
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/40 font-bold'
                : 'bg-white/[0.02] text-white/50 border-white/[0.06] hover:text-white'
            }`}
          >
            All Types ({savedWords.length})
          </button>
          {availablePartsOfSpeech.map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => setFilterPartOfSpeech(pos)}
              className={`px-3 py-1.5 rounded-xl border capitalize transition-colors ${
                filterPartOfSpeech === pos
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/40 font-bold'
                  : 'bg-white/[0.02] text-white/50 border-white/[0.06] hover:text-white'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area: Word List + Detail Inspector */}
      {savedWords.length === 0 ? (
        <div className="p-10 rounded-3xl border border-white/[0.08] bg-white/[0.02] text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 mx-auto flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-white font-grotesk">No Words Saved Yet</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              When reviewing transcripts in listening exercises, highlight or double-click any word and click <strong className="text-amber-300">"Save"</strong> to log it here for spaced review and offline export.
            </p>
          </div>
          {onNavigateToPractice && (
            <button
              type="button"
              onClick={onNavigateToPractice}
              className="px-4 py-2 rounded-xl bg-orange-500 text-black font-bold font-mono text-xs hover:bg-orange-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Go to Active Scenarios</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : filteredWords.length === 0 ? (
        <div className="p-10 rounded-3xl border border-white/[0.06] bg-white/[0.01] text-center space-y-2">
          <div className="text-sm font-mono text-white/60">No words match your search criteria.</div>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setFilterPartOfSpeech('all');
            }}
            className="text-xs font-mono text-orange-400 hover:text-orange-300 underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Word Cards List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredWords.map((item) => {
              const isSelected = selectedWord?.id === item.id;
              const isPlaying = activePlayingId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedWord(item)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-orange-500/15 border-orange-500/50 shadow-lg shadow-orange-500/10'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-white capitalize font-grotesk truncate">
                        {item.word}
                      </span>
                      <span className="text-[11px] font-mono text-amber-300/90 shrink-0">
                        {item.phonetic}
                      </span>
                      {item.cefrLevel && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-mono font-bold">
                          {item.cefrLevel}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                      <span className="italic uppercase">{item.partOfSpeech}</span>
                      {item.scenarioTitle && (
                        <>
                          <span>•</span>
                          <span className="truncate max-w-[150px]">{item.scenarioTitle}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayWord(item, 0.9);
                      }}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-orange-500 text-black animate-pulse border-orange-400'
                          : 'bg-white/5 text-orange-400 border-white/10 hover:bg-white/15 hover:text-orange-300'
                      }`}
                      title={`Pronounce "${item.word}"`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteWord(item.id, e)}
                      className="p-2 rounded-xl border border-transparent text-white/30 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-colors cursor-pointer"
                      title="Remove from saved history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Word Detailed Review Card */}
          <div className="lg:col-span-7 sticky top-6">
            {selectedWord ? (
              <div className="p-6 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#10141D] via-[#0C0F16] to-[#080A0F] shadow-2xl space-y-5">
                {/* Header & Pronunciation Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white capitalize font-grotesk tracking-tight">
                        {selectedWord.word}
                      </h3>
                      <span className="text-sm font-mono text-amber-300 font-semibold">
                        {selectedWord.phonetic}
                      </span>
                      {selectedWord.cefrLevel && (
                        <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                          CEFR {selectedWord.cefrLevel}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 capitalize">
                        {selectedWord.partOfSpeech}
                      </span>
                      {selectedWord.scenarioTitle && (
                        <span>Encountered in {selectedWord.scenarioTitle}</span>
                      )}
                    </div>
                  </div>

                  {/* Pronunciation Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePlayWord(selectedWord, 0.9)}
                      className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                        activePlayingId === selectedWord.id
                          ? 'bg-orange-500 text-black font-bold border-orange-400 animate-pulse'
                          : 'bg-orange-500/15 text-orange-300 border-orange-500/30 hover:bg-orange-500/25'
                      }`}
                      title="Pronounce at natural speed"
                    >
                      <Volume2 className="w-4 h-4 text-orange-400" />
                      <span>Natural (0.9x)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePlayWord(selectedWord, 0.7)}
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
                      title="Slow phoneme breakdown"
                    >
                      Slow (0.7x)
                    </button>
                  </div>
                </div>

                {/* Definition Box */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                    Core Lexical Definition
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    {selectedWord.definition}
                  </p>
                </div>

                {/* Simple / Advanced Definitions if available */}
                {(selectedWord.simpleDefinition || selectedWord.advancedDefinition) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedWord.simpleDefinition && (
                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80">
                          Simple Definition (A1-B1)
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed">
                          {selectedWord.simpleDefinition}
                        </p>
                      </div>
                    )}
                    {selectedWord.advancedDefinition && (
                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-orange-400/80">
                          Advanced Definition (B2-C2)
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed">
                          {selectedWord.advancedDefinition}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Etymology / Linguistic Origin */}
                {selectedWord.etymology && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-400">
                      <History className="w-3.5 h-3.5" />
                      <span>Etymology & Linguistic Origin</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 text-xs text-white/80 leading-relaxed">
                      {selectedWord.etymology}
                    </div>
                  </div>
                )}

                {/* Synonyms Tag List */}
                {selectedWord.synonyms && selectedWord.synonyms.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-orange-400">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Contextual Synonyms</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                      {selectedWord.synonyms.map((syn, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-200 border border-orange-500/25 text-xs font-mono lowercase"
                        >
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Current Scenario Usage Example (In Context) */}
                {selectedWord.scenarioUsageSnippet ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-amber-400">
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Transcript Context & Dialog Usage</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handlePlayScenarioSnippet(
                            selectedWord.scenarioUsageSnippet!,
                            selectedWord.id
                          )
                        }
                        className="hover:text-amber-200 flex items-center gap-1 text-xs normal-case cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Listen to full turn</span>
                      </button>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-500/[0.07] border border-amber-500/25 space-y-2">
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans italic border-l-2 border-amber-400 pl-3">
                        "{selectedWord.scenarioUsageSnippet}"
                      </p>
                      {selectedWord.scenarioTitle && (
                        <div className="text-[10px] font-mono text-white/40 pl-3">
                          Scenario Source: {selectedWord.scenarioTitle}
                        </div>
                      )}
                    </div>
                  </div>
                ) : selectedWord.exampleSentence ? (
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                      General Usage Example
                    </div>
                    <p className="text-xs sm:text-sm text-white/70 italic p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] border-l-2 border-l-orange-400 pl-3">
                      "{selectedWord.exampleSentence}"
                    </p>
                  </div>
                ) : null}

                {/* Acoustic & Phonetic Listening Tip */}
                {selectedWord.acousticTip && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div className="font-bold font-mono text-[11px] uppercase tracking-wider text-amber-300">
                        Acoustic & Phonetic Listening Advice
                      </div>
                      <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                        {selectedWord.acousticTip}
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer metadata */}
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-white/30 border-t border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>Saved {new Date(selectedWord.savedAt).toLocaleDateString()}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteWord(selectedWord.id)}
                    className="text-white/30 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-10 rounded-3xl border border-white/[0.06] bg-white/[0.01] text-center text-white/40 font-mono text-xs">
                Select a word from the list to review definitions and acoustic usage.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
