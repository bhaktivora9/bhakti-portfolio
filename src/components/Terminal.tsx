import { useState, useRef, useEffect, useMemo } from 'react';
import { terminalCommands, personalInfo } from '../data/portfolio';
import { trackResumeDownload, trackPageView } from '../utils/analytics';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}

interface TerminalProps {
  id?: string;
}

const getColors = (theme: string) => {
  if (theme === 'light') {
    return {
      prompt: {
        user: '#209d7a',      
        at: '#222222',        
        host: '#2563eb',      
        colon: '#222222',     
        path: '#b7791f',      
        dollar: '#209d7a',    
      },
      text: {
        command: '#2f2f2f',   
        output: '#444444',    
        error: '#b91c1c',     
        success: '#209d7a',   
        warning: '#ca8a04',   
        info: '#2563eb',      
      }
    };
  } else {
    
    return {
      prompt: {
        user: '#4EC9B0',      
        at: '#FFFFFF',        
        host: '#569CD6',      
        colon: '#FFFFFF',     
        path: '#DCDCAA',      
        dollar: '#4EC9B0',    
      },
      text: {
        command: '#FFFFFF',   
        output: '#CCCCCC',    
        error: '#F44747',     
        success: '#4EC9B0',   
        warning: '#FFCC02',   
        info: '#569CD6',      
      }
    };
  }
};

export function Terminal({ id }: TerminalProps = {}) {
  
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'dark';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const colors = useMemo(() => getColors(theme), [theme]);

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

  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: `\x1b[36mWelcome to ${personalInfo.name}'s portfolio terminal!\x1b[0m` },
    { type: 'output', content: '\x1b[33mType "help" to see available commands.\x1b[0m' },
    { type: 'output', content: '' },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  
  const parseAnsiColors = (text: string) => {
    const ansiRegex = /\x1b\[(\d+)m/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = ansiRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ text: text.slice(lastIndex, match.index), color: null });
      }
      
      const colorCode = match[1];
      const colorMap: { [key: string]: string } = theme === 'light'
        ? {
          '0': '#444444',
          '31': '#b91c1c',
          '32': '#209d7a',
          '33': '#ca8a04',
          '34': '#2563eb',
          '35': '#9333ea',
          '36': '#209d7a',
          '37': '#2f2f2f',
        }
        : {
          '0': '#CCCCCC',
          '31': '#F44747',
          '32': '#4EC9B0',
          '33': '#FFCC02',
          '34': '#569CD6',
          '35': '#C586C0',
          '36': '#4EC9B0',
          '37': '#FFFFFF',
        };
      
      parts.push({ color: colorMap[colorCode] || (theme === 'light' ? '#444444' : '#CCCCCC') });
      lastIndex = ansiRegex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push({ text: text.slice(lastIndex), color: null });
    }
    
    return parts;
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    
    setHistory(prev => [...prev, { type: 'command', content: trimmedCmd }]);
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    
    const [command, ...args] = trimmedCmd.split(' ');
    const commandLower = command.toLowerCase();

    let output: string[] = [];
    
    if (commandLower === 'clear') {
      setHistory([]);
      return;
    }

    if (commandLower === 'cat') {
      const filename = args[0];
      if (!filename) {
        output = ['\x1b[31mcat: missing file operand\x1b[0m', '\x1b[33mTry "cat [filename]" or "ls" to see available files.\x1b[0m'];
      } 
    } else if (commandLower === 'resume') {
      output = [
        '\x1b[32mResume download initiated...\x1b[0m',
        `\x1b[36m📄 resume_${personalInfo.name.toLowerCase().replace(' ', '_')}.pdf\x1b[0m`,
        '',
        '',
      ];
      downloadResume();
    } else if (terminalCommands[commandLower as keyof typeof terminalCommands]) {
      output = terminalCommands[commandLower as keyof typeof terminalCommands];
      
      
      const commandMap: { [key: string]: string } = {
        'about': 'About.java',

        'experience': 'Work.css',
        'work': 'Work.css',
        'education': 'education.yml',
        'projects': 'projects.ts',
        'skills': 'skills.json',
        'contact': 'Contact.html',
        'resume': 'resume.pdf',
      };

      if (commandMap[commandLower]) {
        
        trackPageView(commandMap[commandLower]);
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('openFile', { 
            detail: { fileName: commandMap[commandLower] } 
          }));
        }, 100);
      }
    } else {
      output = [
        `\x1b[31mCommand not found: ${command}\x1b[0m`,
        '\x1b[33mType "help" to see available commands.\x1b[0m',
        '',
      ];
    }

    
    output.forEach(line => {
      setHistory(prev => [...prev, { type: 'output', content: line }]);
    });
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
      id={id || "terminal-container"}
      ref={terminalRef}
      className="bg-vscode-primary flex-1 font-mono text-sm leading-5 overflow-auto p-4 min-h-0 w-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500"
      onClick={() => inputRef.current?.focus()}
    >
      <div id="terminal-content" className="text-vscode-text-primary whitespace-pre-wrap">
        {history.map((line, index) => (
          <div 
            key={`terminal-line-${index}`}
            id={`terminal-line-${index}`}
            className="flex items-center"
          >
            {line.type === 'command' ? (
              <>
                <span style={{ color: colors.prompt.user }}>bhakti</span>
                <span style={{ color: colors.prompt.at }}>@</span>
                <span style={{ color: colors.prompt.host }}>portfolio</span>
                <span style={{ color: colors.prompt.colon }}>:</span>
                <span style={{ color: colors.prompt.path }}>~/portfolio</span>
                <span style={{ color: colors.prompt.dollar }}>$ </span>
                <span style={{ color: colors.text.command }}>{line.content}</span>
              </>
            ) : (
              <span>
                {parseAnsiColors(line.content).map((part, partIndex) => (
                  <span 
                    key={partIndex} 
                    style={{ color: part.color || colors.text.output }}
                  >
                    {part.text}
                  </span>
                ))}
              </span>
            )}
          </div>
        ))}
        
        <form id="terminal-input-form" onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
          <span id="terminal-prompt-user" style={{ color: colors.prompt.user }} className="flex-shrink-0">bhakti</span>
          <span id="terminal-prompt-at" style={{ color: colors.prompt.at }} className="flex-shrink-0">@</span>
          <span id="terminal-prompt-host" style={{ color: colors.prompt.host }} className="flex-shrink-0">portfolio</span>
          <span id="terminal-prompt-colon" style={{ color: colors.prompt.colon }} className="flex-shrink-0">:</span>
          <span id="terminal-prompt-path" style={{ color: colors.prompt.path }} className="flex-shrink-0">~/portfolio</span>
          <span id="terminal-prompt-dollar" style={{ color: colors.prompt.dollar }} className="flex-shrink-0">$ </span>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none min-w-0"
            style={{ 
              color: colors.text.command,
              caretColor: colors.prompt.host
            }}
            placeholder="Type a command..."
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}