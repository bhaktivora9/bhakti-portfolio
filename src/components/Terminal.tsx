import { useState, useRef, useEffect } from 'react';
import { trackResumeDownload } from '../utils/analytics';

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'info';
  content: string;
  timestamp?: Date;
}

interface TerminalProps {
  id?: string;
}

// Personal info for terminal
const personalInfo = {
  name: "BHAKTI VORA",
  email: "bhaktivora16@gmail.com",
  location: "San Francisco, CA",
  resume: "Bhakti_Vora_Resume.pdf"
};

// Terminal commands and their outputs
const terminalCommands: { [key: string]: string[] } = {
  help: [
    'Available commands:',
    '  help       - Show this help message',
    '  clear      - Clear terminal',
    '  about      - Open About section',
    '  work       - Open Work Experience',
    '  experience - Open Work Experience',
    '  education  - Open Education section',
    '  projects   - Open Projects section',
    '  skills     - Open Skills section',
    '  contact    - Open Contact section',
    '  resume     - Download Resume',
    '  whoami     - Show user info',
    '  ls         - List available files',
    '  pwd        - Show current directory',
    '  date       - Show current date',
    '  echo <msg> - Echo a message',

    ''
  ],
  about: ['Opening About.java...'],
  work: ['Opening Work.css...'],
  experience: ['Opening Work.css...'],
  education: ['Opening education.yml...'],
  projects: ['Opening projects.ts...'],
  skills: ['Opening skills.json...'],
  contact: ['Opening Contact.html...'],
  resume: [
    'Resume download initiated...',
    'Downloading Bhakti Vora Resume.pdf...',
    ''
  ],
  whoami: ['bhakti@portfolio:~$ Bhakti Vora - Backend Developer'],
  ls: [
    'About.java',
    'Work.css',
    'education.yml',
    'projects.ts',
    'skills.json',
    'Contact.html',
    'resume.pdf',
    ''
  ],
  pwd: ['/home/bhakti/portfolio'],
  date: [new Date().toString(), '']
};

// File contents for cat command

export function Terminal({ id }: TerminalProps = {}) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'startup', content: `Microsoft Windows [Version 10.0.22621.963]` },
    { type: 'startup', content: `(c) Microsoft Corporation. All rights reserved.` },
    { type: 'output', content: '' },
    { type: 'info', content: `Welcome to ${personalInfo.name}'s portfolio terminal!` },
    { type: 'info', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const resumeUrl = `${import.meta.env.BASE_URL}assets/${personalInfo.resume}`;
  
  const downloadResume = () => {
    trackResumeDownload();
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Bhakti Vora Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: `bhakti.dev@portfolio:~/portfolio$ ${trimmedCmd}` }]);
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Parse command and arguments
    const [command, ...args] = trimmedCmd.split(' ');
    const commandLower = command.toLowerCase();

    let output: string[] = [];
    
    // Command to file mapping for opening files
    const commandMap: { [key: string]: string } = {
      'about': 'About.java',
      'experience': 'Work.css',
      'work': 'Work.css',
      'education': 'education.yml',
      'projects': 'projects.ts',
      'skills': 'skills.json',
      'contact': 'Contact.html',
      'home': 'Home.jsx',
      'resume': 'resume.pdf',
    };
    
    if (commandLower === 'clear') {
      setHistory([]);
      return;
    }

    if (commandLower.startsWith('echo ')) {
      const message = trimmedCmd.substring(5);
      output = [message, ''];
    } else if (commandLower === 'resume') {
      output = terminalCommands[commandLower];
      // Trigger download after showing message
      setTimeout(() => {
        downloadResume();
      }, 500);
    } else if (terminalCommands[commandLower]) {
      output = terminalCommands[commandLower];
    } else {
      output = [
        `Command not found: ${command}`,
        'Type "help" to see available commands.',
        '',
      ];
    }

    // Add output to history
    output.forEach(line => {
      setHistory(prev => [...prev, { type: 'output', content: line }]);
    });

    // Handle file opening commands (except resume which downloads)
    if (commandMap[commandLower] && commandLower !== 'resume') {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('openFile', { 
          detail: { fileName: commandMap[commandLower] } 
        }));
      }, 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(currentCommand);
    setCurrentCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      const terminal = terminalRef.current;
      terminal.scrollTo({
        top: terminal.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  useEffect(() => {
    if (terminalRef.current) {
      const terminal = terminalRef.current;
      const isScrolledToBottom = terminal.scrollHeight - terminal.clientHeight <= terminal.scrollTop + 1;
      
      if (isScrolledToBottom) {
        setTimeout(() => {
          terminal.scrollTo({
            top: terminal.scrollHeight,
            behavior: 'smooth'
          });
        }, 50);
      }
    }
  }, [history.length]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      id={id || "terminal-complete-container"}
      ref={terminalRef}
      className="bg-black flex-1 text-sm leading-5 overflow-auto p-3 min-h-0 w-full"
      style={{ 
        fontFamily: 'Consolas, "Courier New", monospace',
        fontSize: '14px'
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div id="terminal-complete-content" className="text-gray-200 whitespace-pre-wrap">
        {history.map((line, index) => (
          <div 
            key={`terminal-complete-line-${index}`}
            id={`terminal-complete-line-${index}`}
            className={`${
              line.type === 'command' 
                ? 'text-white' 
               : line.type === 'startup'
                 ? 'text-vscode-indigo italic'
                : line.type === 'error' 
                  ? 'text-red-300' 
                 : line.type === 'info' 
                 ? 'text-green-300 italic font-semibold'
                 : 'text-gray-200'
                  
            }`}
          >
            {line.content}
          </div>
        ))}
        
        <form id="terminal-complete-input-form" onSubmit={handleSubmit} className="flex items-center mt-1 sticky bottom-0 bg-black py-1">
          <div className="flex items-center">
            <span id="terminal-complete-prompt-path" className="text-white italic flex-shrink-0">C:\Users\bhakti\portfolio</span>
            <span id="terminal-complete-prompt-arrow" className="text-white flex-shrink-0 ml-1 mr-1">{">"}</span>
          </div>
          <input
            id="terminal-complete-input"
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white min-w-0 caret-white"
            style={{ 
              fontFamily: 'Consolas, "Courier New", monospace',
              fontSize: '14px'
            }}
            placeholder="Type a command..."
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}