import React, { useState,  useEffect } from 'react';
import { trackPageView, trackFileOpen, trackTerminalCommand, trackResumeDownload, trackContactClick } from './utils/analytics';
import { TopBar } from './components/TopBar';
import { FileExplorer } from './components/FileExplorer';
import { TabBar } from './components/TabBar';
/*import { NotificationBar } from './components/NotificationBar';
*/import { Terminal } from './components/Terminal';
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
import {personalInfo} from './data/portfolio'
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

const themeStyles = `
  :root {
    /* Light Theme Colors */
    --bg-light: #ffffff;
    --bg-light-secondary: #f3f4f6;
    --bg-light-tertiary: #e5e7eb;
    --text-light: #374151;
    --text-light-primary: #111827;
    --text-light-secondary: #4b5563;
    --border-light: #d1d5db;
    --border-light-accent:#00ccfa;
    --hover-light: rgba(229, 231, 235, 0.5);
    --accent-light: #2563eb;
    
    /* Dark Theme Colors */
    --bg-dark: #111827;
    --bg-dark-secondary: #1f2937;
    --bg-dark-tertiary: #374151;
    --text-dark: #d1d5db;
    --text-dark-primary: #ffffff;
    --text-dark-secondary: #9ca3af;
    --border-dark: #374151;
    --border-dark-accent:#f5c13d;
    --hover-dark: rgba(55, 65, 81, 0.5);
    --accent-dark: #60a5fa;
  }

  /* Default to light theme */
  :root {
    --bg: var(--bg-light);
    --bg-secondary: var(--bg-light-secondary);
    --bg-tertiary: var(--bg-light-tertiary);
    --text: var(--text-light);
    --text-primary: var(--text-light-primary);
    --text-secondary: var(--text-light-secondary);
    --border: var(--border-light);
    --border-accent:var(--border-light-accent);
    --hover: var(--hover-light);
    --accent: var(--accent-light);
  }

  /* Dark theme */
  [data-theme="dark"] {
    --bg: var(--bg-dark);
    --bg-secondary: var(--bg-dark-secondary);
    --bg-tertiary: var(--bg-dark-tertiary);
    --text: var(--text-dark);
    --text-primary: var(--text-dark-primary);
    --text-secondary: var(--text-dark-secondary);
    --border: var(--border-dark);
    --border-accent:var(--border-dark-accent);
    --hover: var(--hover-dark);
    --accent: var(--accent-dark);
  }

  /* Usage classes */
  .bg-themed { background-color: var(--bg); }
  .bg-secondary-themed { background-color: var(--bg-secondary); }
  .bg-tertiary-themed { background-color: var(--bg-tertiary); }
  .text-themed { color: var(--text); }
  .text-primary-themed { color: var(--text-primary); }
  .text-secondary-themed { color: var(--text-secondary); }
  .border-themed { border-color: var(--border); }
  .border-accent-themed { border-color: var(--border-accent); }
  .hover-themed:hover { background-color: var(--hover); }
  .accent-themed { color: var(--accent); }
`;

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
  const [terminalHistory, setTerminalHistory] = useState<TerminalCommand[]>([
    {
      command: 'npm run dev',
      output: 'Portfolio server running at http://localhost:5173/',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  //const sidebarRef = useRef<HTMLDivElement>(null);

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
    // Inject theme styles
    const styleElement = document.createElement('style');
    styleElement.textContent = themeStyles;
    document.head.appendChild(styleElement);

    // Set theme attribute on document
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');

    return () => {
      document.head.removeChild(styleElement);
    };
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

  const themeClasses = {
    bg: 'bg-themed',
    bgSecondary: 'bg-secondary-themed',
    bgTertiary: 'bg-tertiary-themed',
    text: 'text-themed',
    textPrimary: 'text-primary-themed',
    textSecondary: 'text-secondary-themed',
    borderAccent: 'border-accent-themed',
    border: 'border-themed',
    hover: 'hover-themed',
    accent: 'accent-themed',
    buttonAccent: 'bg-[color:var(--border-accent)]',  
  };
  const getTabContent = () => {
    const contentClasses = `flex-1 p-6 overflow-y-auto ${themeClasses.text}`;

    switch (activeTab) {
      case 'Home.jsx':
        return (
          <div className={contentClasses}>
            <HomeSection 
              setActiveTab={setActiveTab} 
              openTabs={openTabs}
              setOpenTabs={setOpenTabs}
              themeClasses={themeClasses}
              />
          </div>
        );

      case 'About.java':
        return (
          <div className={contentClasses}>
            <AboutSection themeClasses={themeClasses} />
          </div>
        );

      case 'Work.css':
        return (
          <div className={contentClasses}>
            <WorkSection themeClasses={themeClasses} />
          </div>
        );

      case 'education.yml':
        return (
          <div className={contentClasses}>
            <EducationSection themeClasses={themeClasses} />
          </div>
        );

      case 'projects.ts':
        return (
          <div className={contentClasses}>
            <ProjectsSection themeClasses={themeClasses} />
          </div>
        );

      case 'skills.json':
        return (
          <div className={contentClasses}>
            <SkillsSection themeClasses={themeClasses} />
          </div>
        );

      case 'Contact.html':
        return (
          <div className={contentClasses}>
            <ContactSection themeClasses={themeClasses} />
          </div>
        );

      case 'resume.pdf':
        return (
          <div className={contentClasses}>
            <ResumeSection themeClasses={themeClasses} />
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
            <div className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-4 mb-6`}>
              <div className={`text-sm font-mono ${themeClasses.textPrimary} mb-3`}>
                <span className="text-gray-500">// </span>
                <span className="text-purple-400">Welcome to</span> <span className="text-blue-400">Bhakti.dev</span>
              </div>
              <p className={`${themeClasses.text} text-sm mb-4`}>
                Select a file from the explorer or use terminal commands to navigate.
              </p>
              <h3 className={`text-sm font-semibold ${themeClasses.textPrimary} mb-2 font-mono`}>
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
              <div className={`text-sm font-mono ${themeClasses.textPrimary} mt-2`}>];</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`h-screen ${themeClasses.bg} ${themeClasses.text} flex flex-col`}>
      <TopBar
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        themeClasses={themeClasses}
      />

      {/*<NotificationBar themeClasses={themeClasses} />*/}

      <div className="flex flex-1 overflow-hidden">
        <FileExplorer
          fileStructure={fileStructure}
          activeTab={activeTab}
          expandedFolders={expandedFolders}
          sidebarWidth={sidebarWidth}
          isResizing={isResizing}
          themeClasses={themeClasses}
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
            themeClasses={themeClasses}
          />

          <div className={`flex-1 overflow-y-auto ${themeClasses.bg} ${!isTerminalOpen ? 'pb-0' : ''}`}>
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
            themeClasses={themeClasses}
          />
        </div>
      </div>

      <ContextMenu
        contextMenu={contextMenu}
        onDownloadResume={() => {
          downloadResume();
          trackContactClick('resume_download');
        }}
        themeClasses={themeClasses}
      />

      <StatusBar
        isTerminalOpen={isTerminalOpen}
        setIsTerminalOpen={setIsTerminalOpen}
      />
    </div>
  );
}

export default App;
