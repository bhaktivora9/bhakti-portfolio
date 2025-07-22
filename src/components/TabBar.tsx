import React from 'react';
import {  X } from 'lucide-react';
import { getFileIcon } from '../utils/fileIcons';

interface TabBarProps {
  openTabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCloseTab: (tab: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  openTabs,
  activeTab,
  setActiveTab,
  onCloseTab,
}) => {
  const handleCloseTab = (e: React.MouseEvent, tab: string) => {
    e.stopPropagation();
    onCloseTab(tab);
  };

  return (
    <div className={`bg-secondary-themed border-b border-themed flex items-center`}>
      <div className="flex">
        {openTabs.map((tab) => (
          <div
            key={tab}
            className={`px-4 py-2 text-sm border-r border-themed cursor-pointer flex items-center gap-2 ${
              activeTab === tab 
                ? `bg-themed text-primary-themed border-t-2 border-t-blue-400` 
                : `text-secondary-themed hover:text-primary-themed hover-themed`
            } transition-all duration-300 hover-scale-sm`}
            onClick={() => setActiveTab(tab)}
          >
            <div className="w-5 h-5 hover-bounce">{getFileIcon(tab)}</div>
            <span className="transition-all duration-200">{tab}</span>
            {openTabs.length > 1 && (
              <X 
                className={`w-3 h-3 ml-1 hover-themed rounded p-0.5 hover:text-primary-themed transition-all duration-200 hover-rotate`}
                onClick={(e) => handleCloseTab(e, tab)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};