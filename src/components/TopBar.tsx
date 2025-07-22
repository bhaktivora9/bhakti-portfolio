import React from 'react';
import { Server, Settings, Sun, Moon, Menu } from 'lucide-react';

interface TopBarProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (value: boolean) => void;
  showSettings: boolean;
  setShowSettings: (value: boolean) => void;
  isExplorerCollapsed: boolean;
  setIsExplorerCollapsed: (collapsed: boolean) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  isDarkTheme,
  setIsDarkTheme,
  showSettings,
  setShowSettings,
  isExplorerCollapsed,
  setIsExplorerCollapsed,
}) => {
  return (
    <div className={`bg-themed border-b border-themed px-4 py-2 flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsExplorerCollapsed(!isExplorerCollapsed)}
          className={`md:hidden p-1 hover-themed rounded`}
          title="Toggle Explorer"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2">
          <Server className={`w-5 h-5 accent-themed`} />
          <span className="text-m font-medium animate-slide-in-left">bhakti.dev</span>
          <div className="absolute top-4 left-2 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75 animate-glow"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 relative">
        <Settings 
          className={`w-4 h-4 text-secondary-themed hover:text-primary-themed cursor-pointer hover-rotate transition-all duration-300`}
          onClick={(e) => {
            e.stopPropagation();
            setShowSettings(!showSettings);
          }}
        />
        
        {/* Settings Dropdown */}
        {showSettings && (
          <div className={`absolute top-8 right-0 bg-secondary-themed border border-themed rounded-lg shadow-lg p-3 z-50 min-w-48 animate-slide-down`}>
            <div className="flex items-center justify-between">
              <span className="text-sm">Theme</span>
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`flex items-center gap-2 px-3 py-1 rounded bg-tertiary-themed hover:hover-themed transition-colors`}
              >
                {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="text-sm transition-all duration-200">{isDarkTheme ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};