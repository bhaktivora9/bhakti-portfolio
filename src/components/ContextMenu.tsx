import React from 'react';
import { Download } from 'lucide-react';

interface ContextMenuProps {
  contextMenu: { x: number; y: number; show: boolean };
  onDownloadResume: () => void;
  themeClasses: any;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  contextMenu,
  onDownloadResume,
  themeClasses
}) => {
  if (!contextMenu.show) return null;

  return (
    <div 
      className={`fixed ${themeClasses.bgSecondary} border ${themeClasses.border} rounded-lg shadow-lg py-2 z-50`}
      style={{ left: contextMenu.x, top: contextMenu.y }}
    >
      <button
        onClick={onDownloadResume}
        className={`flex items-center gap-2 px-4 py-2 text-sm ${themeClasses.text} hover:${themeClasses.textPrimary} ${themeClasses.hover} w-full text-left`}
      >
        <Download className="w-4 h-4" />
        Download Resume
      </button>
    </div>
  );
};