import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Square, Minimize2, Maximize2, X, RotateCcw } from 'lucide-react';
import '../styles/terminal.css';

interface CurrentlyWorkingTerminalProps {
  className?: string;
  onMinimize?: () => void;
  onClose?: () => void;
  isVisible?: boolean;
  isDark?: boolean;
}

const CurrentlyWorkingTerminal: React.FC<CurrentlyWorkingTerminalProps> = ({ 
  className = "", 
  onMinimize, 
  onClose, 
  isVisible = true,
  isDark = false
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [isRestarting, setIsRestarting] = useState(false);

  const terminalOutput = [
    { type: 'command', text: '$ mvn spring-boot:run', delay: 0 },
    { type: 'info', text: '[INFO] Scanning for projects...', delay: 500 },
    { type: 'info', text: '[INFO] Building AI Model Service 1.0.0', delay: 800 },
    { type: 'info', text: '[INFO] Starting Spring Boot application...', delay: 1200 },
    { type: 'success', text: '  .   ____          _            __ _ _', delay: 1600 },
    { type: 'success', text: ' /\\\\ / ___\'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\', delay: 1700 },
    { type: 'success', text: '( ( )\\___ | \'_ | \'_| | \'_ \\/ _` | \\ \\ \\ \\', delay: 1800 },
    { type: 'success', text: ' \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )', delay: 1900 },
    { type: 'success', text: '  \'  |____| .__|_| |_|_| |_\\__, | / / / /', delay: 2000 },
    { type: 'success', text: ' =========|_|==============|___/=/_/_/_/', delay: 2100 },
    { type: 'info', text: ' :: Spring Boot ::                (v3.2.0)', delay: 2200 },
    { type: 'info', text: '', delay: 2300 },
    { type: 'info', text: '2024-01-15 10:30:15.123  INFO --- [main] AIModelApplication', delay: 2400 },
    { type: 'info', text: 'Starting AIModelApplication v1.0.0', delay: 2600 },
    { type: 'info', text: '2024-01-15 10:30:16.456  INFO --- [main] ConfigServletWebServerApplicationContext', delay: 2800 },
    { type: 'info', text: 'Initializing Spring embedded WebApplicationContext', delay: 3000 },
    { type: 'info', text: '2024-01-15 10:30:17.789  INFO --- [main] TomcatWebServer', delay: 3200 },
    { type: 'success', text: 'Tomcat initialized with port(s): 8080 (http)', delay: 3400 },
    { type: 'info', text: '2024-01-15 10:30:18.012  INFO --- [main] AIModelService', delay: 3600 },
    { type: 'success', text: 'Loading TensorFlow models...', delay: 3800 },
    { type: 'success', text: 'Model "sentiment-analysis" loaded successfully', delay: 4000 },
    { type: 'success', text: 'Model "image-classification" loaded successfully', delay: 4200 },
    { type: 'info', text: '2024-01-15 10:30:19.345  INFO --- [main] TomcatWebServer', delay: 4400 },
    { type: 'success', text: 'Tomcat started on port(s): 8080 (http)', delay: 4600 },
    { type: 'success', text: '2024-01-15 10:30:19.567  INFO --- [main] AIModelApplication', delay: 4800 },
    { type: 'success', text: 'Started AIModelApplication in 4.444 seconds', delay: 5000 },
    { type: 'success', text: '', delay: 5200 },
    { type: 'success', text: '🚀 AI Model Service is running!', delay: 5400 },
    { type: 'success', text: '📡 API available at: http://localhost:8080/api/v1', delay: 5600 },
    { type: 'success', text: '📊 Health check: http://localhost:8080/actuator/health', delay: 5800 },
    { type: 'command', text: '$ curl -X POST http://localhost:8080/api/v1/predict', delay: 6000 },
    { type: 'info', text: '{"model": "sentiment-analysis", "text": "I love this application!"}', delay: 6200 },
    { type: 'success', text: '{"prediction": "positive", "confidence": 0.95}', delay: 6800 },
    { type: 'command', text: '$ ', delay: 7200 }
  ];

  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      if (currentLine < terminalOutput.length - 1) {
        setCurrentLine(prev => prev + 1);
      } else {
        setIsRunning(false);
      }
    }, terminalOutput[currentLine]?.delay || 100);

    return () => clearTimeout(timer);
  }, [currentLine, isRunning]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  const handleRestart = () => {
    setIsRestarting(true);
    setCurrentLine(0);
    setIsRunning(true);
    setTimeout(() => setIsRestarting(false), 300);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleMinimize = () => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);
    if (newMinimized && onMinimize) {
      onMinimize();
    }
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const getLineClass = (type: string) => {
    switch (type) {
      case 'command': return 'terminal-command';
      case 'success': return 'terminal-success';
      case 'info': return 'terminal-info';
      case 'error': return 'terminal-error';
      default: return 'terminal-text';
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`terminal-container ${className} ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''} ${isDark ? 'dark' : 'light'} ${isRestarting ? 'restarting' : ''}`}>
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-header-left">
          <div className="terminal-dots">
            <div className="terminal-dot terminal-dot-red"></div>
            <div className="terminal-dot terminal-dot-yellow"></div>
            <div className="terminal-dot terminal-dot-green"></div>
          </div>
          <div className="terminal-title">
            <TerminalIcon className="terminal-title-icon" />
            <span>Currently Working On - Terminal</span>
          </div>
        </div>
        <div className="terminal-controls">
          <button 
            className="terminal-control-btn icon-highlighter custom-highlighter"
            onClick={handleRestart}
            title="Restart Terminal"
            disabled={isRestarting}
          >
            {isRestarting ? (
              <RotateCcw className="w-3 h-3 animate-spin" />
            ) : (
              <Play className="w-3 h-3" />
            )}
          </button>
          <button 
            className="terminal-control-btn icon-highlighter custom-highlighter"
            onClick={handleStop}
            title="Stop Execution"
          >
            <Square className="w-3 h-3" />
          </button>
          <button 
            className="terminal-control-btn icon-highlighter custom-highlighter"
            onClick={handleMinimize}
            title={isMinimized ? "Restore" : "Minimize"}
          >
            <Minimize2 className="w-3 h-3" />
          </button>
          <button 
            className="terminal-control-btn icon-highlighter custom-highlighter"
            onClick={handleMaximize}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Maximize2 className="w-3 h-3" />
          </button>
          <button 
            className="terminal-control-btn terminal-close-btn icon-highlighter glow-highlighter"
            onClick={handleClose}
            title="Close Terminal"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="terminal-content">
        <div className="terminal-output">
          {terminalOutput.slice(0, currentLine + 1).map((line, index) => (
            <div key={index} className={`terminal-line ${getLineClass(line.type)}`}>
              {line.text}
              {index === currentLine && isRunning && showCursor && (
                <span className="terminal-cursor">█</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Status */}
      <div className="terminal-status">
        <div className="terminal-status-left">
          <span className={`terminal-status-indicator ${isRunning ? 'running' : 'stopped'}`}>
            {isRunning ? '●' : '○'}
          </span>
          <span className="terminal-status-text">
            {isRunning ? 'Running' : 'Stopped'} | Line {currentLine + 1}/{terminalOutput.length}
          </span>
        </div>
        <div className="terminal-status-right">
          <span className="terminal-status-text">Spring Boot 3.2.0</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyWorkingTerminal;