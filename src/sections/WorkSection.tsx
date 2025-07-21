import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experiences } from '../data/portfolio';

interface WorkSectionProps {
  themeClasses: any;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ themeClasses }) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4 flex items-center gap-3`}>
          <Briefcase className="w-5 h-5 text-green-400" />
          Work Experience
        </h1>
        <div className="w-12 h-0.5 bg-green-400 mb-4"></div>
      </div>

      <div className="space-y-8">
        {experiences.map((company, companyIndex) => (
          <div key={companyIndex}>
            {/* Company Header */}
            <div className="flex items-center gap-4 mb-4">
              {company.logo && (
                <a href={company.link}>
              <img src={company.logo} alt={`${company.company} logo`} className="h-10 w-10 object-contain rounded" />
                </a>
              )}
              <div>
                <h2 className={`text-lg font-bold ${themeClasses.textPrimary}`}>{company.company}</h2>
                <div className={`flex items-center gap-2 text-xs ${themeClasses.textSecondary}`}>
                  <MapPin className="w-3 h-3" />
                  <span>{company.location}</span>
                </div>
              </div>
            </div>

            {/* Roles under the company */}
            <div className="space-y-6 pl-4 border-l-2 border-green-400">
              {company.roles.map((role, roleIndex) => (
                <div key={roleIndex} className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-4`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className={`text-sm font-semibold ${themeClasses.textPrimary} mb-1`}>{role.title}</h3>
                    </div>
                    <div className={`flex items-center gap-2 ${themeClasses.textSecondary} mt-2 md:mt-0 text-xs`}>
                      <Calendar className="h-4 w-4" />
                      <span>{role.period}</span>
                    </div>
                  </div>
                  <p className={`${themeClasses.text} mb-3 text-sm whitespace-pre-line`}>{role.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {role.technologies.map((tech) => (
                      <span key={tech} className={`px-2 py-1 ${themeClasses.bgTertiary} ${themeClasses.text} rounded text-xs font-mono`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
