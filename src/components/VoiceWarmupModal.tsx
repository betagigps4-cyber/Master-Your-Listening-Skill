import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  X,
  AlertCircle,
  Play,
  Square,
  Award,
  BookOpen
} from 'lucide-react';
import { PhonemePracticeItem, WarmupResult } from '../types';
import { PhonemeWarmupService } from '../services/phonemeWarmupService';
import { AudioEngine } from '../services/audioEngine';
import { MicrophoneVisualizer } from './MicrophoneVisualizer';

interface VoiceWarmupModalProps {
  isOpen: boolean;
  onClose: () => void;
  transcript: string;
  scenarioTitle: string;
  onCompleteWarmup?: (overallScore: number) => void;
}

export const VoiceWarmupModal: React.FC<VoiceWarmupModalProps> = ({
  isOpen,
  onClose,
  transcript,
  scenarioTitle,
  onCompleteWarmup
}) => {
  const [phonemes, setPhonemes] = useState<PhonemePracticeItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [micPermission, setMicPermission] = useState<'idle' | 'granted' | 'denied'>('idle');
  const [micError, setMicError] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, WarmupResult>>({});
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingModel, setIsPlayingModel] = useState(false);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const recordStartTimestamp = useRef<number>(0);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const maxVolumeRef = useRef<number>(0);

  // Extract scenario phonemes whenever scenario transcript changes or modal opens
  useEffect(() => {
    if (isOpen && transcript) {
      const extracted = PhonemeWarmupService.extractScenarioPhonemes(transcript, scenarioTitle);
      setPhonemes(extracted);
      setCurrentIndex(0);
      setResults({});
      setIsComplete(false);
      setRecordedAudioUrl(null);
      setRecognizedText('');
    }
  }, [isOpen, transcript, scenarioTitle]);

  // Cleanup media streams on close
  const stopMicrophone = useCallback(() => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((t) => t.stop());
      setMediaStream(null);
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsRecording(false);
  }, [mediaStream]);

  useEffect(() => {
    if (!isOpen) {
      stopMicrophone();
      AudioEngine.stop();
    }
  }, [isOpen, stopMicrophone]);

  // Request Microphone Access
  const requestMicAccess = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      setMediaStream(stream);
      setMicPermission('granted');
      return stream;
    } catch (err: any) {
      console.error('Microphone permission error:', err);
      setMicPermission('denied');
      setMicError(
        'Microphone access is required to analyze your pronunciation. Please allow microphone permissions in your browser.'
      );
      return null;
    }
  };

  const currentPhoneme = phonemes[currentIndex];

  // Start Voice Recording & Speech Recognition
  const handleStartRecording = async () => {
    setMicError(null);
    setRecognizedText('');
    setRecordedAudioUrl(null);
    maxVolumeRef.current = 0;

    let stream = mediaStream;
    if (!stream || !stream.active) {
      stream = await requestMicAccess();
      if (!stream) return;
    }

    try {
      // 1. Setup MediaRecorder for self-playback
      recordedChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (recordedChunksRef.current.length > 0) {
          const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setRecordedAudioUrl(url);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      recordStartTimestamp.current = Date.now();
      setIsRecording(true);

      // 2. Setup SpeechRecognition if supported
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-US';
          recognition.continuous = false;
          recognition.interimResults = true;
          recognition.maxAlternatives = 3;

          recognition.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = 0; i < event.results.length; i++) {
              finalTranscript += event.results[i][0].transcript;
            }
            if (finalTranscript) {
              setRecognizedText(finalTranscript);
            }
          };

          recognition.onerror = (event: any) => {
            console.warn('SpeechRecognition warning:', event.error);
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch (e) {
          console.warn('Speech recognition start issue:', e);
        }
      }
    } catch (e: any) {
      console.error('Recording initialization error:', e);
      setMicError('Could not start recording: ' + e.message);
      setIsRecording(false);
    }
  };

  // Stop Recording & Score Attempt
  const handleStopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    const durationMs = Date.now() - recordStartTimestamp.current;
    const hasAudioEnergy = maxVolumeRef.current > 0.04 || durationMs > 500;

    if (currentPhoneme) {
      // Evaluate pronunciation
      const evalResult = PhonemeWarmupService.evaluatePronunciation(
        currentPhoneme.targetWord,
        currentPhoneme.phoneme,
        recognizedText,
        durationMs,
        hasAudioEnergy
      );

      setResults((prev) => ({
        ...prev,
        [currentPhoneme.id]: evalResult
      }));
    }
  };

  // Play Native Model Audio
  const handlePlayModel = (phoneme: PhonemePracticeItem) => {
    if (isPlayingModel) {
      AudioEngine.stop();
      setIsPlayingModel(false);
      return;
    }

    setIsPlayingModel(true);
    // Speak target word clearly, then the full context sentence
    const utteranceText = `${phoneme.targetWord}. ... ${phoneme.exampleSentence}`;
    AudioEngine.speakSnippet(utteranceText, () => {
      setIsPlayingModel(false);
    });
  };

  // Play User's Own Recorded Audio
  const handlePlayUserAudio = () => {
    if (!recordedAudioUrl) return;
    if (isPlayingUserAudio && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlayingUserAudio(false);
      return;
    }

    const audio = new Audio(recordedAudioUrl);
    audioPlayerRef.current = audio;
    setIsPlayingUserAudio(true);
    audio.onended = () => setIsPlayingUserAudio(false);
    audio.onerror = () => setIsPlayingUserAudio(false);
    audio.play();
  };

  // Navigation between phonemes
  const handleNext = () => {
    if (currentIndex < phonemes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setRecordedAudioUrl(null);
      setRecognizedText('');
    } else {
      // Finished all phonemes!
      setIsComplete(true);
      const values = Object.values(results) as WarmupResult[];
      const totalScore = Math.round(
        values.reduce((acc: number, r: WarmupResult) => acc + (r.score || 0), 0) /
          Math.max(1, values.length)
      );
      onCompleteWarmup?.(totalScore);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setRecordedAudioUrl(null);
      setRecognizedText('');
    }
  };

  if (!isOpen) return null;

  const currentResult = currentPhoneme ? results[currentPhoneme.id] : null;
  const resultList = Object.values(results) as WarmupResult[];
  const overallAvgScore =
    resultList.length > 0
      ? Math.round(
          resultList.reduce((acc: number, r: WarmupResult) => acc + (r.score || 0), 0) /
            resultList.length
        )
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-900/95 border border-white/10 rounded-3xl shadow-2xl shadow-orange-500/10 p-6 sm:p-8 space-y-6 text-white my-auto anim-fade">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-black shadow-lg shadow-orange-500/20">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
                  Voice Warmup
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/10">
                  Scenario Primer
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {scenarioTitle || 'Current Scenario Dialogue'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warmup Completion Screen */}
        {isComplete ? (
          <div className="text-center py-6 space-y-6 anim-fade">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black shadow-xl shadow-emerald-500/20 animate-bounce">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-grotesk text-white">
                Vocal Motor Cortex Primed!
              </h3>
              <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                You've successfully warmed up the distinctive phonemes present in this dialogue. Your ears and brain are now primed for high-speed acoustic decoding.
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto text-left">
              {phonemes.map((ph, idx) => {
                const res = results[ph.id];
                return (
                  <div
                    key={ph.id ? `${ph.id}-${idx}` : `score-${idx}`}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-orange-400">
                        {ph.phoneme}
                      </span>
                      <p className="text-[11px] text-white/50 truncate max-w-[80px]">
                        {ph.targetWord}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded-lg ${
                        (res?.score || 0) >= 80
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {res?.score || 85}%
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setIsComplete(false);
                  setCurrentIndex(0);
                }}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                Review Phonemes
              </button>
              <button
                onClick={onClose}
                className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono uppercase tracking-wider shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Begin Listening Task</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Step-by-Step Phoneme Card */
          currentPhoneme && (
            <div className="space-y-6">
              {/* Stepper Dots */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {phonemes.map((ph, idx) => {
                    const isPassed = results[ph.id]?.passed;
                    const isCur = idx === currentIndex;
                    return (
                      <button
                        key={ph.id ? `${ph.id}-${idx}` : `step-${idx}`}
                        onClick={() => {
                          setCurrentIndex(idx);
                          setRecordedAudioUrl(null);
                          setRecognizedText('');
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          isCur
                            ? 'w-8 bg-orange-400'
                            : isPassed
                            ? 'w-3 bg-emerald-400'
                            : 'w-3 bg-white/20'
                        }`}
                        title={`Phoneme ${idx + 1}: ${ph.phoneme}`}
                      />
                    );
                  })}
                </div>
                <span className="text-xs font-mono text-white/40">
                  Phoneme {currentIndex + 1} of {phonemes.length}
                </span>
              </div>

              {/* Main Phoneme Banner */}
              <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-orange-500/15 text-orange-300 border border-orange-500/30">
                        {currentPhoneme.category}
                      </span>
                      <span className="text-xs text-white/40 font-mono">
                        Target Sound in Dialogue
                      </span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 tracking-wide">
                        {currentPhoneme.phoneme}
                      </h3>
                      <span className="text-sm font-semibold text-white/80">
                        {currentPhoneme.name}
                      </span>
                    </div>
                  </div>

                  {/* Native Pronunciation Button */}
                  <button
                    onClick={() => handlePlayModel(currentPhoneme)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 border transition-all cursor-pointer shrink-0 ${
                      isPlayingModel
                        ? 'bg-amber-400 text-black border-amber-300 font-bold'
                        : 'bg-white/5 text-amber-300 border-amber-500/30 hover:bg-amber-500/15'
                    }`}
                  >
                    {isPlayingModel ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>Listen to Model</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Articulation Guide */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-orange-400/90 font-semibold block">
                    🗣️ How to Shape Your Mouth:
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {currentPhoneme.articulationGuide}
                  </p>
                  {currentPhoneme.similarSoundWarning && (
                    <div className="pt-1 text-[11px] text-amber-300/80 font-mono">
                      ⚠️ {currentPhoneme.similarSoundWarning}
                    </div>
                  )}
                </div>

                {/* Scenario Context & Practice Word */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block">
                      Word in Current Scenario:
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white font-mono capitalize">
                      "{currentPhoneme.targetWord}"
                    </span>
                  </div>
                  <div className="text-xs text-white/60 font-mono italic max-w-sm sm:text-right">
                    "{currentPhoneme.exampleSentence}"
                  </div>
                </div>
              </div>

              {/* Real-Time Microphone Practice Studio */}
              <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/40 border border-orange-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white/90">
                      Microphone Vocal Practice
                    </span>
                    {isRecording && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        Listening Live
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-white/40">
                    Say: <strong>"{currentPhoneme.targetWord}"</strong>
                  </span>
                </div>

                {/* Canvas Visualizer */}
                <MicrophoneVisualizer
                  stream={mediaStream}
                  isRecording={isRecording}
                  onVolumeChange={(vol) => {
                    if (vol > maxVolumeRef.current) {
                      maxVolumeRef.current = vol;
                    }
                  }}
                />

                {/* Microphone Permission Prompt or Error */}
                {micError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{micError}</span>
                  </div>
                )}

                {/* Record Button Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  {!isRecording ? (
                    <button
                      onClick={handleStartRecording}
                      className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-xs uppercase tracking-wider font-mono shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2.5"
                    >
                      <Mic className="w-4 h-4" />
                      <span>
                        {currentResult ? 'Practice Again' : 'Record Pronunciation'}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopRecording}
                      className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-red-500 text-white font-bold text-xs uppercase tracking-wider font-mono shadow-lg shadow-red-500/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2.5 animate-pulse"
                    >
                      <Square className="w-4 h-4 fill-white" />
                      <span>Stop & Evaluate Voice</span>
                    </button>
                  )}

                  {/* Play My Voice Recording */}
                  {recordedAudioUrl && !isRecording && (
                    <button
                      onClick={handlePlayUserAudio}
                      className={`w-full sm:w-auto px-5 py-3 rounded-2xl border text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isPlayingUserAudio
                          ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                          : 'bg-white/5 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/15'
                      }`}
                    >
                      {isPlayingUserAudio ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Stop Replay</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Hear My Voice</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Recognition Feedback & Scoring */}
                {currentResult && (
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2 anim-fade">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {currentResult.score >= 75 ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                        )}
                        <span className="text-xs font-semibold text-white/90">
                          {currentResult.score >= 80
                            ? 'Excellent Phonetic Articulation!'
                            : currentResult.score >= 60
                            ? 'Acceptable Articulation'
                            : 'Needs Refinement'}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                          currentResult.score >= 80
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {currentResult.score}% Match
                      </span>
                    </div>

                    {recognizedText && (
                      <p className="text-xs text-white/60 font-mono">
                        Acoustic Transcription: <span className="text-white font-semibold">"{recognizedText}"</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Navigation Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
                <button
                  disabled={currentIndex === 0}
                  onClick={handlePrev}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
                    currentIndex === 0
                      ? 'opacity-30 cursor-not-allowed text-white/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5 cursor-pointer'
                  }`}
                >
                  Previous Sound
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-white/40 hover:text-white/70 hover:bg-white/5 transition-all cursor-pointer"
                  >
                    Skip Warmup
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black text-xs font-mono uppercase tracking-wider font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>
                      {currentIndex < phonemes.length - 1
                        ? 'Next Phoneme'
                        : 'Finish Warmup'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
