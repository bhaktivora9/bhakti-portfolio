import React, { useState } from 'react';
import { Code2, Filter, Layers } from 'lucide-react';

interface Skill {
  name: string;
  badge: string;
  category: string[];
}

const skills: Skill[] = [
  // Programming Languages
  { name: "Python", badge: "https://img.shields.io/badge/Python-3776AB?style=plastic&logo=python&logoColor=white", category: ["Languages"] },
  { name: "Java", badge: "https://img.shields.io/badge/Java-BE6F00?style=plastic&logo=openjdk&logoColor=white", category: ["Languages"] },
  
  // Frameworks & Libraries
  { name: "Spring", badge: "https://img.shields.io/badge/Spring-6DB33F?style=plastic&logo=spring&logoColor=white", category: ["Java","Frameworks","Backend"] },
  { name: "Spring Boot", badge: "https://img.shields.io/badge/SpringBoot-6DB33F?style=plastic&logo=spring-boot&logoColor=white", category: ["Java","Frameworks","Backend"] },
  
  // Databases
  { name: "PostgreSQL", badge: "https://img.shields.io/badge/PostgreSQL-316192?style=plastic&logo=postgresql&logoColor=white", category: ["Database"] },
  { name: "Elasticsearch", badge: "https://img.shields.io/badge/Elasticsearch-005571?style=plastic&logo=elasticsearch&logoColor=white", category: ["Database"] },
  { name: "MongoDB", badge: "https://img.shields.io/badge/MongoDB-43853D?style=plastic&logo=mongodb&logoColor=white", category: ["Database"] },
  
  // Cloud & DevOps
  { name: "AWS", badge: "https://img.shields.io/badge/AWS_Cloud-232F3E?style=plastic&logo=amazon-aws&logoColor=white", category: ["Cloud"] },
  { name: "Google Cloud", badge: "https://img.shields.io/badge/Google_Cloud-4285F4?style=plastic&logo=google-cloud&logoColor=white", category: ["Cloud"] },
  { name: "Docker", badge: "https://img.shields.io/badge/Docker-2496ED?style=plastic&logo=docker&logoColor=white", category: ["DevOps"] },
  { name: "Kubernetes", badge: "https://img.shields.io/badge/Kubernetes-326CE5?style=plastic&logo=kubernetes&logoColor=white", category: ["DevOps"] },
  //Messaging 
    { name: "Apache Kafka", badge: "https://img.shields.io/badge/Apache_Kafka-231F20?style=flat-square&logo=apache-kafka&logoColor=white", category: ["Middleware"] },

  // Machine Learning & AI
  { name: "TensorFlow", badge: "https://img.shields.io/badge/TensorFlow-FF6F00?style=plastic&logo=tensorflow&logoColor=white", category: ["AI/ML"] },
  { name: "Scikit Learn", badge: "https://img.shields.io/badge/scikit--learn-F7931E?style=plastic&logo=scikit-learn&logoColor=white", category: ["AI/ML"] },
  
 
];

const categories = ["All", "Languages", "Java", "Frameworks", "Backend", "AI/ML", "Database", "Cloud", "DevOps"];

interface SkillsSectionProps {
  isDark: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ isDark }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category.includes(selectedCategory));

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Technical Skills</h2>
        </div>
          
        {/* Category Filter */}
        {/*<div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Filter className={`w-5 h-5 mr-2 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <span className={`text-lg font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Filter by Category
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border shadow-lg button-highlighter custom-highlighter ${
                  selectedCategory === category
                    ? `${
                        isDark 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-gray-600 shadow-xl ring-2 ring-blue-500/50' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-gray-300 shadow-xl ring-2 ring-blue-300/50'
                      }`
                    : `${
                        isDark 
                          ? 'bg-gray-800/70 text-gray-300 border-gray-600 hover:bg-gray-700/90 hover:text-white' 
                          : 'bg-white/70 text-gray-600 border-gray-200 hover:bg-white/90 hover:text-gray-700'
                      }`
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4" />
                  <span>{category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category
                      ? 'bg-white/30'
                      : isDark ? 'bg-gray-700/50' : 'bg-gray-200/50'
                  }`}>
                    {category === "All" ? skills.length : skills.filter(s => s.category.includes(category)).length}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
*/}
        {/* Skills Container */}
        <div className="relative">
          {/* Glass Container */}
          <div className={`backdrop-blur-xl rounded-3xl shadow-xl border p-8 sm:p-12 relative overflow-hidden card-highlighter custom-highlighter ${
            isDark 
              ? 'bg-gray-800/30 border-gray-700/40' 
              : 'bg-white/30 border-white/40'
          }`}>
            {/* Glass Shine Effect */}
            <div className={`absolute inset-0 rounded-3xl ${
              isDark 
                ? 'bg-gradient-to-br from-white/5 via-transparent to-transparent' 
                : 'bg-gradient-to-br from-white/20 via-transparent to-transparent'
            }`}></div>
            <div className={`absolute top-0 left-0 w-full h-1 ${
              isDark 
                ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
            }`}></div>
            <div className={`absolute top-0 left-0 h-full w-1 ${
              isDark 
                ? 'bg-gradient-to-b from-transparent via-white/20 to-transparent' 
                : 'bg-gradient-to-b from-transparent via-white/30 to-transparent'
            }`}></div>
            
            {/* Skills Flow */}
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {filteredSkills.map((skill, index) => (
                  <div
                    key={`${skill.name}-${selectedCategory}`}
                    className="transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 ease-out group icon-highlighter glow-highlighter"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                    }}
                  >
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110 ${
                        isDark 
                          ? 'bg-gradient-to-r from-blue-400/20 to-purple-400/20' 
                          : 'bg-gradient-to-r from-blue-300/20 to-purple-300/20'
                      }`}></div>
                      
                      {/* Badge */}
                      <img
                        src={skill.badge}
                        alt={skill.name}
                        className={`h-8 sm:h-8 w-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 backdrop-blur-sm relative z-10 ${
                          isDark 
                            ? 'ring-white/20 hover:ring-white/40' 
                            : 'ring-white/30 hover:ring-white/50'
                        }`}
                        loading="lazy"
                      />
                      
                      {/* Reflection Effect */}
                      <div className={`absolute inset-0 rounded-xl pointer-events-none ${
                        isDark 
                          ? 'bg-gradient-to-t from-white/5 to-transparent' 
                          : 'bg-gradient-to-t from-white/10 to-transparent'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Elements */}
           {/*   <div className="flex items-center justify-center mt-10 space-x-3">
                <span className={`text-lg font-medium tracking-wide ${
                  isDark 
                    ? 'bg-gradient-to-r from-gray-300 to-blue-400 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent'
                }`}>
                  {filteredSkills.length} Technologies • Always Evolving
                </span>
              </div>
*/}
            </div>

            {/* Inner Glass Reflections */}
            <div className={`absolute bottom-0 right-0 w-32 h-32 rounded-full blur-2xl ${
              isDark 
                ? 'bg-gradient-to-tl from-white/5 to-transparent' 
                : 'bg-gradient-to-tl from-white/10 to-transparent'
            }`}></div>
            <div className={`absolute top-1/2 left-1/4 w-16 h-16 rounded-full blur-xl ${
              isDark 
                ? 'bg-gradient-to-br from-blue-500/10 to-transparent' 
                : 'bg-gradient-to-br from-blue-200/20 to-transparent'
            }`}></div>
          </div>

          {/* Outer Glow */}
          <div className={`absolute inset-0 rounded-3xl blur-2xl -z-10 scale-105 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10' 
              : 'bg-gradient-to-r from-blue-300/10 via-purple-300/10 to-blue-300/10'
          }`}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;