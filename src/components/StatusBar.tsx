import React from 'react';
import { GitBranch, Terminal as TerminalIcon } from 'lucide-react';

interface StatusBarProps {
  isTerminalOpen: boolean;
  setIsTerminalOpen: (value: boolean) => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  isTerminalOpen,
  setIsTerminalOpen
}) => {
  return (
    <div className="bg-blue-600 text-white px-4 py-1 flex items-center justify-between text-xs relative">
      <div className="flex items-center gap-4">
        <span>Codespaces: obscure space meme</span>
        <div className="flex items-center gap-2">
          <GitBranch className="w-3 h-3" />
          <span>master*</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span>0</span>
          <span className="w-2 h-2 bg-yellow-500 rounded-full ml-2"></span>
          <span>0</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {!isTerminalOpen && (
          <button
            onClick={() => setIsTerminalOpen(true)}
            className="flex items-center gap-1 hover:bg-blue-700 px-2 py-1 rounded transition-colors"
          >
            <TerminalIcon className="w-3 h-3" />
            <span>Terminal</span>
          </button>
        )}
        <span>Portfolio Ready</span>
        <span>Layout: US</span>
      </div>
    </div>
  );
};