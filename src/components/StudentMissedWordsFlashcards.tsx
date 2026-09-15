import React, { useState, useMemo } from 'react';
import {
  Download,
  FileSpreadsheet,
  Layers,
  Volume2,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Filter,
  CheckCircle2,
  Ear,
  Sparkles,
  BookOpen,
  RotateCw
} from 'lucide-react';
import { AttemptRecord, StudentProfile } from '../types';
import { MissedWordsService, StudyFlashcard } from '../services/missedWordsService';
import { AudioEngine } from '../services/audioEngine';

interface StudentMissedWordsFlashcardsProps {
  student: StudentProfile;
  attempts: AttemptRecord[];
}

export const StudentMissedWordsFlashcards: React.FC<StudentMissedWordsFlashcardsProps> = ({
  student,
  attempts
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'frequency' | 'alpha' | 'difficulty'>('frequency');
  const [viewMode, setViewMode] = useState<'table' | 'flashcards'>('table');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);
  const [currentlySpeakingWord, setCurrentlySpeakingWord] = useState<string | null>(null);

  // Aggregate flashcards from student history
  const allFlashcards = useMemo(() => {
    return MissedWordsService.getMissedWordsFlashcards(student, attempts);
  }, [student, attempts]);

  // Filter & sort
  const filteredFlashcards = useMemo(() => {
    let list = [...allFlashcards];

    if (selectedCategory !== 'all') {
      list = list.filter((c) => c.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.word.toLowerCase().includes(q) ||
          c.phoneticOrTrap.toLowerCase().includes(q) ||
          c.meaning.toLowerCase().includes(q) ||
          c.misheardAs.toLowerCase().includes(q) ||
          c.contextSentence.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'frequency') {
      list.sort((a, b) => b.missCount - a.missCount);
    } else if (sortBy === 'alpha') {
      list.sort((a, b) => a.word.localeCompare(b.word));
    } else if (sortBy === 'difficulty') {
      list.sort((a, b) => a.difficultyLevel.localeCompare(b.difficultyLevel));
    }

    return list;
  }, [allFlashcards, selectedCategory, searchQuery, sortBy]);

  // Pronounce audio snippet
  const handlePronounce = (word: string) => {
    setCurrentlySpeakingWord(word);
    AudioEngine.speakSnippet(word, () => {
      setCurrentlySpeakingWord(null);
    });
  };

  // Trigger CSV download
  const handleDownloadCSV = () => {
    const downloadedFile = MissedWordsService.downloadStudyFlashcardsCSV(student, allFlashcards);
    setDownloadSuccessMsg(`Generated and downloaded "${downloadedFile}" with ${allFlashcards.length} flashcards!`);
    setTimeout(() => {
      setDownloadSuccessMsg(null);
    }, 4500);
  };

  // Safe active card index
  const safeCardIndex = Math.min(activeCardIndex, Math.max(0, filteredFlashcards.length - 1));
  const currentCard = filteredFlashcards[safeCardIndex];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: allFlashcards.length, phoneme: 0, number: 0, signpost: 0, lexical: 0, factual: 0 };
    allFlashcards.forEach((c) => {
      if (counts[c.category] !== undefined) {
        counts[c.category]++;
      }
    });
    return counts;
  }, [allFlashcards]);

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] space-y-6">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Study Flashcards & Error Analysis
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-grotesk flex items-center gap-2.5">
            Frequently Missed Words for {student.name}
          </h2>
          <p className="text-xs text-white/40 max-w-2xl mt-1">
            Aggregated from {student.name}’s listening attempt history across all CEFR diagnostic protocols.
            Export directly as a study flashcard list compatible with Anki, Quizlet, and spreadsheets.
          </p>
        </div>

        {/* Primary Download Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadCSV}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-black font-semibold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer font-mono tracking-wide"
          >
            <Download className="w-4 h-4" />
            <span>Download Study Flashcards (CSV)</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {downloadSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadSuccessMsg}</span>
          </div>
          <span className="text-[10px] text-emerald-400/60 uppercase">Ready to import into Anki / Quizlet</span>
        </div>
      )}

      {/* Metric Summary Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="text-[10px] font-mono uppercase text-white/40">Aggregated Flashcards</div>
          <div className="text-2xl font-bold font-grotesk text-white mt-0.5">{allFlashcards.length}</div>
          <div className="text-[10px] font-mono text-white/30">Target vocabulary tokens</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="text-[10px] font-mono uppercase text-white/40">Top Problem Category</div>
          <div className="text-base font-bold font-grotesk text-amber-300 truncate mt-1">
            {student.focusArea || 'Signposts & Numbers'}
          </div>
          <div className="text-[10px] font-mono text-white/30">Acoustic distractor pattern</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="text-[10px] font-mono uppercase text-white/40">High-Miss Frequency</div>
          <div className="text-2xl font-bold font-grotesk text-rose-400 mt-0.5">
            {allFlashcards.filter((c) => c.missCount >= 2).length}
          </div>
          <div className="text-[10px] font-mono text-white/30">Repeated across attempts</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="text-[10px] font-mono uppercase text-white/40">Export Readiness</div>
          <div className="text-sm font-bold font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> 10-Field CSV Ready
          </div>
          <div className="text-[10px] font-mono text-white/30">Anki / Quizlet / Spreadsheets</div>
        </div>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search missed word, trap, or distractor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* View Mode Toggle & Sort */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-black/40 border border-white/10 p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-white/10 text-white font-bold' : 'text-white/40 hover:text-white/80'
              }`}
            >
              Matrix Table
            </button>
            <button
              onClick={() => {
                setViewMode('flashcards');
                setIsFlipped(false);
              }}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                viewMode === 'flashcards' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-white/40 hover:text-white/80'
              }`}
            >
              Interactive Deck
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-black/40 border border-white/10 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 font-mono"
          >
            <option value="frequency">Sort: Miss Frequency</option>
            <option value="alpha">Sort: Word A-Z</option>
            <option value="difficulty">Sort: Difficulty Level</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-1 border-t border-white/[0.04]">
        {[
          { key: 'all', label: 'All Items', count: categoryCounts.all },
          { key: 'phoneme', label: 'Phoneme Traps', count: categoryCounts.phoneme },
          { key: 'number', label: 'Numerals & Dates', count: categoryCounts.number },
          { key: 'signpost', label: 'Signpost Negations', count: categoryCounts.signpost },
          { key: 'lexical', label: 'Lexical Traps', count: categoryCounts.lexical }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedCategory(tab.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedCategory === tab.key
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                : 'bg-white/[0.02] text-white/50 border border-white/[0.05] hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedCategory === tab.key ? 'bg-amber-400/20 text-amber-200' : 'bg-white/10 text-white/40'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content Rendering Based on View Mode */}
      {viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-black/20">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-[10px] font-mono uppercase text-white/40 bg-white/[0.02]">
                <th className="py-3 px-4">Target Word / Phrase</th>
                <th className="py-3 px-4">Acoustic / Phonetic Trap</th>
                <th className="py-3 px-4">Student Misheard</th>
                <th className="py-3 px-4 text-center">Miss Count</th>
                <th className="py-3 px-4">Audio Context & Meaning</th>
                <th className="py-3 px-4">Actionable Drill</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredFlashcards.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-white/40 font-mono">
                    No missed words match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredFlashcards.map((card) => {
                  const isSpeaking = currentlySpeakingWord === card.word;
                  return (
                    <tr key={card.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Target Word with Audio Pronunciation button */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePronounce(card.word)}
                            title="Pronounce word"
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isSpeaking
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                                : 'bg-white/5 text-white/60 border-white/10 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <div>
                            <span className="font-bold text-white font-grotesk text-sm">{card.word}</span>
                            <div className="text-[10px] font-mono text-white/30">{card.difficultyLevel}</div>
                          </div>
                        </div>
                      </td>

                      {/* Trap Type */}
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[11px] inline-block">
                          {card.phoneticOrTrap}
                        </span>
                        <div className="text-[10px] text-white/30 font-mono mt-0.5">{card.scenarioTitle}</div>
                      </td>

                      {/* Student Misheard */}
                      <td className="py-3 px-4 font-mono">
                        <span className="text-rose-300 line-through opacity-80">{card.misheardAs}</span>
                      </td>

                      {/* Miss Count */}
                      <td className="py-3 px-4 text-center font-mono">
                        <span
                          className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full font-bold text-[11px] ${
                            card.missCount >= 3
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : card.missCount === 2
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-white/10 text-white/60 border border-white/10'
                          }`}
                        >
                          {card.missCount}×
                        </span>
                      </td>

                      {/* Audio Context & Meaning */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="text-white/80 text-xs italic line-clamp-2">
                          "{card.contextSentence}"
                        </div>
                        <div className="text-[10px] text-white/40 mt-1 line-clamp-1">
                          {card.meaning}
                        </div>
                      </td>

                      {/* Recommended Drill */}
                      <td className="py-3 px-4 text-xs font-mono text-emerald-400/90 max-w-xs">
                        <span className="line-clamp-2">{card.recommendedDrill}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* INTERACTIVE STUDY FLASHCARD DECK MODE */
        <div className="space-y-4">
          {filteredFlashcards.length === 0 ? (
            <div className="p-12 text-center text-white/40 font-mono">
              No flashcards match the selected filters.
            </div>
          ) : (
            currentCard && (
              <div className="flex flex-col items-center justify-center py-2 space-y-4">
                {/* Progress bar and counter */}
                <div className="w-full max-w-xl flex items-center justify-between text-xs font-mono text-white/40">
                  <span>Card {safeCardIndex + 1} of {filteredFlashcards.length}</span>
                  <span>{currentCard.difficultyLevel}</span>
                </div>
                <div className="w-full max-w-xl h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-300"
                    style={{ width: `${((safeCardIndex + 1) / filteredFlashcards.length) * 100}%` }}
                  />
                </div>

                {/* 3D Flip Card Container */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full max-w-xl min-h-[280px] sm:min-h-[300px] p-6 sm:p-8 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-black/40 to-black/80 hover:border-amber-500/40 transition-all cursor-pointer shadow-xl relative flex flex-col justify-between"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between text-xs font-mono text-white/40">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {currentCard.phoneticOrTrap}
                    </span>
                    <span className="flex items-center gap-1 text-white/30">
                      <RotateCw className="w-3 h-3" /> Click to flip
                    </span>
                  </div>

                  {/* Card Body: Front vs Back */}
                  {!isFlipped ? (
                    /* FRONT OF FLASHCARD */
                    <div className="py-6 text-center space-y-3">
                      <div className="text-3xl sm:text-4xl font-extrabold text-white font-grotesk tracking-wide">
                        {currentCard.word}
                      </div>
                      <div className="text-xs text-white/40 font-mono">
                        Source: {currentCard.scenarioTitle}
                      </div>
                      <div className="pt-2 flex justify-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePronounce(currentCard.word);
                          }}
                          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Hear Target Audio</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* BACK OF FLASHCARD */
                    <div className="py-3 text-left space-y-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-white/40">Audio Context Quote:</span>
                        <p className="text-sm text-white/90 italic font-medium mt-0.5">
                          "{currentCard.contextSentence}"
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                          <span className="text-[10px] text-rose-300/70 block uppercase">Misheard Distractor:</span>
                          <span className="text-rose-300 line-through">{currentCard.misheardAs}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                          <span className="text-[10px] text-white/40 block uppercase">Times Missed:</span>
                          <span className="text-white font-bold">{currentCard.missCount} attempts</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                        <span className="text-[10px] uppercase text-emerald-400/60 block">Recommended Acoustic Drill:</span>
                        <span>{currentCard.recommendedDrill}</span>
                      </div>
                    </div>
                  )}

                  {/* Card Footer */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/30 border-t border-white/5 pt-3">
                    <span>Category: {currentCard.category}</span>
                    <span className="text-amber-400/80 font-bold">
                      {!isFlipped ? 'Flip for Answer & Audio Context' : 'Flip for Word Prompt'}
                    </span>
                  </div>
                </div>

                {/* Deck Navigation Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      setActiveCardIndex((prev) => Math.max(0, prev - 1));
                    }}
                    disabled={safeCardIndex === 0}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Flip Card</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      setActiveCardIndex((prev) => Math.min(filteredFlashcards.length - 1, prev + 1));
                    }}
                    disabled={safeCardIndex >= filteredFlashcards.length - 1}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
