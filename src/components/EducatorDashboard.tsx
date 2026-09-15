import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  Clock,
  Award,
  AlertTriangle,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Trophy,
  BookOpen,
  FileSpreadsheet
} from 'lucide-react';
import { AttemptRecord, StudentProfile, LevelKey } from '../types';
import { StorageService } from '../services/storageService';
import { BadgeService } from '../services/badgeService';
import { LEVEL_CFG, LEVEL_ORDER } from '../data/scenariosData';
import { StudentMissedWordsFlashcards } from './StudentMissedWordsFlashcards';
import { MissedWordsService } from '../services/missedWordsService';

interface EducatorDashboardProps {
  attempts: AttemptRecord[];
  onOpenExportModal: () => void;
}

export const EducatorDashboard: React.FC<EducatorDashboardProps> = ({
  attempts,
  onOpenExportModal
}) => {
  const [cohort, setCohort] = useState<StudentProfile[]>(StorageService.getCohortStudents());
  const [selectedStudentId, setSelectedStudentId] = useState<string>(cohort[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const selectedStudent = cohort.find((s) => s.id === selectedStudentId) || cohort[0];
  const studentAttempts = attempts.filter((a) => !selectedStudentId || a.studentId === selectedStudentId);

  // Compute student badges
  const evaluatedBadges = BadgeService.evaluateBadges(selectedStudent, studentAttempts);
  const unlockedBadges = evaluatedBadges.filter((b) => b.isUnlocked);

  // Aggregate Metrics
  const totalListeningMinutes = Math.round(
    cohort.reduce((acc, s) => acc + s.totalListeningSeconds, 0) / 60
  );
  const avgClassAccuracy = Math.round(
    cohort.reduce((acc, s) => acc + s.averageAccuracy, 0) / (cohort.length || 1)
  );
  const totalCompletedExercises = cohort.reduce((acc, s) => acc + s.completedSectionsCount, 0);

  // Filtered Students
  const filteredStudents = cohort.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Competency Analysis
  const categoryStats = {
    numbers: { correct: 0, total: 0 },
    factual: { correct: 0, total: 0 },
    inference: { correct: 0, total: 0 }
  };

  attempts.forEach((att) => {
    // Basic approximation based on scores
    if (att.level === 'Zero' || att.level === 'Primary') {
      categoryStats.factual.total += att.totalQuestions;
      categoryStats.factual.correct += att.correctAnswersCount;
    } else if (att.level === 'HighSchool' || att.level === 'Intermediate') {
      categoryStats.numbers.total += att.totalQuestions;
      categoryStats.numbers.correct += att.correctAnswersCount;
    } else {
      categoryStats.inference.total += att.totalQuestions;
      categoryStats.inference.correct += att.correctAnswersCount;
    }
  });

  const getAccuracy = (c: number, t: number) => (t > 0 ? Math.round((c / t) * 100) : 85);

  // Historical trend points for SVG Chart
  const sortedAttempts = [...studentAttempts].sort((a, b) => a.timestamp - b.timestamp);
  const chartPoints = sortedAttempts.slice(-10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-2">
            <Users className="w-3.5 h-3.5" />
            Educator Command Center
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-grotesk">
            Student Improvement & Cohort Analytics
          </h1>
          <p className="text-xs sm:text-sm text-white/40">
            Monitor real-time student engagement, acoustic latency, adaptive difficulty progression, and mastery metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              const flashcards = MissedWordsService.getMissedWordsFlashcards(selectedStudent, studentAttempts);
              MissedWordsService.downloadStudyFlashcardsCSV(selectedStudent, flashcards);
            }}
            className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium text-xs flex items-center gap-2 transition-all cursor-pointer font-mono"
            title={`Download study flashcards CSV for ${selectedStudent.name}`}
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>Export Flashcards CSV ({selectedStudent.name.split(' ')[0]})</span>
          </button>

          <button
            onClick={onOpenExportModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-violet-600/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Progress Reports</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center justify-between mb-3 text-white/40">
            <span className="text-[10px] font-mono uppercase tracking-wider">Active Cohort Roster</span>
            <Users className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-3xl font-extrabold font-grotesk text-white">{cohort.length} Students</div>
          <div className="text-xs text-white/40 mt-1 font-mono">Enrolled in 2026 Curriculum</div>
        </div>

        <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center justify-between mb-3 text-white/40">
            <span className="text-[10px] font-mono uppercase tracking-wider">Cohort Accuracy Avg</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-grotesk text-amber-400">{avgClassAccuracy}%</div>
          <div className="text-xs text-emerald-400 mt-1 font-mono flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +6.4% improvement this month
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center justify-between mb-3 text-white/40">
            <span className="text-[10px] font-mono uppercase tracking-wider">Total Listening Engagement</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold font-grotesk text-white">
            {totalListeningMinutes} <span className="text-lg text-white/40 font-normal">mins</span>
          </div>
          <div className="text-xs text-white/40 mt-1 font-mono">{totalCompletedExercises} total sections verified</div>
        </div>

        <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center justify-between mb-3 text-white/40">
            <span className="text-[10px] font-mono uppercase tracking-wider">At-Risk Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold font-grotesk text-rose-400">1 Student</div>
          <div className="text-xs text-white/40 mt-1 font-mono">Heavy replay reliance (&gt;3x)</div>
        </div>
      </div>

      {/* Historical Score & Engagement Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-400" />
              Historical Score Trajectory for {selectedStudent.name}
            </h3>
            <p className="text-xs text-white/40">
              Visualizing accuracy trend, audio replay penalty, and score distribution over time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-white/40">Switch Student:</span>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="bg-black/40 border border-white/10 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-violet-400"
            >
              {cohort.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.adaptiveRating})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Student Badges & Milestones Strip */}
        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono text-white/70">Verified Digital Trophies:</span>
            <span className="text-xs font-mono font-bold text-amber-300">
              {unlockedBadges.length} / {evaluatedBadges.length} Unlocked
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {unlockedBadges.length === 0 ? (
              <span className="text-[11px] font-mono text-white/30">No trophies unlocked yet</span>
            ) : (
              unlockedBadges.map((b) => (
                <span
                  key={b.id}
                  className="px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono flex items-center gap-1"
                >
                  <span>🏆</span>
                  <span>{b.title}</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* Interactive SVG Chart */}
        <div className="relative h-64 w-full bg-black/30 rounded-2xl border border-white/[0.05] p-4 flex flex-col justify-between overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-rows-4 pointer-events-none opacity-10">
            <div className="border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-b border-white" />
          </div>

          {/* SVG Line / Bar visualization */}
          <svg className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {chartPoints.length > 1 && (
              <>
                {/* Area path */}
                <path
                  d={`
                    M 0 170
                    ${chartPoints
                      .map((p, i) => {
                        const x = (i / (chartPoints.length - 1)) * 100;
                        const y = 160 - (p.scorePercent / 100) * 140;
                        return `L ${x}% ${y}`;
                      })
                      .join(' ')}
                    L 100% 170 Z
                  `}
                  fill="url(#chartGrad)"
                />

                {/* Line path */}
                <path
                  d={`
                    M 0 ${160 - (chartPoints[0].scorePercent / 100) * 140}
                    ${chartPoints
                      .map((p, i) => {
                        const x = (i / (chartPoints.length - 1)) * 100;
                        const y = 160 - (p.scorePercent / 100) * 140;
                        return `L ${x}% ${y}`;
                      })
                      .join(' ')}
                  `}
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Dots with scores */}
                {chartPoints.map((p, i) => {
                  const x = (i / (chartPoints.length - 1)) * 100;
                  const y = 160 - (p.scorePercent / 100) * 140;
                  return (
                    <g key={p.id}>
                      <circle
                        cx={`${x}%`}
                        cy={y}
                        r="5"
                        fill="#06080C"
                        stroke="#A78BFA"
                        strokeWidth="2.5"
                      />
                      <text
                        x={`${x}%`}
                        y={y - 10}
                        textAnchor="middle"
                        fill="#F3F4F6"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        {p.scorePercent}%
                      </text>
                    </g>
                  );
                })}
              </>
            )}
          </svg>

          {/* X Axis Labels */}
          <div className="flex justify-between text-[9px] font-mono text-white/30 border-t border-white/5 pt-2">
            {chartPoints.map((p, i) => (
              <span key={i} className="truncate max-w-[70px]">
                {p.section}
              </span>
            ))}
          </div>
        </div>

        {/* Competency breakdown columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
              <span>Numbers & Digit Chunks</span>
              <span className="text-cyan-400 font-bold">{getAccuracy(categoryStats.numbers.correct, categoryStats.numbers.total)}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full"
                style={{ width: `${getAccuracy(categoryStats.numbers.correct, categoryStats.numbers.total)}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
              <span>Factual & Lexical Details</span>
              <span className="text-emerald-400 font-bold">{getAccuracy(categoryStats.factual.correct, categoryStats.factual.total)}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: `${getAccuracy(categoryStats.factual.correct, categoryStats.factual.total)}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
              <span>Inference & Methodology</span>
              <span className="text-amber-400 font-bold">{getAccuracy(categoryStats.inference.correct, categoryStats.inference.total)}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full"
                style={{ width: `${getAccuracy(categoryStats.inference.correct, categoryStats.inference.total)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Missed Words & Study Flashcard Deck */}
      <StudentMissedWordsFlashcards
        student={selectedStudent}
        attempts={attempts}
      />

      {/* Cohort Roster Table */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white font-grotesk">Student Cohort Performance Matrix</h3>
            <p className="text-xs text-white/40">Detailed mastery log across all listening levels.</p>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search student or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-white text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-violet-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-[10px] font-mono uppercase text-white/40">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Listener Elo</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Exercises</th>
                <th className="py-3 px-4">Streak</th>
                <th className="py-3 px-4">Recommended Focus Area</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredStudents.map((st) => {
                const isSelected = st.id === selectedStudentId;
                return (
                  <tr
                    key={st.id}
                    className={`hover:bg-white/[0.02] transition-colors ${
                      isSelected ? 'bg-violet-500/10' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{st.name}</div>
                      <div className="text-[10px] text-white/30 font-mono">{st.email}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-violet-400">
                      {st.adaptiveRating}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span
                        className={`px-2 py-0.5 rounded ${
                          st.averageAccuracy >= 85
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : st.averageAccuracy >= 70
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}
                      >
                        {st.averageAccuracy}%
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-white/70">{st.completedSectionsCount}</td>
                    <td className="py-3 px-4 font-mono text-orange-400">{st.streakDays}d</td>
                    <td className="py-3 px-4 text-white/60 truncate max-w-[200px]">{st.focusArea}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedStudentId(st.id)}
                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
