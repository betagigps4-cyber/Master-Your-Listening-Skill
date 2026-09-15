import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Advanced helper to extract and highlight misinterpreted audio part vs correct proof from transcript
function extractAcousticMisinterpretation(
  transcript: string = "",
  correctAnswer: string = "",
  userAnswer: string = "",
  question: string = ""
) {
  if (!transcript) {
    return {
      distractorAnalysis: `You selected "${userAnswer}", but the target answer is "${correctAnswer}".`,
      misinterpretedQuote: "Audio transcript snippet unavailable.",
      misinterpretedCue: userAnswer,
      misinterpretationType: "Auditory Distractor",
      misinterpretationReason: "The dialogue introduced an alternative option that was easily confused with the target.",
      acousticQuote: "Spoken evidence unavailable.",
      cueHighlight: correctAnswer,
      contrastSummary: `Chosen option "${userAnswer}" conflicted with actual spoken target "${correctAnswer}".`,
      listeningTip: "Listen for signpost transitions that introduce or qualify spoken details.",
      coreConcept: "Acoustic Disambiguation",
      misinterpretedTimePercentEstimate: 20,
      correctTimePercentEstimate: 70,
      source: "heuristic" as const,
    };
  }

  // Preserve speaker tags while splitting sentences
  const rawSegments = transcript.split(/(?<=[.?!])\s+/).filter(Boolean);
  const totalSegments = Math.max(1, rawSegments.length);

  const clean = (s: string) => s.replace(/\[(F[1-5]|M[1-5])\]/g, "").trim();

  // Normalize tokens for matching
  const userTokens = clean(userAnswer)
    .toLowerCase()
    .split(/[\s,/-]+/)
    .filter((w) => w.length > 1 && !["the", "and", "for", "with", "by", "in", "at", "on"].includes(w));

  const correctTokens = clean(correctAnswer)
    .toLowerCase()
    .split(/[\s,/-]+/)
    .filter((w) => w.length > 1 && !["the", "and", "for", "with", "by", "in", "at", "on"].includes(w));

  // Find segment containing user answer
  let misIndex = -1;
  let misinterpretedQuote = "";
  let misinterpretedCue = userAnswer;

  for (let i = 0; i < rawSegments.length; i++) {
    const seg = rawSegments[i];
    const segLower = clean(seg).toLowerCase();
    
    // Direct match first
    if (segLower.includes(clean(userAnswer).toLowerCase())) {
      misIndex = i;
      misinterpretedQuote = seg.trim();
      misinterpretedCue = userAnswer;
      break;
    }
    // Token match
    const hasToken = userTokens.some((t) => segLower.includes(t));
    if (hasToken && misIndex === -1) {
      misIndex = i;
      misinterpretedQuote = seg.trim();
      const matchedTok = userTokens.find((t) => segLower.includes(t)) || userAnswer;
      misinterpretedCue = matchedTok;
    }
  }

  // If still not found, fallback to initial portion of transcript
  if (misIndex === -1) {
    misIndex = 0;
    misinterpretedQuote = rawSegments[0] || transcript.slice(0, 140);
  }

  // Find segment containing correct answer
  let corIndex = -1;
  let acousticQuote = "";
  let cueHighlight = correctAnswer;

  for (let i = 0; i < rawSegments.length; i++) {
    const seg = rawSegments[i];
    const segLower = clean(seg).toLowerCase();
    if (segLower.includes(clean(correctAnswer).toLowerCase())) {
      corIndex = i;
      acousticQuote = seg.trim();
      cueHighlight = correctAnswer;
      break;
    }
    const hasToken = correctTokens.some((t) => segLower.includes(t));
    if (hasToken && corIndex === -1) {
      corIndex = i;
      acousticQuote = seg.trim();
      const matchedTok = correctTokens.find((t) => segLower.includes(t)) || correctAnswer;
      cueHighlight = matchedTok;
    }
  }

  if (corIndex === -1) {
    corIndex = rawSegments.length > 1 ? rawSegments.length - 1 : 0;
    acousticQuote = rawSegments[corIndex] || transcript.slice(0, 140);
  }

  // Percent estimates
  const misinterpretedTimePercentEstimate = Math.min(
    95,
    Math.max(5, Math.round(((misIndex + 0.5) / totalSegments) * 100))
  );
  const correctTimePercentEstimate = Math.min(
    95,
    Math.max(10, Math.round(((corIndex + 0.5) / totalSegments) * 100))
  );

  // Analyze misinterpretation trap type
  const combinedContext = (misinterpretedQuote + " " + acousticQuote).toLowerCase();
  let misinterpretationType = "Acoustic Distractor Trap";
  let misinterpretationReason = `You likely locked onto "${misinterpretedCue}" when heard in this sentence, before the dialogue confirmed "${correctAnswer}".`;

  if (/\[f[1-5]\]/.test(misinterpretedQuote.toLowerCase()) && /\[m[1-5]\]/.test(acousticQuote.toLowerCase()) ||
      /\[m[1-5]\]/.test(misinterpretedQuote.toLowerCase()) && /\[f[1-5]\]/.test(acousticQuote.toLowerCase())) {
    misinterpretationType = "Speaker Misattribution";
    misinterpretationReason = `One speaker uttered "${misinterpretedCue}", but the question targeted information confirmed by the other speaker.`;
  } else if (/\b(usually|normally|always|today|yesterday|tomorrow|currently|used to|past)\b/.test(combinedContext)) {
    misinterpretationType = "Temporal / Habitual Contrast";
    misinterpretationReason = `The audio contrasted a routine or past action ("${misinterpretedCue}") against the specific condition asked in the question.`;
  } else if (/\b(actually|however|but|instead|rather|wait|no|changed|except)\b/.test(combinedContext)) {
    misinterpretationType = "Self-Correction & Pivot";
    misinterpretationReason = `The speaker initially mentioned "${misinterpretedCue}", but quickly followed with a pivot signpost confirming "${correctAnswer}".`;
  } else if (/\b\d+\b/.test(userAnswer) || /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b/i.test(userAnswer)) {
    misinterpretationType = "Numerical Distractor Collision";
    misinterpretationReason = `Multiple numbers were spoken in close proximity; "${misinterpretedCue}" applied to a different subject or metric.`;
  }

  const contrastSummary = `You heard "${misinterpretedCue}" in "${clean(misinterpretedQuote)}", but the audio affirmed "${cueHighlight}" in "${clean(acousticQuote)}".`;

  return {
    distractorAnalysis: `You selected "${userAnswer}", which was mentioned as a distractor. ${misinterpretationReason}`,
    misinterpretedQuote,
    misinterpretedCue,
    misinterpretationType,
    misinterpretationReason,
    acousticQuote,
    cueHighlight,
    contrastSummary,
    listeningTip: "Always listen through the entire sentence or dialogue exchange—speakers routinely introduce a distractor before stating the true resolution.",
    coreConcept: misinterpretationType,
    misinterpretedTimePercentEstimate,
    correctTimePercentEstimate,
    source: "heuristic" as const,
  };
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI-Generated Explanation Endpoint with Deep Transcript Highlighting
app.post("/api/explain-answer", async (req, res) => {
  const {
    question,
    options,
    userAnswer,
    correctAnswer,
    transcript,
    category,
    level,
  } = req.body;

  if (!question || !userAnswer || !correctAnswer || !transcript) {
    return res.status(400).json({
      error: "Missing required parameters (question, userAnswer, correctAnswer, transcript)",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback heuristic if no API key is provided
  if (!apiKey) {
    return res.json(
      extractAcousticMisinterpretation(transcript, correctAnswer, userAnswer, question)
    );
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = `You are ListenMaster's expert listening comprehension exam tutor (specializing in IELTS, TOEFL, and Cambridge English Listening).
A student was listening to the audio transcript and selected an INCORRECT answer.
Your task is to pinpoint exactly WHICH part of the transcript misled them and highlight the contrast.

Audio Transcript:
"""
${transcript}
"""

Comprehension Question: "${question}"
Category: ${category || "General Listening"}
Target Level: ${level || "Intermediate"}
Answer Options: ${JSON.stringify(options || [])}
Student's Chosen (INCORRECT) Answer: "${userAnswer}"
Correct Target Answer: "${correctAnswer}"

Perform a deep transcript-grounded auditory error analysis:
1. "misinterpretedQuote": Identify the EXACT sentence or speech turn from the transcript that lured the student into choosing "${userAnswer}". This MUST be a verbatim excerpt from the transcript.
2. "misinterpretedCue": The specific 2 to 5 words inside "misinterpretedQuote" that the student likely misheard, confused, or latched onto.
3. "misinterpretationType": A succinct category tag for the trap, such as "Speaker Misattribution", "Pre-Correction Distractor", "Temporal / Habitual Trap", "Negative Qualifier Missed", "Numerical Distractor", or "Phonetic Similarity".
4. "misinterpretationReason": 1 to 2 clear sentences explaining why this specific part of the audio was confusing or misleading.
5. "acousticQuote": The exact verbatim sentence from the transcript containing the auditory proof for "${correctAnswer}".
6. "cueHighlight": The specific 2 to 5 words in "acousticQuote" confirming "${correctAnswer}".
7. "contrastSummary": A direct 1-sentence contrast: e.g. 'You heard "[misinterpreted words]" when [speaker/context], but missed "[correct words]" which established the true answer.'
8. "distractorAnalysis": In-depth pedagogical analysis of why "${userAnswer}" was a tempting distractor.
9. "listeningTip": An actionable auditory strategy or pattern to listen for in similar questions.
10. "coreConcept": Short 2-4 word conceptual tag (e.g. "Self-Correction Marker", "Number Distractor Trap", "Signpost Negation").
11. "misinterpretedTimePercentEstimate": An integer from 0 to 100 estimating where the misinterpreted quote occurs chronologically in the transcript.
12. "correctTimePercentEstimate": An integer from 0 to 100 estimating where the correct quote occurs chronologically in the transcript.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are an encouraging and pedagogically precise listening test coach. Ground all explanations strictly in the verbatim transcript text, identifying exactly which sentence misled the student and highlighting the precise auditory cues.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            distractorAnalysis: {
              type: Type.STRING,
              description:
                "Detailed pedagogical explanation of why the user's selected choice is incorrect and how it functioned as a distractor.",
            },
            misinterpretedQuote: {
              type: Type.STRING,
              description:
                "The exact verbatim sentence or dialogue line from the audio transcript where the student was misled into their incorrect answer.",
            },
            misinterpretedCue: {
              type: Type.STRING,
              description:
                "The specific 2 to 5 words in the misinterpretedQuote that the student latched onto.",
            },
            misinterpretationType: {
              type: Type.STRING,
              description:
                "Category of the auditory trap (e.g. 'Speaker Misattribution', 'Temporal Trap', 'Self-Correction').",
            },
            misinterpretationReason: {
              type: Type.STRING,
              description:
                "Explanation of how that specific part of the audio caused the misinterpretation.",
            },
            acousticQuote: {
              type: Type.STRING,
              description:
                "The verbatim sentence from the audio transcript containing the acoustic evidence for the correct answer.",
            },
            cueHighlight: {
              type: Type.STRING,
              description:
                "The specific 2 to 5 words in the acoustic quote that confirm the correct answer.",
            },
            contrastSummary: {
              type: Type.STRING,
              description:
                "A direct one-sentence comparison between what was misinterpreted vs what was actually confirmed.",
            },
            listeningTip: {
              type: Type.STRING,
              description:
                "Practical listening tip for exams and real conversation.",
            },
            coreConcept: {
              type: Type.STRING,
              description:
                "Short 2-4 word concept tag representing the auditory skill.",
            },
            misinterpretedTimePercentEstimate: {
              type: Type.INTEGER,
              description:
                "Estimated percentage (0 to 100) along the audio where the misinterpreted sentence occurs.",
            },
            correctTimePercentEstimate: {
              type: Type.INTEGER,
              description:
                "Estimated percentage (0 to 100) along the audio where the correct evidence occurs.",
            },
          },
          required: [
            "distractorAnalysis",
            "misinterpretedQuote",
            "misinterpretedCue",
            "misinterpretationType",
            "misinterpretationReason",
            "acousticQuote",
            "cueHighlight",
            "contrastSummary",
            "listeningTip",
            "coreConcept",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    return res.json({
      ...parsed,
      source: "gemini",
    });
  } catch (err: any) {
    console.error("Gemini API Error in /api/explain-answer, using robust heuristic:", err);
    return res.json(
      extractAcousticMisinterpretation(transcript, correctAnswer, userAnswer, question)
    );
  }
});

// Vite Middleware for development & Static server for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ListenMaster full-stack server running on port ${PORT}`);
  });
}

startServer();
