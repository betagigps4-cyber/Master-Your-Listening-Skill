import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  Download,
  Printer,
  Upload,
  Check,
  FileText,
  ShieldCheck,
  Calendar,
  Award,
  BookOpen
} from 'lucide-react';
import { AttemptRecord, StudentProfile } from '../types';
import { StorageService } from '../services/storageService';
import { AdaptiveEngine } from '../services/adaptiveEngine';
import { MissedWordsService } from '../services/missedWordsService';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  attempts: AttemptRecord[];
  onDataImported?: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  student,
  attempts,
  onDataImported
}) => {
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportCSV = () => {
    const csvContent = StorageService.exportToCSV(attempts);
    const fileName = `ListenMaster_Progress_Report_${student.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
    StorageService.triggerDownload(csvContent, fileName, 'text/csv;charset=utf-8;');
  };

  const handleExportFlashcardsCSV = () => {
    const flashcards = MissedWordsService.getMissedWordsFlashcards(student, attempts);
    MissedWordsService.downloadStudyFlashcardsCSV(student, flashcards);
  };

  const handleExportJSON = () => {
    const jsonContent = StorageService.exportFullBackupJSON();
    const fileName = `ListenMaster_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    StorageService.triggerDownload(jsonContent, fileName, 'application/json;charset=utf-8;');
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const success = StorageService.importBackupJSON(text);
        if (success) {
          setImportStatus('Data imported successfully!');
          onDataImported?.();
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('Import failed. Invalid JSON format.');
        }
      } catch (err) {
        setImportStatus('Error reading file.');
      }
    };
    reader.readAsText(file);
  };

  const cefr = AdaptiveEngine.getCefrLevel(student.adaptiveRating);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0F1218] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-grotesk">Export Progress Reports</h2>
              <p className="text-xs text-white/40">Official Assessment Summary & Raw Attempt Data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Report Overview Card */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[9px] font-mono uppercase text-white/40 tracking-wider">Candidate</span>
              <h3 className="text-lg font-bold text-white">{student.name}</h3>
              <p className="text-xs text-white/40 font-mono">{student.email}</p>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono uppercase text-white/40 tracking-wider">CEFR Rating</span>
              <div className="text-xl font-bold text-amber-400 font-mono">
                {student.adaptiveRating} ({cefr.code})
              </div>
              <p className="text-[10px] text-white/40">{cefr.label}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.05] text-center font-mono text-xs">
            <div className="p-2 rounded-lg bg-black/20">
              <div className="text-[9px] text-white/30 uppercase">Accuracy</div>
              <div className="font-bold text-emerald-400">{student.averageAccuracy}%</div>
            </div>
            <div className="p-2 rounded-lg bg-black/20">
              <div className="text-[9px] text-white/30 uppercase">Recorded Attempts</div>
              <div className="font-bold text-white">{attempts.length}</div>
            </div>
            <div className="p-2 rounded-lg bg-black/20">
              <div className="text-[9px] text-white/30 uppercase">Listening Time</div>
              <div className="font-bold text-cyan-400">
                {Math.round(student.totalListeningSeconds / 60)}m
              </div>
            </div>
          </div>
        </div>

        {/* Export Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* CSV Download */}
          <button
            onClick={handleExportCSV}
            className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-mono uppercase text-white/30">.CSV Spreadsheet</span>
              </div>
              <h4 className="font-bold text-sm text-white">Download CSV Report</h4>
              <p className="text-xs text-white/40 mt-1">
                Full logs of every question, audio replays used, accuracy percent, and time elapsed.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-emerald-400 font-mono font-medium">
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </div>
          </button>

          {/* Study Flashcards CSV */}
          <button
            onClick={handleExportFlashcardsCSV}
            className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] hover:bg-amber-500/[0.08] text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span className="text-[10px] font-mono uppercase text-amber-300/60">Anki / Quizlet CSV</span>
              </div>
              <h4 className="font-bold text-sm text-white">Download Study Flashcards (CSV)</h4>
              <p className="text-xs text-white/40 mt-1">
                Aggregated frequently missed words, acoustic phonetic traps, audio context quotes, and shadowing drills.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-amber-400 font-mono font-medium">
              <Download className="w-3.5 h-3.5" />
              <span>Export Flashcard Deck (.CSV)</span>
            </div>
          </button>

          {/* Printable PDF Report */}
          <button
            onClick={handlePrintReport}
            className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <Printer className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px] font-mono uppercase text-white/30">Print / PDF</span>
              </div>
              <h4 className="font-bold text-sm text-white">Print Formal Progress Sheet</h4>
              <p className="text-xs text-white/40 mt-1">
                Clean, formatted printable assessment report suitable for teachers, tutors, and student portfolios.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-cyan-400 font-mono font-medium">
              <Printer className="w-3.5 h-3.5" />
              <span>Print to PDF</span>
            </div>
          </button>

          {/* JSON Full Backup */}
          <button
            onClick={handleExportJSON}
            className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-5 h-5 text-orange-400" />
                <span className="text-[10px] font-mono uppercase text-white/30">.JSON Database</span>
              </div>
              <h4 className="font-bold text-sm text-white">Export Full JSON Backup</h4>
              <p className="text-xs text-white/40 mt-1">
                Raw JSON snapshot to migrate student performance state to other devices or browsers.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-orange-400 font-mono font-medium">
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </div>
          </button>

          {/* Restore JSON */}
          <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Upload className="w-5 h-5 text-violet-400" />
                <span className="text-[10px] font-mono uppercase text-white/30">Restore</span>
              </div>
              <h4 className="font-bold text-sm text-white">Import JSON Archive</h4>
              <p className="text-xs text-white/40 mt-1">
                Upload a previous ListenMaster backup file to restore historic scores and cohort state.
              </p>
            </div>
            <label className="mt-4 inline-flex items-center gap-1 text-xs text-violet-400 font-mono font-medium cursor-pointer hover:underline">
              <Upload className="w-3.5 h-3.5" />
              <span>Select File</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
            {importStatus && <p className="text-[10px] font-mono text-emerald-400 mt-1">{importStatus}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
