import React, { useRef, useEffect } from 'react';
import { Search, Maximize2, X, Play, ArrowDown, ArrowDownToLine } from 'lucide-react';

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
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [autoScroll, setAutoScroll] = React.useState(true);
  const [isMaximized, setIsMaximized] = React.useState(false);
  const [terminalHeight, setTerminalHeight] = React.useState(192); // 48 * 4 = 192px (h-48)
  const [isResizing, setIsResizing] = React.useState(false);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  // Handle resize functionality
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight >= 150 && newHeight <= window.innerHeight * 0.8) {
        setTerminalHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);
  useEffect(() => {
    if (autoScroll && terminalHistory.length > 0) {
      scrollToBottom();
    }
  }, [terminalHistory, autoScroll]);

  useEffect(() => {
    if (isTerminalOpen && activePanel === 'TERMINAL' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalOpen, activePanel]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onTerminalCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setTerminalHeight(window.innerHeight * 0.8);
    } else {
      setTerminalHeight(192);
    }
  };

  const handleResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };
  if (!isTerminalOpen) return null;

  const terminalStyle = isMaximized 
    ? { height: `${terminalHeight}px`, position: 'fixed' as const, bottom: 0, left: 0, right: 0, zIndex: 50 }
    : { height: `${terminalHeight}px` };
  return (
    <div 
      className={`bg-secondary-themed border-t border-themed flex flex-col animate-slide-up ${isMaximized ? 'shadow-2xl' : ''}`}
      style={terminalStyle}
    >
      {/* Resize Handle */}
      <div 
        className={`h-1 bg-secondary-themed hover:bg-blue-500 cursor-row-resize transition-colors duration-200 ${isResizing ? 'bg-blue-500' : ''}`}
        onMouseDown={handleResize}
        title="Drag to resize terminal"
      />

      {/* Panel Tabs */}
      <div className={`flex items-center border-b border-themed`}>
        {['PROBLEMS', 'OUTPUT', 'DEBUG CONSOLE', 'TERMINAL', 'PORTS'].map((panel) => (
          <button
            key={panel}
            className={`px-4 py-2 text-xs font-medium border-r border-themed ${
              activePanel === panel 
                ? `bg-themed text-primary-themed` 
                : `text-secondary-themed hover:text-primary-themed hover-themed`
            } transition-all duration-200 hover-scale-sm`}
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
            className={`bg-tertiary-themed border border-themed rounded px-2 py-1 text-xs text-themed w-64 transition-all duration-200 focus:ring-2 focus:ring-blue-400`}
          />
          <Search className={`w-4 h-4 text-secondary-themed hover-bounce`} />
          <div className="flex items-center gap-1 border-l border-themed pl-2 ml-2">
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`p-1 rounded transition-all duration-200 hover-scale ${
                autoScroll 
                  ? 'text-green-400 hover:text-green-300' 
                  : 'text-secondary-themed hover:text-primary-themed'
              }`}
              title={autoScroll ? 'Auto-scroll ON' : 'Auto-scroll OFF'}
            >
              <ArrowDownToLine className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToBottom}
              className="p-1 text-secondary-themed hover:text-primary-themed rounded transition-all duration-200 hover-scale"
              title="Scroll to bottom"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleMaximize}
            className={`p-1 rounded transition-all duration-200 hover-scale ${
              isMaximized 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-secondary-themed hover:text-primary-themed'
            }`}
            title={isMaximized ? 'Restore terminal' : 'Maximize terminal'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <X 
            className={`w-4 h-4 text-secondary-themed hover:text-primary-themed cursor-pointer hover-rotate transition-all duration-200`}
            onClick={() => setIsTerminalOpen(false)}
          />
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth" ref={terminalRef}>
        {activePanel === 'TERMINAL' && (
          <div className="p-4 font-mono text-sm h-full flex flex-col animate-fade-in-scale">
            <div className="flex-1 overflow-y-auto">
              {terminalHistory.map((entry, index) => (
                <div key={index} className={`mb-2 animate-slide-in-bottom stagger-${Math.min(index + 1, 6)}`}>
                  <div className="flex items-center gap-2 text-green-400">
                    <span>$</span>
                    <span>{entry.command}</span>
                    <span className={`text-secondary-themed text-xs ml-auto`}>{entry.timestamp}</span>
                  </div>
                  <div className={`text-themed ml-4 mb-2`}>{entry.output}</div>
                </div>
              ))}
            </div>
            <div className={`flex items-center gap-2 mt-2 border-t border-themed pt-2`}>
              <span className="text-green-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`flex-1 bg-transparent text-themed outline-none transition-all duration-200`}
                placeholder="Type a command (try 'help')"
              />
              <button
                onClick={() => onTerminalCommand(currentCommand)}
                className="text-blue-400 hover:text-blue-300 hover-scale transition-all duration-200"
              >
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {activePanel === 'OUTPUT' && (
          <div className={`p-4 text-sm text-secondary-themed`}>
            <div>[Extension Host] Portfolio loaded successfully</div>
            <div>[Extension Host] All components rendered</div>
            <div>[Extension Host] Interactive terminal ready</div>
          </div>
        )}
      </div>
    </div>
  );
};