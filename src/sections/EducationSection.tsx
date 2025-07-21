import React from 'react';
import { GraduationCap, Calendar, BadgeCheck } from 'lucide-react';
import { education, certificates } from '../data/portfolio';

interface EducationSectionProps {
  themeClasses: any;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ themeClasses }) => {
  return (
    <div>
      {/* Education Header */}
      <div className="mb-8">
        <h1 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4 flex items-center gap-3`}>
          <GraduationCap className="w-5 h-5 text-yellow-400" />
          Education
        </h1>
        <div className="w-12 h-0.5 bg-yellow-400 mb-4"></div>
      </div>

      {/* Education Entries */}
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-4`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className={`text-m font-semibold ${themeClasses.textPrimary} mb-1`}>{edu.degree}</h3>
                <p className="text-yellow-500 font-medium text-s">{edu.institution}</p>
              </div>
            {/*  <div className={`flex items-center gap-2 ${themeClasses.textSecondary} mt-2 md:mt-0 text-xs`}>
                <Calendar className="h-4 w-4" />
                <span>{edu.period}</span>
              </div>*/}
            </div>
          </div>
        ))}
      </div>

      {/* Certificates Header */}
      <div className="mt-12 mb-6">
        <h2 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4 flex items-center gap-3`}>
          <BadgeCheck className="w-5 h-5 text-green-400" />
          Certificates
        </h2>
        <div className="w-12 h-0.5 bg-green-400 mb-4"></div>
      </div>

      {/* Certificate Entries */}
      <div className="space-y-6">
        {certificates.map((cert, index) => (
          <div key={index} className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-4`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className={`text-m font-semibold ${themeClasses.textPrimary} mb-1`}>{cert.degree}</h3>
                <p className="text-green-500 font-medium text-m">{cert.institution}</p>
<span className={`inline-flex items-center gap-2 ${themeClasses.textSecondary} mt-2 md:mt-0 text-s`}>
  <a 
    href={cert.credentials} 
    target="_blank" 
    rel="noopener noreferrer"
    className="hover:text-cyan-400 transition-colors duration-200 underline"
  >
   Certificate Credentials - BH-PCMLAI
  </a>
</span>              </div>
             {/* {cert.date && (
                <div className={`flex items-center gap-2 ${themeClasses.textSecondary} mt-2 md:mt-0 text-xs`}>
                  <Calendar className="h-4 w-4" />
                  <span>{cert.date}</span>
                </div>
              )}*/}
    
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
