import React, { useState } from 'react';
/*import { Code2, Filter, Layers } from 'lucide-react';*/

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

     
     console.log(categories);
     console.log(setSelectedCategory);
  return (
    <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Technical Skills</h2>
        </div>
          
   

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

    </section>
  );
};

export default SkillsSection;