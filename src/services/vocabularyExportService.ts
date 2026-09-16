import { SavedWordItem } from '../types';

export class VocabularyExportService {
  /**
   * Generates and downloads a well-formatted CSV file of saved words
   */
  static exportToCSV(words: SavedWordItem[], filename: string = 'lexical-vault-vocabulary.csv'): void {
    if (!words || words.length === 0) return;

    const headers = [
      'Word',
      'Phonetic IPA',
      'Part of Speech',
      'CEFR Level',
      'Definition',
      'Simple Definition',
      'Advanced Definition',
      'Contextual Synonyms',
      'Etymology & Origin',
      'Scenario Source',
      'In-Context Scenario Snippet',
      'Example Sentence',
      'Acoustic Listening Tip',
      'Saved Date'
    ];

    const escapeCSV = (field?: string): string => {
      if (!field) return '""';
      const clean = field.replace(/"/g, '""').replace(/\r?\n/g, ' ');
      return `"${clean}"`;
    };

    const rows = words.map((w) => {
      return [
        escapeCSV(w.word),
        escapeCSV(w.phonetic),
        escapeCSV(w.partOfSpeech),
        escapeCSV(w.cefrLevel || 'B1'),
        escapeCSV(w.definition),
        escapeCSV(w.simpleDefinition || w.definition),
        escapeCSV(w.advancedDefinition || w.definition),
        escapeCSV(w.synonyms ? w.synonyms.join(', ') : ''),
        escapeCSV(w.etymology || ''),
        escapeCSV(w.scenarioTitle || 'Active Listening Scenario'),
        escapeCSV(w.scenarioUsageSnippet || ''),
        escapeCSV(w.exampleSentence || ''),
        escapeCSV(w.acousticTip || ''),
        escapeCSV(new Date(w.savedAt).toLocaleDateString())
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Generates a high-quality printable HTML document that triggers browser PDF print dialog
   */
  static exportToPDF(words: SavedWordItem[], studentName: string = 'Student'): void {
    if (!words || words.length === 0) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate and download the printable PDF study sheet.');
      return;
    }

    const dateStr = new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vocabulary List - Lexical Study Vault</title>
  <style>
    @media print {
      body {
        margin: 12mm 15mm;
        color: #111;
        background: #fff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 10pt;
      }
      .no-print {
        display: none !important;
      }
      .word-card {
        page-break-inside: avoid;
      }
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 24px auto;
      max-width: 820px;
      color: #1e293b;
      line-height: 1.45;
      padding: 0 16px;
    }

    .header-bar {
      border-bottom: 2px solid #ea580c;
      padding-bottom: 12px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    h1 {
      margin: 0;
      color: #0f172a;
      font-size: 22pt;
      letter-spacing: -0.5px;
    }

    .subheading {
      color: #64748b;
      font-size: 9.5pt;
      margin-top: 4px;
    }

    .meta-box {
      text-align: right;
      font-size: 9pt;
      color: #475569;
    }

    .action-bar {
      margin-bottom: 20px;
      padding: 10px 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .btn-print {
      background: #ea580c;
      color: white;
      border: none;
      padding: 8px 16px;
      font-weight: 600;
      font-size: 13px;
      border-radius: 6px;
      cursor: pointer;
    }

    .btn-print:hover {
      background: #c2410c;
    }

    .word-card {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 14px;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 6px;
    }

    .word-title {
      font-size: 14pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: capitalize;
    }

    .phonetic {
      font-family: ui-monospace, Menlo, Monaco, Consolas, monospace;
      color: #d97706;
      font-weight: 600;
      font-size: 10.5pt;
      margin-left: 8px;
    }

    .pos {
      font-size: 9pt;
      color: #64748b;
      font-style: italic;
    }

    .badge-cefr {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 8.5pt;
      font-weight: 700;
      font-family: monospace;
    }

    .definition {
      font-size: 10.5pt;
      color: #1e293b;
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .def-variant {
      font-size: 9pt;
      color: #475569;
      background: #f8fafc;
      padding: 6px 10px;
      border-radius: 6px;
      margin-bottom: 8px;
      border-left: 3px solid #ea580c;
    }

    .etymology {
      font-size: 8.5pt;
      color: #64748b;
      background: #fafaf9;
      border: 1px dashed #d6d3d1;
      padding: 6px 10px;
      border-radius: 6px;
      margin-bottom: 8px;
    }

    .synonyms {
      margin-bottom: 8px;
    }

    .syn-tag {
      display: inline-block;
      background: #ffedd5;
      color: #9a3412;
      border: 1px solid #fed7aa;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 8pt;
      font-family: monospace;
      margin-right: 4px;
      margin-bottom: 3px;
    }

    .scenario-snippet {
      font-size: 9.5pt;
      background: #fffbeb;
      border-left: 3px solid #f59e0b;
      padding: 6px 10px;
      border-radius: 0 6px 6px 0;
      color: #78350f;
      font-style: italic;
      margin-bottom: 6px;
    }

    .acoustic-tip {
      font-size: 8.5pt;
      color: #0369a1;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      padding: 5px 8px;
      border-radius: 6px;
      font-family: monospace;
    }

    .footer-note {
      text-align: center;
      margin-top: 30px;
      font-size: 8.5pt;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
    }
  </style>
</head>
<body>
  <div class="action-bar no-print">
    <div>
      <strong>Export Preview:</strong> ${words.length} saved vocabulary items ready for offline study.
    </div>
    <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
  </div>

  <div class="header-bar">
    <div>
      <h1>Vocabulary Study Vault</h1>
      <div class="subheading">Active Listening Diagnostic & Lexical Reference Sheet</div>
    </div>
    <div class="meta-box">
      <div><strong>Student:</strong> ${studentName}</div>
      <div><strong>Date:</strong> ${dateStr}</div>
      <div><strong>Words:</strong> ${words.length} Entries</div>
    </div>
  </div>

  <div class="word-list">
    ${words
      .map(
        (w, i) => `
      <div class="word-card">
        <div class="card-top">
          <div>
            <span style="color:#94a3b8; font-family:monospace; font-size:9pt; margin-right:4px;">#${i + 1}</span>
            <span class="word-title">${w.word}</span>
            <span class="phonetic">${w.phonetic || ''}</span>
            <span class="pos">(${w.partOfSpeech || 'vocab'})</span>
          </div>
          <span class="badge-cefr">CEFR ${w.cefrLevel || 'B1'}</span>
        </div>

        <div class="definition">
          <strong>Definition:</strong> ${w.definition}
        </div>

        ${
          w.simpleDefinition && w.advancedDefinition
            ? `
          <div class="def-variant">
            <div><strong>Simple:</strong> ${w.simpleDefinition}</div>
            <div style="margin-top:2px;"><strong>Advanced:</strong> ${w.advancedDefinition}</div>
          </div>
        `
            : ''
        }

        ${
          w.etymology
            ? `
          <div class="etymology">
            <strong>Etymology & Linguistic Origin:</strong> ${w.etymology}
          </div>
        `
            : ''
        }

        ${
          w.synonyms && w.synonyms.length > 0
            ? `
          <div class="synonyms">
            <strong style="font-size:8.5pt; color:#475569;">Synonyms:</strong>
            ${w.synonyms.map((s) => `<span class="syn-tag">${s}</span>`).join('')}
          </div>
        `
            : ''
        }

        ${
          w.scenarioUsageSnippet
            ? `
          <div class="scenario-snippet">
            <strong>Scenario Context:</strong> "${w.scenarioUsageSnippet}"
            ${w.scenarioTitle ? `<span style="font-size:8pt; display:block; color:#92400e; font-style:normal;">(${w.scenarioTitle})</span>` : ''}
          </div>
        `
            : w.exampleSentence
            ? `
          <div class="scenario-snippet">
            <strong>Example:</strong> "${w.exampleSentence}"
          </div>
        `
            : ''
        }

        ${
          w.acousticTip
            ? `
          <div class="acoustic-tip">
            <strong>Phonetic Tip:</strong> ${w.acousticTip}
          </div>
        `
            : ''
        }
      </div>
    `
      )
      .join('')}
  </div>

  <div class="footer-note">
    Generated by English Listening Mastery Engine • Quick Dictionary Offline Study Sheet
  </div>

  <script>
    // Automatically trigger print dialog after document is ready
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 400);
    });
  </script>
</body>
</html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}
