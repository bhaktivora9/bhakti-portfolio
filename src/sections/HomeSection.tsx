import React from 'react';
import { useState, useEffect } from 'react';
import { Code, Volume2, ArrowRight, Terminal,  Sparkles, MapPin, Mail, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
  openTabs: string[];
  setOpenTabs: (tabs: string[] | ((prev: string[]) => string[])) => void;
  isDarkTheme: boolean;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
   setActiveTab,
  openTabs,
  setOpenTabs,
  isDarkTheme
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [emailCopied, setEmailCopied] = useState<boolean>(false);

  const phrases = personalInfo.phrases;

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, 75);
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) => currentPhrase.slice(0, prev.length + 1));
      }, 100);
    }

    if (!isDeleting && displayText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex, phrases]);
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Could not copy text: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const profilePic = `${import.meta.env.BASE_URL}assets/${personalInfo.profileImage}?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop`;

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev: boolean) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={`flex-grow flex items-center justify-center p-8 bg-themed animate-fade-in-up`}>
      {/* Hidden audio elements for pronunciation */}
      <audio id="pronunciation-audio-1" preload="auto">
        <source src="https://en-audio.howtopronounce.com/15938392635f000e9f60952.mp3" type="audio/mpeg" />
      </audio>
      <audio id="pronunciation-audio-2" preload="auto">
        <source src="https://en-audio.howtopronounce.com/1752021141686db89590618.mp3" type="audio/mpeg" />
      </audio>
      
      <div className="flex w-full max-w-6xl mx-auto">
        <div className="w-1/2 pr-12 animate-slide-in-left">
          <p className={`text-2xl font-medium mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="wave-hand">👋</span> Hi, I'm
          </p>
          <div className="flex items-center mb-2">
            <h1 className={`text-7xl font-semibold tracking-wider transition-all duration-300 hover-scale animate-slide-in-bottom  ${isDarkTheme}?text-['#4C4A59'] : text-['#B3B1BE']`} style={{ fontFamily: '"VT323", monospace' }}>
              {personalInfo.name}
            </h1>
            <button 
              onClick={playAudio}
              className={`ml-4 p-2 rounded-full bg-secondary-themed hover-themed hover-bounce transition-all duration-300`}
            >
              <Volume2 size={24} />
            </button>
          </div>
          <div className={`w-full rounded-full h-2.5 mb-4 ${isDarkTheme ? 'bg-grey-500' : 'bg-gray-500'} animate-slide-in-right stagger-3`}>
            <div className={`h-2.5 rounded-full ${isDarkTheme ? 'bg-[#6F4FBA]' :'bg-[#AE9AD9]' } animate-slide-in-left stagger-4`} style={{ width: '100%' }}></div>
          </div>
          <p className={`text-xl font-medium mb-8 ${isDarkTheme ? 'text-[#F6BE79]' : 'text-[#F2A03D]' } animate-slide-in-right stagger-4`}>
            {displayText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
          </p>
          <div className="flex space-x-4 mb-12 animate-slide-in-bottom stagger-5">
            <button 
              onClick= {() => {
                  if (!openTabs.includes('Work.css')) {
                    setOpenTabs(prev => [...prev, 'Work.css']);
                  }
                  setActiveTab('Work.css');
                }}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center transition-colors ${
                isDarkTheme 
                  ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              } hover-scale hover-glow-blue transition-all duration-300`}
            >
              View Work <ArrowRight className="ml-2 hover-bounce" size={20} />
            </button>
            <button 
              onClick={() => {
                  if (!openTabs.includes('Contact.html')) {
                    setOpenTabs(prev => [...prev, 'Contact.html']);
                  }
                  setActiveTab('Contact.html');
                }}
              className={`px-6 py-3 rounded-lg font-semibold border transition-colors ${
                isDarkTheme 
                  ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700' 
                  : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-100'
              } hover-scale hover-glow-green transition-all duration-300`}
            >
              Get In Touch
            </button>
          </div>
          <p className={`text-xl mb-4 text-secondary-themed animate-slide-in-right stagger-1`}>{personalInfo.tagline}</p>
          <div className={`flex items-center mb-4 text-secondary-themed space-x-6`}>
            <MapPin size={20} className="mr-2" />
            <span>{personalInfo.location}</span>
            <Mail size={20} className="mr-2" />
            <span className="mr-2">{personalInfo.email}</span>
            <button
              onClick={() => copyToClipboard(personalInfo.email)}
              className={`p-1 rounded transition-colors ${
                isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            >
              {emailCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
          <div className={`p-4 rounded-lg border-l-4 ${
            isDarkTheme 
              ? 'bg-yellow-900/30 border-yellow-500' 
              : 'bg-yellow-100 border-yellow-400'
          } animate-slide-in-bottom stagger-6 hover-scale-sm transition-all duration-300`}>
            <p className={`font-semibold mb-2 ${isDarkTheme ? 'text-yellow-300' : 'text-yellow-800'}`}>Currently Working on:</p>
            <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>GenREADME:</strong> A context-aware AI documentation system that generates intelligent, ecosystem-informed READMEs.
            </p>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center animate-slide-in-right">
          <div className={`relative w-80 h-[400px] rounded-3xl shadow-2xl overflow-hidden tech-stack-container group ${
            isDarkTheme ? 'bg-gray-800' : 'bg-white'
          } hover-scale transition-all duration-500 animate-float`}>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
            <img 
              alt="Profile Picture" 
              className="w-full h-full object-cover transition-all duration-700 ease-in-out transform hover-scale opacity-0 animate-fade-in-image" 
              src={profilePic}
              onLoad={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.opacity = '1';
                const placeholder = img.previousElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent tech-stack-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white tech-stack-content transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-semibold mb-4">Tech Stack</h3>
              <div className="flex justify-between items-center">
                <button className="p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors">
                  <ChevronLeft className="text-white hover-bounce" size={20} />
                </button>
                <div className="flex space-x-4">
                  <Code size={32} className="text-white hover-bounce animate-float stagger-1" />
                  <Terminal size={32} className="text-white hover-bounce animate-float stagger-2" />
                  <Sparkles size={32} className="text-white hover-bounce animate-float stagger-3" />
                </div>
                <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-20 transition-colors">
                  <ChevronRight className="text-white hover-bounce" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};