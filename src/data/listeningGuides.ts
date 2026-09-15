import { ListeningGuideItem } from '../types';

export const LISTENING_GUIDES: ListeningGuideItem[] = [
  {
    id: 'acoustic-chunking',
    title: 'Acoustic Chunking & Thought Groups',
    category: 'Acoustic Parsing',
    badge: 'Cognitive Processing',
    summary: 'Never process incoming speech word-by-word. Fluent speakers group 3-7 words into cohesive acoustic units marked by micro-pauses.',
    details: [
      'In high-stakes listening exams (IELTS, TOEFL, Cambridge), speakers bundle nouns, verbs, and prepositional phrases into single melodic units.',
      'Attempting to translate or decipher every individual syllable creates immediate cognitive overload and causes you to miss subsequent key information.',
      'Listen for pitch peaks (intonation peaks) which almost always fall on the most critical content word (new information).'
    ],
    actionSteps: [
      'Focus on lexical stress: pay attention to content words (nouns, verbs, adjectives) and let functional words (articles, prepositions) fade into background rhythm.',
      'Anticipate boundary pauses: speakers briefly hold breath or drop pitch at the end of a thought clause.',
      'Practice the "shadowing" drill: repeat a phrase 0.5 seconds behind the speaker without pausing the audio.'
    ],
    keySignals: [
      { trigger: 'Pitch Elevation + Pause', meaning: 'Introduction of new topic or vital data point' },
      { trigger: 'Rapid Compressed Syllables', meaning: 'Parenthetical or secondary clarification' },
      { trigger: 'Lengthened Vowel', meaning: 'Speaker is actively formulating the next key thought' }
    ],
    practicePrompt: 'Listen to any Intermediate section and mark slashes (/) where the speaker pauses for breath.'
  },
  {
    id: 'signpost-mastery',
    title: 'Signposting & Rhetorical Turning Points',
    category: 'Signposting',
    badge: 'Exam Strategy',
    summary: 'Master the auditory road signs that signal shifts, contradictions, concessions, and conclusions before they occur.',
    details: [
      'Speakers in academic and professional settings use discourse markers to navigate arguments.',
      'The most frequent distractor trap in listening tests occurs right after a transitional word like "originally", "initially", or "however".',
      'For example: "We initially aimed for Thursday... however the hall was booked, so Wednesday was chosen." Listening only to the first part results in an error.'
    ],
    actionSteps: [
      'Contrast Traps: Train your brain to discard the pre-contrast statement once you hear "however", "whereas", "on the other hand", or "that said".',
      'Numerical Anchor Markers: Listen for "in terms of cost", "regarding timeframe", "quantitatively speaking" to prepare your hand to write digits.',
      'Consequence Flags: "Hence", "consequently", "as a result" herald the final test-worthy outcome.'
    ],
    keySignals: [
      { trigger: 'However / Actually / But', meaning: 'Negates previous statement; correct answer usually follows' },
      { trigger: 'Originally / At first / Planned to', meaning: 'Historical intention that was canceled or altered' },
      { trigger: 'Crucially / Key point / Bear in mind', meaning: 'Direct teacher/speaker flag of an exam question' },
      { trigger: 'In conclusion / Ultimately', meaning: 'Final consensus or synthesized decision' }
    ],
    practicePrompt: 'When listening to High School Section 25, notice how the speaker transitions from Thursday to Wednesday.'
  },
  {
    id: 'connected-speech',
    title: 'Connected Speech & Phonological Reductions',
    category: 'Speed & Rhythm',
    badge: 'Phonetics',
    summary: 'Understand how native speakers link consonant to vowel, drop plosive stops (elision), and reduce vowels to the schwa /ə/.',
    details: [
      'Native speech does not consist of discrete isolated words: "What do you want to do?" becomes /wʌdʒə wʌnə du:/.',
      'Elision: when a consonant vanishes between consonants (e.g. "last night" sounds like "las-night").',
      'Assimilation: when adjacent sounds blend into a hybrid sound (e.g. "would you" becomes /wʊdʒu:/).'
    ],
    actionSteps: [
      'Identify weak forms of auxiliary verbs ("can" becomes /kən/, "for" becomes /fə/).',
      'Listen to fast contractions in dialogues ("could’ve", "must’ve", "gonna").',
      'Calibrate playback speed incrementally: practice at 1.25x so that normal 1.0x feels spacious.'
    ],
    keySignals: [
      { trigger: 'Flapped T (American/Australian)', meaning: '"water" sounds like "wader", "city" like "siddy"' },
      { trigger: 'Glottal Stop (British/UK)', meaning: 'Brief silence replacing /t/ in "bottle" or "football"' },
      { trigger: 'Linking R', meaning: 'Connecting "four apples" as /fɔːr æpəlz/' }
    ],
    practicePrompt: 'Try listening to Pro Section 2 at 1.25x speed, noting how technical terminology maintains syllable weight while prepositions compress.'
  },
  {
    id: 'predictive-listening',
    title: 'Pre-Listening Prediction & Information Gaps',
    category: 'Memory & Notes',
    badge: 'Tactical Precision',
    summary: 'Use the 30-second reading lead time to diagnose grammatical category, word type, and plausible distractors.',
    details: [
      'Passive listeners wait for words to hit their ears; active listeners predict the answer before the audio begins.',
      'Looking at the question: "What time does the train leave?" your brain should activate numbers, AM/PM, and time prepositions before the audio starts.',
      'Note-taking method: Use a 2-column split. Left column for keywords, right column for numbers/specifics.'
    ],
    actionSteps: [
      'Underline prompt keywords (nouns and action verbs) rather than entire sentences.',
      'Predict word classes: Is the blank a noun, a date, an amount with currency, or a person’s name?',
      'Beware of distractors: When multiple options are mentioned, track which one is confirmed versus rejected.'
    ],
    keySignals: [
      { trigger: 'Options A, B, C, D mentioned together', meaning: 'The speaker will systematically contrast and rule out three of them' },
      { trigger: 'Spelling clarification ("Could you spell that?")', meaning: 'Get ready for exact letter-by-letter transcription' },
      { trigger: 'Currency / Contact number prefix', meaning: 'Zero in on digit clusters (e.g., 017... or double two)' }
    ],
    practicePrompt: 'In Intermediate Section 1, observe how the surname is spelled out and the phone number is read in rhythmic 5-digit chunks.'
  },
  {
    id: 'accent-adaptation',
    title: 'Multi-Accent Auditory Flexibility',
    category: 'Accents',
    badge: 'Global Fluency',
    summary: 'Adapt seamlessly between Received Pronunciation (UK), General American, Australian, Canadian, and South Asian English accents.',
    details: [
      'Modern international listening evaluations deliberately mix international accents across audio tracks.',
      'Australian speakers frequently use high rising terminal (intonation rises at the end of statements).',
      'British speakers drop post-vocalic "r" (non-rhotic) and use pure vowel sounds.',
      'North American speakers elongate vowels and use rhotic "r" coloring.'
    ],
    actionSteps: [
      'Use the 10-Voice Selector in ListenMaster to test the same sentences across different pitches and rates.',
      'Notice pitch differences between F1-F5 (higher tonal range, crisp frequency) and M1-M5 (lower formant resonances).',
      'Train without transcript first; only reveal the transcript during diagnostic review.'
    ],
    keySignals: [
      { trigger: 'Rhotic vs Non-Rhotic', meaning: 'Notice "car" as /kɑːr/ vs British /kɑː/' },
      { trigger: 'Intonation lift at statement end', meaning: 'Common in Australian & casual conversational dialogue' }
    ],
    practicePrompt: 'Switch voices between F1 (Warm), M1 (Authoritative), and F3 (Energetic) in the voice panel to accustom your ears to varying formants.'
  }
];
