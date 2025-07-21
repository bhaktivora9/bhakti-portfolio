import React from 'react';
import {  X } from 'lucide-react';
import { getFileIcon } from '../utils/fileIcons';

interface TabBarProps {
  openTabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCloseTab: (tab: string) => void;
  themeClasses: any;
}

export const TabBar: React.FC<TabBarProps> = ({
  openTabs,
  activeTab,
  setActiveTab,
  onCloseTab,
  themeClasses
}) => {
  const handleCloseTab = (e: React.MouseEvent, tab: string) => {
    e.stopPropagation();
    onCloseTab(tab);
  };

  return (
    <div className={`${themeClasses.bgSecondary} border-b ${themeClasses.border} flex items-center`}>
      <div className="flex">
        {openTabs.map((tab) => (
          <div
            key={tab}
            className={`px-4 py-2 text-sm border-r ${themeClasses.border} cursor-pointer flex items-center gap-2 ${
              activeTab === tab 
                ? `${themeClasses.bg} ${themeClasses.textPrimary} border-t-2 border-t-blue-400` 
                : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary} ${themeClasses.hover}`
            }`}
            onClick={() => setActiveTab(tab)}
          >
            <div className="w-5 h-5">{getFileIcon(tab)}</div>
            <span>{tab}</span>
            {openTabs.length > 1 && (
              <X 
                className={`w-3 h-3 ml-1 ${themeClasses.hover} rounded p-0.5 hover:${themeClasses.textPrimary}`}
                onClick={(e) => handleCloseTab(e, tab)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};