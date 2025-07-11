import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-500 transform icon-highlighter glow-highlighter ${
        isDark 
          ? 'bg-gray-800 hover:bg-gray-700 text-blue-400 shadow-lg shadow-black/50' 
          : 'bg-white hover:bg-gray-100 text-gray-700 shadow-lg shadow-gray-300/50'
      } border ${
        isDark ? 'border-gray-700' : 'border-gray-300'
      }`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <Sun 
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 transform ${
            isDark 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 transform ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
      
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse' 
          : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20'
      }`} />
    </button>
  );
};

export default ThemeToggle;