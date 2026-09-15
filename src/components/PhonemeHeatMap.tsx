import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Volume2, AlertTriangle, Sparkles, Filter, ChevronRight, CheckCircle, Info, Ear } from 'lucide-react';
import { AttemptRecord, ProblemAreaMetric } from '../types';
import { ProblemAreaAnalyticsService, HeatMapCell } from '../services/problemAreaAnalyticsService';
import { AudioEngine } from '../services/audioEngine';

interface PhonemeHeatMapProps {
  attempts: AttemptRecord[];
  onLaunchPhonemeDrills?: (problemAreaKey?: string) => void;
}

export const PhonemeHeatMap: React.FC<PhonemeHeatMapProps> = ({ attempts, onLaunchPhonemeDrills }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeFilter, setActiveFilter] = useState<'all' | 'phoneme' | 'word-type'>('all');
  const [selectedCell, setSelectedCell] = useState<HeatMapCell | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ cell: HeatMapCell; x: number; y: number } | null>(null);

  const { rows, cols, cells } = useMemo(() => {
    return ProblemAreaAnalyticsService.getHeatMapGrid(attempts);
  }, [attempts]);

  const filteredRows = useMemo(() => {
    if (activeFilter === 'all') return rows;
    return rows.filter(r => r.category === activeFilter);
  }, [rows, activeFilter]);

  const filteredCells = useMemo(() => {
    const rowKeys = new Set(filteredRows.map(r => r.key));
    return cells.filter(c => rowKeys.has(c.rowKey));
  }, [cells, filteredRows]);

  // Top Critical Areas
  const topCritical = useMemo(() => {
    const metrics = ProblemAreaAnalyticsService.getProblemAreaMetrics(attempts);
    return [...metrics].sort((a, b) => b.errorRatePct - a.errorRatePct).slice(0, 2);
  }, [attempts]);

  // Color generator for heatmap cells
  const getColor = (rate: number): string => {
    if (rate >= 65) return '#e11d48'; // Critical rose
    if (rate >= 45) return '#f97316'; // High orange
    if (rate >= 28) return '#eab308'; // Moderate amber
    return '#10b981'; // Low emerald
  };

  const getCellBg = (rate: number): string => {
    if (rate >= 65) return 'rgba(225, 29, 72, 0.45)';
    if (rate >= 45) return 'rgba(249, 115, 22, 0.35)';
    if (rate >= 28) return 'rgba(234, 179, 8, 0.25)';
    return 'rgba(16, 185, 129, 0.18)';
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth || 700;
    const margin = { top: 38, right: 30, bottom: 25, left: 190 };
    const width = Math.max(560, containerWidth) - margin.left - margin.right;
    const cellHeight = 36;
    const height = filteredRows.length * cellHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale
    const xScale = d3
      .scaleBand()
      .domain(cols.map(c => c.key))
      .range([0, width])
      .padding(0.08);

    // Y Scale
    const yScale = d3
      .scaleBand()
      .domain(filteredRows.map(r => r.key))
      .range([0, height])
      .padding(0.12);

    // Draw Column Headers (CEFR bands)
    const headerG = g.append('g').attr('class', 'x-headers');
    cols.forEach(c => {
      const x = (xScale(c.key) || 0) + xScale.bandwidth() / 2;
      headerG
        .append('text')
        .attr('x', x)
        .attr('y', -18)
        .attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8')
        .attr('font-family', 'ui-monospace, monospace')
        .attr('font-size', '10px')
        .attr('font-weight', '600')
        .text(c.label);

      headerG
        .append('text')
        .attr('x', x)
        .attr('y', -4)
        .attr('text-anchor', 'middle')
        .attr('fill', '#f59e0b')
        .attr('font-family', 'ui-monospace, monospace')
        .attr('font-size', '9px')
        .text(c.cefr);
    });

    // Draw Row Labels (Phonemes / Word Types)
    const rowG = g.append('g').attr('class', 'y-labels');
    filteredRows.forEach(r => {
      const y = (yScale(r.key) || 0) + yScale.bandwidth() / 2;

      // Symbol tag
      if (r.symbol) {
        rowG
          .append('text')
          .attr('x', -12)
          .attr('y', y + 4)
          .attr('text-anchor', 'end')
          .attr('fill', '#38bdf8')
          .attr('font-family', 'ui-monospace, monospace')
          .attr('font-size', '11px')
          .attr('font-weight', 'bold')
          .text(r.symbol);

        rowG
          .append('text')
          .attr('x', -55)
          .attr('y', y + 4)
          .attr('text-anchor', 'end')
          .attr('fill', '#e2e8f0')
          .attr('font-size', '11px')
          .attr('font-weight', '500')
          .text(r.label.length > 15 ? r.label.slice(0, 14) + '…' : r.label);
      } else {
        rowG
          .append('text')
          .attr('x', -12)
          .attr('y', y + 4)
          .attr('text-anchor', 'end')
          .attr('fill', '#e2e8f0')
          .attr('font-size', '11px')
          .attr('font-weight', '500')
          .text(r.label.length > 20 ? r.label.slice(0, 19) + '…' : r.label);
      }
    });

    // Draw Heat Map Cells
    const cellGroups = g
      .selectAll<SVGGElement, HeatMapCell>('.cell')
      .data(filteredCells)
      .enter()
      .append('g')
      .attr('class', 'cell')
      .attr('transform', (d: HeatMapCell) => `translate(${xScale(d.colKey)},${yScale(d.rowKey)})`)
      .style('cursor', 'pointer')
      .on('mouseenter', (event, d: HeatMapCell) => {
        const [x, y] = d3.pointer(event, containerRef.current);
        setHoveredCell({ cell: d, x, y });
      })
      .on('mouseleave', () => {
        setHoveredCell(null);
      })
      .on('click', (_event, d: HeatMapCell) => {
        setSelectedCell(d);
      });

    // Cell Background Rect
    cellGroups
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('rx', 6)
      .attr('fill', (d: HeatMapCell) => getCellBg(d.errorRate))
      .attr('stroke', (d: HeatMapCell) => getColor(d.errorRate))
      .attr('stroke-width', (d: HeatMapCell) => (selectedCell?.rowKey === d.rowKey && selectedCell?.colKey === d.colKey ? 2 : 1))
      .attr('stroke-opacity', 0.6)
      .style('transition', 'all 0.2s ease');

    // Cell Text: Error Percentage
    cellGroups
      .append('text')
      .attr('x', xScale.bandwidth() / 2)
      .attr('y', yScale.bandwidth() / 2 + 3.5)
      .attr('text-anchor', 'middle')
      .attr('fill', (d: HeatMapCell) => (d.errorRate > 50 ? '#ffffff' : '#f8fafc'))
      .attr('font-family', 'ui-monospace, monospace')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text((d: HeatMapCell) => `${d.errorRate}%`);

  }, [filteredRows, filteredCells, cols, selectedCell]);

  const handlePlaySample = (text: string) => {
    AudioEngine.speakSnippet(text, undefined, 'F1', 0.9);
  };

  return (
    <div className="rounded-3xl p-6 sm:p-8 border border-white/[0.08] bg-gradient-to-br from-[#11141D] to-[#0A0C11] space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            Acoustic Decoding Diagnostic Heat Map
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-grotesk tracking-tight">
            Problem Area Phonemes & Word Types
          </h2>
          <p className="text-xs sm:text-sm text-white/50 max-w-2xl">
            D3-powered matrix mapping error frequency and cognitive distractor vulnerability across CEFR difficulty bands from completed listening attempts.
          </p>
        </div>

        {/* View Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/10 shrink-0 self-start lg:self-center">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              activeFilter === 'all'
                ? 'bg-white/15 text-white font-bold shadow'
                : 'text-white/40 hover:text-white'
            }`}
          >
            All Areas ({rows.length})
          </button>
          <button
            onClick={() => setActiveFilter('phoneme')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              activeFilter === 'phoneme'
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30 shadow'
                : 'text-white/40 hover:text-white'
            }`}
          >
            Phonemes ({rows.filter(r => r.category === 'phoneme').length})
          </button>
          <button
            onClick={() => setActiveFilter('word-type')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              activeFilter === 'word-type'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 shadow'
                : 'text-white/40 hover:text-white'
            }`}
          >
            Word Types & Traps ({rows.filter(r => r.category === 'word-type').length})
          </button>
        </div>
      </div>

      {/* Top Acute Blindspots Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {topCritical.map((item, idx) => (
          <div
            key={item.key}
            className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 flex items-start gap-3.5 relative overflow-hidden"
          >
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 font-mono font-bold text-sm shrink-0">
              {item.phonemeSymbol || `#${idx + 1}`}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{item.label}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                  {item.errorRatePct}% Failure Rate
                </span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed">{item.diagnosticNote}</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[9px] font-mono text-white/40 uppercase">Frequent Traps:</span>
                {item.sampleWords.slice(0, 3).map((w, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/80 border border-white/10"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* D3 Heat Map Canvas */}
      <div ref={containerRef} className="relative overflow-x-auto pt-2 pb-2">
        <svg ref={svgRef} className="mx-auto block" />

        {/* Interactive Hover Tooltip */}
        {hoveredCell && (
          <div
            className="pointer-events-none absolute z-30 p-3.5 rounded-xl bg-[#0F131C] border border-white/20 shadow-2xl text-xs space-y-2 max-w-xs anim-fade"
            style={{
              left: Math.min(window.innerWidth - 300, hoveredCell.x + 15),
              top: Math.max(10, hoveredCell.y - 70)
            }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5">
              <span className="font-bold text-white">{hoveredCell.cell.rowLabel}</span>
              <span
                className="font-mono text-[10px] px-1.5 py-0.5 rounded font-bold"
                style={{
                  color: getColor(hoveredCell.cell.errorRate),
                  backgroundColor: getCellBg(hoveredCell.cell.errorRate)
                }}
              >
                {hoveredCell.cell.errorRate}% Misinterpreted
              </span>
            </div>
            <p className="text-[11px] text-white/50 font-mono">{hoveredCell.cell.colLabel}</p>
            <p className="text-[11px] text-white/80 leading-snug">{hoveredCell.cell.diagnosticTip}</p>
            <div className="pt-1 flex flex-wrap gap-1">
              {hoveredCell.cell.sampleWords.map((w, i) => (
                <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-sky-300">
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Heat Map Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-2 text-white/50">
          <Info className="w-3.5 h-3.5 text-white/40" />
          <span>Click any cell for guided phonetic drill & audio playback</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] text-white/40 uppercase">Problem Intensity:</span>
          <div className="flex items-center gap-3 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500/25 border border-emerald-500" />
              <span className="text-emerald-400">Low (&lt;25%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500" />
              <span className="text-amber-400">Moderate (25-45%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-orange-500/40 border border-orange-500" />
              <span className="text-orange-400">High (45-65%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-500/50 border border-rose-500" />
              <span className="text-rose-400">Critical (&gt;65%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cell Detailed Inspector Drawer Modal */}
      {selectedCell && (
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 anim-fade">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-white/40 uppercase">Diagnostic Drill</span>
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
                  style={{
                    color: getColor(selectedCell.errorRate),
                    backgroundColor: getCellBg(selectedCell.errorRate)
                  }}
                >
                  {selectedCell.errorRate}% Error Rate • {selectedCell.colLabel}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">{selectedCell.rowLabel}</h3>
            </div>

            <button
              onClick={() => setSelectedCell(null)}
              className="text-white/40 hover:text-white text-xs font-mono px-2 py-1 rounded bg-white/5"
            >
              Close
            </button>
          </div>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{selectedCell.diagnosticTip}</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/40 uppercase">Target Scenario Vocabulary & Audio Samples</span>
              {onLaunchPhonemeDrills && (
                <button
                  onClick={() => onLaunchPhonemeDrills(selectedCell.rowKey)}
                  className="px-3 py-1 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-300 font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Ear className="w-3.5 h-3.5" />
                  <span>Launch High-Rep Phoneme Drill</span>
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCell.sampleWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePlaySample(word)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                  title="Click to hear speech synthesis pronunciation"
                >
                  <Volume2 className="w-3.5 h-3.5 text-orange-400" />
                  <span className="font-mono font-semibold">{word}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
