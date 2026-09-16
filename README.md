# ListenMaster 🎧
### Adaptive English Listening Mastery & Acoustic Diagnostic Assessment Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8.svg)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8e75ff.svg)](https://ai.google.dev/)

**ListenMaster** is a full-stack, pedagogical web platform designed to elevate English listening comprehension from casual hearing to diagnostic auditory precision. Combining multi-speaker conversational dialogue synthesis, realistic acoustic backgrounds, CEFR-calibrated difficulty scaling, phonetic trap analysis, and an integrated Lexical Vault with retention quizzes, ListenMaster trains learners to decode real-world English as it is genuinely spoken.

---

## ✨ Key Features

### 1. 🎙️ Realistic Multi-Speaker Scenarios & Ambient Acoustic Filters
- **Natural Multi-Voice Dialogues**: Simultaneous or alternating male/female speakers across workplace negotiations, academic lectures, casual encounters, travel emergencies, and news broadcasts.
- **Synthesized Acoustic Environments**: Toggleable ambient soundscapes (Coffee Shop Chatter, Office Hum, Airport Terminal, Subways, Rain, Broadcast Radio Hiss) to simulate real-world listening conditions.
- **Dynamic Speed Controls**: Adjustable playback rates ranging from 0.7x (careful phoneme parsing) to 1.3x (fast conversational flow).

### 2. 🧠 Acoustic Diagnostic & Misinterpretation Analysis
- **Acoustic Evidence Extraction**: Pinpoints the exact timestamp and transcript excerpt where a learner was misled by auditory distractors or fast connected speech.
- **Phonetic & Semantic Contrast**: Contrasts what was heard vs. what was actually spoken, explaining connected speech phenomena (elision, assimilation, weak forms, linking /r/).
- **AI-Powered Diagnostics**: Utilizes the Google Gemini API (with deterministic fallback heuristics) to generate personalized remedial listening tips.

### 3. 📖 In-Context Quick Dictionary & Retention Engine
- **Double-Click / Text Selection Lookup**: Highlight any word in the scenario transcript to launch the instant Quick Dictionary popover.
- **CEFR-Calibrated Simple vs. Advanced Definitions**: Toggle between plain-English (A1–B1) explanations and formal, nuance-rich (B2–C2) lexical definitions.
- **Word Etymology & Linguistic Origin**: Deep dives into historical origins (Latin prefixes, Old French loans, Germanic roots) to anchor vocabulary memory.
- **Fill-in-the-Blank "Create Quiz"**: Generates instant retention questions directly from the scenario context with phonetic distractors.
- **Speech Pronunciation**: Listen to words spoken at standard (0.9x) or slow phonemic (0.7x) speeds.

### 4. 📚 Saved Vocabulary Vault & Offline Export
- **Lexical History Log**: Access saved words with part of speech, CEFR level, transcript usage snippet, acoustic listening tips, and etymologies.
- **Export to Printable PDF**: Formatted study sheets optimized with print-specific styling and page-break protection for offline revision.
- **Export to CSV**: Export your personal vocabulary database in UTF-8 CSV format, ready for Anki flashcard decks, Excel, or Google Sheets.

### 5. 👨‍🏫 Educator & Class Analytics Dashboard
- **Aggregate Performance Metrics**: Monitor class average accuracy, CEFR level distribution, weak listening areas, and difficulty progression.
- **Acoustic Traps Leaderboard**: Discover which connected speech patterns trick students most frequently across the cohort.
- **Individual Student Profiles**: Inspect detailed breakdown per learner, including past attempts, phonetic weaknesses, and saved vocabulary counts.
- **Exportable Class Reports**: Generate print-ready and CSV performance summaries for academic grading or parent-teacher conferences.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/) |
| **Visualizations** | [D3.js](https://d3js.org/) for acoustic frequency waveforms & performance telemetry |
| **Audio Engine** | Web Speech Synthesis API + HTML5 Web Audio API (ambient noise generators) |
| **Backend** | [Express.js](https://expressjs.com/), [Node.js](https://nodejs.org/), [tsx](https://github.com/privatenumber/tsx), [esbuild](https://esbuild.github.io/) |
| **AI Integration** | [@google/genai](https://www.npmjs.com/package/@google/genai) (Google Gemini 2.5 Flash) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm** (or **pnpm** / **yarn** / **bun**)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/listenmaster.git
   cd listenmaster
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and configure your API key (optional for basic features; required for advanced Gemini AI diagnostics):
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   APP_URL="http://localhost:3000"
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

- **`npm run dev`**: Starts the Express server with Vite middleware integration on port 3000.
- **`npm run build`**: Compiles the React client with Vite and bundles `server.ts` into `dist/server.cjs` via `esbuild`.
- **`npm start`**: Runs the compiled production server (`node dist/server.cjs`).
- **`npm run lint`**: Runs TypeScript type checking (`tsc --noEmit`).
- **`npm run clean`**: Removes build outputs (`dist/`).

---

## 📁 Project Architecture

```
listenmaster/
├── public/                     # Static assets & icons
│   ├── favicon.svg             # Application SVG favicon
│   └── assets/
├── src/
│   ├── components/             # Modular UI components
│   │   ├── QuickDictionaryPopover.tsx   # Interactive dictionary & retention quiz
│   │   ├── SavedWordsHistoryLog.tsx     # Vocabulary Vault & PDF/CSV exporter
│   │   ├── ListeningScenarioPlayer.tsx  # Multi-speaker audio & transcript player
│   │   ├── AcousticDiagnosticsCard.tsx  # Misinterpretation & phonetic contrast analyzer
│   │   ├── EducatorDashboard.tsx        # Class-wide metrics & telemetry reports
│   │   └── ...
│   ├── data/                   # Initial listening scenarios & CEFR datasets
│   ├── services/               # Core application logic & API clients
│   │   ├── audioEngine.ts              # Web Speech & ambient sound synthesizer
│   │   ├── dictionaryService.ts        # Lexical definitions, etymology & quiz generator
│   │   ├── vocabularyExportService.ts  # PDF and CSV export formatting engine
│   │   └── storageService.ts           # Local persistence & state management
│   ├── App.tsx                 # Main application view coordinator
│   ├── index.css               # Global Tailwind CSS styles & animations
│   ├── main.tsx                # Client entrypoint
│   └── types.ts                # TypeScript domain models & interfaces
├── .env.example                # Documented environment variables
├── .gitignore                  # Git ignore specifications
├── index.html                  # HTML entry point with metadata
├── LICENSE                     # MIT open-source license
├── metadata.json               # AI Studio project metadata
├── package.json                # Project dependencies & build scripts
├── server.ts                   # Express server & Gemini API proxy
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite build configuration
```

---

## 🚢 Publishing to GitHub & GitHub Pages

### Option 1: Automated Deployment via GitHub Pages (Recommended)
This repository includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) and relative asset resolution (`base: './'`).

1. **Push this repository to GitHub**:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. **Enable GitHub Pages**:
   - In your GitHub repository, go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - The workflow will automatically trigger, build the application, and publish it at `https://<your-username>.github.io/<your-repo-name>/`.

### Option 2: Export Directly from Google AI Studio
- Click the **Settings / More Options** menu (three dots or gear icon in the top right corner of Google AI Studio).
- Select **Export to GitHub** or **Download as ZIP**.
- If exported to a new repository, navigate to **Settings** → **Pages** on GitHub and set Source to **GitHub Actions**.

### Option 3: Production Server / Container Deployment
To run the full-stack server locally or in a container (Cloud Run, Railway, Render, VPS):
```bash
npm run build
npm start
```
The Express server will launch on port `3000` and host both the client SPA and the Gemini-powered diagnostic API routes.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
