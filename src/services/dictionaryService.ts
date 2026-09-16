// Local curated phonetic, lexical & etymological dictionary for high-frequency listening vocabulary
// Supports CEFR levels, Simple & Advanced definitions, etymology, synonyms, fill-in-the-blank quiz generation

export interface WordQuiz {
  questionSentence: string; // "The passengers decided to ______ before the afternoon rush."
  targetWord: string;       // "leave"
  options: string[];        // ["leave", "live", "leaf", "reach"]
  explanation: string;      // "In this context, 'leave' means to depart before the afternoon rush."
}

export interface WordDefinition {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  simpleDefinition?: string;
  advancedDefinition?: string;
  cefrLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  etymology?: string;
  exampleSentence?: string;
  acousticTip?: string;
  synonyms?: string[];
}

const DICTIONARY_DATABASE: Record<string, WordDefinition> = {
  leave: {
    word: 'leave',
    phonetic: '/liːv/',
    partOfSpeech: 'verb',
    definition: 'To go away from a place, person, or situation; depart.',
    simpleDefinition: 'To go away from a place.',
    advancedDefinition: 'To depart or withdraw from a location, relationship, or post, relinquishing immediate physical presence.',
    cefrLevel: 'A1',
    etymology: 'Old English "lǣfan" (to remain, leave behind), from Proto-Germanic "*laibijaną" (to cause to remain), from PIE root "*leip-" (to stick, adhere).',
    exampleSentence: 'The passengers decided to leave before the afternoon rush.',
    acousticTip: 'Contains the tense long vowel /iː/ with spread lips, distinct from lax /ɪ/ in live.',
    synonyms: ['depart', 'exit', 'vacate']
  },
  live: {
    word: 'live',
    phonetic: '/lɪv/',
    partOfSpeech: 'verb',
    definition: 'To remain alive or have one\'s permanent home in a specified place.',
    simpleDefinition: 'To have your home in a place or to be alive.',
    advancedDefinition: 'To maintain biological vitality or maintain persistent residential domicile within a geographical boundary.',
    cefrLevel: 'A1',
    etymology: 'Old English "lifian, libban" (to be alive, reside), from Proto-Germanic "*libjaną", related to life and leave.',
    exampleSentence: 'They live in the coastal province.',
    acousticTip: 'Features the short centralized lax vowel /ɪ/ with relaxed jaw tension.',
    synonyms: ['reside', 'dwell', 'inhabit']
  },
  slip: {
    word: 'slip',
    phonetic: '/slɪp/',
    partOfSpeech: 'noun / verb',
    definition: 'A small piece of paper; or to lose one\'s footing or balance.',
    simpleDefinition: 'To slide accidentally and lose balance, or a small paper paper note.',
    advancedDefinition: 'To inadvertently lose traction on an unstable substrate; or a diminutive planar memorandum.',
    cefrLevel: 'B1',
    etymology: 'Middle English "slippen", from Middle Low German "slippen" (to slide, glide), from Proto-Germanic "*slipaną".',
    exampleSentence: 'Remember to submit your confirmation slip at the counter.',
    acousticTip: 'Short /ɪ/ followed by a voiceless bilabial stop /p/.',
    synonyms: ['slide', 'skid', 'stumble']
  },
  sleep: {
    word: 'sleep',
    phonetic: '/sliːp/',
    partOfSpeech: 'noun / verb',
    definition: 'A condition of body and mind that recurs for several hours every night.',
    simpleDefinition: 'The natural state of rest when your eyes are closed and body is resting.',
    advancedDefinition: 'A periodic neurological state characterized by suspended sensory consciousness and somatic quiescence.',
    cefrLevel: 'A1',
    etymology: 'Old English "slǣp", of Germanic origin; akin to Dutch "slaap" and German "Schlaf", from root signifying loose or slack.',
    exampleSentence: 'Adequate sleep is critical before taking an exam.',
    acousticTip: 'Long tense vowel /iː/ held roughly 40% longer than in slip.',
    synonyms: ['slumber', 'rest', 'doze']
  },
  reach: {
    word: 'reach',
    phonetic: '/riːtʃ/',
    partOfSpeech: 'verb',
    definition: 'To arrive at; attain a state, destination, or agreement.',
    simpleDefinition: 'To arrive at a place or achieve a goal.',
    advancedDefinition: 'To extend physical or jurisdictional trajectory to attain an apex, objective, or bilateral consensus.',
    cefrLevel: 'A2',
    etymology: 'Old English "rǣcan" (to stretch out, reach), from Proto-West Germanic "*raikijan", from PIE "*reyg-" (to bind, reach).',
    exampleSentence: 'We hope to reach an agreement before noon.',
    acousticTip: 'Long tense /iː/ followed by unvoiced affricate /tʃ/.',
    synonyms: ['attain', 'arrive at', 'achieve']
  },
  rich: {
    word: 'rich',
    phonetic: '/rɪtʃ/',
    partOfSpeech: 'adjective',
    definition: 'Having a great deal of money or assets; abundant.',
    simpleDefinition: 'Having a lot of money, possessions, or valuable things.',
    advancedDefinition: 'Endowed with abundant pecuniary wealth, fertile resources, or sensory and thematic complexity.',
    cefrLevel: 'A1',
    etymology: 'Old English "rīce" (powerful, wealthy), from Proto-Germanic "*rīkijaz" (kingly, powerful), from Celtic "*rīxs" (king).',
    exampleSentence: 'The island has a rich historical heritage.',
    acousticTip: 'Rapid short /ɪ/ with brief acoustic duration.',
    synonyms: ['wealthy', 'affluent', 'abundant']
  },
  three: {
    word: 'three',
    phonetic: '/θriː/',
    partOfSpeech: 'numeral',
    definition: 'Equivalent to the sum of one and two; one more than two.',
    simpleDefinition: 'The number 3.',
    advancedDefinition: 'The cardinal integer denoting the triad quantity succeeding two and preceding four.',
    cefrLevel: 'A1',
    etymology: 'Old English "þrēo", from Proto-Germanic "*þrīz", from PIE "*tréyes" (cognate with Latin "tres", Greek "treis").',
    exampleSentence: 'The inspector reviewed three separate reports.',
    acousticTip: 'Soft voiceless dental fricative /θ/ with the tongue between the teeth.',
    synonyms: ['trio', 'triad', 'triplet']
  },
  tree: {
    word: 'tree',
    phonetic: '/triː/',
    partOfSpeech: 'noun',
    definition: 'A woody perennial plant, typically having a single stem or trunk.',
    simpleDefinition: 'A tall plant with a wooden trunk, branches, and leaves.',
    advancedDefinition: 'An arboreal perennial vascular botanical specimen having an elongated woody trunk supporting lateral boughs.',
    cefrLevel: 'A1',
    etymology: 'Old English "trēow", from Proto-Germanic "*trewą", from PIE "*deru-" (oak, tree, wood, firm).',
    exampleSentence: 'A large oak tree shaded the courtyard.',
    acousticTip: 'Alveolar plosive /t/ with an explosive burst of air.',
    synonyms: ['sapling', 'timber', 'wood']
  },
  free: {
    word: 'free',
    phonetic: '/friː/',
    partOfSpeech: 'adjective',
    definition: 'Not under the control of another; without cost or obligation.',
    simpleDefinition: 'Costing no money, or able to do whatever you want.',
    advancedDefinition: 'Autonomous from external hegemony or fiscal encumbrance; unimpeded by deterministic constraints.',
    cefrLevel: 'A1',
    etymology: 'Old English "frēo" (exempt, not in bondage, dear, noble), from Proto-Germanic "*frijaz" (beloved, free), from PIE "*priyos" (dear).',
    exampleSentence: 'Admission to the museum is free on Sundays.',
    acousticTip: 'Labiodental fricative /f/ formed with lower lip pressed against upper incisors.',
    synonyms: ['complimentary', 'unrestricted', 'exempt']
  },
  thirty: {
    word: 'thirty',
    phonetic: '/ˈθɜː.ti/',
    partOfSpeech: 'numeral',
    definition: 'The number 30.',
    simpleDefinition: 'The number 30 (three tens).',
    advancedDefinition: 'The cardinal quantity denoting the product of three and ten.',
    cefrLevel: 'A1',
    etymology: 'Old English "þrītig", compound of "three" + "-ty" (group of tens), from Proto-Germanic "*þrīz tigiwiz".',
    exampleSentence: 'There are thirty students registered in the cohort.',
    acousticTip: 'Primary stress on first syllable /ˈθɜː-/, with unvoiced /θ/ onset.',
    synonyms: ['score and ten', '30']
  },
  thirteen: {
    word: 'thirteen',
    phonetic: '/ˌθɜːˈtiːn/',
    partOfSpeech: 'numeral',
    definition: 'The number 13.',
    simpleDefinition: 'The number 13 (ten plus three).',
    advancedDefinition: 'The prime cardinal integer immediately succeeding twelve.',
    cefrLevel: 'A1',
    etymology: 'Old English "þrēotīene" (three and ten), from Proto-Germanic "*þritehun".',
    exampleSentence: 'He will turn thirteen next Tuesday.',
    acousticTip: 'Contrasts with thirty by carrying heavy secondary stress and higher pitch on /-tiːn/.',
    synonyms: ['baker\'s dozen', '13']
  },
  forty: {
    word: 'forty',
    phonetic: '/ˈfɔː.ti/',
    partOfSpeech: 'numeral',
    definition: 'The number 40.',
    simpleDefinition: 'The number 40 (four tens).',
    advancedDefinition: 'The cardinal integer representing the product of four decads.',
    cefrLevel: 'A1',
    etymology: 'Old English "fēowertig", from "four" + "-tig" (decad).',
    exampleSentence: 'The speed limit is forty kilometers per hour.',
    acousticTip: 'Initial syllable stress /ˈfɔː-/, falling tone on final syllable.',
    synonyms: ['two score', '40']
  },
  fourteen: {
    word: 'fourteen',
    phonetic: '/ˌfɔːˈtiːn/',
    partOfSpeech: 'numeral',
    definition: 'The number 14.',
    simpleDefinition: 'The number 14 (ten plus four).',
    advancedDefinition: 'The cardinal integer representing seven doubled or ten plus four.',
    cefrLevel: 'A1',
    etymology: 'Old English "fēowertīene" (four plus ten), akin to Dutch "veertien".',
    exampleSentence: 'The package arrived on the fourteenth.',
    acousticTip: 'Distinct rising pitch and lengthened tense /iː/ in the final syllable.',
    synonyms: ['14', 'fortnight days']
  },
  weather: {
    word: 'weather',
    phonetic: '/ˈweð.ər/',
    partOfSpeech: 'noun',
    definition: 'The state of the atmosphere at a place and time regarding heat, cloudiness, or rain.',
    simpleDefinition: 'The condition outside, such as sun, rain, wind, or cold.',
    advancedDefinition: 'The meteorological conditions and atmospheric phenomena prevailing at a distinct thermodynamic coordinate.',
    cefrLevel: 'A1',
    etymology: 'Old English "weder" (air, sky, storm), from Proto-Germanic "*wedrą" (wind, weather), from PIE "*we-dhro-" (to blow).',
    exampleSentence: 'The weather forecast predicts light rain tomorrow.',
    acousticTip: 'Voiced dental fricative /ð/ smoothly vibrating between vowels.',
    synonyms: ['climate', 'elements', 'atmospheric conditions']
  },
  whether: {
    word: 'whether',
    phonetic: '/ˈweð.ər/',
    partOfSpeech: 'conjunction',
    definition: 'Expressing a doubt or choice between alternatives.',
    simpleDefinition: 'Used to introduce two or more possibilities or choices.',
    advancedDefinition: 'Subordinating conjunction expressing disjunctive epistemic uncertainty between alternative propositions.',
    cefrLevel: 'B1',
    etymology: 'Old English "hwæðer" (which of two), from Proto-Germanic "*hwatharaz", from PIE "*kwo-teros" (which of two).',
    exampleSentence: 'He questioned whether the policy would succeed.',
    acousticTip: 'Homophone with weather in modern standard English.',
    synonyms: ['if', 'either', 'in case']
  },
  very: {
    word: 'very',
    phonetic: '/ˈver.i/',
    partOfSpeech: 'adverb',
    definition: 'In a high degree; extremely; used for emphasis.',
    simpleDefinition: 'Extremely or very much; makes a word stronger.',
    advancedDefinition: 'An intensifier denoting an elevated scalar magnitude or supreme empirical veracity.',
    cefrLevel: 'A1',
    etymology: 'Middle English "verrei" (true, genuine), from Old French "verai" (true), from Vulgar Latin "*veracus", from Latin "verus" (true).',
    exampleSentence: 'The lecture was very informative and engaging.',
    acousticTip: 'Voiced labiodental fricative /v/ with continuous buzzing friction.',
    synonyms: ['extremely', 'exceedingly', 'highly']
  },
  wary: {
    word: 'wary',
    phonetic: '/ˈweə.ri/',
    partOfSpeech: 'adjective',
    definition: 'Feeling or showing caution about possible dangers or problems.',
    simpleDefinition: 'Being careful because you think something might be dangerous or tricky.',
    advancedDefinition: 'Demonstrating vigilant circumspection and anticipatory skepticism regarding prospective hazards.',
    cefrLevel: 'C1',
    etymology: 'Late 15th century, from Old English "wær" (prudent, aware), from Proto-Germanic "*waraz" (cautious, watchful).',
    exampleSentence: 'Hikers should be wary of steep slopes.',
    acousticTip: 'Begins with labial-velar glide /w/ formed purely with rounded lips.',
    synonyms: ['cautious', 'circumspect', 'vigilant']
  },
  vest: {
    word: 'vest',
    phonetic: '/vest/',
    partOfSpeech: 'noun',
    definition: 'A sleeveless garment worn on the upper body.',
    simpleDefinition: 'A piece of clothing without sleeves worn on top of a shirt.',
    advancedDefinition: 'An armless sartorial waistcoat garment worn over a foundational shirt for thermal or protective utility.',
    cefrLevel: 'A2',
    etymology: 'Early 17th century, from French "veste", from Italian "veste", from Latin "vestis" (garment, clothing).',
    exampleSentence: 'The technician wore a reflective safety vest.',
    acousticTip: 'Initial /v/ tooth-lip contact with continuous voiced noise.',
    synonyms: ['waistcoat', 'sleeveless jacket', 'garment']
  },
  west: {
    word: 'west',
    phonetic: '/west/',
    partOfSpeech: 'noun / adjective',
    definition: 'The direction towards the point of the horizon where the sun sets.',
    simpleDefinition: 'The direction where the sun sets in the evening.',
    advancedDefinition: 'The cardinal compass azimuth perpendicular to north, orienting toward astronomical solar dusk.',
    cefrLevel: 'A1',
    etymology: 'Old English "west", from Proto-Germanic "*westraz", from PIE "*wes-pero-" (evening, night, west).',
    exampleSentence: 'The expedition journeyed toward the west coast.',
    acousticTip: 'Rounded lips glide /w/ with upward frequency shift.',
    synonyms: ['occident', 'western', 'westward']
  },
  chair: {
    word: 'chair',
    phonetic: '/tʃeər/',
    partOfSpeech: 'noun / verb',
    definition: 'A separate seat for one person; or to preside over a meeting.',
    simpleDefinition: 'A piece of furniture for one person to sit on.',
    advancedDefinition: 'A piece of furniture designed for solitary seating; or to assume authoritative presiding oversight.',
    cefrLevel: 'A1',
    etymology: 'Middle English, from Old French "chaiere" (seat, pulpit), from Latin "cathedra", from Greek "kathedra" (seat).',
    exampleSentence: 'She was chosen to chair the international summit.',
    acousticTip: 'Voiceless postalveolar affricate /tʃ/ featuring a stop closure followed by an explosive friction burst.',
    synonyms: ['seat', 'preside', 'lead']
  },
  share: {
    word: 'share',
    phonetic: '/ʃeər/',
    partOfSpeech: 'verb / noun',
    definition: 'To have or use something simultaneously with others; a portion.',
    simpleDefinition: 'To divide or use something together with other people.',
    advancedDefinition: 'To distribute equitable allocations or engage in communal utilization of collective assets.',
    cefrLevel: 'A2',
    etymology: 'Old English "scearu" (division, share, cutting), related to "shear", from Proto-Germanic "*skarō" (division).',
    exampleSentence: 'They agreed to share the research findings.',
    acousticTip: 'Gradual onset voiceless fricative /ʃ/ with smooth hushing friction.',
    synonyms: ['distribute', 'allocate', 'partake']
  },
  actually: {
    word: 'actually',
    phonetic: '/ˈæk.tʃu.ə.li/',
    partOfSpeech: 'adverb',
    definition: 'As the truth or facts of a situation; used to introduce a correction or pivot.',
    simpleDefinition: 'In truth or reality; used when saying what really happened.',
    advancedDefinition: 'Denoting empirical reality in deliberate contradiction or refined qualification of an antecedent assumption.',
    cefrLevel: 'B1',
    etymology: 'Late Middle English, from "actual" (from Late Latin "actualis" - active, practical) + "-ly".',
    exampleSentence: 'I thought the gate was closed, but actually it remained open.',
    acousticTip: 'Frequently signals discourse contrast or factual pivot in IELTS/TOEFL listening.',
    synonyms: ['in fact', 'really', 'truthfully']
  },
  instead: {
    word: 'instead',
    phonetic: '/ɪnˈsted/',
    partOfSpeech: 'adverb',
    definition: 'As an alternative or substitute.',
    simpleDefinition: 'In place of something or someone else.',
    advancedDefinition: 'Serving as a surrogate or mutually exclusive surrogate replacement.',
    cefrLevel: 'A2',
    etymology: 'Middle English "in stede" (in the place of), from Old English "stede" (place, position).',
    exampleSentence: 'They ordered tea instead of coffee.',
    acousticTip: 'Signpost negation word that invalidates preceding options.',
    synonyms: ['alternatively', 'in place', 'rather']
  },
  scratch: {
    word: 'scratch',
    phonetic: '/skrætʃ/',
    partOfSpeech: 'verb',
    definition: 'In conversational speech: "scratch that" means cancel or ignore the prior statement.',
    simpleDefinition: 'To cancel or cross out something you just said or wrote.',
    advancedDefinition: 'To retract, expunge, or nullify an immediately antecedent auditory statement as invalid.',
    cefrLevel: 'B2',
    etymology: 'Middle English "scratchen", blend of Middle English "scratten" and "kratzen" (to scrape, scratch).',
    exampleSentence: 'Scratch that earlier estimate; the actual total is higher.',
    acousticTip: 'Crucial oral self-correction marker in fast speech.',
    synonyms: ['cancel', 'disregard', 'void']
  },
  transcript: {
    word: 'transcript',
    phonetic: '/ˈtræn.skrɪpt/',
    partOfSpeech: 'noun',
    definition: 'A written or printed version of material originally presented in another medium.',
    simpleDefinition: 'A written copy of words that were spoken.',
    advancedDefinition: 'A verbatim textual codification of an ephemeral acoustic dialogue or procedural proceeding.',
    cefrLevel: 'B2',
    etymology: 'Late Middle English, from Latin "transcriptum" (neuter past participle of "transcribere" - to copy down across).',
    exampleSentence: 'Inspect the audio transcript for phonetic cues.',
    acousticTip: 'Stress on the first syllable /ˈtræn-/.',
    synonyms: ['record', 'text', 'transcription']
  },
  acoustic: {
    word: 'acoustic',
    phonetic: '/əˈkuː.stɪk/',
    partOfSpeech: 'adjective',
    definition: 'Relating to sound or the sense of hearing.',
    simpleDefinition: 'Having to do with sound and how we hear.',
    advancedDefinition: 'Pertaining to the auditory physics, waveform propagation, and neuro-sensory perception of sound.',
    cefrLevel: 'B2',
    etymology: 'Mid 17th century, from French "acoustique", from Greek "akoustikos", from "akouein" (to hear).',
    exampleSentence: 'The hall possesses remarkable acoustic clarity.',
    acousticTip: 'Medial tense vowel /uː/ with rounded lips.',
    synonyms: ['auditory', 'sonic', 'acoustic-phonic']
  },
  phoneme: {
    word: 'phoneme',
    phonetic: '/ˈfəʊ.niːm/',
    partOfSpeech: 'noun',
    definition: 'Any of the perceptually distinct units of sound in a specified language that distinguish one word from another.',
    simpleDefinition: 'The smallest sound unit in a language that changes meaning (like /b/ and /p/).',
    advancedDefinition: 'The minimal structural segmental unit of phonology capable of establishing semantic contrast.',
    cefrLevel: 'C1',
    etymology: 'Late 19th century, from French "phonème", from Greek "phōnēma" (sound, utterance), from "phōnein" (to speak).',
    exampleSentence: 'Contrasting the phoneme /iː/ with /ɪ/ prevents misunderstanding.',
    acousticTip: 'Ends with tense /iː/ and bilabial nasal /m/.',
    synonyms: ['speech sound', 'sound unit', 'phone']
  },
  fricative: {
    word: 'fricative',
    phonetic: '/ˈfrɪk.ə.tɪv/',
    partOfSpeech: 'noun',
    definition: 'A consonant produced by forcing air through a narrow channel made by placing two articulators close together.',
    simpleDefinition: 'A continuous hissing or buzzing sound like /s/, /z/, or /f/.',
    advancedDefinition: 'A continuant speech sound produced by compressing pulmonic airstream through a constricted vocal tract aperture.',
    cefrLevel: 'C2',
    etymology: 'Mid 19th century, from Latin "fricativus", from "fricare" (to rub).',
    exampleSentence: 'Sounds like /s/, /f/, and /θ/ are voiceless fricatives.',
    acousticTip: 'High-frequency continuous turbulent noise.',
    synonyms: ['spirant', 'turbulent consonant', 'friction sound']
  },
  affricate: {
    word: 'affricate',
    phonetic: '/ˈæf.rɪ.kət/',
    partOfSpeech: 'noun',
    definition: 'A complex consonant beginning as a stop plosive and releasing as a fricative (e.g. /tʃ/ or /dʒ/).',
    simpleDefinition: 'A sound that starts as a stop and ends as a hiss, like the ch in chair.',
    advancedDefinition: 'A composite phonological consonant executing complete occlusion followed by delayed turbulence release.',
    cefrLevel: 'C2',
    etymology: 'Late 19th century, from Latin "affricatus", from "affricare" (to rub against).',
    exampleSentence: 'The first sound in church is an affricate.',
    acousticTip: 'Features silent closure gap then rapid turbulent release.',
    synonyms: ['stop-fricative', 'semi-plosive', 'affricative']
  },
  scenario: {
    word: 'scenario',
    phonetic: '/səˈnɑː.ri.əʊ/',
    partOfSpeech: 'noun',
    definition: 'A postulated sequence or development of events.',
    simpleDefinition: 'A realistic situation or story setup used for learning.',
    advancedDefinition: 'A synthesized experiential framework portraying contextual dialogic dynamics and distractor obstacles.',
    cefrLevel: 'B2',
    etymology: 'Late 19th century, from Italian "scenario", from Latin "scena" (scene, stage).',
    exampleSentence: 'Each listening scenario presents real-world acoustic distractions.',
    acousticTip: 'Unstressed initial schwa /sə-/ with secondary stress on second syllable.',
    synonyms: ['situation', 'context', 'circumstance']
  },
  adaptive: {
    word: 'adaptive',
    phonetic: '/əˈdæp.tɪv/',
    partOfSpeech: 'adjective',
    definition: 'Characterized by or given to adaptation; adjusting automatically to performance.',
    simpleDefinition: 'Able to change and adjust based on what you need.',
    advancedDefinition: 'Possessing dynamic algorithmic responsiveness to modulate operational complexity based on input metrics.',
    cefrLevel: 'C1',
    etymology: 'Early 19th century, from Medieval Latin "adaptativus", from Latin "adaptare" (to fit to, adjust).',
    exampleSentence: 'The adaptive engine dynamically calibrates question difficulty.',
    acousticTip: 'Stressed open front vowel /æ/ in the middle syllable.',
    synonyms: ['flexible', 'adjusting', 'responsive']
  },
  schedule: {
    word: 'schedule',
    phonetic: '/ˈʃedʒ.uːl/',
    partOfSpeech: 'noun / verb',
    definition: 'A plan for carrying out a process or procedure, giving lists of intended events and times.',
    simpleDefinition: 'A timetable that lists when events or classes will happen.',
    advancedDefinition: 'A temporal matrix delineating sequenced milestones and prospective procedural deadlines.',
    cefrLevel: 'A2',
    etymology: 'Late Middle English "sedule" (slip of parchment), from Old French "cedule", from Late Latin "schedula" (little slip of paper), from Greek "skhida" (splinter).',
    exampleSentence: 'Check the revised flight schedule on the departure display.',
    acousticTip: 'British pronunciation starts with /ʃedʒ-/, North American with /skedʒ-/.',
    synonyms: ['timetable', 'agenda', 'calendar']
  },
  laboratory: {
    word: 'laboratory',
    phonetic: '/ləˈbɒr.ə.tri/',
    partOfSpeech: 'noun',
    definition: 'A room or building equipped for scientific experiments, research, or teaching.',
    simpleDefinition: 'A room where scientific tests and experiments are done.',
    advancedDefinition: 'A calibrated facility engineered for empirical scientific research, chemical synthesis, and observation.',
    cefrLevel: 'B1',
    etymology: 'Early 17th century, from Medieval Latin "laboratorium", from Latin "laborare" (to work, labor).',
    exampleSentence: 'The chemistry laboratory is located on the third floor.',
    acousticTip: 'British stress on second syllable /ləˈbɒr-/, American on first /ˈlæb.rə-/.',
    synonyms: ['lab', 'testing facility', 'research room']
  },
  conference: {
    word: 'conference',
    phonetic: '/ˈkɒn.fər.əns/',
    partOfSpeech: 'noun',
    definition: 'A formal meeting for discussion or consultation.',
    simpleDefinition: 'A big meeting where people discuss work, ideas, or studies.',
    advancedDefinition: 'A formal convention of delegates convening for deliberation, academic discourse, or diplomacy.',
    cefrLevel: 'B1',
    etymology: 'Mid 16th century, from French "conférence" or Medieval Latin "conferentia", from Latin "conferre" (to bring together).',
    exampleSentence: 'The annual linguistics conference begins on Monday.',
    acousticTip: 'Rapid unstressed medial syllable often elided in fast conversational speech.',
    synonyms: ['symposium', 'convention', 'summit']
  },
  assignment: {
    word: 'assignment',
    phonetic: '/əˈsaɪn.mənt/',
    partOfSpeech: 'noun',
    definition: 'A task or piece of work allocated to someone as part of a job or course of study.',
    simpleDefinition: 'Homework or a specific task given to you by a teacher or boss.',
    advancedDefinition: 'A mandated curricular or professional obligation allocated for authoritative appraisal.',
    cefrLevel: 'B1',
    etymology: 'Late Middle English, from Old French "assignement", from Latin "assignare" (to mark out, designate).',
    exampleSentence: 'Submit your lab assignment before Friday midnight.',
    acousticTip: 'Diphthong /aɪ/ in the stressed second syllable; silent "g".',
    synonyms: ['task', 'project', 'homework']
  },
  direction: {
    word: 'direction',
    phonetic: '/daɪˈrek.ʃən/',
    partOfSpeech: 'noun',
    definition: 'A course along which someone or something moves; instructions on how to reach a destination.',
    simpleDefinition: 'Guidance telling you how to get somewhere or what to do.',
    advancedDefinition: 'A spatial orientation vector or authoritative instructional protocol governing execution.',
    cefrLevel: 'A2',
    etymology: 'Late Middle English, from Latin "directio(n-)", from "dirigere" (to set straight).',
    exampleSentence: 'Follow the campus signs for directions to the auditorium.',
    acousticTip: 'Can be pronounced /daɪˈrek-/ or /dɪˈrek-/.',
    synonyms: ['course', 'orientation', 'guidance']
  },
  estimate: {
    word: 'estimate',
    phonetic: '/ˈes.tɪ.mət/',
    partOfSpeech: 'noun / verb',
    definition: 'An approximate calculation or judgment of the value, number, quantity, or extent of something.',
    simpleDefinition: 'A thoughtful guess about a cost, amount, or size.',
    advancedDefinition: 'An educated numerical approximation formulated without definitive empirical measurement.',
    cefrLevel: 'B2',
    etymology: 'Late Middle English, from Latin "aestimatus" (valued, determined), from "aestimare" (to appraise).',
    exampleSentence: 'The contractor provided a rough budget estimate.',
    acousticTip: 'Noun ends with reduced /ət/; verb ends with diphthong /eɪt/.',
    synonyms: ['approximation', 'calculation', 'assessment']
  },
  announcement: {
    word: 'announcement',
    phonetic: '/əˈnaʊns.mənt/',
    partOfSpeech: 'noun',
    definition: 'A formal public statement about a fact, occurrence, or intention.',
    simpleDefinition: 'An important spoken or written message shared with everyone.',
    advancedDefinition: 'A formal communicative promulgation intended for widespread public notification.',
    cefrLevel: 'B1',
    etymology: 'Early 18th century, from French "annoncement", from "annoncer" (to declare), from Latin "annuntiare" (to bring news to).',
    exampleSentence: 'Listen carefully to the platform announcement for track changes.',
    acousticTip: 'Stressed diphthong /aʊ/ followed by voiceless nasal-fricative cluster /ns/.',
    synonyms: ['broadcast', 'notification', 'declaration']
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
   * Generates a realistic etymology based on historical Indo-European morphological roots
   */
  static deriveEtymologyFallback(word: string): string {
    const w = word.toLowerCase();
    if (w.endsWith('tion') || w.endsWith('sion')) {
      return `Derived from Anglo-Norman and Latin "-tio(n-)", forming nouns of action or process.`;
    }
    if (w.endsWith('ment')) {
      return `Formed with French and Latin suffix "-mentum", denoting the concrete result or instrument of an action.`;
    }
    if (w.startsWith('con') || w.startsWith('com')) {
      return `Originating from Latin "com- / con-" (with, together, completely).`;
    }
    if (w.startsWith('re')) {
      return `Derived from Latin prefix "re-" (back, again, anew).`;
    }
    if (w.startsWith('dis') || w.startsWith('de')) {
      return `From Latin "dis-" or "de-" (apart, away, reversal).`;
    }
    return `Rooted in historical Germanic or classical Indo-European linguistic lineage via Middle English.`;
  }

  /**
   * Generates a fill-in-the-blank retention quiz question for a word
   */
  static generateQuizForWord(
    targetWord: string,
    definition: WordDefinition,
    scenarioSnippet?: string
  ): WordQuiz {
    const cleanWord = this.sanitizeWord(targetWord);

    // If scenario snippet exists and contains the word, use it!
    let sentence = '';
    if (scenarioSnippet) {
      const regex = new RegExp(`\\b${cleanWord}(?:s|ed|ing)?\\b`, 'i');
      if (regex.test(scenarioSnippet)) {
        sentence = scenarioSnippet.replace(regex, '_______');
      }
    }

    // Otherwise use definition's example sentence
    if (!sentence && definition.exampleSentence) {
      const regex = new RegExp(`\\b${cleanWord}(?:s|ed|ing)?\\b`, 'i');
      sentence = definition.exampleSentence.replace(regex, '_______');
    }

    // Fallback sentence
    if (!sentence) {
      sentence = `In this conversation, the speaker mentioned that they need to _______ right away.`;
    }

    // Distractor options: combine synonyms, database alternatives, and phonetic traps
    const distractorsPool = [
      'leave', 'live', 'slip', 'reach', 'schedule', 'rich',
      'weather', 'assignment', 'estimate', 'direction', 'actually', 'instead'
    ].filter((w) => w.toLowerCase() !== cleanWord);

    // Shuffle and pick 3 distractors
    const shuffledDistractors = distractorsPool.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [cleanWord, ...shuffledDistractors].sort(() => Math.random() - 0.5);

    return {
      questionSentence: sentence,
      targetWord: cleanWord,
      options,
      explanation: `"${cleanWord}" (${definition.partOfSpeech}) fits here. Definition: ${definition.simpleDefinition || definition.definition}`
    };
  }

  /**
   * Estimates CEFR level heuristically based on word length, affixes, and frequency
   */
  static estimateCefrLevel(word: string): 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' {
    const len = word.length;
    if (len <= 4) return 'A1';
    if (len <= 6) return 'A2';
    if (len <= 8) return 'B1';
    if (len <= 10) return 'B2';
    return 'C1';
  }

  /**
   * Retrieves definition, phonetic IPA, acoustic tip, CEFR level, etymology, and synonyms.
   */
  static async lookupWord(wordRaw: string): Promise<WordDefinition> {
    const word = this.sanitizeWord(wordRaw);
    if (!word) {
      return {
        word: wordRaw,
        phonetic: '/--/',
        partOfSpeech: 'word',
        definition: 'Select a valid word to see definitions and pronunciation.',
        simpleDefinition: 'Select a word.',
        advancedDefinition: 'No valid lexical token provided.',
        cefrLevel: 'A1',
        etymology: 'Not available.',
        synonyms: []
      };
    }

    // 1. Direct match in local curated database
    if (DICTIONARY_DATABASE[word]) {
      return DICTIONARY_DATABASE[word];
    }

    // 2. Base form check (strip common suffixes like -s, -ed, -ing, -ly)
    const baseForms = [
      word.endsWith('ing') ? word.slice(0, -3) : '',
      word.endsWith('ed') ? word.slice(0, -2) : '',
      word.endsWith('es') ? word.slice(0, -2) : '',
      word.endsWith('s') ? word.slice(0, -1) : '',
      word.endsWith('ly') ? word.slice(0, -2) : ''
    ].filter(Boolean);

    for (const base of baseForms) {
      if (DICTIONARY_DATABASE[base]) {
        const found = DICTIONARY_DATABASE[base];
        return {
          ...found,
          word: `${word} (from ${found.word})`,
          synonyms: found.synonyms
        };
      }
    }

    // 3. Fallback to Free Dictionary API with a rapid 1.6s timeout
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

          // Origin/Etymology from entry if available
          const etymology = entry.origin || this.deriveEtymologyFallback(word);

          // Gather 2-3 synonyms from definitions or meanings
          const fetchedSynonyms: string[] = [];
          entry.meanings?.forEach((m: any) => {
            if (Array.isArray(m.synonyms)) {
              m.synonyms.forEach((s: string) => {
                if (s && !fetchedSynonyms.includes(s.toLowerCase()) && s.toLowerCase() !== word) {
                  fetchedSynonyms.push(s.toLowerCase());
                }
              });
            }
            m.definitions?.forEach((d: any) => {
              if (Array.isArray(d.synonyms)) {
                d.synonyms.forEach((s: string) => {
                  if (s && !fetchedSynonyms.includes(s.toLowerCase()) && s.toLowerCase() !== word) {
                    fetchedSynonyms.push(s.toLowerCase());
                  }
                });
              }
            });
          });

          // Generate Simple vs Advanced definitions
          const simpleDefinition = definition.split(/[;.]/)[0].trim() || definition;
          const advancedDefinition = `${definition} Note register and syntactic collocation when used in formal or academic speech.`;

          return {
            word: entry.word || word,
            phonetic,
            partOfSpeech,
            definition,
            simpleDefinition,
            advancedDefinition,
            cefrLevel: this.estimateCefrLevel(word),
            etymology,
            exampleSentence,
            acousticTip: `Listen to syllable stress and vowel transitions when spoken in natural cadence.`,
            synonyms: fetchedSynonyms.slice(0, 3)
          };
        }
      }
    } catch (e) {
      // Ignore network timeout and proceed to heuristic fallback
    }

    // 4. Intelligent linguistic fallback with heuristic synonyms, etymology, and CEFR
    const guessedIPA = `/${word}/`;
    return {
      word,
      phonetic: guessedIPA,
      partOfSpeech: 'vocabulary item',
      definition: `A lexical item occurring in the transcript. Use the speaker button to hear it pronounced clearly.`,
      simpleDefinition: `A word spoken in the scenario. Hear it aloud to practice.`,
      advancedDefinition: `Lexical token appearing in conversational stream requiring acoustic discrimination and contextual parsing.`,
      cefrLevel: this.estimateCefrLevel(word),
      etymology: this.deriveEtymologyFallback(word),
      exampleSentence: `Spoken in the current scenario dialogue.`,
      acousticTip: `Pay attention to connected speech phenomena (linking, elision) surrounding this token.`,
      synonyms: []
    };
  }

  /**
   * Extracts the full sentence/turn where the word appears in the current transcript
   */
  static extractScenarioUsage(word: string, transcript?: string): string | undefined {
    if (!word || !transcript) return undefined;
    const cleanWord = this.sanitizeWord(word);
    if (!cleanWord) return undefined;

    // Split transcript by sentence terminators or speaker turns
    const sentences = transcript.split(/(?<=[.?!])\s+/);
    for (const sent of sentences) {
      // Strip speaker tags like [F1] for matching
      const plainSent = sent.replace(/\[(F[1-5]|M[1-5])\]/g, '').trim();
      // Test word boundary match
      const regex = new RegExp(`\\b${cleanWord}(?:s|ed|ing)?\\b`, 'i');
      if (regex.test(plainSent)) {
        return plainSent;
      }
    }

    // Fallback search across transcript if punctuation split didn't catch it
    const cleanTranscript = transcript.replace(/\[(F[1-5]|M[1-5])\]/g, ' ').trim();
    const idx = cleanTranscript.toLowerCase().indexOf(cleanWord);
    if (idx !== -1) {
      const start = Math.max(0, cleanTranscript.lastIndexOf('.', idx) + 1);
      let end = cleanTranscript.indexOf('.', idx);
      if (end === -1) end = cleanTranscript.length;
      return cleanTranscript.substring(start, end).trim();
    }

    return undefined;
  }
}
