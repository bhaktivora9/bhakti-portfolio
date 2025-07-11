import React, { useState } from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';
import projectsData from '../data/projects.json';

interface ProjectsProps {
  isDark: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isDark }) => {
  return (
    <section className={`py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Projects
        </h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center justify-cente">
          {projectsData.map((project) => (
            <div key={project.id} className={`card-highlighter custom-highlighter ${
              isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
            } rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300`}>
              
              {/* Project Header */}
              <div className={`p-6 ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code size={16} />
                    <h3 className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-black'
                    }`}>
                      {project.name}
                    </h3>
                  </div>
                </div>

                <p className={`text-sm mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span key={index} className={`px-2 py-1 text-xs rounded ${
                      isDark 
                        ? 'bg-gray-600 text-gray-300' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.github && (
                    <a href={project.github} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300 button-highlighter custom-highlighter ${
                         isDark 
                           ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' 
                           : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                       }`}>
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300 button-highlighter glow-highlighter ${
                         isDark 
                           ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                           : 'bg-blue-600 hover:bg-blue-700 text-white'
                       }`}>
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;