import React from 'react';
import { Code, Terminal, ExternalLink } from 'lucide-react';

interface CurrentlyWorkingCardProps {
  isDark: boolean;
  onOpenTerminal: () => void;
}

const CurrentlyWorkingCard: React.FC<CurrentlyWorkingCardProps> = ({ isDark, onOpenTerminal }) => {
  return (
    <div className={`w-full max-w-md mx-auto card-highlighter custom-highlighter ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300`}>
      
      {/* Card Header */}
      <div className={`${
        isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'
      } p-4`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Currently Working On</h3>
            <p className="text-blue-100 text-sm">genREADME</p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="mb-4">
          <h4 className={`text-lg font-semibold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
        genREADME - Intelligent Context-Aware Resume Builder
        </h4>
          <p className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
          Building a context-aware AI README system that generates intelligent, ecosystem-informed READMEs by analyzing successful projects in your tech stack and learning from community best practices.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {['Spring Boot', 'AI', 'ML', ''].map((tech) => (
              <span
                key={tech}
                className={`px-2 py-1 text-xs rounded-full ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={`text-sm ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}>
              In Development
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onOpenTerminal}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 button-highlighter glow-highlighter ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } shadow-md hover:shadow-lg`}
          >
            <Terminal className="w-4 h-4" />
            View Terminal
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 button-highlighter custom-highlighter ${
              isDark 
                ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyWorkingCard;