import React from 'react';
import { skills } from '../data/portfolio';

interface SkillsSectionProps {
  isDarkTheme: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkTheme }) => {
  if(isDarkTheme){
    console.log("dark theme");
  }
  return (
    <div className="animate-fade-in-up">
      <div className="mb-8 transform transition-all duration-500">
        <h1 className="text-xl font-bold text-primary-themed mb-4 flex items-center gap-3 transition-colors duration-300">
          Technical Skills
        </h1>
        <div className="w-12 h-0.5 bg-cyan-400 mb-4 transition-all duration-700 hover:w-24"></div>
      </div>

      <div className="space-y-6 transform transition-all duration-700 delay-200">
        {skills.map((skillCategory, index) => (
          <div
            key={index}
            className="bg-secondary-themed border border-themed rounded p-4 transition-all duration-500 hover:shadow-lg hover:scale-105"
            style={{animationDelay: `${index * 100}ms`}}
          >
            <h3 className="text-m font-semibold text-primary-themed mb-3 font-mono transition-colors duration-300">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-400">{skillCategory.category.toLowerCase()}</span> = [
            </h3>

            <div className="flex flex-wrap gap-x-4 gap-y-2 gap-3 ml-4 transition-all duration-300">
              {skillCategory.items.map((skill, i) => (
                <div
                  key={`${skill.name}-${i}`}
                  /*className={`${themeClasses.bgTertiary} border ${themeClasses.border} flex rounded px-3 py-2 text-center text-s font-mono`}*/
                  className={`inline-flex transition-all duration-300 hover:scale-110 hover:shadow-md`}
                >
                {/*  <span className="text-green-500 text-semibold">"{skill.name}"</span>*/}
                  <img src={skill.badge} alt={skill.name} className="h-6 object-contain transition-transform duration-300 hover:scale-125" />
                </div>
              ))}
            </div>

            <div className="text-sm font-mono text-primary-themed mt-3 transition-colors duration-300">];</div>
          </div>
        ))}
      </div>
    </div>
  );
};
