import React, { useState, useEffect } from 'react';
import { Github, Mail, MapPin, Download, Zap, Linkedin, Eye } from 'lucide-react';
import AnimatedTerminal from './AnimatedTerminal';
import CurrentlyWorkingCard from './CurrentlyWorkingCard';
import ProfileGreeting from './ProfileGreeting';
import profile from '../data/profile.json';

interface HeaderProps {
  isDark: boolean;
  openResumeModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, openResumeModal }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showTerminal, setShowTerminal] = useState(true);

  useEffect(() => {
    const text = profile.status;
    let currentIndex = 0;
    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, 100);
      } else {
        setIsTyping(false);
      }
    };
    const timer = setTimeout(typeText, 2000);
    return () => clearTimeout(timer);
  }, []);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}assets/${profile.resume}`;
    link.download = 'BhaktiVoraresume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTerminalClose = () => setShowTerminal(false);
  const handleTerminalMinimize = () => {};
  const toggleView = () => setShowTerminal(!showTerminal);

  const playAudio = () => {
    const audioElementFirstName = document.getElementById('pronunciation-audio-1') as HTMLAudioElement;
    const audioElementLastName = document.getElementById('pronunciation-audio-2') as HTMLAudioElement;
    const playSequentially = async () => {
      if (audioElementFirstName) {
        try {
          await audioElementFirstName.play();
          await new Promise((resolve) => {
            audioElementFirstName.onended = resolve;
          });
        } catch (error) {
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Bhakti');
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 1;
            speechSynthesis.speak(utterance);
            await new Promise((resolve) => {
              utterance.onend = resolve;
            });
          }
        }
      }
      if (audioElementLastName) {
        try {
          await audioElementLastName.play();
        } catch (error) {
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Vora');
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 1;
            speechSynthesis.speak(utterance);
          }
        }
      }
    };
    playSequentially().catch(() => {});
  };

  return (
    <div className={`relative z-10 pt-8 pb-8 ${isDark ? 'text-white' : 'text-black'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[600px]">
          <div className="lg:col-span-7 order-1 lg:order-1">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 mb-6">
              <div className="relative group flex-shrink-0">
                <div className="w-56 h-56 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-indigo-100 to-purple-100 p-1 transform hover:scale-105 transition-all duration-300">
                  <img
                   src={`${import.meta.env.BASE_URL}assets/${profile.picture}`} 
                    alt="Bhakti - Backend Developer" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className={`absolute bottom-2 -right-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full border-4 border-green flex items-center justify-center shadow-lg ${
                  isDark ? 'bg-green-500' : 'bg-green-400'
                }`}>
                  <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -bottom-4 -right-1/2 transform -translate-x-1/2">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium shadow-lg min-w-[180px] justify-center ${
                    isDark 
                      ? 'bg-blue-600 text-blue-100' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    <Zap className="h-3 h-3 mr-1.5" />
                    ~ 7 Years Experience</span>
                </div>
              </div>
              <div className="text-center lg:text-left flex-grow mt-6 lg:mt-0">
                <ProfileGreeting 
                  isDark={isDark}
                  name={profile.name}
                  onPlayAudio={playAudio}
                />
                <audio 
                  id="pronunciation-audio-1" 
                  preload="none"
                  className="hidden"
                >
                  <source src="https://en-audio.howtopronounce.com/b0def119065a620af28e439424c6e73b.mp3" type="audio/mpeg" />
                </audio>
                <audio 
                  id="pronunciation-audio-2" 
                  preload="none"
                  className="hidden"
                ><source src="https://en-audio.howtopronounce.com/17515761216866ee3906cbc.mp3"type="audio/mpeg" />
                  <source src="https://en-audio.howtopronounce.com/17294854996715dabbf0539.mp3" type="audio/mpeg" />
                </audio>
                <div className={`flex flex-col lg:flex-row lg:items-center lg:gap-3 mb-4`}>
                  <p className={`text-lg md:text-xl lg:text-xl ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        } font-medium mb-1 lg:mb-0`}>
                          {profile.title} 
                          </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                          {['Java', 'Spring Boot', 'AI/ML', 'AWS'].map((tech, index) => (
                            <span
                              key={tech}
                              className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                                isDark 
                                  ? 'bg-gray-800 text-gray-300 border border-gray-600' 
                                  : 'bg-gray-100 text-gray-700 border border-gray-200'
                              } hover:scale-105 transition-transform duration-200`}
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
              </div>
            </div>
            <div className="mb-4 h-6 text-center lg:text-left">
              <p className={`text-sm md:text-base ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              } font-mono`}>
                {displayedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
            <div className={`mb-6 text-sm md:text-base ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            } text-center lg:text-left max-w-2xl`}>
              <p>{profile.bio}</p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
              <div  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg theme-transition button-highlighter custom-highlighter ${
                   isDark 
                     ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600' 
                     : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                 } ${isDark ? 'shadow-theme-dark' : 'shadow-theme-light'} hover:shadow-lg hover:scale-105`}>
                <MapPin size={16}/>
                <span className="text-sm">{profile.location}</span>
              </div>
              <a href={profile.github} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg theme-transition button-highlighter custom-highlighter ${
                   isDark 
                     ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600' 
                     : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                 } ${isDark ? 'shadow-theme-dark' : 'shadow-theme-light'} hover:shadow-lg hover:scale-105`}>
                <Github size={16} />
                <span className="text-sm">GitHub</span>
              </a>
              <a href={profile.github} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg theme-transition button-highlighter custom-highlighter ${
                   isDark 
                     ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600' 
                     : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                 } ${isDark ? 'shadow-theme-dark' : 'shadow-theme-light'} hover:shadow-lg hover:scale-105`}>
                <Linkedin size={16} />
                <span className="text-sm">LinkedIn</span>
              </a>  
              <a href={`mailto:${profile.email}`} 
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg theme-transition button-highlighter custom-highlighter ${
                   isDark 
                     ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600' 
                     : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                 } ${isDark ? 'shadow-theme-dark' : 'shadow-theme-light'} hover:shadow-lg hover:scale-105`}>
                <Mail size={16} />
                <span className="text-sm">Email</span>
              </a>
              <a
                onClick={downloadResume}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg theme-transition button-highlighter custom-highlighter ${
                   isDark 
                     ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600' 
                     : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                 } ${isDark ? 'shadow-theme-dark' : 'shadow-theme-light'} hover:shadow-lg hover:scale-105`}>
                <Download size={16} />
                <span className="text-sm">Resume</span>
              </a>
              <a
                onClick={openResumeModal}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg theme-transition button-highlighter custom-highlighter ${
                   isDark 
                     ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600' 
                     : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                 } ${isDark ? 'shadow-theme-dark' : 'shadow-theme-light'} hover:shadow-lg hover:scale-105`}>
                <Eye size={16} />
                <span className="text-sm">View Resume</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 order-2 lg:order-2 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-none">
              {showTerminal ? (
                <div className="w-full">
                  <AnimatedTerminal
                    isDark={isDark}
                    onClose={handleTerminalClose}
                    onMinimize={handleTerminalMinimize}
                    isVisible={showTerminal}
                  />
                </div>
              ) : (
                <div className="w-full">
                  <CurrentlyWorkingCard 
                    isDark={isDark}
                    onOpenTerminal={toggleView}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;