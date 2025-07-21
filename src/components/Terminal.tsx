import React, { useRef, useEffect } from 'react';
import { Search, Maximize2, X, Play } from 'lucide-react';

interface TerminalCommand {
  command: string;
  output: string;
  timestamp: string;
}

interface TerminalProps {
  isTerminalOpen: boolean;
  setIsTerminalOpen: (value: boolean) => void;
  activePanel: string;
  setActivePanel: (panel: string) => void;
  terminalHistory: TerminalCommand[];
  currentCommand: string;
  setCurrentCommand: (command: string) => void;
  onTerminalCommand: (command: string) => void;
  themeClasses: any;
}

export const Terminal: React.FC<TerminalProps> = ({
  isTerminalOpen,
  setIsTerminalOpen,
  activePanel,
  setActivePanel,
  terminalHistory,
  currentCommand,
  setCurrentCommand,
  onTerminalCommand,
  themeClasses
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onTerminalCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  if (!isTerminalOpen) return null;

  return (
    <div className={`h-48 ${themeClasses.bgSecondary} border-t ${themeClasses.border} flex flex-col`}>
      {/* Panel Tabs */}
      <div className={`flex items-center border-b ${themeClasses.border}`}>
        {['PROBLEMS', 'OUTPUT', 'DEBUG CONSOLE', 'TERMINAL', 'PORTS'].map((panel) => (
          <button
            key={panel}
            className={`px-4 py-2 text-xs font-medium border-r ${themeClasses.border} ${
              activePanel === panel 
                ? `${themeClasses.bg} ${themeClasses.textPrimary}` 
                : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary} ${themeClasses.hover}`
            }`}
            onClick={() => setActivePanel(panel)}
          >
            {panel}
          </button>
        ))}
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 px-4">
          <input 
            type="text" 
            placeholder="Filter (e.g. text, !exclude, \\escape)"
            className={`${themeClasses.bgTertiary} border ${themeClasses.border} rounded px-2 py-1 text-xs ${themeClasses.text} w-64`}
          />
          <Search className={`w-4 h-4 ${themeClasses.textSecondary}`} />
          <Maximize2 className={`w-4 h-4 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} cursor-pointer`} />
          <X 
            className={`w-4 h-4 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} cursor-pointer`}
            onClick={() => setIsTerminalOpen(false)}
          />
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto" ref={terminalRef}>
        {activePanel === 'TERMINAL' && (
          <div className="p-4 font-mono text-sm h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {terminalHistory.map((entry, index) => (
                <div key={index} className="mb-2">
                  <div className="flex items-center gap-2 text-green-400">
                    <span>$</span>
                    <span>{entry.command}</span>
                    <span className={`${themeClasses.textSecondary} text-xs ml-auto`}>{entry.timestamp}</span>
                  </div>
                  <div className={`${themeClasses.text} ml-4 mb-2`}>{entry.output}</div>
                </div>
              ))}
            </div>
            <div className={`flex items-center gap-2 mt-2 border-t ${themeClasses.border} pt-2`}>
              <span className="text-green-400">$</span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`flex-1 bg-transparent ${themeClasses.text} outline-none`}
                placeholder="Type a command (try 'help')"
                autoFocus
              />
              <button
                onClick={() => onTerminalCommand(currentCommand)}
                className="text-blue-400 hover:text-blue-300"
              >
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {activePanel === 'OUTPUT' && (
          <div className={`p-4 text-sm ${themeClasses.textSecondary}`}>
            <div>[Extension Host] Portfolio loaded successfully</div>
            <div>[Extension Host] All components rendered</div>
            <div>[Extension Host] Interactive terminal ready</div>
          </div>
        )}
      </div>
    </div>
  );
};