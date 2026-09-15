// Local curated phonetic & lexical dictionary for high-frequency listening vocabulary
// Supports immediate offline lookup, phonetic IPA, definition, part of speech, and fallback derivation
export interface WordDefinition {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  exampleSentence?: string;
  acousticTip?: string;
}

const DICTIONARY_DATABASE: Record<string, WordDefinition> = {
  leave: {
    word: 'leave',
    phonetic: '/liːv/',
    partOfSpeech: 'verb',
    definition: 'To go away from a place, person, or situation; depart.',
    exampleSentence: 'The passengers decided to leave before the afternoon rush.',
    acousticTip: 'Contains the tense long vowel /iː/ with spread lips, distinct from lax /ɪ/ in live.'
  },
  live: {
    word: 'live',
    phonetic: '/lɪv/',
    partOfSpeech: 'verb',
    definition: 'To remain alive or have one\'s permanent home in a specified place.',
    exampleSentence: 'They live in the coastal province.',
    acousticTip: 'Features the short centralized lax vowel /ɪ/ with relaxed jaw tension.'
  },
  slip: {
    word: 'slip',
    phonetic: '/slɪp/',
    partOfSpeech: 'noun / verb',
    definition: 'A small piece of paper; or to lose one\'s footing or balance.',
    exampleSentence: 'Remember to submit your confirmation slip at the counter.',
    acousticTip: 'Short /ɪ/ followed by a voiceless bilabial stop /p/.'
  },
  sleep: {
    word: 'sleep',
    phonetic: '/sliːp/',
    partOfSpeech: 'noun / verb',
    definition: 'A condition of body and mind that recurs for several hours every night.',
    exampleSentence: 'Adequate sleep is critical before taking an exam.',
    acousticTip: 'Long tense vowel /iː/ held roughly 40% longer than in slip.'
  },
  reach: {
    word: 'reach',
    phonetic: '/riːtʃ/',
    partOfSpeech: 'verb',
    definition: 'To arrive at; attain a state, destination, or agreement.',
    exampleSentence: 'We hope to reach an agreement before noon.',
    acousticTip: 'Long tense /iː/ followed by unvoiced affricate /tʃ/.'
  },
  rich: {
    word: 'rich',
    phonetic: '/rɪtʃ/',
    partOfSpeech: 'adjective',
    definition: 'Having a great deal of money or assets; abundant.',
    exampleSentence: 'The island has a rich historical heritage.',
    acousticTip: 'Rapid short /ɪ/ with brief acoustic duration.'
  },
  three: {
    word: 'three',
    phonetic: '/θriː/',
    partOfSpeech: 'numeral',
    definition: 'Equivalent to the sum of one and two; one more than two.',
    exampleSentence: 'The inspector reviewed three separate reports.',
    acousticTip: 'Soft voiceless dental fricative /θ/ with the tongue between the teeth.'
  },
  tree: {
    word: 'tree',
    phonetic: '/triː/',
    partOfSpeech: 'noun',
    definition: 'A woody perennial plant, typically having a single stem or trunk.',
    exampleSentence: 'A large oak tree shaded the courtyard.',
    acousticTip: 'Alveolar plosive /t/ with an explosive burst of air.'
  },
  free: {
    word: 'free',
    phonetic: '/friː/',
    partOfSpeech: 'adjective',
    definition: 'Not under the control of another; without cost or obligation.',
    exampleSentence: 'Admission to the museum is free on Sundays.',
    acousticTip: 'Labiodental fricative /f/ formed with lower lip pressed against upper incisors.'
  },
  thirty: {
    word: 'thirty',
    phonetic: '/ˈθɜː.ti/',
    partOfSpeech: 'numeral',
    definition: 'The number 30.',
    exampleSentence: 'There are thirty students registered in the cohort.',
    acousticTip: 'Primary stress on first syllable /ˈθɜː-/, with unvoiced /θ/ onset.'
  },
  thirteen: {
    word: 'thirteen',
    phonetic: '/ˌθɜːˈtiːn/',
    partOfSpeech: 'numeral',
    definition: 'The number 13.',
    exampleSentence: 'He will turn thirteen next Tuesday.',
    acousticTip: 'Contrasts with thirty by carrying heavy secondary stress and higher pitch on /-tiːn/.'
  },
  forty: {
    word: 'forty',
    phonetic: '/ˈfɔː.ti/',
    partOfSpeech: 'numeral',
    definition: 'The number 40.',
    exampleSentence: 'The speed limit is forty kilometers per hour.',
    acousticTip: 'Initial syllable stress /ˈfɔː-/, falling tone on final syllable.'
  },
  fourteen: {
    word: 'fourteen',
    phonetic: '/ˌfɔːˈtiːn/',
    partOfSpeech: 'numeral',
    definition: 'The number 14.',
    exampleSentence: 'The package arrived on the fourteenth.',
    acousticTip: 'Distinct rising pitch and lengthened tense /iː/ in the final syllable.'
  },
  weather: {
    word: 'weather',
    phonetic: '/ˈweð.ər/',
    partOfSpeech: 'noun',
    definition: 'The state of the atmosphere at a place and time regarding heat, cloudiness, or rain.',
    exampleSentence: 'The weather forecast predicts light rain tomorrow.',
    acousticTip: 'Voiced dental fricative /ð/ smoothly vibrating between vowels.'
  },
  whether: {
    word: 'whether',
    phonetic: '/ˈweð.ər/',
    partOfSpeech: 'conjunction',
    definition: 'Expressing a doubt or choice between alternatives.',
    exampleSentence: 'He questioned whether the policy would succeed.',
    acousticTip: 'Homophone with weather in modern standard English.'
  },
  very: {
    word: 'very',
    phonetic: '/ˈver.i/',
    partOfSpeech: 'adverb',
    definition: 'In a high degree; extremely; used for emphasis.',
    exampleSentence: 'The lecture was very informative and engaging.',
    acousticTip: 'Voiced labiodental fricative /v/ with continuous buzzing friction.'
  },
  wary: {
    word: 'wary',
    phonetic: '/ˈweə.ri/',
    partOfSpeech: 'adjective',
    definition: 'Feeling or showing caution about possible dangers or problems.',
    exampleSentence: 'Hikers should be wary of steep slopes.',
    acousticTip: 'Begins with labial-velar glide /w/ formed purely with rounded lips.'
  },
  vest: {
    word: 'vest',
    phonetic: '/vest/',
    partOfSpeech: 'noun',
    definition: 'A sleeveless garment worn on the upper body.',
    exampleSentence: 'The technician wore a reflective safety vest.',
    acousticTip: 'Initial /v/ tooth-lip contact with continuous voiced noise.'
  },
  west: {
    word: 'west',
    phonetic: '/west/',
    partOfSpeech: 'noun / adjective',
    definition: 'The direction towards the point of the horizon where the sun sets.',
    exampleSentence: 'The expedition journeyed toward the west coast.',
    acousticTip: 'Rounded lips glide /w/ with upward frequency shift.'
  },
  chair: {
    word: 'chair',
    phonetic: '/tʃeər/',
    partOfSpeech: 'noun / verb',
    definition: 'A separate seat for one person; or to preside over a meeting.',
    exampleSentence: 'She was chosen to chair the international summit.',
    acousticTip: 'Voiceless postalveolar affricate /tʃ/ featuring a stop closure followed by an explosive friction burst.'
  },
  share: {
    word: 'share',
    phonetic: '/ʃeər/',
    partOfSpeech: 'verb / noun',
    definition: 'To have or use something simultaneously with others; a portion.',
    exampleSentence: 'They agreed to share the research findings.',
    acousticTip: 'Gradual onset voiceless fricative /ʃ/ with smooth hushing friction.'
  },
  actually: {
    word: 'actually',
    phonetic: '/ˈæk.tʃu.ə.li/',
    partOfSpeech: 'adverb',
    definition: 'As the truth or facts of a situation; used to introduce a correction or pivot.',
    exampleSentence: 'I thought the gate was closed, but actually it remained open.',
    acousticTip: 'Frequently signals discourse contrast or factual pivot in IELTS/TOEFL listening.'
  },
  instead: {
    word: 'instead',
    phonetic: '/ɪnˈsted/',
    partOfSpeech: 'adverb',
    definition: 'As an alternative or substitute.',
    exampleSentence: 'They ordered tea instead of coffee.',
    acousticTip: 'Signpost negation word that invalidates preceding options.'
  },
  scratch: {
    word: 'scratch',
    phonetic: '/skrætʃ/',
    partOfSpeech: 'verb',
    definition: 'In conversational speech: "scratch that" means cancel or ignore the prior statement.',
    exampleSentence: 'Scratch that earlier estimate; the actual total is higher.',
    acousticTip: 'Crucial oral self-correction marker in fast speech.'
  },
  transcript: {
    word: 'transcript',
    phonetic: '/ˈtræn.skrɪpt/',
    partOfSpeech: 'noun',
    definition: 'A written or printed version of material originally presented in another medium.',
    exampleSentence: 'Inspect the audio transcript for phonetic cues.',
    acousticTip: 'Stress on the first syllable /ˈtræn-/.'
  },
  acoustic: {
    word: 'acoustic',
    phonetic: '/əˈkuː.stɪk/',
    partOfSpeech: 'adjective',
    definition: 'Relating to sound or the sense of hearing.',
    exampleSentence: 'The hall possesses remarkable acoustic clarity.',
    acousticTip: 'Medial tense vowel /uː/ with rounded lips.'
  },
  phoneme: {
    word: 'phoneme',
    phonetic: '/ˈfəʊ.niːm/',
    partOfSpeech: 'noun',
    definition: 'Any of the perceptually distinct units of sound in a specified language that distinguish one word from another.',
    exampleSentence: 'Contrasting the phoneme /iː/ with /ɪ/ prevents misunderstanding.',
    acousticTip: 'Ends with tense /iː/ and bilabial nasal /m/.'
  },
  fricative: {
    word: 'fricative',
    phonetic: '/ˈfrɪk.ə.tɪv/',
    partOfSpeech: 'noun',
    definition: 'A consonant produced by forcing air through a narrow channel made by placing two articulators close together.',
    exampleSentence: 'Sounds like /s/, /f/, and /θ/ are voiceless fricatives.',
    acousticTip: 'High-frequency continuous turbulent noise.'
  },
  affricate: {
    word: 'affricate',
    phonetic: '/ˈæf.rɪ.kət/',
    partOfSpeech: 'noun',
    definition: 'A complex consonant beginning as a stop plosive and releasing as a fricative (e.g. /tʃ/ or /dʒ/).',
    exampleSentence: 'The first sound in church is an affricate.',
    acousticTip: 'Features silent closure gap then rapid turbulent release.'
  },
  scenario: {
    word: 'scenario',
    phonetic: '/səˈnɑː.ri.əʊ/',
    partOfSpeech: 'noun',
    definition: 'A postulated sequence or development of events.',
    exampleSentence: 'Each listening scenario presents real-world acoustic distractions.',
    acousticTip: 'Unstressed initial schwa /sə-/ with secondary stress on second syllable.'
  },
  adaptive: {
    word: 'adaptive',
    phonetic: '/əˈdæp.tɪv/',
    partOfSpeech: 'adjective',
    definition: 'Characterized by or given to adaptation; adjusting automatically to performance.',
    exampleSentence: 'The adaptive engine dynamically calibrates question difficulty.',
    acousticTip: 'Stressed open front vowel /æ/ in the middle syllable.'
  }
};

export class DictionaryService {
  /**
   * Cleans a selected string token to isolate the headword
   */
  static sanitizeWord(input: string): string {
    return input
      .trim()
      .replace(/^[^\w]+|[^\w]+$/g, '') // remove punctuation at start/end
      .toLowerCase();
  }

  /**
   * Retrieves definition, phonetic IPA, and acoustic tip.
   * Checks the curated repository first; if not found, queries the public Free Dictionary API or generates smart linguistic fallback.
   */
  static async lookupWord(wordRaw: string): Promise<WordDefinition> {
    const word = this.sanitizeWord(wordRaw);
    if (!word) {
      return {
        word: wordRaw,
        phonetic: '/--/',
        partOfSpeech: 'word',
        definition: 'Select a valid word to see definitions and pronunciation.'
      };
    }

    // 1. Direct match in local curated database
    if (DICTIONARY_DATABASE[word]) {
      return DICTIONARY_DATABASE[word];
    }

    // 2. Base form check (strip common suffixes like -s, -ed, -ing)
    const baseForms = [
      word.endsWith('ing') ? word.slice(0, -3) : '',
      word.endsWith('ed') ? word.slice(0, -2) : '',
      word.endsWith('es') ? word.slice(0, -2) : '',
      word.endsWith('s') ? word.slice(0, -1) : ''
    ].filter(Boolean);

    for (const base of baseForms) {
      if (DICTIONARY_DATABASE[base]) {
        const found = DICTIONARY_DATABASE[base];
        return {
          ...found,
          word: `${word} (from ${found.word})`
        };
      }
    }

    // 3. Fallback to Free Dictionary API with a rapid 1.5s timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1600);

      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const entry = data[0];
          const phonetic = entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text || `/${word}/`;
          const firstMeaning = entry.meanings?.[0];
          const partOfSpeech = firstMeaning?.partOfSpeech || 'noun / verb';
          const firstDef = firstMeaning?.definitions?.[0];
          const definition = firstDef?.definition || 'Definition unavailable.';
          const exampleSentence = firstDef?.example;

          return {
            word: entry.word || word,
            phonetic,
            partOfSpeech,
            definition,
            exampleSentence,
            acousticTip: `Listen to syllable stress and vowel transitions when spoken in natural cadence.`
          };
        }
      }
    } catch (e) {
      // Ignore network timeout and proceed to heuristic fallback
    }

    // 4. Intelligent linguistic fallback
    const guessedIPA = `/${word}/`;
    return {
      word,
      phonetic: guessedIPA,
      partOfSpeech: 'vocabulary item',
      definition: `A lexical item occurring in the transcript. Use the speaker button to hear it pronounced clearly.`,
      exampleSentence: `Spoken in the current scenario dialogue.`,
      acousticTip: `Pay attention to connected speech phenomena (linking, elision) surrounding this token.`
    };
  }
}
