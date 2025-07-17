import { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Github, Linkedin, Mail, MoveDown } from 'lucide-react';
import TypingDoodlePrompt from './TypingDoodlePrompt'
import profile from '../data/profile.json';

interface TerminalProps {
  isDark: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ isDark }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}assets/${profile.resume}`;
    link.download = 'BhaktiVoraresume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const commands = {
    help: 'Available commands: about, skills, projects, experience, git, linkedin, email, clear, exit',
    about: 'Backend developer focused on scalable systems and clean code',
    skills: 'Java, Spring Boot, PostgreSQL, Redis, Docker, AWS',
    projects: 'API Gateway, Data Processing Pipeline, E-commerce Backend',
    experience: 'Senior Backend Developer with 5+ years experience',
    resume: 'Downloading PDF resume...',
    download: 'Downloading PDF resume...',
    git: 'Opening GitHub profile...',
    github: 'Opening GitHub profile...',
    linkedin: 'Opening LinkedIn profile...',
    email: `Opening email client to ${profile.email}...`,
    clear: 'CLEAR_SCREEN',
    exit: 'Thanks for visiting!'
  };

  useEffect(() => {
    if (isVisible) {
      setOutput([
        'Welcome to the Developer Terminal',
        'Type "help" for available commands',
        'Try: git, linkedin, email for quick access',
        ''
      ]);
    }
  }, [isVisible]);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    const response = commands[command as keyof typeof commands];

    if (response === 'CLEAR_SCREEN') {
      setOutput(['']);
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(null);
      return;
    }

    // Handle special commands that open external links
    if (command === 'git' || command === 'github') {
      setOutput(prev => [...prev, `$ ${cmd}`, 'Opening GitHub profile...', '']);
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(null);
      setTimeout(() => window.open(profile.github, '_blank'), 500);
      return;
    }

    if (command === 'linkedin') {
      setOutput(prev => [...prev, `$ ${cmd}`, 'Opening LinkedIn profile...', '']);
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(null);
      setTimeout(() => window.open(profile.linkedin, '_blank'), 500);
      return;
    }

    if (command === 'email') {
      setOutput(prev => [...prev, `$ ${cmd}`, `Opening email client to ${profile.email}...`, '']);
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(null);
      setTimeout(() => window.open(`mailto:${profile.email}`, '_blank'), 500);
      return;
    }

    if (command === 'resume' || command === 'download') {
      setOutput(prev => [...prev, `$ ${cmd}`, 'Downloading PDF resume...', '']);
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(null);
      setTimeout(() => downloadResume(), 500);
      return;
    }

    if (response) {
      setOutput(prev => [...prev, `$ ${cmd}`, response, '']);
    } else {
      setOutput(prev => [...prev, `$ ${cmd}`, `Command not found: ${cmd}. Type 'help' for available commands.`, '']);
    }
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === null
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setCurrentCommand(commandHistory[newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === 'ArrowDown') {
      if (commandHistory.length > 0 && historyIndex !== null) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        setCurrentCommand(commandHistory[newIndex] || '');
        setHistoryIndex(newIndex === commandHistory.length - 1 ? null : newIndex);
      }
    }
  };

  if (!isVisible) {
    return (
      <div
        className={`fixed bottom-8 right-4 icon-highlighter glow-highlighter ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } rounded-full p-4 shadow-lg cursor-pointer transition-all duration-300 group`}
        onClick={() => setIsVisible(true)}
      >
          {(!isVisible || isMinimized) && (
      <div className="fixed bottom-32 right-4 z-40 pointer-events-none">
  <div className="flex flex-row-reverse items-center gap-3">
    {/* Arrow */}
   {/* <MoveDown
      size={48}
      strokeWidth={2.5}
      absoluteStrokeWidth
      className={`${isDark ? 'text-orange-400' : 'text-orange-500'} animate-bounce`}
    />
*/}
    {/* Handwritten "Try this" note */}
    <TypingDoodlePrompt/>
   
  </div>
</div>

      )}

        <TerminalIcon
          className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-4 right-4 w-96 h-80 z-[9999] terminal-highlighter custom-highlighter ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-black border-gray-600'
      } border rounded-lg shadow-2xl overflow-hidden`}
    >
      {/* Terminal Header */}
      <div
        className={`flex items-center justify-between p-3 relative z-[10000] ${
          isDark ? 'bg-gray-800' : 'bg-gray-800'
        } border-b border-gray-600`}
      >
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-400 font-mono">
            Developer Terminal
          </span>
        </div>
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white text-sm ml-2 relative z-[10001] icon-highlighter custom-highlighter"
          >
            ×
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="h-64 overflow-y-auto p-4 font-mono text-sm bg-black relative z-[9999]">
        {output.map((line, index) => (
          <div
            key={index}
            className={`${
              line.startsWith('$') ? 'text-blue-400' : 'text-gray-300'
            } ${line.includes('Opening') ? 'text-green-400' : ''}`}
          >
            {line}
          </div>
        ))}

        {/* Current Input */}
        <div className="flex items-center text-blue-400">
          <span>$ </span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-gray-300 flex-1 relative z-[10001] selectable-text"
            placeholder="Type 'help' for commands"
            autoFocus
          />
          <span className="animate-pulse">|</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;