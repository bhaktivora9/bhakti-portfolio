import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experiences } from '../data/portfolio';

interface WorkSectionProps {
  isDarkTheme: boolean;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ isDarkTheme }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-8 transform transition-all duration-500">
        <h1 className="text-xl font-bold text-primary-themed mb-4 flex items-center gap-3 transition-colors duration-300">
          <Briefcase className="w-5 h-5 text-green-400 transition-transform duration-300 hover:scale-110" />
          Work Experience
        </h1>
        <div className="w-12 h-0.5 bg-green-400 mb-4 transition-all duration-700 hover:w-24"></div>
      </div>

      <div className="space-y-8 transform transition-all duration-700 delay-200">
        {experiences.map((company, companyIndex) => (
          <div key={companyIndex} className="transition-all duration-500 hover:scale-105">
            {/* Company Header */}
            <div className="flex items-center gap-4 mb-4 transition-all duration-300">
              {company.logo && (
                <a href={company.link} className="transition-transform duration-300 hover:scale-110">
                  <img src={company.logo} alt={`${company.company} logo`} className="h-10 w-10 object-contain rounded transition-all duration-300 hover:shadow-lg" />
                </a>
              )}
              <div>
                <h2 className="text-lg font-bold text-primary-themed transition-colors duration-300">{company.company}</h2>
                <div className="flex items-center gap-2 text-xs text-secondary-themed transition-colors duration-300">
                  <MapPin className="w-3 h-3 transition-transform duration-300 hover:scale-110" />
                  <span>{company.location}</span>
                </div>
              </div>
            </div>

            {/* Roles under the company */}
            <div className="space-y-6 pl-4 border-l-2 border-green-400 transition-all duration-500">
              {company.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="bg-secondary-themed border border-themed rounded p-4 transition-all duration-500 hover:shadow-lg hover:scale-105" style={{animationDelay: `${roleIndex * 100}ms`}}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-primary-themed mb-1 transition-colors duration-300">{role.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-themed mt-2 md:mt-0 text-xs transition-colors duration-300">
                      <Calendar className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                      <span>{role.period}</span>
                    </div>
                  </div>
                  <p className="text-themed mb-3 text-sm whitespace-pre-line transition-colors duration-300">{role.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {role.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-tertiary-themed text-themed rounded text-xs font-mono transition-all duration-300 hover:scale-110 hover:shadow-md">
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
