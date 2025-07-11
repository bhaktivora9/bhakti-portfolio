import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, Filter, X } from 'lucide-react';
import skillsData from '../data/skills.json';

interface SkillsProps {
  isDark: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isDark }) => {
  const [animatedLevels, setAnimatedLevels] = useState<{[key: string]: number}>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [skillFilter, setSkillFilter] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    // Animate skill bars on component mount
    const timer = setTimeout(() => {
      const levels: {[key: string]: number} = {};
      Object.entries(skillsData).forEach(([category, data]) => {
        data.skills.forEach((skill) => {
          levels[skill.name] = skill.level;
        });
      });
      setAnimatedLevels(levels);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getSkillColor = (level: number) => {
    if (level >= 85) return isDark ? 'bg-green-500' : 'bg-green-600';
    if (level >= 70) return isDark ? 'bg-blue-500' : 'bg-blue-600';
    if (level >= 60) return isDark ? 'bg-yellow-500' : 'bg-yellow-600';
    return isDark ? 'bg-red-500' : 'bg-red-600';
  };

  const getSkillColorText = (level: number) => {
    if (level >= 85) return isDark ? 'text-green-400' : 'text-green-600';
    if (level >= 70) return isDark ? 'text-blue-400' : 'text-blue-600';
    if (level >= 60) return isDark ? 'text-yellow-400' : 'text-yellow-600';
    return isDark ? 'text-red-400' : 'text-red-600';
  };

  const getAllSkills = () => {
    const allSkills: Array<{name: string, level: number, years: number, category: string}> = [];
    Object.entries(skillsData).forEach(([category, data]) => {
      data.skills.forEach(skill => {
        allSkills.push({...skill, category});
      });
    });
    return allSkills
      .filter(skill => 
        skillFilter === '' || 
        skill.name.toLowerCase().includes(skillFilter.toLowerCase()) ||
        skill.category.toLowerCase().includes(skillFilter.toLowerCase())
      )
      .sort((a, b) => b.level - a.level);
  };

  const getAverageLevel = (category: string) => {
    const skills = skillsData[category as keyof typeof skillsData].skills;
    return Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length);
  };

  const getFilteredCategorySkills = (category: string) => {
    const skills = skillsData[category as keyof typeof skillsData].skills;
    return skills.filter(skill => 
      skillFilter === '' || 
      skill.name.toLowerCase().includes(skillFilter.toLowerCase())
    );
  };

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        {/* Dashboard Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-3xl md:text-4xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Skills Dashboard
            </h2>
          </div>
          <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Real-time proficiency metrics and technology stack overview
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {Object.entries(skillsData).map(([category, data]) => (
            <div key={category} className={`${
              isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
            } border rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer ${
              selectedCategory === category ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{data.icon}</span>
                  <h3 className={`text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {data.title}
                  </h3>
                </div>
                <TrendingUp className={`w-5 h-5 ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Avg. Proficiency
                </span>
                <span className={`text-2xl font-bold ${getSkillColorText(getAverageLevel(category))}`}>
                  {getAverageLevel(category)}%
                </span>
              </div>
              
              <div className={`mt-2 h-2 ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              } rounded-full overflow-hidden`}>
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${getSkillColor(getAverageLevel(category))} rounded-full`}
                  style={{ width: `${getAverageLevel(category)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Chart */}
        <div className={`${
          isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-lg p-6 max-w-6xl mx-auto`}>
          
          {/* Chart Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Activity className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {selectedCategory ? skillsData[selectedCategory as keyof typeof skillsData].title : 'All Skills Overview'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${showFilter ? 'ring-2 ring-blue-500' : ''}`}
                title="Filter skills"
              >
                <Filter size={16} />
              </button>
              
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`text-sm px-3 py-1 rounded ${
                    isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-colors duration-200`}
                >
                  Show All
                </button>
              )}
            </div>
          </div>

          {/* Filter Input */}
          {showFilter && (
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Filter skills by name or category..."
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className={`w-full px-4 py-2 pr-10 rounded-lg border transition-all duration-200 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-600 text-gray-300 placeholder-gray-500 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                autoFocus
              />
              {skillFilter && (
                <button
                  onClick={() => setSkillFilter('')}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  } transition-colors duration-200`}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}

          {/* Chart Grid */}
          <div className="space-y-4">
            {(selectedCategory 
              ? getFilteredCategorySkills(selectedCategory)
              : getAllSkills()
            ).map((skill, index) => (
              <div key={`${skill.name}-${index}`} className="group">
                {/* Skill Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium min-w-[120px] ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {skill.name}
                    </span>
                    {!selectedCategory && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {'category' in skill ? skill.category : ''}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {skill.years}y exp
                    </span>
                    <span className={`text-sm font-bold min-w-[40px] text-right ${
                      getSkillColorText(skill.level)
                    }`}>
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className={`relative h-6 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                } rounded-lg overflow-hidden group-hover:shadow-md transition-all duration-300`}>
                  
                  {/* Background Grid */}
                  <div className="absolute inset-0 flex">
                    {[20, 40, 60, 80].map((mark) => (
                      <div 
                        key={mark}
                        className={`border-r ${
                          isDark ? 'border-gray-600' : 'border-gray-300'
                        } opacity-30`}
                        style={{ left: `${mark}%` }}
                      ></div>
                    ))}
                  </div>

                  {/* Progress Fill */}
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${
                      getSkillColor(skill.level)
                    } relative overflow-hidden`}
                    style={{ width: `${animatedLevels[skill.name] || 0}%` }}
                  >
                    {/* Animated Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                  </div>

                  {/* Percentage Labels */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-mono">
                    {[0, 25, 50, 75, 100].map((mark) => (
                      <span 
                        key={mark}
                        className={`${
                          isDark ? 'text-gray-500' : 'text-gray-400'
                        } ${mark <= skill.level ? 'opacity-0' : 'opacity-50'}`}
                      >
                        {mark}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Footer */}
          <div className={`mt-6 pt-4 border-t ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          } text-center`}>
            <p className={`text-xs ${
              isDark ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Last updated: {new Date().toLocaleDateString()} | 
              Total skills tracked: {getAllSkills().length} | 
              Click category cards to filter
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;