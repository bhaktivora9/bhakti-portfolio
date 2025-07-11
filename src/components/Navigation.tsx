import React from 'react';
import { Server, Github, Linkedin, Mail, Download, Sun, Moon, User, Briefcase, Award } from 'lucide-react';
import profile from '../data/profile.json';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isDark, toggleTheme }) => {
  const downloadResume = () => {
    // Create a temporary link to download the resume
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}assets/${profile.resume}`;
    link.download = 'BhaktiVoraresume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }; 

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isDark 
        ? 'bg-black/90 border-gray-700' 
        : 'bg-white/90 border-gray-300'
    } backdrop-blur-md shadow-sm border-b`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">

          {/* LEFT - Brand */}
          <div className="flex items-center space-x-2">
            <div className="relative group">
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}>
                <Server className={`h-6 w-6 transition-colors duration-300 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                isDark ? 'bg-gray-900 text-gray-200 border border-gray-700' : 'bg-white text-gray-700 border border-gray-200'
              } shadow-lg whitespace-nowrap`}>
                Server Online • 99.9% Uptime
                <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
                  isDark ? 'bg-gray-900 border-l border-t border-gray-700' : 'bg-white border-l border-t border-gray-200'
                }`}></div>
              </div>
            </div>
            <div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Bhakti.dev
              </span>
              <div className={`text-xs font-medium ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Backend Developer
              </div>
            </div>
          </div>

          {/* CENTER - Navigation */}
          <div className="hidden md:flex items-center space-x-6 mx-auto">
            <button onClick={() => scrollToSection('about')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 nav-highlighter ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>
              <User className="w-4 h-4" />About
            </button>
            <button onClick={() => scrollToSection('experience')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 nav-highlighter ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>
              <Briefcase className="w-4 h-4" />Experience
            </button>
            <button onClick={() => scrollToSection('skills')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 nav-highlighter ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>
              <Award className="w-4 h-4" />Skills
            </button>
            <button onClick={() => scrollToSection('contact')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 nav-highlighter ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>
              <Mail className="w-4 h-4" />Contact
            </button>
          </div>

          {/* RIGHT - Actions */}
          <div className="flex items-center space-x-4 ml-auto">
            <button 
              onClick={downloadResume} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 button-highlighter glow-highlighter ${isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} shadow-md hover:shadow-lg hover:scale-105`} 
              title="Download Resume"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Resume</span>
            </button>
            <div className="flex items-center space-x-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-all duration-300 icon-highlighter custom-highlighter ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`} title="GitHub Profile">
                <Github className="w-5 h-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-all duration-300 icon-highlighter glow-highlighter ${isDark ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'}`} title="LinkedIn Profile">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${profile.email}`} className={`p-2 rounded-lg transition-all duration-300 icon-highlighter custom-highlighter ${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800' : 'text-gray-700 hover:text-green-600 hover:bg-gray-100'}`} title="Send Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition-all duration-300 icon-highlighter glow-highlighter ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`} title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <div className="relative w-5 h-5">
                <Sun className={`absolute inset-0 w-5 h-5 transition-all duration-500 transform ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                <Moon className={`absolute inset-0 w-5 h-5 transition-all duration-500 transform ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Animated Border Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50">
        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 animate-gradient-x"></div>
      </div>
    </nav>
  );
};

export default Navigation;