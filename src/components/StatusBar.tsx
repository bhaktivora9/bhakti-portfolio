import React, { useEffect, useState } from 'react';
import { GitBranch, Terminal as TerminalIcon, ArrowRight } from 'lucide-react';

interface StatusBarProps {
  isTerminalOpen: boolean;
  setIsTerminalOpen: (value: boolean) => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  isTerminalOpen,
  setIsTerminalOpen,
}) => {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowArrow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-blue-600 text-white px-4 py-1 flex items-center justify-between text-xs relative animate-slide-up">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <span className="animate-slide-in-left">Codespaces: obscure space meme</span>
        <div className="flex items-center gap-2">
          <GitBranch className="w-3 h-3 hover-bounce" />
          <span className="animate-slide-in-right stagger-1">master*</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-gentle"></span>
          <span className="animate-slide-in-bottom stagger-2">0</span>
          <span className="w-2 h-2 bg-yellow-500 rounded-full ml-2 animate-pulse-gentle"></span>
          <span className="animate-slide-in-bottom stagger-3">0</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 relative">
        {!isTerminalOpen && (
          <div className="relative flex items-center gap-2">
            {showArrow && (<span className={`text-amber-400 text-semibold animate-slide-in-left animate-pulse-gentle`}>Try this cool interactive terminal!!</span>)}  
            {showArrow && (
             <ArrowRight className="w-7 h-7 text-amber-400 animate-bounce hover-scale" />
            )}

            <button
              onClick={() => setIsTerminalOpen(true)}
              className="flex items-center gap-1 hover:bg-blue-700 px-2 py-1 rounded transition-all duration-300 z-10 relative animate-bounce-terminal hover-scale hover-glow-blue group"
            >
              <TerminalIcon className="w-3 h-3 animate-shake group-hover:animate-shake" />
              <span className="transition-all duration-200">Terminal</span>
            </button>
          </div>
        )}
        <span className="animate-slide-in-right stagger-4">Portfolio Ready</span>
        <span className="animate-slide-in-right stagger-5">Layout: US</span>
      </div>
    </div>
  );
};
