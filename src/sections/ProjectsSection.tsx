import React from 'react';
import { Rocket, Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolio';

interface ProjectsSectionProps {
  isDarkTheme: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isDarkTheme }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-8 transform transition-all duration-500">
        <h1 className="text-xl font-bold text-primary-themed mb-4 flex items-center gap-3 transition-colors duration-300">
          <Rocket className="w-5 h-5 text-orange-400 transition-transform duration-300 hover:scale-110" />
          Projects
        </h1>
        <div className="w-12 h-0.5 bg-orange-400 mb-4 transition-all duration-700 hover:w-24"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 transform transition-all duration-700 delay-200">
        {projects.map((project, index) => (
          <div key={index} className="bg-secondary-themed border border-themed rounded p-4 transition-all duration-500 hover:shadow-lg hover:scale-105 group" style={{animationDelay: `${index * 100}ms`}}>
            {project.image && (
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-32 object-cover object-contain rounded mb-4 transition-transform duration-500 group-hover:scale-110"
              />
            )}
            <h3 className="text-sm font-semibold text-primary-themed mb-2 transition-colors duration-300">{project.name}</h3>
            <p className="text-themed mb-3 text-sm transition-colors duration-300">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-tertiary-themed text-themed rounded text-xs font-mono transition-all duration-300 hover:scale-110 hover:shadow-md">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.github && (
                <a 
                  href={project.github}
                  className="flex items-center gap-2 text-themed hover:text-orange-400 transition-all duration-300 text-sm hover:scale-105"
                >
                  <Github className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
                  <span>Code</span>
                </a>
              )}
              {project.demo && (
                <a 
                  href={project.demo}
                  className="flex items-center gap-2 text-themed hover:text-orange-400 transition-all duration-300 text-sm hover:scale-105"
                >
                  <ExternalLink className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
                  <span>Demo</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};