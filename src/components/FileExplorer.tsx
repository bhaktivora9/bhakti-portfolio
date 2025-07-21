import React from 'react';
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen, Search, GitBranch } from 'lucide-react';
import { getFileIcon } from '../utils/fileIcons';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  icon?: string;
  children?: FileItem[];
  content?: string;
  command?: string;
}

interface FileExplorerProps {
  fileStructure: FileItem[];
  activeTab: string;
  expandedFolders: Set<string>;
  sidebarWidth: number;
  isResizing: boolean;
  themeClasses: any;
  onFileClick: (item: FileItem) => void;
  onFolderToggle: (folderName: string) => void;
  onRightClick: (e: React.MouseEvent, fileName: string) => void;
  onMouseDown: (e: React.MouseEvent) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  fileStructure,
  activeTab,
  expandedFolders,
  sidebarWidth,
  isResizing,
  themeClasses,
  onFileClick,
  onFolderToggle,
  onRightClick,
  onMouseDown
}) => {
  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map((item, index) => (
      <div key={index}>
        <div 
          className={`flex items-center py-1 px-2 ${themeClasses.hover} cursor-pointer text-sm ${
            activeTab === item.name ? `bg-blue-600/30 ${themeClasses.accent}` : themeClasses.text
          }`}
          style={{ paddingLeft: `${8 + level * 16}px` }}
          onClick={() => {
            if (item.type === 'folder') {
              onFolderToggle(item.name);
            } else {
              onFileClick(item);
            }
          }}
          onContextMenu={(e) => onRightClick(e, item.name)}
        >
          {item.type === 'folder' ? (
            <>
              {expandedFolders.has(item.name) ? (
                <ChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1" />
              )}
              {expandedFolders.has(item.name) ? (
                <FolderOpen className={`w-4 h-4 mr-2 ${themeClasses.accent}`} />
              ) : (
                <Folder className={`w-4 h-4 mr-2 ${themeClasses.accent}`} />
              )}
            </>
          ) : (
            <div className="w-4 h-4 mr-2 ml-5 flex items-center justify-center">
              {getFileIcon(item.name)}
            </div>
          )}
          <span className="flex-1">{item.name}</span>
        </div>
        {item.type === 'folder' && expandedFolders.has(item.name) && item.children && (
          <div>
            {renderFileTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={`${themeClasses.bgSecondary} border-r ${themeClasses.border} flex flex-col relative`} style={{ width: `${sidebarWidth}px` }}>
      {/* Resize Handle */}
      <div 
        className={`absolute top-0 right-0 w-1 h-full cursor-col-resize ${themeClasses.hover} ${isResizing ? 'bg-blue-500' : ''}`}
        onMouseDown={onMouseDown}
      />
      
      {/* Explorer Header */}
      <div className={`p-3 border-b ${themeClasses.border}`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold ${themeClasses.textSecondary} uppercase tracking-wide`}>Explorer</span>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          <div className={`flex items-center px-3 py-1 text-sm font-medium ${themeClasses.text}`}>
            <ChevronDown className="w-4 h-4 mr-1" />
            <span>BHAKTI-VORA</span>
          </div>
          <div className="mt-1">
            {renderFileTree(fileStructure)}
          </div>
        </div>
      </div>

      {/* Bottom Icons */}
      <div className={`border-t ${themeClasses.border} p-2`}>
        <div className="flex flex-col gap-2">
          <div className={`flex items-center gap-2 text-xs ${themeClasses.textSecondary}`}>
            <Search className="w-4 h-4" />
            <span>OUTLINE</span>
          </div>
          <div className={`flex items-center gap-2 text-xs ${themeClasses.textSecondary}`}>
            <GitBranch className="w-4 h-4" />
            <span>TIMELINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};