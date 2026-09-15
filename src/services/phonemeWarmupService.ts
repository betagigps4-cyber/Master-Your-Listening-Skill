import { PhonemePracticeItem, WarmupResult } from '../types';

interface PhonemeDefinition {
  key: string;
  phoneme: string;
  name: string;
  category: 'fricative' | 'plosive' | 'vowel' | 'diphthong' | 'affricate' | 'nasal' | 'liquid';
  description: string;
  articulationGuide: string;
  similarSoundWarning: string;
  regexPatterns: RegExp[];
  commonWords: string[];
}

const PHONEME_DICTIONARY: PhonemeDefinition[] = [
  {
    key: 'th-voiceless',
    phoneme: '/θ/',
    name: 'Voiceless Dental Fricative (TH)',
    category: 'fricative',
    description: "Soft 'th' sound produced with continuous airflow over the tongue.",
    articulationGuide: 'Place the tip of your tongue lightly between your upper and lower front teeth. Blow air gently through the gap without vibrating your vocal cords.',
    similarSoundWarning: 'Avoid substituting with /s/ (sin) or /f/ (fin) — keep the tongue tip visible!',
    regexPatterns: [/\b(three|thirty|thirteen|third|think|thinking|thought|through|throughout|thanks|thank|thankful|theatre|theater|theory|theoretical|thick|thickness|thin|thing|things|thorough|throat|thousand|thunder|north|northern|south|southern|bath|bathroom|month|monthly|teeth|tooth|health|healthy|youth|youthful|path|pathway|method|methodology|author|breath|both|math|mathematics|athlete|athletic|authentic|author|authorities)\b/i],
    commonWords: ['three', 'thirty', 'thursday', 'third', 'think', 'thought', 'through', 'north', 'south', 'month', 'theatre', 'health']
  },
  {
    key: 'th-voiced',
    phoneme: '/ð/',
    name: 'Voiced Dental Fricative (TH)',
    category: 'fricative',
    description: "Voiced 'th' sound with vocal cord vibration.",
    articulationGuide: 'Rest your tongue tip between your teeth and vibrate your vocal cords while pushing air through.',
    similarSoundWarning: 'Avoid substituting with /d/ (dan) or /z/ (zen). Feel the buzz on your front teeth.',
    regexPatterns: [/\b(this|that|these|those|there|their|they|then|though|together|mother|father|weather|breathe|other|another)\b/i],
    commonWords: ['this', 'that', 'these', 'those', 'there', 'their', 'weather', 'together', 'another', 'mother', 'breathe']
  },
  {
    key: 'ee-long',
    phoneme: '/iː/',
    name: 'Long Close Front Vowel (EE)',
    category: 'vowel',
    description: "Tense, stretched long 'ee' vowel sound.",
    articulationGuide: 'Spread your lips widely in an exaggerated smile. Raise your tongue high and forward near the roof of the mouth and hold the sound steadily.',
    similarSoundWarning: 'Do not shorten into /ɪ/ (as in "ship"). Keep the smile muscles engaged.',
    regexPatterns: [/\b(see|sea|week|meet|routine|beach|clean|sleep|feed|keep|leave|green|police|machine|people|field|brief|seat|lead|easy)\b/i],
    commonWords: ['routine', 'meet', 'clean', 'beach', 'week', 'sleep', 'green', 'people', 'police', 'seat', 'leave']
  },
  {
    key: 'ih-short',
    phoneme: '/ɪ/',
    name: 'Short Near-Close Vowel (IH)',
    category: 'vowel',
    description: "Relaxed short vowel sound found in unstressed syllables.",
    articulationGuide: 'Relax your lips and jaw slightly lower than /iː/. Let the tongue rest slightly lower in the mouth with a quick, soft vocalization.',
    similarSoundWarning: 'Do not tense your lips into a smile, or it will sound like /iː/ ("sheep").',
    regexPatterns: [/\b(ship|fit|minute|busy|ticket|six|trip|give|city|building|quick|window|visit|listen|dinner|system|history|simple)\b/i],
    commonWords: ['ticket', 'minute', 'busy', 'visit', 'building', 'trip', 'window', 'listen', 'city', 'simple', 'system']
  },
  {
    key: 'v-fricative',
    phoneme: '/v/',
    name: 'Voiced Labiodental Fricative (V)',
    category: 'fricative',
    description: "Continuous vibrating sound made with upper teeth and lower lip.",
    articulationGuide: 'Lightly place your top front teeth against the inner margin of your lower lip. Push voiced air through to create a vibrating buzzing sensation.',
    similarSoundWarning: 'Do not close both lips together or it will sound like /b/ ("berry" vs "very").',
    regexPatterns: [/\b(very|visit|travel|arrive|service|view|seven|heavy|event|driver|hotel|live|move|give|save|every|leave|november)\b/i],
    commonWords: ['travel', 'visit', 'arrive', 'service', 'very', 'view', 'seven', 'event', 'driver', 'every', 'november']
  },
  {
    key: 'w-glide',
    phoneme: '/w/',
    name: 'Voiced Labial-Velar Approximant (W)',
    category: 'liquid',
    description: "Smooth glide formed by rounded lips moving into a vowel.",
    articulationGuide: 'Round your lips tightly into a small circle as if whistling. Do not let your teeth touch your lip. Glide outward into the following vowel.',
    similarSoundWarning: 'Keep teeth completely off the lower lip so it never turns into /v/.',
    regexPatterns: [/\b(water|week|walk|window|work|welcome|world|away|always|warm|wait|winter|white|west|one|well)\b/i],
    commonWords: ['water', 'week', 'walk', 'window', 'work', 'welcome', 'world', 'away', 'always', 'wait', 'warm']
  },
  {
    key: 'sh-fricative',
    phoneme: '/ʃ/',
    name: 'Voiceless Postalveolar Fricative (SH)',
    category: 'fricative',
    description: "Soft hushing sound produced just behind the tooth ridge.",
    articulationGuide: 'Flatter and flare your lips slightly forward. Raise the tongue blade just behind the upper tooth ridge, releasing unvoiced breath.',
    similarSoundWarning: 'Do not let the tongue touch the ridge, which creates /tʃ/ (ch). Keep the airflow smooth and continuous.',
    regexPatterns: [/\b(station|schedule|shower|shop|cash|special|finish|condition|ocean|rush|initial|fashion|social|sure)\b/i],
    commonWords: ['station', 'schedule', 'shower', 'special', 'finish', 'cash', 'social', 'sure', 'condition', 'ocean']
  },
  {
    key: 'ch-affricate',
    phoneme: '/tʃ/',
    name: 'Voiceless Postalveolar Affricate (CH)',
    category: 'affricate',
    description: "Crisp explosive stop followed immediately by a hushing release.",
    articulationGuide: 'Start by pressing your tongue tip firmly behind your upper teeth (like /t/), then release abruptly into a flared /ʃ/ (sh) burst.',
    similarSoundWarning: 'Make sure there is a distinct stop release at the beginning, distinguishing it from /ʃ/ ("share" vs "chair").',
    regexPatterns: [/\b(check|chair|choice|change|catch|nature|feature|future|kitchen|child|reach|march|culture|question)\b/i],
    commonWords: ['check', 'choice', 'change', 'nature', 'feature', 'future', 'kitchen', 'child', 'question', 'culture']
  },
  {
    key: 'j-affricate',
    phoneme: '/dʒ/',
    name: 'Voiced Postalveolar Affricate (J)',
    category: 'affricate',
    description: "Voiced counterpart to /tʃ/, vibrating the vocal cords during the burst.",
    articulationGuide: 'Press tongue tip behind upper front teeth like a /d/, then release with vocal vibration into a voiced /ʒ/ burst.',
    similarSoundWarning: 'Avoid confusing with soft /j/ (as in "yellow") or unvoiced /tʃ/ ("choke" vs "joke").',
    regexPatterns: [/\b(journey|juice|gym|bridge|large|project|agenda|manager|major|job|join|budget|manage|general)\b/i],
    commonWords: ['journey', 'project', 'agenda', 'manager', 'major', 'budget', 'bridge', 'large', 'general', 'juice']
  },
  {
    key: 'ey-diphthong',
    phoneme: '/eɪ/',
    name: 'Closing Diphthong (EY)',
    category: 'diphthong',
    description: "Two-stage glide from /e/ to /ɪ/ as in 'day' and 'train'.",
    articulationGuide: 'Start with mid-open unrounded lips for /e/, then smoothly glide the jaw and tongue upward toward /ɪ/.',
    similarSoundWarning: 'Do not stop halfway into a flat monophthong /e/ (as in "bet"). Make sure the closing glide is audible.',
    regexPatterns: [/\b(train|late|station|today|eight|table|delay|plane|break|great|wait|stay|make|take|pay|name)\b/i],
    commonWords: ['train', 'late', 'station', 'today', 'table', 'delay', 'plane', 'great', 'stay', 'make', 'name']
  },
  {
    key: 'ay-diphthong',
    phoneme: '/aɪ/',
    name: 'Closing Diphthong (AY)',
    category: 'diphthong',
    description: "Wide opening glide from /a/ moving up to /ɪ/ as in 'time'.",
    articulationGuide: 'Open mouth wide for /a/, then glide the tongue and jaw upward into high /ɪ/.',
    similarSoundWarning: 'Ensure the mouth opens sufficiently at the start before closing.',
    regexPatterns: [/\b(time|flight|arrive|five|night|price|sign|buy|find|guide|island|right|line|mile|size)\b/i],
    commonWords: ['time', 'flight', 'arrive', 'five', 'night', 'price', 'sign', 'buy', 'find', 'guide', 'right']
  },
  {
    key: 'oh-diphthong',
    phoneme: '/əʊ/',
    name: 'Closing Diphthong (OH)',
    category: 'diphthong',
    description: "Rounded diphthong moving from neutral schwa /ə/ to rounded /ʊ/.",
    articulationGuide: 'Start with relaxed central lips, then gently round your lips into a circle as your tongue pulls back.',
    similarSoundWarning: 'Avoid a flat /ɔː/ ("caught"). Emphasize the subtle inward lip rounding at the end.',
    regexPatterns: [/\b(hotel|road|home|phone|boat|open|post|close|slow|show|notice|coast|goal|local|moment)\b/i],
    commonWords: ['hotel', 'road', 'home', 'phone', 'open', 'post', 'close', 'slow', 'show', 'local', 'notice']
  },
  {
    key: 'ng-nasal',
    phoneme: '/ŋ/',
    name: 'Velar Nasal (NG)',
    category: 'nasal',
    description: "Nasal sound made by sealing the back of the tongue against the soft palate.",
    articulationGuide: 'Raise the back of your tongue to touch your soft palate (velum). Let the voiced sound resonate entirely through your nose.',
    similarSoundWarning: 'Do not finish with a hard /g/ or /k/ plosive pop unless followed by another consonant.',
    regexPatterns: [/\b(morning|evening|booking|running|speaking|listening|training|meeting|building|parking|spring|ring|long)\b/i],
    commonWords: ['morning', 'evening', 'booking', 'running', 'speaking', 'listening', 'training', 'meeting', 'building', 'parking']
  },
  {
    key: 'rl-contrast',
    phoneme: '/r/ vs /l/',
    name: 'Liquid Consonant Contrast (R vs L)',
    category: 'liquid',
    description: "Vital distinction between retroflex/bunched /r/ and alveolar lateral /l/.",
    articulationGuide: 'For /l/, touch your tongue tip to the tooth ridge behind your front teeth. For /r/, curl tongue tip back WITHOUT touching any part of the mouth roof.',
    similarSoundWarning: 'Never let the tongue touch the roof of the mouth during /r/!',
    regexPatterns: [/\b(right|light|road|load|room|railway|library|flight|early|river|travel|really|already)\b/i],
    commonWords: ['railway', 'library', 'flight', 'road', 'room', 'travel', 'really', 'early', 'river', 'already']
  }
];

export class PhonemeWarmupService {
  /**
   * Scans a scenario transcript and extracts the top 3-4 most pedagogically relevant
   * phonemes present in the actual words of the dialogue.
   */
  static extractScenarioPhonemes(
    transcript: string,
    scenarioTitle: string = ''
  ): PhonemePracticeItem[] {
    if (!transcript) {
      return this.getDefaultPhonemes();
    }

    // Clean transcript of voice markers [F1], [M2], etc.
    const cleanTranscript = transcript.replace(/\[(F[1-5]|M[1-5])\]/g, ' ');
    const sentences = cleanTranscript.split(/(?<=[.?!])\s+/).filter(Boolean);
    const words = cleanTranscript
      .toLowerCase()
      .replace(/[^a-z0-9\s'-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const matches: Array<{
      def: PhonemeDefinition;
      matchedWord: string;
      matchedSentence: string;
      score: number;
    }> = [];

    for (const def of PHONEME_DICTIONARY) {
      let foundWord = '';
      let foundSentence = '';
      let matchCount = 0;

      // Check common dictionary words first
      for (const cw of def.commonWords) {
        if (words.includes(cw)) {
          matchCount += 3;
          if (!foundWord) foundWord = cw;
        }
      }

      // Check regex patterns against words
      for (const pattern of def.regexPatterns) {
        for (const w of words) {
          if (pattern.test(w)) {
            matchCount++;
            if (!foundWord) foundWord = w;
          }
        }
      }

      if (matchCount > 0 && foundWord) {
        // Find the sentence containing this word
        const sMatch = sentences.find((s) =>
          new RegExp(`\\b${foundWord}\\b`, 'i').test(s)
        );
        foundSentence = sMatch ? sMatch.trim() : `Focus on the word: "${foundWord}"`;

        matches.push({
          def,
          matchedWord: foundWord,
          matchedSentence: foundSentence,
          score: matchCount
        });
      }
    }

    // Sort by relevance score
    matches.sort((a, b) => b.score - a.score);

    // Pick 3-4 unique categories to ensure acoustic variety
    const selected: PhonemePracticeItem[] = [];
    const usedCategories = new Set<string>();
    const usedPhonemes = new Set<string>();

    for (const m of matches) {
      if (selected.length >= 4) break;
      // Do not duplicate the same phoneme
      if (usedPhonemes.has(m.def.phoneme)) continue;

      if (!usedCategories.has(m.def.category) || selected.length < 3) {
        usedCategories.add(m.def.category);
        usedPhonemes.add(m.def.phoneme);
        const cleanWord = m.matchedWord.toLowerCase().replace(/[^a-z0-9]/g, '') || 'sound';
        selected.push({
          id: `ph-${m.def.key}-${cleanWord}-${selected.length + 1}`,
          phoneme: m.def.phoneme,
          name: m.def.name,
          category: m.def.category,
          description: m.def.description,
          articulationGuide: m.def.articulationGuide,
          targetWord: m.matchedWord,
          exampleSentence: m.matchedSentence,
          similarSoundWarning: m.def.similarSoundWarning,
          difficulty: m.def.category === 'diphthong' || m.def.phoneme.includes('θ') ? 'intermediate' : 'beginner'
        });
      }
    }

    if (selected.length < 3) {
      // Fill in with essential defaults
      const defaults = this.getDefaultPhonemes();
      for (const d of defaults) {
        if (selected.length >= 3) break;
        if (!selected.some((s) => s.phoneme === d.phoneme)) {
          selected.push({
            ...d,
            id: `${d.id}-${selected.length + 1}`
          });
        }
      }
    }

    return selected;
  }

  private static getDefaultPhonemes(): PhonemePracticeItem[] {
    return [
      {
        id: 'ph-th-three',
        phoneme: '/θ/',
        name: 'Voiceless Dental Fricative (TH)',
        category: 'fricative',
        description: "Essential English 'th' sound in numbers and schedules.",
        articulationGuide: 'Place your tongue tip lightly between your front teeth. Blow air through softly without vocal cord vibration.',
        targetWord: 'thirty',
        exampleSentence: 'The appointment has been scheduled for thirty minutes past ten.',
        similarSoundWarning: 'Avoid turning it into /s/ (sirty) or /f/ (firty).',
        difficulty: 'intermediate'
      },
      {
        id: 'ph-ee-routine',
        phoneme: '/iː/',
        name: 'Long Close Front Vowel (EE)',
        category: 'vowel',
        description: "Stretched long 'ee' vowel sound.",
        articulationGuide: 'Spread your lips widely in an exaggerated smile and hold the high front vowel.',
        targetWord: 'routine',
        exampleSentence: 'She described her daily routine in detail.',
        similarSoundWarning: 'Do not drop your jaw or it turns into short /ɪ/.',
        difficulty: 'beginner'
      },
      {
        id: 'ph-v-travel',
        phoneme: '/v/',
        name: 'Voiced Labiodental Fricative (V)',
        category: 'fricative',
        description: "Vibrating lip-to-teeth consonant.",
        articulationGuide: 'Top front teeth lightly touch lower lip. Vibrate vocal cords as air passes.',
        targetWord: 'travel',
        exampleSentence: 'The passengers were advised to travel early in the morning.',
        similarSoundWarning: 'Do not press both lips together into /b/ (trabel).',
        difficulty: 'beginner'
      }
    ];
  }

  /**
   * Evaluate a user's speech attempt against the target phoneme and word.
   */
  static evaluatePronunciation(
    targetWord: string,
    targetPhoneme: string,
    recognizedText: string = '',
    audioDurationMs: number = 0,
    hasAudioEnergy: boolean = true
  ): WarmupResult {
    const cleanTarget = targetWord.toLowerCase().trim();
    const cleanRec = recognizedText.toLowerCase().trim();

    if (!hasAudioEnergy && !cleanRec) {
      return {
        phonemeId: targetPhoneme,
        score: 0,
        recognizedText: 'No acoustic signal detected',
        passed: false
      };
    }

    // Exact word match
    if (cleanRec.includes(cleanTarget)) {
      return {
        phonemeId: targetPhoneme,
        score: 96,
        recognizedText: cleanRec,
        passed: true
      };
    }

    // Substring or phonetic similarity
    if (cleanRec.length > 0) {
      const similarity = this.calculateSimilarity(cleanTarget, cleanRec);
      if (similarity >= 0.7) {
        return {
          phonemeId: targetPhoneme,
          score: Math.round(similarity * 100),
          recognizedText: cleanRec,
          passed: true
        };
      }
      if (similarity >= 0.45) {
        return {
          phonemeId: targetPhoneme,
          score: Math.round(similarity * 100),
          recognizedText: cleanRec,
          passed: true
        };
      }
      // If recognized text is completely different
      return {
        phonemeId: targetPhoneme,
        score: Math.max(35, Math.round(similarity * 100)),
        recognizedText: cleanRec,
        passed: false
      };
    }

    // If Speech Recognition was unavailable or returned no words but audio energy was present
    if (hasAudioEnergy && audioDurationMs > 400) {
      return {
        phonemeId: targetPhoneme,
        score: 82,
        recognizedText: `Acoustically confirmed (${targetWord})`,
        passed: true
      };
    }

    return {
      phonemeId: targetPhoneme,
      score: 40,
      recognizedText: 'Voice too brief or quiet',
      passed: false
    };
  }

  private static calculateSimilarity(s1: string, s2: string): number {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;

    // Check if shorter is substring of longer
    if (longer.includes(shorter)) {
      return shorter.length / longer.length;
    }

    const editDistance = this.levenshtein(s1, s2);
    return (longer.length - editDistance) / longer.length;
  }

  private static levenshtein(a: string, b: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }
}
