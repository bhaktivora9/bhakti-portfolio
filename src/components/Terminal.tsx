import { useState, useRef, useEffect } from 'react';
import { terminalCommands, fileContents, personalInfo } from '../data/portfolio';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}

interface TerminalProps {
  id?: string;
}

export function Terminal({ id }: TerminalProps = {}) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: `Welcome to ${personalInfo.name}'s portfolio terminal!` },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: `bhakti@portfolio:~/portfolio$ ${trimmedCmd}` }]);
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Parse command and arguments
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
        output = ['cat: missing file operand', 'Try "cat [filename]" or "ls" to see available files.'];
      } else if (fileContents[filename]) {
        output = fileContents[filename];
      } else {
        output = [`cat: ${filename}: No such file or directory`];
      }
    } else if (commandLower === 'resume') {
      output = [
        'Resume download initiated...',
        `📄 resume_${personalInfo.name.toLowerCase().replace(' ', '_')}.pdf`,
        '',
        'Note: This is a demo portfolio. In a real implementation,',
        'this would trigger an actual file download.',
        '',
      ];
    } else if (terminalCommands[commandLower as keyof typeof terminalCommands]) {
      output = terminalCommands[commandLower as keyof typeof terminalCommands];
      
      // Handle file opening commands
      const commandMap: { [key: string]: string } = {
        'about': 'About.java',

        'experience': 'Work.css',
        'work': 'Work.css',
        'education': 'education.yml',
        'projects': 'projects.ts',
        'skills': 'skills.json',
        'contact': 'Contact.html',
        'resume': 'resume.pdf',
        'home': 'Home.jsx',
      };

      if (commandMap[commandLower]) {
        // Use a timeout to allow the output to be displayed first
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('openFile', { 
            detail: { fileName: commandMap[commandLower] } 
          }));
        }, 100);
      }
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
      // Smooth scroll to bottom
      terminal.scrollTo({
        top: terminal.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  // Auto-scroll when new content is added (like a real terminal)
  useEffect(() => {
    if (terminalRef.current) {
      const terminal = terminalRef.current;
      const isScrolledToBottom = terminal.scrollHeight - terminal.clientHeight <= terminal.scrollTop + 1;
      
      if (isScrolledToBottom) {
        // Only auto-scroll if user is already at the bottom
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
      className="bg-vscode-primary flex-1 font-mono text-sm leading-5 overflow-auto p-4 min-h-0 w-full"
      onClick={() => inputRef.current?.focus()}
    >
      <div id="terminal-content" className="text-vscode-text-primary whitespace-pre-wrap">
        {history.map((line, index) => (
          <div 
            key={`terminal-line-${index}`}
            id={`terminal-line-${index}`}
            className={`${
              line.type === 'command' 
                ? 'text-vscode-text-primary' 
                : line.type === 'error' 
                  ? 'text-vscode-red' 
                  : 'text-vscode-text-primary'
            }`}
          >
            {line.content}
          </div>
        ))}
        
        <form id="terminal-input-form" onSubmit={handleSubmit} className="flex items-center gap-2 mt-1 sticky bottom-0 bg-vscode-primary py-1">
          <span id="terminal-prompt-user" className="text-vscode-green-alt flex-shrink-0">bhakti@portfolio</span>
          <span id="terminal-prompt-colon" className="text-vscode-primary flex-shrink-0">:</span>
          <span id="terminal-prompt-path" className="text-vscode-blue flex-shrink-0">~/portfolio</span>
          <span id="terminal-prompt-dollar" className="text-vscode-primary flex-shrink-0">$</span>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-vscode-primary min-w-0"
            placeholder="Type a command..."
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}