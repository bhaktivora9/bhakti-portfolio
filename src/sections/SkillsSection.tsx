import React from 'react';
import { skills } from '../data/portfolio';

interface SkillsSectionProps {
  themeClasses: any;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ themeClasses }) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4 flex items-center gap-3`}>
          Technical Skills
        </h1>
        <div className="w-12 h-0.5 bg-cyan-400 mb-4"></div>
      </div>

      <div className="space-y-6">
        {skills.map((skillCategory, index) => (
          <div
            key={index}
            className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-4`}
          >
            <h3 className={`text-m font-semibold ${themeClasses.textPrimary} mb-3 font-mono`}>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-400">{skillCategory.category.toLowerCase()}</span> = [
            </h3>

            <div className="flex flex-wrap gap-x-4 gap-y-2 gap-3 ml-4">
              {skillCategory.items.map((skill, i) => (
                <div
                  key={`${skill.name}-${i}`}
                  /*className={`${themeClasses.bgTertiary} border ${themeClasses.border} flex rounded px-3 py-2 text-center text-s font-mono`}*/
                  className={`inline-flex`}
                >
                {/*  <span className="text-green-500 text-semibold">"{skill.name}"</span>*/}
                  <img src={skill.badge} alt={skill.name}         className="h-6 object-contain"
 />
                </div>
              ))}
            </div>

            <div className={`text-sm font-mono ${themeClasses.textPrimary} mt-3`}>];</div>
          </div>
        ))}
      </div>
    </div>
  );
};
