import { AttemptRecord, ProblemAreaMetric } from '../types';
import { ProblemAreaAnalyticsService } from './problemAreaAnalyticsService';
import { StorageService } from './storageService';

export interface PhonemeDrillChallenge {
  id: string;
  problemAreaKey: string;
  type: 'minimal-pair' | 'rapid-stream' | 'odd-one-out' | 'sentence-shadow';
  promptQuestion: string;
  audioPromptSnippet: string; // Text to be vocalized via speech synthesis
  options: {
    id: string;
    text: string;
    phonemeOrNote?: string;
  }[];
  correctOptionId: string;
  explanation: string;
  targetPhonemeSymbol: string;
  acousticTrapTip: string;
  difficultyLevel: 'Foundation' | 'Intermediate' | 'Advanced';
}

export interface PhonemeDrillSet {
  problemAreaKey: string;
  phonemeName: string;
  phonemeSymbol: string;
  category: 'fricative' | 'vowel' | 'affricate' | 'liquid' | 'numbers' | 'word-type';
  heatMapErrorRate: number; // Derived from D3 heat map
  severity: 'low' | 'moderate' | 'high' | 'critical';
  diagnosticRationale: string;
  drills: PhonemeDrillChallenge[];
}

export interface PhonemeDrillHistoryRecord {
  id: string;
  problemAreaKey: string;
  phonemeSymbol: string;
  timestamp: number;
  totalChallenges: number;
  correctChallenges: number;
  scorePercent: number;
  timeSpentSeconds: number;
}

const PHONEME_DRILL_STORAGE_KEY = 'listenmaster_phoneme_drills_v1';

export class PhonemeDrillService {
  /**
   * Generates tailored phoneme drill sets based on problem areas calculated from student attempt history.
   */
  static getDrillSetsForProblemAreas(attempts: AttemptRecord[]): PhonemeDrillSet[] {
    const problemMetrics = ProblemAreaAnalyticsService.getProblemAreaMetrics(attempts);

    // Pre-authored high-repetition listening challenges for each identified problem area
    const challengeRepository: Record<string, PhonemeDrillChallenge[]> = {
      'ee-vs-ih': [
        {
          id: 'ee-ih-1',
          problemAreaKey: 'ee-vs-ih',
          type: 'minimal-pair',
          promptQuestion: 'Listen to the audio snippet. Which word is spoken?',
          audioPromptSnippet: 'The tourists decided to leave before the heavy rain started.',
          options: [
            { id: 'opt-a', text: 'leave (/iː/ - tense long vowel)' },
            { id: 'opt-b', text: 'live (/ɪ/ - lax short vowel)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "The speaker held the tense vowel /iː/ in 'leave' with wide spread lips and longer duration.",
          targetPhonemeSymbol: '/iː/ vs /ɪ/',
          acousticTrapTip: "Tense /iː/ has higher F2 resonance and lasts ~40% longer than lax short /ɪ/.",
          difficultyLevel: 'Foundation'
        },
        {
          id: 'ee-ih-2',
          problemAreaKey: 'ee-vs-ih',
          type: 'minimal-pair',
          promptQuestion: 'Which word did the reception officer say?',
          audioPromptSnippet: 'Did you remember to fill the slip before leaving the counter?',
          options: [
            { id: 'opt-a', text: 'sleep (/iː/)' },
            { id: 'opt-b', text: 'slip (/ɪ/)' }
          ],
          correctOptionId: 'opt-b',
          explanation: "'Slip' features the short centralized vowel /ɪ/. Notice the rapid decay and lower jaw tension.",
          targetPhonemeSymbol: '/ɪ/',
          acousticTrapTip: "Listen for the abrupt consonant stop right after the centralized vowel /ɪ/.",
          difficultyLevel: 'Intermediate'
        },
        {
          id: 'ee-ih-3',
          problemAreaKey: 'ee-vs-ih',
          type: 'rapid-stream',
          promptQuestion: 'Identify the exact target vowel sequence spoken in the phrase.',
          audioPromptSnippet: 'sixteen green tickets',
          options: [
            { id: 'opt-a', text: '/ɪ/ then /iː/ then /ɪ/ (sixteen -> green -> tickets)' },
            { id: 'opt-b', text: '/iː/ then /iː/ then /iː/ (all long vowels)' },
            { id: 'opt-c', text: '/ɪ/ then /ɪ/ then /ɪ/ (all short vowels)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "'Sixteen' (-teen is /iː/), 'green' is /iː/, while 'tickets' features short /ɪ/.",
          targetPhonemeSymbol: '/iː/ - /ɪ/',
          acousticTrapTip: "In natural British/American rhythm, unstressed grammatical suffixes compress into short /ɪ/.",
          difficultyLevel: 'Advanced'
        },
        {
          id: 'ee-ih-4',
          problemAreaKey: 'ee-vs-ih',
          type: 'odd-one-out',
          promptQuestion: 'Listen to all 3 words in sequence. Which word contains the SHORT /ɪ/ vowel?',
          audioPromptSnippet: 'clean, routine, visit',
          options: [
            { id: 'opt-a', text: 'clean' },
            { id: 'opt-b', text: 'routine' },
            { id: 'opt-c', text: 'visit' }
          ],
          correctOptionId: 'opt-c',
          explanation: "'Visit' has two short lax /ɪ/ vowels (/ˈvɪz.ɪt/), whereas 'clean' (/kliːn/) and 'routine' (/ruːˈtiːn/) contain long /iː/.",
          targetPhonemeSymbol: '/ɪ/',
          acousticTrapTip: "Spelling with 'e' or 'ee' usually signals /iː/, whereas 'i' in closed syllables signals /ɪ/.",
          difficultyLevel: 'Foundation'
        },
        {
          id: 'ee-ih-5',
          problemAreaKey: 'ee-vs-ih',
          type: 'sentence-shadow',
          promptQuestion: 'Did the speaker state they will "reach" or "rich"?',
          audioPromptSnippet: 'The committee hopes to reach an agreement before noon.',
          options: [
            { id: 'opt-a', text: 'reach (/iː/)' },
            { id: 'opt-b', text: 'rich (/ɪ/)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "'Reach' has the long vowel /iː/ followed by affricate /tʃ/.",
          targetPhonemeSymbol: '/iː/',
          acousticTrapTip: "Vowels lengthen further when preceding a voiceless affricate /tʃ/ in open phrases.",
          difficultyLevel: 'Intermediate'
        }
      ],

      'th-voiceless': [
        {
          id: 'th-vl-1',
          problemAreaKey: 'th-voiceless',
          type: 'minimal-pair',
          promptQuestion: 'Listen closely to the initial consonant. Which word was spoken?',
          audioPromptSnippet: 'The speaker gave three distinct reasons for the delay.',
          options: [
            { id: 'opt-a', text: 'three (/θ/ - tongue between teeth)' },
            { id: 'opt-b', text: 'free (/f/ - lower lip to upper teeth)' },
            { id: 'opt-c', text: 'tree (/t/ - alveolar plosive burst)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "'Three' begins with the soft dental fricative /θ/, with continuous air hissing over the tongue tip.",
          targetPhonemeSymbol: '/θ/',
          acousticTrapTip: "/θ/ has a broader, softer noise spectrum with lower amplitude than sharp labiodental /f/.",
          difficultyLevel: 'Foundation'
        },
        {
          id: 'th-vl-2',
          problemAreaKey: 'th-voiceless',
          type: 'minimal-pair',
          promptQuestion: 'Which number did the caller request?',
          audioPromptSnippet: 'We need approximately thirty chairs for the meeting.',
          options: [
            { id: 'opt-a', text: 'thirty (/θ/)' },
            { id: 'opt-b', text: 'dirty (/d/)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "The initial sound is the unvoiced soft friction of /θ/ in 'thirty', not the voiced plosive /d/ in 'dirty'.",
          targetPhonemeSymbol: '/θ/',
          acousticTrapTip: "Listen for the absence of vocal cord buzz right at the onset of /θ/.",
          difficultyLevel: 'Intermediate'
        },
        {
          id: 'th-vl-3',
          problemAreaKey: 'th-voiceless',
          type: 'rapid-stream',
          promptQuestion: 'In the audio clip, which final word was articulated?',
          audioPromptSnippet: 'After checking the patient, the doctor verified their health.',
          options: [
            { id: 'opt-a', text: 'health (ends with /θ/)' },
            { id: 'opt-b', text: 'help (ends with /p/)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "The utterance ends with continuous friction /θ/ in 'health', with no labial closure stop.",
          targetPhonemeSymbol: '/θ/',
          acousticTrapTip: "Word-final /θ/ lacks plosive burst; do not confuse with unreleased final /p/.",
          difficultyLevel: 'Intermediate'
        },
        {
          id: 'th-vl-4',
          problemAreaKey: 'th-voiceless',
          type: 'odd-one-out',
          promptQuestion: 'Which word in the spoken trio begins with /f/ instead of /θ/?',
          audioPromptSnippet: 'think, thought, fought',
          options: [
            { id: 'opt-a', text: 'think' },
            { id: 'opt-b', text: 'thought' },
            { id: 'opt-c', text: 'fought' }
          ],
          correctOptionId: 'opt-c',
          explanation: "'Fought' begins with the sharp labiodental /f/ (lip-to-teeth), whereas 'think' and 'thought' start with dental /θ/.",
          targetPhonemeSymbol: '/θ/ vs /f/',
          acousticTrapTip: "Labiodental /f/ has higher acoustic frequency energy concentration around 4.5 kHz.",
          difficultyLevel: 'Advanced'
        }
      ],

      'th-voiced': [
        {
          id: 'th-vd-1',
          problemAreaKey: 'th-voiced',
          type: 'minimal-pair',
          promptQuestion: 'Listen to the demonstrative word. Which was spoken?',
          audioPromptSnippet: 'Could you hand me that folder on the table?',
          options: [
            { id: 'opt-a', text: 'that (/ð/ - voiced dental fricative)' },
            { id: 'opt-b', text: 'dat (/d/ - alveolar stop)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "'That' starts with the continuous voiced friction /ð/, vibrating against the front incisors.",
          targetPhonemeSymbol: '/ð/',
          acousticTrapTip: "Unlike /d/, there is no silent closure gap before the vowel onset in /ð/.",
          difficultyLevel: 'Foundation'
        },
        {
          id: 'th-vd-2',
          problemAreaKey: 'th-voiced',
          type: 'rapid-stream',
          promptQuestion: 'Which compound word was uttered in the weather report?',
          audioPromptSnippet: 'The meteorologist warned of severe weather conditions.',
          options: [
            { id: 'opt-a', text: 'weather (/ð/)' },
            { id: 'opt-b', text: 'whether (/w/ + /ð/)' },
            { id: 'opt-c', text: 'wetter (/t/)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "In 'weather', the medial consonant is voiced dental /ð/, not an alveolar tap /t/.",
          targetPhonemeSymbol: '/ð/',
          acousticTrapTip: "Medial /ð/ maintains vocal cord voicing smoothly through the inter-vocalic boundary.",
          difficultyLevel: 'Intermediate'
        }
      ],

      'v-vs-w': [
        {
          id: 'vw-1',
          problemAreaKey: 'v-vs-w',
          type: 'minimal-pair',
          promptQuestion: 'Listen to the adjective. Did the speaker say "very" or "wary"?',
          audioPromptSnippet: 'The tourists were very cautious near the edge.',
          options: [
            { id: 'opt-a', text: 'very (/v/ - upper teeth on lower lip)' },
            { id: 'opt-b', text: 'wary (/w/ - rounded lips glide)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "'Very' begins with the labiodental fricative /v/. Notice the audible teeth-lip vibration buzz.",
          targetPhonemeSymbol: '/v/ vs /w/',
          acousticTrapTip: "/v/ produces continuous friction noise, whereas /w/ is a pure formant transition glide.",
          difficultyLevel: 'Foundation'
        },
        {
          id: 'vw-2',
          problemAreaKey: 'v-vs-w',
          type: 'minimal-pair',
          promptQuestion: 'Did the captain describe the "vest" or the "west"?',
          audioPromptSnippet: 'The team sailed toward the west coast of the island.',
          options: [
            { id: 'opt-a', text: 'vest (/v/)' },
            { id: 'opt-b', text: 'west (/w/)' }
          ],
          correctOptionId: 'opt-b',
          explanation: "'West' begins with lip rounding /w/ without any teeth contact with the lips.",
          targetPhonemeSymbol: '/w/',
          acousticTrapTip: "Listen for the rising second formant (F2) characteristic of the /w/ lip-rounding release.",
          difficultyLevel: 'Foundation'
        },
        {
          id: 'vw-3',
          problemAreaKey: 'v-vs-w',
          type: 'rapid-stream',
          promptQuestion: 'Identify the word starting with /v/ in this travel announcement.',
          audioPromptSnippet: 'Winter weather will delay our arrival view.',
          options: [
            { id: 'opt-a', text: 'view (/v/)' },
            { id: 'opt-b', text: 'winter (/w/)' },
            { id: 'opt-c', text: 'weather (/w/)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "'View' features initial /v/, while 'winter' and 'weather' both start with /w/.",
          targetPhonemeSymbol: '/v/',
          acousticTrapTip: "Contrast the lip rounding of /w/ with the friction buzz of /v/.",
          difficultyLevel: 'Intermediate'
        }
      ],

      'sh-vs-ch': [
        {
          id: 'shch-1',
          problemAreaKey: 'sh-vs-ch',
          type: 'minimal-pair',
          promptQuestion: 'Listen to the verb. Did the speaker say "share" or "chair"?',
          audioPromptSnippet: 'The board member agreed to chair the morning session.',
          options: [
            { id: 'opt-a', text: 'share (/ʃ/ - continuous friction)' },
            { id: 'opt-b', text: 'chair (/tʃ/ - stop burst + release)' }
          ],
          correctOptionId: 'opt-b',
          explanation: "'Chair' has an explosive /t/ stop closure before releasing into /ʃ/, making it an affricate /tʃ/.",
          targetPhonemeSymbol: '/tʃ/ vs /ʃ/',
          acousticTrapTip: "/tʃ/ begins with an abrupt silence closure followed by a high-energy friction burst.",
          difficultyLevel: 'Foundation'
        },
        {
          id: 'shch-2',
          problemAreaKey: 'sh-vs-ch',
          type: 'minimal-pair',
          promptQuestion: 'Which noun did the store manager pronounce?',
          audioPromptSnippet: 'Customers can view the new shoe collection in aisle three.',
          options: [
            { id: 'opt-a', text: 'shoe (/ʃ/)' },
            { id: 'opt-b', text: 'chew (/tʃ/)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "'Shoe' starts with a gentle, continuous hushing /ʃ/ without any plosive tap.",
          targetPhonemeSymbol: '/ʃ/',
          acousticTrapTip: "/ʃ/ has a gradual onset rise time (~70ms) compared to /tʃ/ (~25ms).",
          difficultyLevel: 'Intermediate'
        }
      ],

      'numbers-rapid': [
        {
          id: 'num-1',
          problemAreaKey: 'numbers-rapid',
          type: 'rapid-stream',
          promptQuestion: 'Listen to the telephone digit sequence. Which phone number was dictated?',
          audioPromptSnippet: 'You can reach the office at zero one seven two eight, two nine five, two one five.',
          options: [
            { id: 'opt-a', text: '01728 295 215' },
            { id: 'opt-b', text: '01728 215 215 (missed nine in middle block)' },
            { id: 'opt-c', text: '01728 285 215 (confused eight for nine)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "The audio clearly said 'two nine five' in the middle cluster.",
          targetPhonemeSymbol: 'Rapid Digits',
          acousticTrapTip: "In rapid digit streams, native speakers group digits in 3s and 4s with pitch falls at boundaries.",
          difficultyLevel: 'Intermediate'
        },
        {
          id: 'num-2',
          problemAreaKey: 'numbers-rapid',
          type: 'minimal-pair',
          promptQuestion: 'Did the speaker say 14 or 40?',
          audioPromptSnippet: 'The package arrived on the fourteenth of August.',
          options: [
            { id: 'opt-a', text: '14th (fourTEEN - strong final stress)' },
            { id: 'opt-b', text: '40th (FORty - strong initial stress)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "In 'fourteenth', the primary pitch prominence and vowel length fall on the final syllable '-teen'.",
          targetPhonemeSymbol: '-teen vs -ty',
          acousticTrapTip: "-teen numbers carry higher pitch, louder amplitude, and tense /iː/ on the suffix.",
          difficultyLevel: 'Foundation'
        }
      ],

      'signpost-pivots': [
        {
          id: 'sign-1',
          problemAreaKey: 'signpost-pivots',
          type: 'rapid-stream',
          promptQuestion: 'What was the finalized booking date after the speaker corrected themselves?',
          audioPromptSnippet: 'We had originally penciled in Thursday, but actually Friday works much better for everyone.',
          options: [
            { id: 'opt-a', text: 'Friday (confirmed after "actually")' },
            { id: 'opt-b', text: 'Thursday (discarded initial proposition)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "The signpost 'but actually' explicitly negates the earlier Thursday date and confirms Friday.",
          targetPhonemeSymbol: 'Signpost Negation',
          acousticTrapTip: "Signpost words like 'actually', 'instead', and 'sorry' carry a distinct pitch reset.",
          difficultyLevel: 'Intermediate'
        },
        {
          id: 'sign-2',
          problemAreaKey: 'signpost-pivots',
          type: 'rapid-stream',
          promptQuestion: 'Which room did the lecturer ultimately designate?',
          audioPromptSnippet: 'Head towards Room B12... oh wait, scratch that, maintenance moved us to Room C14.',
          options: [
            { id: 'opt-a', text: 'Room C14 (self-corrected resolution)' },
            { id: 'opt-b', text: 'Room B12 (cancelled original direction)' }
          ],
          correctOptionId: 'opt-a',
          explanation: "The vocal cue 'scratch that' alerts the listener to invalidate the first room number mentioned.",
          targetPhonemeSymbol: 'Self-Correction',
          acousticTrapTip: "Never lock in your answer until the discourse clause completes its contrastive boundary.",
          difficultyLevel: 'Advanced'
        }
      ]
    };

    // Construct Drill Sets for each problem metric
    const drillSets: PhonemeDrillSet[] = problemMetrics.map((metric) => {
      const drills = challengeRepository[metric.key] || [
        // Fallback generic drill generated dynamically from metric sample words
        {
          id: `${metric.key}-gen-1`,
          problemAreaKey: metric.key,
          type: 'minimal-pair' as const,
          promptQuestion: `Listen to the pronunciation. Which target word contains ${metric.phonemeSymbol || 'the sound'}?`,
          audioPromptSnippet: metric.sampleWords.slice(0, 3).join(', '),
          options: [
            { id: 'opt-1', text: metric.sampleWords[0] || 'Target sound' },
            { id: 'opt-2', text: metric.sampleWords[1] || 'Distractor' }
          ],
          correctOptionId: 'opt-1',
          explanation: `Notice the articulation of ${metric.label}. ${metric.diagnosticNote}`,
          targetPhonemeSymbol: metric.phonemeSymbol || 'Target',
          acousticTrapTip: metric.diagnosticNote,
          difficultyLevel: 'Foundation' as const
        }
      ];

      return {
        problemAreaKey: metric.key,
        phonemeName: metric.label,
        phonemeSymbol: metric.phonemeSymbol || metric.key,
        category: (metric.subCategory as any) || 'fricative',
        heatMapErrorRate: metric.errorRatePct,
        severity: metric.severity,
        diagnosticRationale: metric.diagnosticNote,
        drills
      };
    });

    return drillSets;
  }

  /**
   * Retrieves saved drill history from storage
   */
  static getDrillHistory(): PhonemeDrillHistoryRecord[] {
    try {
      const data = localStorage.getItem(PHONEME_DRILL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Saves a completed phoneme drill session
   */
  static saveDrillHistory(record: PhonemeDrillHistoryRecord): void {
    try {
      const history = this.getDrillHistory();
      history.unshift(record);
      // Keep most recent 50
      if (history.length > 50) history.length = 50;
      localStorage.setItem(PHONEME_DRILL_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save phoneme drill record', e);
    }
  }
}
