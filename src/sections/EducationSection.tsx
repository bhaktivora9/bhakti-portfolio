import React from 'react';
import { GraduationCap,  BadgeCheck } from 'lucide-react';
import { educationList, certificates } from '../data/portfolio';

interface EducationSectionProps {
  isDarkTheme: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ isDarkTheme }) => {
  return (
    <div className="animate-fade-in-up">
      {/* Education Header */}
      <div className="mb-8 transform transition-all duration-500">
        <h1 className="text-xl font-bold text-primary-themed mb-4 flex items-center gap-3 transition-colors duration-300">
          <GraduationCap className="w-5 h-5 text-yellow-400 transition-transform duration-300 hover:scale-110" />
          Education
        </h1>
        <div className="w-12 h-0.5 bg-yellow-400 mb-4 transition-all duration-700 hover:w-24"></div>
      </div>

      {/* Education Entries */}
      <div className="space-y-6 transform transition-all duration-700 delay-200">
        {educationList.map((edu, index) => (
          <div key={index} className="bg-secondary-themed border border-themed rounded p-4 transition-all duration-500 hover:shadow-lg hover:scale-105">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-m font-semibold text-primary-themed mb-1 transition-colors duration-300">{edu.degree}</h3>
                <p className="text-yellow-500 font-medium text-s transition-colors duration-300">{edu.institution}</p>
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
        <h2 className="text-xl font-bold text-primary-themed mb-4 flex items-center gap-3 transition-colors duration-300">
          <BadgeCheck className="w-5 h-5 text-green-400 transition-transform duration-300 hover:scale-110" />
          Certificates
        </h2>
        <div className="w-12 h-0.5 bg-green-400 mb-4 transition-all duration-700 hover:w-24"></div>
      </div>

      {/* Certificate Entries */}
      <div className="space-y-6 transform transition-all duration-700 delay-400">
        {certificates.map((cert, index) => (
          <div key={index} className="bg-secondary-themed border border-themed rounded p-4 transition-all duration-500 hover:shadow-lg hover:scale-105">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-m font-semibold text-primary-themed mb-1 transition-colors duration-300">{cert.degree}</h3>
                <p className="text-green-500 font-medium text-m transition-colors duration-300">{cert.institution}</p>
                <span className="inline-flex items-center gap-2 text-secondary-themed mt-2 md:mt-0 text-s transition-colors duration-300">
  <a 
    href={cert.credentials} 
    target="_blank" 
    rel="noopener noreferrer"
    className="hover:text-cyan-400 transition-all duration-300 underline hover:scale-105"
  >
   Certificate Credentials - BH-PCMLAI
  </a>
                </span>
              </div>
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
