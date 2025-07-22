import React from 'react';
import { FileText, Download } from 'lucide-react';

interface ResumeSectionProps {
  isDarkTheme: boolean;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ isDarkTheme }) => {
  const resumeUrl = `${import.meta.env.BASE_URL}assets/Bhakti Vora Resume.pdf`;

  return (
    <div className="animate-fade-in-up">
      {/* Header + Download Button in One Row */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-3 transform transition-all duration-500">
        <h1 className="text-xl font-bold text-primary-themed flex items-center gap-3 transition-colors duration-300">
          <FileText className="w-5 h-5 text-purple-400 transition-transform duration-300 hover:scale-110" />
          Resume
        </h1>

        {/* Download Button */}
        <a
          href={resumeUrl}
          download
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded bg-purple-500 text-white hover:bg-purple-600 transition-all duration-300 shadow hover:scale-105 hover:shadow-lg active:scale-95"
        >
          <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          Download PDF
        </a>
      </div>

      <div className="w-12 h-0.5 bg-purple-400 mb-4 transition-all duration-700 hover:w-24" />

      {/* PDF Viewer */}
      <div className="p-6 h-[calc(100vh-6rem)] bg-themed transform transition-all duration-700 delay-200">
        <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-themed transition-all duration-500 hover:shadow-2xl">
          <iframe
            src={`${resumeUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="w-full h-full border-0 transition-all duration-300"
            title="Bhakti Vora Resume"
          />
        </div>
      </div>
    </div>
  );
};
