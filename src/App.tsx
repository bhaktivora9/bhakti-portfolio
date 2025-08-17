import React, { useState, useEffect, useCallback } from 'react';
import { TopBar } from './components/TopBar';
import { LeftNavigation } from './components/LeftNavigation';
import { FileExplorer } from './components/FileExplorer';
import { LineNumberGutter } from './components/LineNumberGutter';
import { TabBar } from './components/TabBar';
import { SubTabBar } from './components/SubTabBar';
import { WelcomeSection } from './sections/WelcomeSection';
import { AboutSection } from './sections/AboutSection';
import { WorkSection } from './sections/WorkSection';
import { EducationSection } from './sections/EducationSection';
import { ProjectsSection } from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import { ContactSection } from './sections/ContactSection';
import { Terminal } from './components/Terminal';
import { ResumeSection } from './sections/ResumeSection';

import { Download, Code2 } from 'lucide-react';
import { trackPageView, trackFileOpen,  trackResumeDownload } from './utils/analytics';
import { personalInfo } from './data/portfolio';

import './index.css';


interface ContextMenuState {
  x: number;
  y: number;
  fileName: string;
}

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  color?: string;
  command?: string;
  children?: FileItem[];
}

interface FileStructureItem {
  name: string;
  type: 'file' | 'folder';
  color?: string;
  children?: FileStructureItem[];
}

function App() {
  
  const fileStructure: FileStructureItem[] = [
    {
      name: 'bhakti-vora-portfolio',
      type: 'folder',
      children: [
        { name: 'About.java', type: 'file', color: 'var(--vscode-accent)' },
        { name: 'Work.css', type: 'file', color: 'var(--vscode-sky)' },
        { name: 'education.yml', type: 'file', color: 'var(--vscode-purple)' },
        { name: 'projects.ts', type: 'file', color: 'var(--vscode-emerald)' },
        { name: 'skills.json', type: 'file', color: 'var(--vscode-yellow)' },
        { name: 'Contact.html', type: 'file', color: 'var(--vscode-orange)' },
        { name: 'resume.pdf', type: 'file', color: 'var(--vscode-red)' }
      ]
    }
  ];

  // State declarations
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('');
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  //const [showFloatingForm, setShowFloatingForm] = useState<boolean>(false);
  const [isExplorerCollapsed, setIsExplorerCollapsed] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidth] = useState<number>(200);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [leftNavActiveItem, setLeftNavActiveItem] = useState('explorer');

  const resumeUrl = `${import.meta.env.BASE_URL}assets/${personalInfo.resume}`;

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['bhakti-vora-portfolio']));



  const downloadResume = () => {
    trackResumeDownload();
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Bhakti Vora Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setContextMenu(null);
  };

  const handleFileClick = (item: FileItem) => {
    trackFileOpen(item.name);
    
    // Set dynamic accent color based on file
    const fileColor = getFileColor(item.name);
    if (fileColor && fileColor !== 'var(--vscode-accent)') {
      document.documentElement.style.setProperty('--vscode-accent', fileColor);
      document.documentElement.style.setProperty('--vscode-accent-hover', fileColor + '90'); // Add transparency for hover
    } else {
      // Reset to default accent color
      document.documentElement.style.setProperty('--vscode-accent', 'var(--vscode-default-accent)');
      document.documentElement.style.setProperty('--vscode-accent-hover', 'var(--vscode-default-accent-hover)');
    }
    
    // Add tab to openTabs if not already open
    if (!openTabs.includes(item.name)) {
      setOpenTabs(prev => [...prev, item.name]);
    }
    setActiveTab(item.name);
    if (item.command) {
      // Terminal commands are now handled by TerminalComplete component
    }
  };
  
  const handleCloseTab = useCallback((fileName: string) => {
  const newTabs = openTabs.filter(tab => tab !== fileName);
  setOpenTabs(newTabs);
    
  if (activeTab === fileName) {
      const newActiveTab = newTabs.length > 0 ? newTabs[newTabs.length - 1] : '';
      setActiveTab(newActiveTab);
      
      // Update accent color for new active tab or reset to default
      if (newActiveTab) {
        const fileColor = getFileColor(newActiveTab);
        if (fileColor && fileColor !== 'var(--vscode-accent)') {
          document.documentElement.style.setProperty('--vscode-accent', fileColor);
          document.documentElement.style.setProperty('--vscode-accent-hover', fileColor + '90');
        } else {
          document.documentElement.style.setProperty('--vscode-accent', 'var(--vscode-default-accent)');
          document.documentElement.style.setProperty('--vscode-accent-hover', 'var(--vscode-default-accent-hover)');
        }
      } else {
        // No tabs open, reset to default
        document.documentElement.style.setProperty('--vscode-accent', 'var(--vscode-default-accent)');
        document.documentElement.style.setProperty('--vscode-accent-hover', 'var(--vscode-default-accent-hover)');
      }
    }
  }, [openTabs, activeTab, setOpenTabs, setActiveTab]);

  // Handle server click to close all tabs and go to welcome
  const handleServerClick = () => {
    setOpenTabs([]);
    setActiveTab('');
    // Reset accent color to default
    document.documentElement.style.setProperty('--vscode-accent', 'var(--vscode-default-accent)');
    document.documentElement.style.setProperty('--vscode-accent-hover', 'var(--vscode-default-accent-hover)');
  };
;
// Helper function to get file color from structure
  const getFileColor = (fileName: string): string => {
    for (const folder of fileStructure) {
      if (folder.children) {
        const file = folder.children.find(child => child.name === fileName);
        if (file && file.color) {
          return file.color;
        }
      }
    }
    return 'var(--vscode-accent)'; // fallback color
  };

  const handleSetActiveTab = useCallback((tab: string) => {
    // Set dynamic accent color based on active tab
    const fileColor = getFileColor(tab);
    if (fileColor && fileColor !== 'var(--vscode-accent)') {
      document.documentElement.style.setProperty('--vscode-accent', fileColor);
      document.documentElement.style.setProperty('--vscode-accent-hover', fileColor + '90');
    } else {
      // Reset to default accent color
      document.documentElement.style.setProperty('--vscode-accent', 'var(--vscode-default-accent)');
      document.documentElement.style.setProperty('--vscode-accent-hover', 'var(--vscode-default-accent-hover)');
    }
    
    setActiveTab(tab);
  }, [setActiveTab]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    document.documentElement.className = isDarkTheme ? 'dark' : '';
  }, [isDarkTheme]);

  /*const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };*/

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (contextMenu && event.target && event.target instanceof Element) {
        if (!event.target.closest('.context-menu')) {
          setContextMenu(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [contextMenu]);

// Handle file opening from terminal
  useEffect(() => {
    const handleOpenFile = (event: CustomEvent) => {
      const { fileName } = event.detail;
      if (!openTabs.includes(fileName)) {
        handleFileClick({ name: fileName, type: 'file' });
      } else {
        handleSetActiveTab(fileName);
      }
    };

    window.addEventListener('openFile', handleOpenFile as EventListener);
    return () => {
      window.removeEventListener('openFile', handleOpenFile as EventListener);
    };
  }, [openTabs, handleSetActiveTab]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('resize-handle')) {
      setIsResizing(true);
      e.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = Math.max(200, Math.min(400, e.clientX));
      setSidebarWidth(newWidth);
    }
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    trackPageView('Portfolio Home');
  }, []);

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (expandedFolders.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  // Simple 2s loading delay
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second delay

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const handleRightClick = (e: React.MouseEvent, fileName: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      fileName
    });
  };


    const LoadingScreen = () => (
  <div className="h-screen bg-black flex flex-col items-center justify-center transition-colors text-center space-y-6">
  <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center shadow-2xl">
    <Code2 size={70} className="text-white" />
  </div>
  
  <p className="text-gray-400 text-sm">
    Setting up your development environment
  </p>
  
  <div className="space-x-2">
    <span className="dot bg-sky-400 inline-block"></span>
    <span className="dot bg-red-400 inline-block"></span>
    <span className="dot bg-purple-400 inline-block"></span>
    <span className="dot bg-amber-400 inline-block"></span>
    <span className="dot bg-green-400 inline-block"></span>
  </div>
</div>
  );
  const getTabContent = () => {
    const contentClasses = `flex-1 overflow-y-auto text-themed transition-all duration-300`;
    const paddingClasses = `p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-8 flex-1`;

    // Show welcome screen if no tabs are open
    if (openTabs.length === 0 || !activeTab) {
      return (
        <div className={contentClasses}>
          <WelcomeSection 
            setActiveTab={handleSetActiveTab} 
            openTabs={openTabs} 
            setOpenTabs={setOpenTabs} 
          />
        </div>
      );
    }

    switch (activeTab) {
      case 'About.java':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={50} />
              {/* Content */}
              <div className={paddingClasses}>
                <div className="font-mono">
                  <AboutSection setActiveTab={handleSetActiveTab} openTabs={openTabs} setOpenTabs={setOpenTabs} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'Work.css':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={80} />
              {/* Content */}
              <div className={paddingClasses}>
                <div className="font-mono">
                  <WorkSection color={getFileColor('Work.css')} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects.ts':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={60} />
              {/* Content */}
              <div className={paddingClasses}>
                <div className="font-mono">
                  <ProjectsSection color="var(--vscode-green)" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'skills.json':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={70} />
              {/* Content */}
              <div className={paddingClasses}>
                  <SkillsSection />
              </div>
            </div>
          </div>
        );

      case 'Contact.html':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={50} />
              {/* Content */}
              <div className={paddingClasses}>
                  <ContactSection />
              </div>
            </div>
          </div>
        );

      case 'education.yml':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={30} />
              {/* Content */}
              <div className={paddingClasses}>
                  <EducationSection color={getFileColor('education.yml')} />
              </div>
            </div>
          </div>
        );

      case 'resume.pdf':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={100} />
              {/* Content */}
              <div className={paddingClasses}>
                <ResumeSection color={getFileColor('resume.pdf')}/>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={20} />
              {/* Content */}
              <div className={paddingClasses}>
                <WelcomeSection 
                  setActiveTab={handleSetActiveTab} 
                  openTabs={openTabs} 
                  setOpenTabs={setOpenTabs} 
                />
              </div>
            </div>
          </div>
        );
    }
  };

  // Show loading screen initially
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div id="app-root" className="h-screen bg-vscode-primary text-vscode-primary flex flex-col overflow-hidden theme-transition">
      <TopBar id="app-top-bar" isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}   onServerClick={handleServerClick}/>
      
      <div id="app-main-container" className="flex flex-1 overflow-hidden">
        <LeftNavigation
          id="app-left-navigation"
          isExplorerCollapsed={isExplorerCollapsed}
          setIsExplorerCollapsed={setIsExplorerCollapsed}
          isTerminalOpen={isTerminalOpen}
          setIsTerminalOpen={setIsTerminalOpen}
          isDarkTheme={isDarkTheme}
          setIsDarkTheme={setIsDarkTheme}
          /*setShowFloatingForm={setShowFloatingForm}*/
          activeItem={leftNavActiveItem}
          setActiveItem={setLeftNavActiveItem}
        />

        <FileExplorer
          id="app-file-explorer"
          fileStructure={fileStructure}
          activeTab={activeTab}
          expandedFolders={expandedFolders}
          sidebarWidth={sidebarWidth}
          isResizing={isResizing}
          isCollapsed={isExplorerCollapsed}
          setIsCollapsed={setIsExplorerCollapsed}
          onFileClick={handleFileClick}
          onFolderToggle={toggleFolder}
          onRightClick={handleRightClick}
          onMouseDown={handleMouseDown}
        />
    
        <div id="app-content-area" className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isExplorerCollapsed ? 'ml-0' : ''}`}>
          <TabBar
            id="app-tab-bar"
            fileStructure={fileStructure}
            activeTab={activeTab}
            openTabs={openTabs}
            setActiveTab={handleSetActiveTab}
            onCloseTab={handleCloseTab}
          />
          {openTabs.length > 0 && <SubTabBar id="app-sub-tab-bar" activeTab={activeTab} />}

          <div id="app-main-content" className={`main-content-area flex-1 ${activeTab ? 'overflow-y-auto' : 'overflow-y-auto'} bg-themed transition-all duration-300 ${
            isTerminalOpen ? 'pb-0' : ''
          }`}>
            {getTabContent()}
          </div>

 {isTerminalOpen && (
          <div id="app-terminal-container" className="fixed inset-x-0 bottom-0 h-80 flex flex-col z-50 bg-black shadow-2xl border-t border-gray-600">
            <div id="app-terminal-header" className="bg-gray-900 px-3 py-2 flex items-center justify-between border-b border-gray-600">
              {/* macOS-style traffic lights */}
              <div id="app-terminal-header-left" className="flex items-start justify-between gap-3">
                {/* Terminal icon */}
                <div id="app-terminal-icon" className="flex items-start gap-2 justify-between w-5 h-5 text-white">
                  <span className="text-sm" style={{ fontFamily: 'Consolas, "Courier New", monospace' }}>{'\>_'}</span>
                <span id="app-terminal-label" className="text-white gap-2 italic uppercase text-sm " style={{ fontFamily: 'Consolas, "Courier New", monospace' }}>Terminal</span>
                </div>
                {/* Terminal title */}
                
              </div>
              
              {/* Terminal controls */}
              <div id="app-terminal-controls" className="flex items-center gap-2">
                
              <button
                id="app-terminal-close-btn"
                onClick={() => {
                  setIsTerminalOpen(false);
                  if (activeTab === 'terminal') {
                    setActiveTab('explorer');
                  }
                }}
                className="p-1 hover:bg-red-600 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-300 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              </div>
            </div>
        
            <Terminal id="app-terminal" />
          </div>
        )}
             </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div 
          id="app-context-menu"
          className="fixed bg-vscode-secondary border border-vscode-border rounded-lg shadow-lg py-2 z-50 context-menu"
          style={{ 
            left: contextMenu.x, 
            top: contextMenu.y,
            minWidth: '150px'
          }}
        >
          {contextMenu.fileName === 'resume.pdf' && (
            <button
              id="app-context-menu-download"
              onClick={downloadResume}
              className="w-full px-4 py-2 text-left text-vscode-text-primary hover:bg-vscode-bg-tertiary transition-colors flex items-center gap-2"
            >
              <Download id="app-context-menu-download-icon" className="w-4 h-4" />
              Download Resume
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;