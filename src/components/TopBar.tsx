import React from 'react';
import { Server, Settings, Sun, Moon } from 'lucide-react';

interface TopBarProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (value: boolean) => void;
  showSettings: boolean;
  setShowSettings: (value: boolean) => void;
  themeClasses: any;
}

export const TopBar: React.FC<TopBarProps> = ({
  isDarkTheme,
  setIsDarkTheme,
  showSettings,
  setShowSettings,
  themeClasses
}) => {
  return (
    <div className={`${themeClasses.bgSecondary} border-b ${themeClasses.border} px-4 py-2 flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Server className={`w-5 h-5 ${themeClasses.accent}`} />
          <span className="text-sm font-medium">bhakti.dev</span>
          <div className="absolute top-4 left-2 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 relative">
        <Settings 
          className={`w-4 h-4 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            setShowSettings(!showSettings);
          }}
        />
        
        {/* Settings Dropdown */}
        {showSettings && (
          <div className={`absolute top-8 right-0 ${themeClasses.bgSecondary} border ${themeClasses.border} rounded-lg shadow-lg p-3 z-50 min-w-48`}>
            <div className="flex items-center justify-between">
              <span className="text-sm">Theme</span>
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`flex items-center gap-2 px-3 py-1 rounded ${themeClasses.bgTertiary} hover:${themeClasses.hover} transition-colors`}
              >
                {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="text-sm">{isDarkTheme ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};