import React from 'react';
import { FileText, Download } from 'lucide-react';

interface ResumeSectionProps {
  themeClasses: any;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ themeClasses }) => {
  const resumeUrl = `${import.meta.env.BASE_URL}assets/Bhakti Vora Resume.pdf`;

  return (
    <div>
      {/* Header + Download Button in One Row */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
        <h1 className={`text-xl font-bold ${themeClasses.textPrimary} flex items-center gap-3`}>
          <FileText className="w-5 h-5 text-purple-400" />
          Resume
        </h1>

        {/* Download Button */}
        <a
          href={resumeUrl}
          download
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded bg-purple-500 text-white hover:bg-purple-600 transition-all shadow"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>

      <div className="w-12 h-0.5 bg-purple-400 mb-4" />

      {/* PDF Viewer */}
      <div className={`p-6 h-[calc(100vh-6rem)] ${themeClasses.bg}`}>
        <div className={`w-full h-full rounded-lg overflow-hidden shadow-lg border ${themeClasses.border}`}>
          <iframe
            src={`${resumeUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="w-full h-full border-0"
            title="Bhakti Vora Resume"
          />
        </div>
      </div>
    </div>
  );
};
