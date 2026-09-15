import React, { useEffect, useRef } from 'react';

interface MicrophoneVisualizerProps {
  stream: MediaStream | null;
  isRecording: boolean;
  onVolumeChange?: (volume: number) => void;
}

export const MicrophoneVisualizer: React.FC<MicrophoneVisualizerProps> = ({
  stream,
  isRecording,
  onVolumeChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!stream) {
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;
    } catch (e) {
      console.warn('AudioContext setup error:', e);
    }

    return () => {
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stream]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      let avgVolume = 0;

      if (analyserRef.current && isRecording) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        avgVolume = sum / dataArray.length / 255;
        onVolumeChange?.(avgVolume);

        const barCount = 28;
        const barWidth = width / barCount - 3;

        for (let i = 0; i < barCount; i++) {
          const index = Math.floor((i / barCount) * dataArray.length);
          const value = dataArray[index] / 255;
          const barHeight = Math.max(4, value * (height * 0.85));

          const x = i * (barWidth + 3);
          const y = height / 2 - barHeight / 2;

          // Gradient color depending on intensity
          const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
          grad.addColorStop(0, '#F59E0B'); // Amber
          grad.addColorStop(0.5, '#10B981'); // Emerald
          grad.addColorStop(1, '#06B6D4'); // Cyan

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 3);
          ctx.fill();
        }

        // Central glowing pulse
        const radius = 10 + avgVolume * 24;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${0.15 + avgVolume * 0.4})`;
        ctx.fill();
      } else {
        // Idle gentle waveform
        phase += 0.05;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);

        for (let x = 0; x < width; x += 3) {
          const y =
            height / 2 +
            Math.sin(x * 0.04 + phase) * 4 +
            Math.cos(x * 0.02 - phase) * 2;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording, onVolumeChange]);

  return (
    <div className="w-full relative flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={340}
        height={70}
        className="w-full max-w-[360px] h-[70px] rounded-xl bg-black/40 border border-white/[0.08]"
      />
    </div>
  );
};
