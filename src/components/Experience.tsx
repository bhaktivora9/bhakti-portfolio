import React, { useState } from 'react';
import { Calendar, Building, ArrowRight, Briefcase } from 'lucide-react';
import experienceData from '../data/experience.json';
import '../styles/experience.css';

// Interface definitions are good, but let's make the nested 'positions' type more explicit
interface Position { // Renamed from anonymous type for better readability
  title: string;
  period: string;
  description: string[];
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  logo?: string;
  positions?: Position[]; // Use the named interface
}

interface ExperienceProps {
  isDark: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ isDark }) => {
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const experiences: Experience[] = experienceData; // Type assertion is good here

  const handleExperienceClick = (id: string) => {
    setActiveExperience(activeExperience === id ? null : id);
  };

  return (
    <div className={`w-full py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Experience</h2>
        </div>
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline bar */}
          <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

          <div className="space-y-12">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className={`relative pl-12 transition-all duration-300 ${activeExperience === experience.id ? 'scale-105' : ''}`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-6 w-5 h-5 rounded-full border-4 transform -translate-x-1/2 cursor-pointer transition-all duration-300 ${
                    activeExperience === experience.id
                      ? 'bg-blue-600 border-blue-200'
                      : `${isDark ? 'bg-gray-800 border-blue-600' : 'bg-white border-blue-600'}`
                  }`}
                  onClick={() => handleExperienceClick(experience.id)}
                ></div>

                {/* Experience card */}
                <div
                  className={`p-8 rounded-xl shadow-lg transition-all duration-300 ${
                    activeExperience === experience.id ? 'border-l-4 border-blue-600 shadow-lg' : 'hover:shadow-lg'
                  } ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}
                  onClick={() => handleExperienceClick(experience.id)}
                >
                  <div className="flex items-start gap-8">
                    {experience.logo && (
                      <div className="mr-4 flex-shrink-0">
                        
                        <img src={experience.logo} alt={`${experience.company} logo`} className="w-20 h-20 object-contain rounded-lg" />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{experience.title}</h3>
                        <span className="flex items-center text-blue-600 mt-2 sm:mt-0">
                          <Calendar className="w-5 h-5 mr-2" />
                          <span className="text-base font-medium">{experience.period}</span>
                        </span>
                      </div>
                      <div className={`flex flex-col sm:flex-row sm:items-center mb-6 space-y-2 sm:space-y-0 sm:space-x-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div className="flex items-center">
                          <Building className={`w-5 h-5 mr-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                          <span className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{experience.company}</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{experience.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {activeExperience === experience.id && (
                    <div className="mt-8 animate-fadeIn">
                      <div className={`space-y-3 mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {experience.description.map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <ArrowRight className="w-5 h-5 mr-3 mt-1 text-blue-500 flex-shrink-0" />
                            <p className="text-base leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>

                      {experience.positions && (
                        <div className={`mt-8 border-t pt-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <h4 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>Career Progression</h4>
                          <div className="relative pl-8">
                            <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${isDark ? 'bg-blue-800' : 'bg-blue-100'}`}></div>
                            <div className="space-y-8">
                              {experience.positions.map((position, idx) => (
                                <div key={idx} className="relative">
                                  <div className="absolute left-0 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 mt-2"></div>
                                  <div className="pl-8">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                                      <h5 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{position.title}</h5>
                                      <span className="text-base font-medium text-blue-600">{position.period}</span>
                                    </div>
                                    <div className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {position.description.map((item, descIdx) => (
                                        <div key={descIdx} className="flex items-start">
                                          <Briefcase className="w-4 h-4 mr-3 mt-1 text-blue-400 flex-shrink-0" />
                                          <p className="text-base">{item}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
