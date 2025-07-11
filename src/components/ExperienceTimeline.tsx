import React, { useState } from 'react';
import { Calendar, Building, ArrowRight, Briefcase } from 'lucide-react';
import experienceData from '../data/experience.json';
import '../styles/experience.css';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[]; 
  logo?: string;
  positions?: {
    title: string;
    period: string;
    description: string[];
  }[];
}

const ExperienceTimeline: React.FC = () => {
  const [activeExperience, setActiveExperience] = useState<string | null>(null);

  const experiences: Experience[] = experienceData;

  const handleExperienceClick = (id: string) => {
    setActiveExperience(activeExperience === id ? null : id);
  };

  return (
    <div className="w-full py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience</h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="space-y-12">
            {experiences.map((experience) => (
              <div 
                key={experience.id} 
                className={`relative pl-12 transition-all duration-300 ${activeExperience === experience.id ? 'scale-105' : ''}`}
              >
                <div 
                  className={`absolute left-6 w-5 h-5 rounded-full border-4 transform -translate-x-1/2 cursor-pointer transition-all duration-300 ${
                    activeExperience === experience.id 
                      ? 'bg-indigo-600 border-indigo-200' 
                      : 'bg-white dark:bg-gray-800 border-indigo-600'
                  }`}
                  onClick={() => handleExperienceClick(experience.id)}
                ></div>
                
                <div 
                  className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-300 ${
                    activeExperience === experience.id 
                      ? 'border-l-4 border-indigo-600 shadow-lg' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleExperienceClick(experience.id)}
                >
                  <div className="flex items-start">
                    {experience.logo && (
                      <div className="mr-4 flex-shrink-0">
                        <img 
                          src={experience.logo} 
                          alt={`${experience.company} logo`} 
                          className="w-16 h-16 object-contain rounded-md"
                        />
                      </div>
                    )}
                    
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{experience.title}</h3>
                        <span className="flex items-center text-indigo-600 mt-2 sm:mt-0">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="text-sm">{experience.period}</span>
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400 mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1 text-gray-400" />
                          <span>{experience.company}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-500 dark:text-gray-500">{experience.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {activeExperience === experience.id && (
                    <div className="mt-6 animate-fadeIn">
                      <div className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        {experience.description.map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <ArrowRight className="w-4 h-4 mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                            <p>{item}</p>
                          </div>
                        ))}
                      </div>
                      
                      {experience.positions && (
                        <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Career Progression</h4>
                          <div className="relative pl-6">
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-100 dark:bg-indigo-800"></div>
                            
                            <div className="space-y-6">
                              {experience.positions.map((position, idx) => (
                                <div key={idx} className="relative">
                                  <div className="absolute left-0 w-3 h-3 bg-indigo-500 rounded-full transform -translate-x-1/2 mt-1.5"></div>
                                  <div className="pl-6">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                      <h5 className="font-semibold text-gray-800 dark:text-white">{position.title}</h5>
                                      <span className="text-sm text-indigo-600">{position.period}</span>
                                    </div>
                                    <div className="space-y-1 text-gray-600 dark:text-gray-400">
                                      {position.description.map((item, descIdx) => (
                                        <div key={descIdx} className="flex items-start">
                                          <Briefcase className="w-3.5 h-3.5 mr-2 mt-0.5 text-indigo-400 flex-shrink-0" />
                                          <p className="text-sm">{item}</p>
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

export default ExperienceTimeline;