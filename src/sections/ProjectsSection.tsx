import React from 'react';
import { Rocket, Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolio';

interface ProjectsSectionProps {
  themeClasses: any;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ themeClasses }) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4 flex items-center gap-3`}>
          <Rocket className="w-5 h-5 text-orange-400" />
          Projects
        </h1>
        <div className="w-12 h-0.5 bg-orange-400 mb-4"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-4`}>
            {project.image && (
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-32 object-cover object-contain rounded mb-4"
              />
            )}
            <h3 className={`text-sm font-semibold ${themeClasses.textPrimary} mb-2`}>{project.name}</h3>
            <p className={`${themeClasses.text} mb-3 text-sm`}>{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span key={tech} className={`px-2 py-1 ${themeClasses.bgTertiary} ${themeClasses.text} rounded text-xs font-mono`}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.github && (
                <a 
                  href={project.github}
                  className={`flex items-center gap-2 ${themeClasses.text} hover:text-orange-400 transition-colors text-sm`}
                >
                  <Github className="h-4 w-4" />
                  <span>Code</span>
                </a>
              )}
              {project.demo && (
                <a 
                  href={project.demo}
                  className={`flex items-center gap-2 ${themeClasses.text} hover:text-orange-400 transition-colors text-sm`}
                >
                  <ExternalLink className="h-4 w-4" />
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