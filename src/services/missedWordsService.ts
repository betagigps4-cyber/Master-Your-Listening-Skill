import { AttemptRecord, StudentProfile, Scenario, Question, LevelKey } from '../types';
import { SCENARIOS, LEVEL_CFG } from '../data/scenariosData';
import { StorageService } from './storageService';
import { AdaptiveEngine } from './adaptiveEngine';

export interface StudyFlashcard {
  id: string;
  word: string; // The primary target word or phrase
  phoneticOrTrap: string; // Acoustic phonetic contrast or trap type
  category: 'phoneme' | 'number' | 'signpost' | 'lexical' | 'factual';
  meaning: string; // Contextual definition or explanation
  contextSentence: string; // Sentence from audio transcript
  misheardAs: string; // What the student answered (the distractor)
  missCount: number; // Frequency of misses across attempts
  difficultyLevel: string; // CEFR band / difficulty
  scenarioTitle: string; // Listening scenario source
  recommendedDrill: string; // Actionable shadowing / listening strategy
  lastMissedAt?: number;
}

export class MissedWordsService {
  private static scenarioIndexCache: Map<string, { scenario: Scenario; levelKey: LevelKey; sectionKey: string }> | null = null;
  private static questionIndexCache: Map<string, { question: Question; scenario: Scenario; levelKey: LevelKey; sectionKey: string }> | null = null;

  /**
   * Builds an in-memory index of all scenarios and questions across all CEFR levels
   */
  private static initIndex() {
    if (this.scenarioIndexCache && this.questionIndexCache) return;

    this.scenarioIndexCache = new Map();
    this.questionIndexCache = new Map();

    (Object.keys(SCENARIOS) as LevelKey[]).forEach((lvl) => {
      const sections = SCENARIOS[lvl];
      if (!sections) return;

      Object.entries(sections).forEach(([sectionKey, scenarioList]) => {
        scenarioList.forEach((sc) => {
          // Index by normalized scenario title
          this.scenarioIndexCache!.set(sc.title.trim().toLowerCase(), {
            scenario: sc,
            levelKey: lvl,
            sectionKey
          });

          // Index each question
          sc.questions.forEach((q) => {
            this.questionIndexCache!.set(q.id, {
              question: q,
              scenario: sc,
              levelKey: lvl,
              sectionKey
            });
          });
        });
      });
    });
  }

  /**
   * Extracts clean sentence from transcript containing target phrase
   */
  private static extractSentenceFromTranscript(transcript: string, targetPhrase: string): string {
    if (!transcript) return `Appears in dialogue as "${targetPhrase}".`;

    // Strip [F1], [M2] speaker tags for readability
    const cleanTranscript = transcript.replace(/\[(?:F[1-5]|M[1-5])\]/g, ' ').replace(/\s+/g, ' ').trim();

    // Split into sentences
    const sentences = cleanTranscript.split(/(?<=[.?!])\s+/).filter(Boolean);
    const lowerTarget = targetPhrase.toLowerCase().trim();

    // Find direct sentence containing target word
    const matched = sentences.find((s) => s.toLowerCase().includes(lowerTarget));
    if (matched) return matched.trim();

    // Find sentence containing any word from target
    const targetWords = lowerTarget.split(/\s+/).filter((w) => w.length > 3);
    if (targetWords.length > 0) {
      const partialMatch = sentences.find((s) => targetWords.some((w) => s.toLowerCase().includes(w)));
      if (partialMatch) return partialMatch.trim();
    }

    return sentences[0] || cleanTranscript.slice(0, 120);
  }

  /**
   * Classifies phonetic trap or distractor type
   */
  private static classifyTrap(
    targetWord: string,
    distractor: string,
    qCategory?: string
  ): { category: StudyFlashcard['category']; trapName: string; drill: string } {
    const text = `${targetWord} ${distractor}`.toLowerCase();

    // Numbers & Dates
    if (qCategory === 'numbers' || /\b\d+\b/.test(text) || /\b(first|second|third|fourth|fifth|teen|ty)\b/.test(text)) {
      return {
        category: 'number',
        trapName: 'Rapid Numeral Cluster (-teen vs -ty & digit elision)',
        drill: 'Shadow rapid digit groupings; focus on high pitch peak on -TEEN vs drop on -TY.'
      };
    }

    // Signpost words
    if (/\b(actually|instead|rather|meant|sorry|double check|however|postponed|cancelled)\b/.test(text)) {
      return {
        category: 'signpost',
        trapName: 'Signpost Negation / Self-Correction Pivot',
        drill: 'Do not commit to first nominal mention; pause until speaker completes turnaround tone.'
      };
    }

    // Dental fricatives
    if (/\b(three|thirty|thursday|third|thought|theatre|health|weather|together|another|brother)\b/.test(text)) {
      return {
        category: 'phoneme',
        trapName: 'Dental Fricative Contrast (/θ/ voiceless vs /ð/ voiced)',
        drill: 'Place tongue tip between incisors; practice isolating friction without plosive stop /t/ or /s/.'
      };
    }

    // Vowel length contrasts
    if (/\b(leave|live|sleep|slip|clean|seat|sit|minute|routine|ticket|visit|ship|sheep)\b/.test(text)) {
      return {
        category: 'phoneme',
        trapName: 'Vowel Length Disparity (Tense /iː/ vs Lax /ɪ/)',
        drill: 'Exaggerate tension in lips/tongue on long /iː/; contrast against relaxed lax /ɪ/.'
      };
    }

    // Labiodental vs Glide
    if (/\b(very|wary|water|west|vest|view|winter|arrive|wheel|veal)\b/.test(text)) {
      return {
        category: 'phoneme',
        trapName: 'Labiodental Friction vs Bilabial Glide (/v/ vs /w/)',
        drill: 'Distinguish upper-teeth-to-lip contact (/v/) from rounded lip glide (/w/).'
      };
    }

    // Lexical distractor / paraphrase
    if (qCategory === 'lexical' || qCategory === 'inference') {
      return {
        category: 'lexical',
        trapName: 'Lexical Paraphrase & Distractor Trap',
        drill: 'Listen for synonymous conceptual meaning rather than matching exact verbatim nouns heard first.'
      };
    }

    return {
      category: 'factual',
      trapName: 'Acoustic Elision & Rapid Connected Speech',
      drill: 'Perform backward-build shadowing at 0.9x speed to capture unreleased final consonants.'
    };
  }

  /**
   * Provides contextual definitions for frequent target vocabulary
   */
  private static getMeaningForWord(word: string, category: string): string {
    const w = word.toLowerCase().trim();
    if (w.includes('wednesday')) return 'Day of the week (/ˈwɛnzdeɪ/) with silent "d" and reduced vowel.';
    if (w.includes('laptop')) return 'Portable computer; easily masked when speaker lists equipment quickly.';
    if (w.includes('01728') || w.includes('07745') || /\d{5,}/.test(w)) return 'High-density telephone number digit sequence with British grouping pauses.';
    if (w.includes('page 45')) return 'Specific academic textbook locator; target page number preceded by instructions.';
    if (w.includes('14th to 16th')) return 'Date range ordinal cluster requiring differentiation between 14th and 40th.';
    if (w.includes('$2.20') || w.includes('2.20')) return 'Currency value with decimal and cent articulation ($2.20 vs $20.20).';
    if (w.includes('museum fully booked')) return 'Paraphrased availability status indicating no remaining admissions.';
    if (w.includes('rice and fish')) return 'Dietary noun compound; rapid conversational liaison across consonants.';
    if (w.includes('maruf ali')) return 'Proper name requiring careful surname phoneme transcription.';
    if (w.includes('doel')) return 'Proper noun representing the national bird of Bangladesh.';
    if (w.includes('farmer')) return 'Occupation noun with rhotic / non-rhotic vowel reduction.';
    if (w.includes('noodles')) return 'Food item; vowel tension /uː/ contrasted with shorter vowel sounds.';

    if (category === 'number') return 'Numerical quantity or identifier critical for exact factual recall.';
    if (category === 'signpost') return 'Discourse marker signaling a change of mind, clarification, or retraction.';
    if (category === 'phoneme') return 'High-frequency acoustic token prone to phonological confusion in fast speech.';
    return 'Key contextual vocabulary token frequently tested in standard listening protocols.';
  }

  /**
   * Aggregates all frequently missed words from a selected student's history
   */
  static getMissedWordsFlashcards(student: StudentProfile, allAttempts: AttemptRecord[]): StudyFlashcard[] {
    this.initIndex();

    // Filter attempts strictly for the selected student
    const studentAttempts = allAttempts.filter((a) => a.studentId === student.id);

    // Map to aggregate frequency: targetKey -> { cardData, count }
    const flashcardMap = new Map<string, StudyFlashcard>();

    // 1. Scan actual recorded attempts
    studentAttempts.forEach((attempt) => {
      const scEntry = this.scenarioIndexCache?.get(attempt.scenarioTitle.trim().toLowerCase());
      const levelCfg = LEVEL_CFG[attempt.level] || LEVEL_CFG['Intermediate'];
      const cefrLabel = levelCfg.targetCefr || 'B1';

      if (attempt.answers && scEntry) {
        scEntry.scenario.questions.forEach((q) => {
          const studentAns = attempt.answers[q.id];
          if (studentAns && studentAns.trim().toLowerCase() !== q.correct.trim().toLowerCase()) {
            const wordKey = q.correct.trim().toLowerCase();
            const existing = flashcardMap.get(wordKey);

            if (existing) {
              existing.missCount += 1;
              existing.lastMissedAt = Math.max(existing.lastMissedAt || 0, attempt.timestamp);
              // Append alternate distractor if different
              if (studentAns && !existing.misheardAs.includes(studentAns)) {
                existing.misheardAs = `${existing.misheardAs}, ${studentAns}`;
              }
            } else {
              const { category, trapName, drill } = this.classifyTrap(q.correct, studentAns, q.category);
              const contextSentence = this.extractSentenceFromTranscript(scEntry.scenario.transcript, q.correct);
              const meaning = q.explanation || this.getMeaningForWord(q.correct, category);

              flashcardMap.set(wordKey, {
                id: `card-${student.id}-${q.id}-${Date.now()}`,
                word: q.correct,
                phoneticOrTrap: trapName,
                category,
                meaning,
                contextSentence,
                misheardAs: studentAns,
                missCount: 1,
                difficultyLevel: cefrLabel,
                scenarioTitle: attempt.scenarioTitle,
                recommendedDrill: drill,
                lastMissedAt: attempt.timestamp
              });
            }
          }
        });
      }
    });

    // 2. Baseline curriculum enrichment tailored to student focus area & CEFR
    // Ensures newly enrolled or high-performing students still have a robust, actionable study deck
    const baselineCards = this.getCurriculumBaselineCards(student);
    baselineCards.forEach((bCard) => {
      const key = bCard.word.toLowerCase();
      if (!flashcardMap.has(key)) {
        flashcardMap.set(key, bCard);
      }
    });

    // Sort by missCount descending, then by word
    const result = Array.from(flashcardMap.values()).sort((a, b) => {
      if (b.missCount !== a.missCount) return b.missCount - a.missCount;
      return a.word.localeCompare(b.word);
    });

    return result;
  }

  /**
   * Generates curriculum-tailored baseline flashcards based on the student's focus area & Elo
   */
  private static getCurriculumBaselineCards(student: StudentProfile): StudyFlashcard[] {
    const cefr = AdaptiveEngine.getCefrLevel(student.adaptiveRating);
    const focus = (student.focusArea || '').toLowerCase();

    const candidates: StudyFlashcard[] = [];

    // Focus Area: Signpost Distractors & Rapid Numbers (e.g. Alex Chen)
    if (focus.includes('signpost') || focus.includes('number')) {
      candidates.push(
        {
          id: `base-${student.id}-wednesday`,
          word: 'Wednesday',
          phoneticOrTrap: 'Silent "d" & vowel reduction (/ˈwɛnzdeɪ/)',
          category: 'phoneme',
          meaning: 'Mid-week calendar appointment; frequently elided in fast teacher announcements.',
          contextSentence: 'The homework assignment will be due next Wednesday morning at nine sharp.',
          misheardAs: 'Thursday / Friday',
          missCount: 2,
          difficultyLevel: 'A2 - Elementary',
          scenarioTitle: 'Classroom Instructions',
          recommendedDrill: 'Repeat 5x at 1.1x speed: focus on starting syllable "wenz-" without inserting /d/ sound.'
        },
        {
          id: `base-${student.id}-actually`,
          word: 'Actually / In fact',
          phoneticOrTrap: 'Signpost Pivot & Retraction Trap',
          category: 'signpost',
          meaning: 'Discourse marker signaling the speaker is canceling or altering previously stated facts.',
          contextSentence: 'We were aiming for Room 102, but actually the chemistry lab was relocated upstairs.',
          misheardAs: 'Room 102',
          missCount: 3,
          difficultyLevel: 'B1 - Intermediate',
          scenarioTitle: 'School Tour Updates',
          recommendedDrill: 'Hold pen until speaker finishes sentence; never write down the first noun before "actually".'
        },
        {
          id: `base-${student.id}-page45`,
          word: 'Page 45',
          phoneticOrTrap: 'Numeral Distractor (-teen vs -ty stress)',
          category: 'number',
          meaning: 'Exact textbook page reference; contrasted against similar sounding page 55.',
          contextSentence: 'Please turn to page 45 of your workbook to review exercise two.',
          misheardAs: 'Page 55 / Page 40',
          missCount: 2,
          difficultyLevel: 'A2 - Elementary',
          scenarioTitle: 'Classroom Instructions',
          recommendedDrill: 'Contrast forty-five against fifty-four; listen for the initial consonant burst /f/ vs /p/.'
        },
        {
          id: `base-${student.id}-phone`,
          word: '07745 223 990',
          phoneticOrTrap: 'Rapid Digit Streaming & Double-Digit Pauses',
          category: 'number',
          meaning: 'Eleven-digit UK mobile number with rhythmic grouping and "double two" pronunciation.',
          contextSentence: 'If there are any transit issues, ring me immediately on 07745 223 990.',
          misheardAs: '07745 233 900',
          missCount: 2,
          difficultyLevel: 'B1 - Intermediate',
          scenarioTitle: 'The Accommodation Booking',
          recommendedDrill: 'Shadow in groups of 3-3-4 digits; practice writing while maintaining continuous auditory attention.'
        },
        {
          id: `base-${student.id}-fullybooked`,
          word: 'Fully booked / Unavailable',
          phoneticOrTrap: 'Lexical Synonymous Paraphrase Trap',
          category: 'lexical',
          meaning: 'Complete lack of availability; requires inferring capacity without hearing the word "no".',
          contextSentence: 'Unfortunately the historical museum is fully booked through the end of June.',
          misheardAs: 'Museum open / Confirmed',
          missCount: 2,
          difficultyLevel: 'B2 - Upper-Intermediate',
          scenarioTitle: 'Planning a School Trip',
          recommendedDrill: 'Map negative idioms like "at full capacity" and "sold out" directly to "unavailable".'
        }
      );
    }

    // Focus Area: Phoneme Differentiation & Number Clusters (e.g. Marcus Brody)
    if (focus.includes('phoneme') || focus.includes('differentiation')) {
      candidates.push(
        {
          id: `base-${student.id}-thirteen`,
          word: 'Thirteen / Thirty (/θɜːrˈtiːn/ vs /ˈθɜːrti/)',
          phoneticOrTrap: 'Syllabic Stress & Vowel Length Contrast',
          category: 'phoneme',
          meaning: 'Numeral pair differing primarily in end-syllable stress and pitch contour.',
          contextSentence: 'The lecture begins at thirteen minutes past the hour, exactly thirty minutes before noon.',
          misheardAs: 'Thirty / Thirteen',
          missCount: 4,
          difficultyLevel: 'A2 - Elementary',
          scenarioTitle: 'Campus Schedule Updates',
          recommendedDrill: 'Tap finger hard on the louder syllable: thir-TEEN (tap on teen) vs THIR-ty (tap on thir).'
        },
        {
          id: `base-${student.id}-routine`,
          word: 'Routine (/iː/ vs /ɪ/)',
          phoneticOrTrap: 'Vowel Length Disparity (Tense /iː/ vs Lax /ɪ/)',
          category: 'phoneme',
          meaning: 'Regular course of daily procedures; easily misconstrued when spoken with short /ɪ/.',
          contextSentence: 'Establishing a consistent morning routine improves cognitive retention during exams.',
          misheardAs: 'Written / Rotin',
          missCount: 3,
          difficultyLevel: 'B1 - Intermediate',
          scenarioTitle: 'Study Habits Workshop',
          recommendedDrill: 'Shadow vowel elongation; contrast "routine" (/ruːˈtiːn/) with "written" (/ˈrɪt.ən/).'
        },
        {
          id: `base-${student.id}-three-thirty`,
          word: 'Three / Thirty (/θ/)',
          phoneticOrTrap: 'Voiceless Dental Fricative (/θ/ vs /t/ vs /s/)',
          category: 'phoneme',
          meaning: 'Cardinal numbers beginning with voiceless tongue-tip friction.',
          contextSentence: 'She arrived at three o’clock sharp, thirty minutes ahead of schedule.',
          misheardAs: 'Tree / Dirty',
          missCount: 3,
          difficultyLevel: 'A1 - Beginner',
          scenarioTitle: 'Meeting Time Arrangements',
          recommendedDrill: 'Breathe gently across tongue tip placed against upper front teeth; avoid stop burst /t/.'
        }
      );
    }

    // Focus Area: Multi-Speaker & Academic Transitions (e.g. David Okafor, Sara Tanaka, Elena Rostova)
    if (candidates.length < 4) {
      candidates.push(
        {
          id: `base-${student.id}-reluctantly`,
          word: 'Reluctantly agreed',
          phoneticOrTrap: 'Attitudinal Intonation Contour & Implied Stance',
          category: 'lexical',
          meaning: 'Conceding to an argument without enthusiasm; conveyed by dropping intonation.',
          contextSentence: 'While Dr. Evans reluctantly agreed to extend the deadline, she required full drafts.',
          misheardAs: 'Enthusiastically supported',
          missCount: 2,
          difficultyLevel: 'B2 - Upper-Intermediate',
          scenarioTitle: 'Faculty Debate On Curriculum',
          recommendedDrill: 'Listen for trailing low pitch on the verb; falling tone indicates hesitation or doubt.'
        },
        {
          id: `base-${student.id}-departure`,
          word: 'Departure terminal 4',
          phoneticOrTrap: 'Fast Acoustic Assimilation (/t/ before /tʃ/)',
          category: 'factual',
          meaning: 'Specific airport gate facility; sound merges with preceding transit verbs.',
          contextSentence: 'All regional shuttles will proceed to departure terminal 4 by noon.',
          misheardAs: 'Terminal 1 / Terminal 5',
          missCount: 2,
          difficultyLevel: 'B1 - Intermediate',
          scenarioTitle: 'Travel Announcements',
          recommendedDrill: 'Shadow connected speech phrase "departure terminal" as a single rhythmic compound.'
        },
        {
          id: `base-${student.id}-subsequent`,
          word: 'Subsequent analysis',
          phoneticOrTrap: 'Academic Discourse Sequencing Marker',
          category: 'lexical',
          meaning: 'Occurring later in time as a continuation of initial experimental trials.',
          contextSentence: 'The subsequent analysis disproved the hypothesis presented in the preliminary paper.',
          misheardAs: 'Subjective analysis',
          missCount: 1,
          difficultyLevel: 'C1 - Advanced',
          scenarioTitle: 'Scientific Methodology Review',
          recommendedDrill: 'Pronounce three distinct syllables: sub-se-quent (/ˈsʌb.sɪ.kwənt/).'
        }
      );
    }

    return candidates;
  }

  /**
   * Generates a downloadable 'study flashcard' list in CSV format
   * Formatted to be directly importable into Anki, Quizlet, Excel, or Google Sheets
   */
  static generateFlashcardsCSV(student: StudentProfile, flashcards: StudyFlashcard[]): string {
    const headers = [
      'Target Word / Phrase',
      'Phonetic / Acoustic Trap',
      'Trap Category',
      'Context Meaning & Definition',
      'Audio Context Quote',
      'Student Misheard Distractor',
      'Miss Frequency (Times)',
      'CEFR Difficulty Level',
      'Source Scenario',
      'Recommended Shadowing Drill'
    ];

    const escapeCSV = (val: string | number | undefined): string => {
      const str = String(val ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' ');
      return `"${str}"`;
    };

    const rows = flashcards.map((card) => [
      escapeCSV(card.word),
      escapeCSV(card.phoneticOrTrap),
      escapeCSV(card.category),
      escapeCSV(card.meaning),
      escapeCSV(card.contextSentence),
      escapeCSV(card.misheardAs),
      escapeCSV(card.missCount),
      escapeCSV(card.difficultyLevel),
      escapeCSV(card.scenarioTitle),
      escapeCSV(card.recommendedDrill)
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  }

  /**
   * Triggers the direct browser file download for the study flashcards CSV
   */
  static downloadStudyFlashcardsCSV(student: StudentProfile, flashcards: StudyFlashcard[]): string {
    const csvContent = this.generateFlashcardsCSV(student, flashcards);
    const dateStr = new Date().toISOString().slice(0, 10);
    const cleanStudentName = student.name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `Study_Flashcards_${cleanStudentName}_Missed_Words_${dateStr}.csv`;

    StorageService.triggerDownload(csvContent, fileName, 'text/csv;charset=utf-8;');
    return fileName;
  }
}
