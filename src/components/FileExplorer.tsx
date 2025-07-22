import React from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, Search, GitBranch, X, Menu, PanelLeftClose } from 'lucide-react';
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
  isCollapsed: boolean;
  isDarkTheme: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
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
  isCollapsed,
  isDarkTheme,
  setIsCollapsed,
  onFileClick,
  onFolderToggle,
  onRightClick,
  onMouseDown
}) => {
  const renderFileTree = (items: FileItem[], level = 0) => {
  
    return items.map((item, index) => (
      <div key={index}>
        <div 
          className={`flex items-center py-1 px-2 hover-themed cursor-pointer text-sm ${
            activeTab === item.name ? `bg-blue-600/30 accent-themed` : 'text-themed'
          } hover-scale-sm transition-all duration-200`}
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
                <ChevronDown className="w-4 h-4 mr-1 transition-transform duration-200" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1 transition-transform duration-200" />
              )}
              {expandedFolders.has(item.name) ? (
                <FolderOpen className={`w-4 h-4 mr-2 accent-themed`} />
              ) : (
                <Folder className={`w-4 h-4 mr-2 accent-themed`} />
              )}
            </>
          ) : (
            <div className="w-4 h-4 mr-2 ml-5 flex items-center justify-center hover-bounce">
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
 if(isDarkTheme){
    console.log("dark theme");
  }
  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsCollapsed(true)} 
        />
      )}
      
      {/* File Explorer */}
      <div 
        className={`bg-themed border-r border-themed flex flex-col relative z-50 transition-transform duration-300 ease-in-out
          fixed md:relative top-0 left-0 h-full md:h-auto
        animate-slide-in-left`} 
        style={{ 
          width: isCollapsed ? '48px' : `${Math.max(sidebarWidth, 280)}px`,
          minWidth: isCollapsed ? '48px' : '280px'
        }}
      >
        {/* Collapsed State - Small Left Bar */}
        {isCollapsed && (
          <div className={`w-full h-full bg-secondary-themed flex flex-col items-center py-4`}>
            <button
              onClick={() => setIsCollapsed(false)}
              className={`p-2 hover-themed rounded transition-all duration-300 hover-scale`}
              title="Expand Explorer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Expanded State */}
        {!isCollapsed && (
          <>
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsCollapsed(true)} 
          className={`md:hidden absolute top-3 right-3 p-2 hover-themed rounded z-10`}
        >
          <X className="w-4 h-4" />
        </button>
      
        {/* Resize Handle */}
        <div 
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover-themed transition-all duration-200 ${isResizing ? 'bg-blue-500 animate-glow' : ''}`}
          onMouseDown={onMouseDown}
        />
        
        {/* Explorer Header */}
        <div className={`p-3 border-b border-themed`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold text-secondary-themed uppercase tracking-wide`}>Explorer</span>
            <button
              onClick={() => setIsCollapsed(true)}
              className={`p-1 hover-themed rounded transition-all duration-300 hover-rotate`}
              title="Collapse Explorer"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* File Tree */}
        <div className="flex-1 overflow-y-auto animate-fade-in-scale">
          <div className="py-2">
            <div className={`flex items-center px-3 py-1 text-sm font-medium text-themed`}>
              <ChevronDown className="w-4 h-4 mr-1 animate-bounce" />
              <span className="animate-slide-in-right">BHAKTI-VORA</span>
            </div>
            <div className="mt-1">
              {renderFileTree(fileStructure)}
            </div>
          </div>
        </div>

        {/* Bottom Icons */}
        <div className={`border-t border-themed p-2`}>
          <div className="flex flex-col gap-2">
            <div className={`flex items-center gap-2 text-xs text-secondary-themed`}>
              <Search className="w-4 h-4" />
              <span>OUTLINE</span>
            </div>
            <div className={`flex items-center gap-2 text-xs text-secondary-themed`}>
              <GitBranch className="w-4 h-4" />
              <span>TIMELINE</span>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </>
  );
};