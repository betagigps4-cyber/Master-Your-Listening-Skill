import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Gauge,
  Settings2,
  Sparkles,
  Activity,
  Layers,
  Repeat,
  SkipForward,
  SkipBack,
  Sliders,
  Radio
} from 'lucide-react';
import { VoiceId } from '../types';
import { VOICE_ORDER, VOICE_PROFILES } from '../data/scenariosData';
import { AudioEngine } from '../services/audioEngine';
import { WaveformVisualizer } from './WaveformVisualizer';
import { QuickDictionaryPopover } from './QuickDictionaryPopover';

interface AudioPlayerProps {
  transcript: string;
  scenarioTitle?: string;
  isPlaying: boolean;
  activeSpeaker: VoiceId | null;
  progressPercent: number;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  replaysUsed: number;
  onReplayIncrement: () => void;
  onPlayToggle: () => void;
  onReset: () => void;
  onSeek?: (percent: number) => void;
}

interface TranscriptPhraseChunk {
  id: string;
  index: number;
  voiceId: VoiceId;
  speakerName: string;
  speakerColor: string;
  speakerDescription: string;
  cleanText: string;
  rawWithTag: string;
  wordCount: number;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  transcript,
  scenarioTitle,
  isPlaying,
  activeSpeaker,
  progressPercent,
  playbackSpeed,
  onSpeedChange,
  replaysUsed,
  onReplayIncrement,
  onPlayToggle,
  onReset,
  onSeek
}) => {
  const [showVoiceConfig, setShowVoiceConfig] = useState(false);
  const [playerMode, setPlayerMode] = useState<'waveform' | 'chunking'>('waveform');
  const [activeChunkId, setActiveChunkId] = useState<string | null>(null);
  const [isChunkLooping, setIsChunkLooping] = useState(false);
  const [chunkSpeed, setChunkSpeed] = useState<number>(0.9);
  const [dictionarySelection, setDictionarySelection] = useState<{
    word: string;
    position: { x: number; y: number };
  } | null>(null);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const voicesList = AudioEngine.getVoicesList();
  const currentVoiceMap = AudioEngine.getVoiceMap();
  const speeds = [0.8, 0.9, 1.0, 1.15, 1.25];

  // Parse transcript into discrete sentence/phrase chunks with speaker tags
  const phraseChunks = useMemo<TranscriptPhraseChunk[]>(() => {
    if (!transcript) return [];
    const chunks: TranscriptPhraseChunk[] = [];
    let currentVoice: VoiceId = 'F1';

    // Regex to capture dialogue turns [F1] text...
    const turnRegex = /\[(F[1-5]|M[1-5])\]([\s\S]*?)(?=\[(?:F[1-5]|M[1-5])\]|$)/g;
    let match: RegExpExecArray | null;
    let chunkCounter = 0;

    while ((match = turnRegex.exec(transcript)) !== null) {
      currentVoice = match[1] as VoiceId;
      const turnBody = match[2].trim();
      if (!turnBody) continue;

      // Break turn body into sentences: split by punctuation while keeping sentences intact
      const rawSentences = turnBody
        .split(/(?<=[.?!])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);

      const sentences = rawSentences.length > 0 ? rawSentences : [turnBody];

      sentences.forEach((sentence) => {
        chunkCounter++;
        const profile = VOICE_PROFILES[currentVoice] || VOICE_PROFILES['F1'];
        chunks.push({
          id: `chunk-${chunkCounter}`,
          index: chunkCounter,
          voiceId: currentVoice,
          speakerName: profile.name,
          speakerColor: profile.color,
          speakerDescription: profile.description,
          cleanText: sentence,
          rawWithTag: `[${currentVoice}] ${sentence}`,
          wordCount: sentence.split(/\s+/).filter(Boolean).length
        });
      });
    }

    // Fallback if no speaker tags
    if (chunks.length === 0 && transcript.trim()) {
      const sentences = transcript.split(/(?<=[.?!])\s+/).filter(Boolean);
      sentences.forEach((s, idx) => {
        const profile = VOICE_PROFILES['F1'];
        chunks.push({
          id: `chunk-${idx + 1}`,
          index: idx + 1,
          voiceId: 'F1',
          speakerName: profile.name,
          speakerColor: profile.color,
          speakerDescription: profile.description,
          cleanText: s.trim(),
          rawWithTag: s.trim(),
          wordCount: s.trim().split(/\s+/).length
        });
      });
    }

    return chunks;
  }, [transcript]);

  // Handle Chunk Playback
  const handlePlayChunk = (chunk: TranscriptPhraseChunk) => {
    if (activeChunkId === chunk.id) {
      // Pause/Stop current chunk
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      AudioEngine.stop();
      setActiveChunkId(null);
      return;
    }

    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    if (isPlaying) onPlayToggle(); // Pause global stream if playing

    setActiveChunkId(chunk.id);

    const playCurrent = () => {
      AudioEngine.speakSnippet(
        chunk.rawWithTag,
        () => {
          if (isChunkLooping) {
            loopTimeoutRef.current = setTimeout(() => {
              playCurrent();
            }, 600);
          } else {
            setActiveChunkId(null);
          }
        },
        chunk.voiceId,
        chunkSpeed
      );
    };

    playCurrent();
  };

  const handleStopChunk = () => {
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    AudioEngine.stop();
    setActiveChunkId(null);
  };

  const handleNextChunk = () => {
    if (phraseChunks.length === 0) return;
    const currentIdx = phraseChunks.findIndex((c) => c.id === activeChunkId);
    const nextIdx = (currentIdx + 1) % phraseChunks.length;
    handlePlayChunk(phraseChunks[nextIdx]);
  };

  const handlePrevChunk = () => {
    if (phraseChunks.length === 0) return;
    const currentIdx = phraseChunks.findIndex((c) => c.id === activeChunkId);
    const prevIdx = currentIdx <= 0 ? phraseChunks.length - 1 : currentIdx - 1;
    handlePlayChunk(phraseChunks[prevIdx]);
  };

  useEffect(() => {
    return () => {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    };
  }, []);

  const handlePlay = () => {
    if (activeChunkId) handleStopChunk();
    onPlayToggle();
  };

  const handleReplay = () => {
    if (activeChunkId) handleStopChunk();
    onReplayIncrement();
    onReset();
    AudioEngine.playTranscript(transcript, playbackSpeed);
  };

  const handleWaveformSeek = (percent: number) => {
    if (activeChunkId) handleStopChunk();
    if (onSeek) {
      onSeek(percent);
    } else {
      AudioEngine.seekToPercent(transcript, percent, playbackSpeed);
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col gap-4 border border-white/[0.08] bg-gradient-to-br from-[#111318] to-[#0D0F14] shadow-xl relative overflow-hidden">
      {/* Background visual flair */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Top row: Source info & audio wave */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl transition-colors ${
              isPlaying ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-white/30'
            }`}
          >
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-widest text-white/30 font-mono">Neural Synthesizer</span>
              {replaysUsed > 0 && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 font-mono border border-amber-500/20">
                  Replays: {replaysUsed}
                </span>
              )}
            </div>
            <p className="text-white/85 font-medium text-xs sm:text-sm">
              10-Speaker Dynamic Auditory Stream
            </p>
          </div>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="flex items-end gap-[3px] h-7 px-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`w-[3px] rounded-full transition-all duration-300 ${
                isPlaying ? `bg-orange-400 bar-${n}` : 'bg-white/10 h-1.5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 10 Speakers Indicator Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-1">
        {VOICE_ORDER.map((vId) => {
          const profile = VOICE_PROFILES[vId];
          const isActive = activeSpeaker === vId;
          return (
            <div
              key={vId}
              style={{
                borderColor: isActive ? profile.color : 'rgba(255,255,255,0.06)',
                backgroundColor: isActive ? `${profile.color}22` : 'rgba(255,255,255,0.02)',
                color: isActive ? profile.color : 'rgba(255,255,255,0.4)',
                boxShadow: isActive ? `0 0 12px ${profile.color}44` : 'none'
              }}
              className="flex flex-col items-center justify-center p-1.5 rounded-lg border text-[9px] font-mono transition-all"
            >
              <div
                className="w-1.5 h-1.5 rounded-full mb-0.5 shrink-0 transition-transform"
                style={{
                  backgroundColor: profile.color,
                  transform: isActive ? 'scale(1.4)' : 'scale(1)'
                }}
              />
              <span className="font-semibold tracking-wider">{vId}</span>
              <span className="text-[7px] opacity-70 truncate max-w-full font-sans">{profile.description}</span>
            </div>
          );
        })}
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => {
              handleStopChunk();
              setPlayerMode('waveform');
            }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              playerMode === 'waveform'
                ? 'bg-white/15 text-white font-bold'
                : 'text-white/40 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-orange-400" />
            <span>Continuous Stream</span>
          </button>

          <button
            onClick={() => {
              if (isPlaying) onPlayToggle();
              setPlayerMode('chunking');
            }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              playerMode === 'chunking'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                : 'text-white/40 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Audio Chunking ({phraseChunks.length} phrases)</span>
          </button>
        </div>

        {playerMode === 'chunking' && (
          <div className="flex items-center gap-2 text-xs font-mono">
            {/* Prev / Next buttons */}
            <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
              <button
                onClick={handlePrevChunk}
                disabled={phraseChunks.length === 0}
                className="p-1 text-white/50 hover:text-white disabled:opacity-30"
                title="Previous phrase"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextChunk}
                disabled={phraseChunks.length === 0}
                className="p-1 text-white/50 hover:text-white disabled:opacity-30"
                title="Next phrase"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chunk loop toggle */}
            <button
              onClick={() => setIsChunkLooping(!isChunkLooping)}
              className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-colors ${
                isChunkLooping
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-white/5 text-white/40 border-white/10 hover:text-white'
              }`}
              title="Loop currently selected phrase for shadowing practice"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Loop Phrase</span>
            </button>

            {/* Chunk speed toggle */}
            <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-lg border border-white/10">
              <span className="text-[10px] text-white/40 uppercase">Drill:</span>
              {[0.8, 0.9, 1.0].map((sp) => (
                <button
                  key={sp}
                  onClick={() => setChunkSpeed(sp)}
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    chunkSpeed === sp ? 'bg-amber-500 text-black font-bold' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {sp}x
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Visualizer Area: Waveform vs Chunking Mode */}
      {playerMode === 'waveform' ? (
        <div className="pt-1">
          <WaveformVisualizer
            transcript={transcript}
            progressPercent={progressPercent}
            isPlaying={isPlaying}
            activeSpeaker={activeSpeaker}
            playbackSpeed={playbackSpeed}
            onSeek={handleWaveformSeek}
          />
        </div>
      ) : (
        /* Audio Chunking Mode: Interactive Clickable Phrases */
        <div className="space-y-2 pt-1 anim-fade">
          <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>Click any sentence below to isolate and replay specific acoustics:</span>
            {activeChunkId && (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Playing Phrase
              </span>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {phraseChunks.map((chunk) => {
              const isActive = activeChunkId === chunk.id;
              return (
                <div
                  key={chunk.id}
                  onClick={() => handlePlayChunk(chunk)}
                  style={{
                    borderColor: isActive ? chunk.speakerColor : 'rgba(255,255,255,0.07)',
                    backgroundColor: isActive ? `${chunk.speakerColor}15` : 'rgba(255,255,255,0.02)'
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 group hover:border-white/20 ${
                    isActive ? 'ring-1 ring-amber-400/50 shadow-lg shadow-black/40' : ''
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    {/* Speaker Header */}
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: chunk.speakerColor }}
                      />
                      <span
                        className="text-[10px] font-mono font-bold"
                        style={{ color: chunk.speakerColor }}
                      >
                        [{chunk.voiceId}] {chunk.speakerName}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono">
                        • {chunk.wordCount} words
                      </span>
                    </div>

                    {/* Phrase text */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed transition-colors select-text ${
                        isActive ? 'text-white font-medium' : 'text-white/80 group-hover:text-white'
                      }`}
                      onMouseUp={(e) => {
                        e.stopPropagation();
                        const sel = window.getSelection();
                        if (sel && !sel.isCollapsed) {
                          const text = sel.toString().trim();
                          const word = text.split(/\s+/)[0]?.replace(/^[^\w]+|[^\w]+$/g, '');
                          if (word && word.length >= 2) {
                            const range = sel.getRangeAt(0);
                            const rect = range.getBoundingClientRect();
                            setDictionarySelection({
                              word,
                              position: {
                                x: rect.left + rect.width / 2,
                                y: rect.bottom
                              }
                            });
                          }
                        }
                      }}
                    >
                      "{chunk.cleanText}"
                    </p>
                  </div>

                  {/* Play / Replay button for this phrase */}
                  <div className="flex items-center gap-2 shrink-0 pt-0.5">
                    {isActive ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStopChunk();
                        }}
                        className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg hover:bg-amber-400 transition-colors"
                        title="Pause phrase"
                      >
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayChunk(chunk);
                        }}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                        title="Replay phrase"
                      >
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Controls Row */}
      <div className="flex items-center justify-between pt-1">
        {/* Playback speed selector */}
        <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
          <Gauge className="w-3.5 h-3.5 text-white/30 ml-1.5 mr-0.5" />
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-all ${
                playbackSpeed === s
                  ? 'bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Core Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleReplay}
            className="p-2 text-white/30 hover:text-white/80 transition-colors focus:outline-none flex items-center gap-1.5 text-xs font-mono"
            title="Replay from beginning (Increments replay counter for difficulty metric)"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          <button
            onClick={handlePlay}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all active:scale-95 bg-gradient-to-br from-orange-500 to-amber-500 text-black shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 focus:outline-none"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Voice Config toggle */}
        <button
          onClick={() => setShowVoiceConfig(!showVoiceConfig)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all ${
            showVoiceConfig
              ? 'bg-white/10 text-white border-white/20'
              : 'bg-white/[0.02] text-white/40 hover:text-white border-white/[0.06]'
          }`}
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Voices</span>
        </button>
      </div>

      {/* Voice Config Drawer */}
      {showVoiceConfig && (
        <div className="pt-3 border-t border-white/[0.06] space-y-2.5 text-xs anim-fade">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-wider">
            <span>Speech Synthesis Engine Voice Allocation</span>
            <span>{voicesList.length} OS voices available</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {VOICE_ORDER.map((vId) => {
              const prof = VOICE_PROFILES[vId];
              const assigned = currentVoiceMap[vId];
              return (
                <div key={vId} className="flex items-center gap-2 p-1.5 rounded bg-white/[0.02] border border-white/[0.04]">
                  <span className="w-7 font-mono font-bold text-[10px]" style={{ color: prof.color }}>
                    {vId}
                  </span>
                  <select
                    value={assigned ? voicesList.indexOf(assigned) : ''}
                    onChange={(e) => AudioEngine.reassignVoice(vId, parseInt(e.target.value))}
                    className="flex-1 bg-black/40 text-[10px] text-white/70 rounded px-1.5 py-1 border border-white/10 focus:outline-none focus:border-orange-400"
                  >
                    <option value="">{assigned?.name || 'Default'}</option>
                    {voicesList.map((v, idx) => (
                      <option key={idx} value={idx}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Dictionary Popover for chunk selections */}
      {dictionarySelection && (
        <QuickDictionaryPopover
          word={dictionarySelection.word}
          position={dictionarySelection.position}
          onClose={() => setDictionarySelection(null)}
          scenarioTranscript={transcript}
          scenarioTitle={scenarioTitle}
        />
      )}
    </div>
  );
};
