import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { VoiceId } from '../types';
import { VOICE_PROFILES } from '../data/scenariosData';
import { AudioEngine } from '../services/audioEngine';

interface WaveformVisualizerProps {
  transcript: string;
  progressPercent: number;
  isPlaying: boolean;
  activeSpeaker: VoiceId | null;
  playbackSpeed: number;
  onSeek?: (percent: number) => void;
  height?: number;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  transcript,
  progressPercent,
  isPlaying,
  activeSpeaker,
  playbackSpeed,
  onSeek,
  height = 92
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(600);
  const [hoverPercent, setHoverPercent] = useState<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  // Measure container responsive width
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(Math.floor(entry.contentRect.width));
        }
      }
    });

    observer.observe(el);
    setContainerWidth(el.clientWidth || 600);

    return () => observer.disconnect();
  }, []);

  // Compute deterministic waveform fingerprint and speaker markers from transcript
  const { baseAmplitudes, speakerMarkers, estimatedDurationSec } = useMemo(() => {
    const numBars = 72;
    const amps: number[] = [];

    // Parse transcript to get words and speaker shifts
    const words = transcript.split(/\s+/).filter(Boolean);
    const wordCount = words.length || 1;
    const duration = AudioEngine.getEstimatedDuration(transcript, playbackSpeed);

    // Extract speaker markers positions
    const markers: { voiceId: VoiceId; percent: number }[] = [];
    const markerRegex = /\[(F[1-5]|M[1-5])\]/g;
    let match: RegExpExecArray | null;
    while ((match = markerRegex.exec(transcript)) !== null) {
      const pos = match.index;
      const pct = Math.min(99, Math.max(1, Math.round((pos / Math.max(1, transcript.length)) * 100)));
      markers.push({ voiceId: match[1] as VoiceId, percent: pct });
    }

    // Generate natural acoustic wave envelope
    for (let i = 0; i < numBars; i++) {
      const t = i / numBars;
      // Word hash influence
      const wordIdx = Math.floor(t * wordCount);
      const word = words[wordIdx] || 'speech';
      const wordHash = word.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

      // Multi-frequency harmonic envelope (fundamental speech range)
      const envelope =
        0.35 +
        0.28 * Math.sin(t * Math.PI * 5) +
        0.18 * Math.sin(t * Math.PI * 13 + wordHash * 0.1) +
        0.12 * Math.cos(t * Math.PI * 27);

      // Speech rhythm pauses (punctuation dip)
      const hasPause = word.includes('.') || word.includes(',') || word.includes('?') || word.includes('!');
      const pauseModifier = hasPause ? 0.35 : 1.0;

      const normalized = Math.min(0.96, Math.max(0.12, envelope * pauseModifier));
      amps.push(normalized);
    }

    return {
      baseAmplitudes: amps,
      speakerMarkers: markers,
      estimatedDurationSec: duration
    };
  }, [transcript, playbackSpeed]);

  // Main D3 Rendering & Sync with Audio Progress
  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement || containerWidth <= 0) return;

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();

    const w = containerWidth;
    const h = height;
    const centerY = h / 2;
    const barsCount = baseAmplitudes.length;
    const barWidth = Math.max(2, (w / barsCount) * 0.65);
    const gap = (w - barWidth * barsCount) / Math.max(1, barsCount - 1);

    const activeColor = activeSpeaker && VOICE_PROFILES[activeSpeaker]
      ? VOICE_PROFILES[activeSpeaker].color
      : '#F97316';

    // Defs: Gradients and filters
    const defs = svg.append('defs');

    // Played gradient (active speaker / fiery accent)
    const activeGrad = defs
      .append('linearGradient')
      .attr('id', 'd3-active-waveform-grad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    activeGrad.append('stop').attr('offset', '0%').attr('stop-color', activeColor).attr('stop-opacity', 0.95);
    activeGrad.append('stop').attr('offset', '50%').attr('stop-color', '#FBBF24').attr('stop-opacity', 1);
    activeGrad.append('stop').attr('offset', '100%').attr('stop-color', activeColor).attr('stop-opacity', 0.4);

    // Unplayed gradient
    const inactiveGrad = defs
      .append('linearGradient')
      .attr('id', 'd3-inactive-waveform-grad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    inactiveGrad.append('stop').attr('offset', '0%').attr('stop-color', 'rgba(255, 255, 255, 0.22)');
    inactiveGrad.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(255, 255, 255, 0.05)');

    // Playhead glow filter
    const filter = defs.append('filter').attr('id', 'd3-needle-glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Background subtle grid lines
    const gridG = svg.append('g').attr('class', 'waveform-grid');
    gridG
      .append('line')
      .attr('x1', 0)
      .attr('y1', centerY)
      .attr('x2', w)
      .attr('y2', centerY)
      .attr('stroke', 'rgba(255, 255, 255, 0.08)')
      .attr('stroke-dasharray', '2,4');

    // Group for waveform bars
    const barsG = svg.append('g').attr('class', 'waveform-bars');

    // Render bars
    const playheadFraction = progressPercent / 100;
    const playheadX = playheadFraction * w;

    const barNodes = barsG
      .selectAll<SVGGElement, number>('g.bar-node')
      .data(baseAmplitudes)
      .enter()
      .append('g')
      .attr('class', 'bar-node')
      .attr('transform', (_, i) => `translate(${i * (barWidth + gap)}, 0)`);

    // Top amplitude bar
    barNodes
      .append('rect')
      .attr('class', 'bar-top')
      .attr('x', 0)
      .attr('width', barWidth)
      .attr('rx', 1.5)
      .attr('y', (d: number) => centerY - d * (centerY - 8))
      .attr('height', (d: number) => d * (centerY - 8))
      .attr('fill', (_, i) => {
        const barPct = i / barsCount;
        return barPct <= playheadFraction ? 'url(#d3-active-waveform-grad)' : 'url(#d3-inactive-waveform-grad)';
      });

    // Bottom reflected amplitude bar
    barNodes
      .append('rect')
      .attr('class', 'bar-bot')
      .attr('x', 0)
      .attr('width', barWidth)
      .attr('rx', 1.5)
      .attr('y', centerY + 2)
      .attr('height', (d: number) => d * (centerY - 12) * 0.45)
      .attr('fill', (_, i) => {
        const barPct = i / barsCount;
        return barPct <= playheadFraction ? activeColor : 'rgba(255, 255, 255, 0.08)';
      })
      .attr('opacity', (_, i) => {
        const barPct = i / barsCount;
        return barPct <= playheadFraction ? 0.6 : 0.3;
      });

    // Smooth spline envelope curve for played section
    const playedBars = baseAmplitudes.filter((_, i) => i / barsCount <= playheadFraction);
    if (playedBars.length > 2) {
      const lineData: [number, number][] = playedBars.map((d, i) => [
        i * (barWidth + gap) + barWidth / 2,
        centerY - d * (centerY - 8)
      ]);

      const lineGen = d3
        .line<[number, number]>()
        .x((d) => d[0])
        .y((d) => d[1])
        .curve(d3.curveBasis);

      svg
        .append('path')
        .datum(lineData)
        .attr('fill', 'none')
        .attr('stroke', activeColor)
        .attr('stroke-width', 1.5)
        .attr('stroke-linecap', 'round')
        .attr('opacity', 0.55)
        .attr('filter', 'url(#d3-needle-glow)');
    }

    // Speaker transition markers along timeline
    const markersG = svg.append('g').attr('class', 'speaker-markers');
    speakerMarkers.forEach((sm) => {
      const markerX = (sm.percent / 100) * w;
      const prof = VOICE_PROFILES[sm.voiceId];
      if (!prof) return;

      const g = markersG.append('g').attr('transform', `translate(${markerX}, 4)`);

      g.append('circle')
        .attr('r', 2.5)
        .attr('fill', prof.color)
        .attr('opacity', 0.85);

      g.append('text')
        .attr('y', -3)
        .attr('text-anchor', 'middle')
        .attr('font-size', '7px')
        .attr('font-family', 'monospace')
        .attr('font-weight', 'bold')
        .attr('fill', prof.color)
        .attr('opacity', 0.8)
        .text(sm.voiceId);
    });

    // Playhead Line & Cursor
    const playheadG = svg.append('g').attr('class', 'playhead-group');

    // Vertical luminous laser line
    playheadG
      .append('line')
      .attr('x1', playheadX)
      .attr('y1', 0)
      .attr('x2', playheadX)
      .attr('y2', h)
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 1.8)
      .attr('filter', 'url(#d3-needle-glow)');

    // Top bead / diamond cursor
    playheadG
      .append('circle')
      .attr('cx', playheadX)
      .attr('cy', centerY)
      .attr('r', isPlaying ? 4.5 : 3.5)
      .attr('fill', activeColor)
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 1.5)
      .attr('filter', 'url(#d3-needle-glow)');

    // Hover Scrubbing Line
    if (hoverPercent !== null) {
      const hoverX = (hoverPercent / 100) * w;
      const hoverG = svg.append('g').attr('class', 'hover-guide');

      hoverG
        .append('line')
        .attr('x1', hoverX)
        .attr('y1', 0)
        .attr('x2', hoverX)
        .attr('y2', h)
        .attr('stroke', 'rgba(255, 255, 255, 0.4)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2,2');

      // Hover tooltip pill
      const hoverTimeSec = (hoverPercent / 100) * estimatedDurationSec;
      const mins = Math.floor(hoverTimeSec / 60);
      const secs = Math.floor(hoverTimeSec % 60);
      const timeStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

      const tooltipG = hoverG.append('g').attr('transform', `translate(${Math.max(24, Math.min(w - 24, hoverX))}, 14)`);

      tooltipG
        .append('rect')
        .attr('x', -22)
        .attr('y', -10)
        .attr('width', 44)
        .attr('height', 16)
        .attr('rx', 4)
        .attr('fill', '#1F2937')
        .attr('stroke', 'rgba(255,255,255,0.2)');

      tooltipG
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 2)
        .attr('font-size', '9px')
        .attr('font-family', 'monospace')
        .attr('fill', '#F3F4F6')
        .text(timeStr);
    }
  }, [baseAmplitudes, containerWidth, height, progressPercent, activeSpeaker, isPlaying, speakerMarkers, hoverPercent, estimatedDurationSec]);

  // Real-time animation loop when audio is playing
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const svgElement = svgRef.current;
    if (!svgElement) return;

    const animateWave = () => {
      phaseRef.current += 0.08;
      const svg = d3.select(svgElement);
      const barsCount = baseAmplitudes.length;
      const activeIdx = Math.floor((progressPercent / 100) * barsCount);

      // Modulate bars around active playhead with natural acoustic oscillation
      svg.selectAll<SVGRectElement, number>('rect.bar-top').each(function (_, i) {
        const el = d3.select(this);
        const dist = Math.abs(i - activeIdx);
        const base = baseAmplitudes[i] || 0.4;
        const centerY = height / 2;

        if (dist <= 7) {
          const intensity = Math.max(0, 1 - dist / 7);
          const oscillation = Math.sin(phaseRef.current + i * 0.75) * 0.25 * intensity;
          const dynamicHeight = Math.min(0.98, Math.max(0.1, base + oscillation)) * (centerY - 8);
          el.attr('y', centerY - dynamicHeight).attr('height', dynamicHeight);
        } else {
          const standardHeight = base * (centerY - 8);
          el.attr('y', centerY - standardHeight).attr('height', standardHeight);
        }
      });

      animationFrameRef.current = requestAnimationFrame(animateWave);
    };

    animationFrameRef.current = requestAnimationFrame(animateWave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, progressPercent, baseAmplitudes, height]);

  // Handle click / seek on waveform
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onSeek) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
    onSeek(pct);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (curX / rect.width) * 100));
    setHoverPercent(pct);
  };

  const handleMouseLeave = () => {
    setHoverPercent(null);
  };

  // Formatted Current Time & Duration Readout
  const currentSec = (progressPercent / 100) * estimatedDurationSec;
  const curMins = Math.floor(currentSec / 60);
  const curSecs = Math.floor(currentSec % 60);
  const totalMins = Math.floor(estimatedDurationSec / 60);
  const totalSecs = Math.floor(estimatedDurationSec % 60);

  return (
    <div ref={containerRef} className="w-full space-y-1.5 select-none">
      {/* Waveform Canvas */}
      <div className="relative rounded-xl bg-black/40 border border-white/[0.07] p-2 overflow-hidden shadow-inner group">
        <svg
          ref={svgRef}
          width="100%"
          height={height}
          onClick={handleSvgClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer block overflow-visible"
          role="img"
          aria-label="Interactive real-time audio waveform"
        />

        {/* Dynamic Acoustic Spectrum Badge */}
        <div className="absolute top-2 right-3 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[9px] font-mono text-white/50 backdrop-blur-sm">
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'}`} />
          <span>{isPlaying ? 'D3 Signal: 44.1kHz Live' : 'D3 Spectrogram Ready'}</span>
        </div>
      </div>

      {/* Time & Scrub Metadata Bar */}
      <div className="flex items-center justify-between text-[10px] font-mono text-white/40 px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-white/80 font-bold">
            {curMins}:{curSecs < 10 ? '0' : ''}{curSecs}
          </span>
          <span>/</span>
          <span>
            {totalMins}:{totalSecs < 10 ? '0' : ''}{totalSecs}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-white/30 hidden sm:inline">Click waveform to scrub</span>
        </div>

        <div className="flex items-center gap-2">
          {activeSpeaker && (
            <span
              className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold"
              style={{
                backgroundColor: `${VOICE_PROFILES[activeSpeaker]?.color || '#F97316'}22`,
                color: VOICE_PROFILES[activeSpeaker]?.color || '#F97316'
              }}
            >
              Speaker {activeSpeaker}
            </span>
          )}
          <span>{progressPercent}%</span>
        </div>
      </div>
    </div>
  );
};
