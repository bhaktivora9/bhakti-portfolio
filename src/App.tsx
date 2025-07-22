import React, { useState,  useEffect } from 'react';
import { trackPageView, trackFileOpen, trackTerminalCommand, trackResumeDownload, trackContactClick } from './utils/analytics';
import { TopBar } from './components/TopBar';
import { FileExplorer } from './components/FileExplorer';
import { TabBar } from './components/TabBar';
import { Terminal } from './components/Terminal';
import { StatusBar } from './components/StatusBar';
import { ContextMenu } from './components/ContextMenu';
import { HomeSection } from './sections/HomeSection';
import { AboutSection } from './sections/AboutSection';
import { WorkSection } from './sections/WorkSection';
import { EducationSection } from './sections/EducationSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { ContactSection } from './sections/ContactSection';
import { ResumeSection } from './sections/ResumeSection';
import { personalInfo } from './data/portfolio';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  icon?: string;
  children?: FileItem[];
  content?: string;
  command?: string;
}

interface TerminalCommand {
  command: string;
  output: string;
  timestamp: string;
}

const fileStructure: FileItem[] = [
  {
    name: 'portfolio',
    type: 'folder',
    children: [
      { name: 'Home.jsx', type: 'file', command: 'home' },
      { name: 'About.java', type: 'file', command: 'about' },
      { name: 'Work.css', type: 'file', command: 'experience' },
      { name: 'Contact.html', type: 'file', command: 'contact' },
      { name: 'education.yml', type: 'file', command: 'education' },
      { name: 'projects.ts', type: 'file', command: 'projects' },
      { name: 'skills.json', type: 'file', command: 'skills' },
      { name: 'resume.pdf', type: 'file', command: 'resume' }
    ]
  },
  {
    name: 'src',
    type: 'folder',
    children: [
      { name: 'components', type: 'folder', children: [] },
      { name: 'App.tsx', type: 'file' },
      { name: 'index.css', type: 'file' },
      { name: 'main.tsx', type: 'file' }
    ]
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'index.html', type: 'file' }
    ]
  },
  { name: '.gitignore', type: 'file' },
  { name: 'package.json', type: 'file' },
  { name: 'README.md', type: 'file' },
  { name: 'vite.config.ts', type: 'file' }
];

function App() {
  const [activeTab, setActiveTab] = useState('Home.jsx');
  const [openTabs, setOpenTabs] = useState<string[]>(['Home.jsx','README.md','Contact.html']);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['portfolio', 'src']));
  const [activePanel, setActivePanel] = useState('TERMINAL');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ x: 0, y: 0, show: false });
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [isExplorerCollapsed, setIsExplorerCollapsed] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<TerminalCommand[]>([
    {
      command: 'npm run dev',
      output: 'Portfolio server running at http://localhost:5173/',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 500) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const availableCommands = {
    help: 'Available commands: home, about, contact, experience, education, projects, skills, resume, clear, ls',
    home: 'Loading home section...',
    about: 'Loading about section...',
    contact: 'Loading contact information...',
    experience: 'Loading work experience...',
    education: 'Loading education details...',
    projects: 'Loading project portfolio...',
    skills: 'Loading technical skills...',
    resume: 'Opening resume...',
    clear: 'Terminal cleared',
    ls: 'portfolio/  src/  public/  .gitignore  package.json  README.md  vite.config.ts'
  };

  useEffect(() => {
    trackPageView('Portfolio Home');
  }, []);

  useEffect(() => {
    // Set theme attribute on document
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ x: 0, y: 0, show: false });
      setShowSettings(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleTerminalCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString();

    if (cmd === 'clear') {
      setTerminalHistory([]);
      return;
    }

    let output = '';
    if (availableCommands[cmd as keyof typeof availableCommands]) {
      output = availableCommands[cmd as keyof typeof availableCommands];

      const portfolioCommands = ['home', 'about', 'contact', 'experience', 'education', 'projects', 'skills', 'resume'];
      if (portfolioCommands.includes(cmd)) {
        trackTerminalCommand(cmd);
        const fileMap: { [key: string]: string } = {
          home: 'Home.jsx',
          about: 'About.java',
          contact: 'Contact.html',
          experience: 'Work.css',
          education: 'education.yml',
          projects: 'projects.ts',
          skills: 'skills.json',
          resume: 'resume.pdf'
        };
        setActiveTab(fileMap[cmd]);
      }
    } else {
      output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setTerminalHistory(prev => [...prev, { command, output, timestamp }]);
  };

  const handleRightClick = (e: React.MouseEvent, fileName: string) => {
    if (fileName === 'resume.pdf') {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY, show: true });
    }
  };

  const downloadResume = () => {
    trackResumeDownload();
const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}assets/${personalInfo.resume}`;
    link.download = 'BhaktiVoraResume.pdf';
    console.log("Attempting to download "+ link.href);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setContextMenu({ x: 0, y: 0, show: false });
  };

  const handleFileClick = (item: FileItem) => {
    // Add tab to openTabs if not already open
    if (!openTabs.includes(item.name)) {
      setOpenTabs(prev => [...prev, item.name]);
    }
    setActiveTab(item.name);
    if (item.command) {
      trackFileOpen(item.name);
      handleTerminalCommand(item.command);
    }
  };

  const handleCloseTab = (tabToClose: string) => {
    const newOpenTabs = openTabs.filter(tab => tab !== tabToClose);
    setOpenTabs(newOpenTabs);
    
    // If closing the active tab, switch to another tab
    if (activeTab === tabToClose && newOpenTabs.length > 0) {
      setActiveTab(newOpenTabs[newOpenTabs.length - 1]);
    }
  };

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const getTabContent = () => {
    const contentClasses = `flex-1 p-6 overflow-y-auto text-themed`;

    switch (activeTab) {
      case 'Home.jsx':
        return (
          <div className={contentClasses}>
            <HomeSection 
              setActiveTab={setActiveTab} 
              openTabs={openTabs}
              setOpenTabs={setOpenTabs}
             isDarkTheme={isDarkTheme}
              />
          </div>
        );

      case 'About.java':
        return (
          <div className={contentClasses}>
            <AboutSection isDarkTheme={isDarkTheme} />
          </div>
        );

      case 'Work.css':
        return (
          <div className={contentClasses}>
            <WorkSection isDarkTheme={isDarkTheme} />
          </div>
        );

      case 'education.yml':
        return (
          <div className={contentClasses}>
            <EducationSection isDarkTheme={isDarkTheme} />
          </div>
        );

      case 'projects.ts':
        return (
          <div className={contentClasses}>
            <ProjectsSection isDarkTheme={isDarkTheme} />
          </div>
        );

      case 'skills.json':
        return (
          <div className={contentClasses}>
            <SkillsSection isDarkTheme={isDarkTheme} />
          </div>
        );

      case 'Contact.html':
        return (
          <div className={contentClasses}>
            <ContactSection  setActiveTab={setActiveTab} 
              openTabs={openTabs}
              setOpenTabs={setOpenTabs} isDarkTheme={isDarkTheme} />
          </div>
        );

      case 'resume.pdf':
        return (
          <div className={contentClasses}>
            <ResumeSection isDarkTheme={isDarkTheme} />
          </div>
        );
      /*case 'main.tsx':
      return (<div className={contentClasses}>
            <DeveloperClass  />
          </div>
        );*/

      default:
        return (
          <div className={contentClasses}>
            <div className={`bg-secondary-themed border border-themed rounded p-4 mb-6`}>
              <div className={`text-sm font-mono text-primary-themed mb-3`}>
                <span className="text-gray-500">// </span>
                <span className="text-purple-400">Welcome to</span> <span className="text-blue-400">Bhakti.dev</span>
              </div>
              <p className={`text-themed text-sm mb-4`}>
                Select a file from the explorer or use terminal commands to navigate.
              </p>
              <h3 className={`text-sm font-semibold text-primary-themed mb-2 font-mono`}>
                <span className="text-purple-400">const</span> <span className="text-blue-400">availableCommands</span> = [
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <code className="text-green-400 text-xs ml-4">"home"</code>
                <code className="text-green-400 text-xs">"about"</code>
                <code className="text-green-400 text-xs ml-4">"contact"</code>
                <code className="text-green-400 text-xs">"experience"</code>
                <code className="text-green-400 text-xs ml-4">"education"</code>
                <code className="text-green-400 text-xs">"projects"</code>
                <code className="text-green-400 text-xs ml-4">"skills"</code>
                <code className="text-green-400 text-xs">"help"</code>
              </div>
              <div className={`text-sm font-mono text-primary-themed mt-2`}>];</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`h-screen bg-themed text-themed flex flex-col`}>
      <TopBar
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        isExplorerCollapsed={isExplorerCollapsed}
        setIsExplorerCollapsed={setIsExplorerCollapsed}
      />

      {/*<NotificationBar themeClasses={themeClasses} />*/}

      <div className="flex flex-1 overflow-hidden">
        <FileExplorer
          fileStructure={fileStructure}
          activeTab={activeTab}
          expandedFolders={expandedFolders}
          sidebarWidth={sidebarWidth}
          isResizing={isResizing}
          isCollapsed={isExplorerCollapsed}
          isDarkTheme={isDarkTheme}
          setIsCollapsed={setIsExplorerCollapsed}
          onFileClick={handleFileClick}
          onFolderToggle={toggleFolder}
          onRightClick={handleRightClick}
          onMouseDown={handleMouseDown}
        />

        <div className="flex-1 flex flex-col">
          <TabBar
            openTabs={openTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onCloseTab={handleCloseTab}
          />

          <div className={`flex-1 overflow-y-auto bg-themed ${!isTerminalOpen ? 'pb-0' : ''} ${isExplorerCollapsed ? 'ml-0' : ''}`}>
            {getTabContent()}
          </div>

          <Terminal
            isTerminalOpen={isTerminalOpen}
            setIsTerminalOpen={setIsTerminalOpen}
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            terminalHistory={terminalHistory}
            currentCommand={currentCommand}
            setCurrentCommand={setCurrentCommand}
            onTerminalCommand={handleTerminalCommand}
          />
        </div>
      </div>

      <ContextMenu
        contextMenu={contextMenu}
        onDownloadResume={() => {
          downloadResume();
          trackContactClick('resume_download');
        }}
      />

      <StatusBar
        isTerminalOpen={isTerminalOpen}
        setIsTerminalOpen={setIsTerminalOpen}
      />
    </div>
  );
}

export default App;
