import React from 'react';
import { useState, useEffect } from 'react';
import { Code, Volume2 ,ArrowRight,Terminal ,StickyNote } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
  openTabs: string[];
  setOpenTabs: (tabs: string[] | ((prev: string[]) => string[])) => void;
  themeClasses: any;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
   setActiveTab,
  openTabs,
  setOpenTabs,
 
  themeClasses
}) => {
   const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
//const [isTyping, setIsTyping] = useState(true);
const [showCursor, setShowCursor] = useState<boolean>(true);

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
  }, [displayText, isDeleting, currentPhraseIndex]);
  /*
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 100); // Typing speed
      } else {
        // Pause before backspacing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50); // Backspace speed
      } else {
        // Move to next phrase
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentPhraseIndex, isTyping]);
  */const playAudio = () => {
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

const profilePic= `${import.meta.env.BASE_URL}assets/${personalInfo.profileImage}?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop`;

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev: boolean) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
     <div className="flex-1 p-2 overflow-y-auto">
<div className="flex flex-col md:flex-row items-center justify-between">
<div className="md:w-1/2">
 <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
        <span className="text-4xl">👋</span>
        <span className={`text-xl md:text-2xl font-medium ${
          themeClasses.text
        }`}>
          Hi, I'm
        </span>
      </div>

<div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
  {/*<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-custom-primary relative">
    {personalInfo.name}
  </h1>*/}
  <h1
  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold relative"
  style={{
    fontFamily: '"VT323", monospace',
  }}
>    {personalInfo.name}
</h1>
  <button
    onClick={playAudio}
    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 button-highlighter glow-highlighter ${themeClasses.border} shadow-lg hover:shadow-xl hover:scale-110`}
    title="Listen to pronunciation">
    <Volume2 className="w-4 h-4" />
  </button>
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
                >
                  <source src="https://en-audio.howtopronounce.com/17515761216866ee3906cbc.mp3" type="audio/mpeg" />
                  <source src="https://en-audio.howtopronounce.com/17294854996715dabbf0539.mp3" type="audio/mpeg" />
                </audio>
</div>
<p className="text-lg text-custom-secondary mt-2 .">{personalInfo.tagline}</p>
<div className="flex items-center gap-3 w-full max-w-md mt-4">
  {/* Gradient Progress Bar */}
  <div className="w-52 h-3 bg-gradient-to-r from-gray-500 via-gray-700 to-black rounded-full"></div>

</div>

<p className={`text-lg font-semibold text-custom-secondary mt-2 . ${themeClasses.accent}`}>{displayText}  <span>{showCursor ? '|' : ' '}</span>
</p>

<div className="flex mt-8 space-x-4">
<button className="bg-black hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center"  onClick={() => {
                  if (!openTabs.includes('Work.css')) {
                    setOpenTabs(prev => [...prev, 'Work.css']);
                  }
                  setActiveTab('Work.css');
                }}
              >
View Work      
<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</button>
 <button 
                
                className={`px-6 py-3 border-2 ${themeClasses.border} ${themeClasses.text} hover:${themeClasses.textPrimary} hover:border-blue-400 rounded-lg transition-all duration-300 hover:scale-105`}
                onClick={() => {
                  if (!openTabs.includes('Contact.html')) {
                    setOpenTabs(prev => [...prev, 'Contact.html']);
                  }
                  setActiveTab('Contact.html');
                }}
              >
             
  Get In Touch
</button>
</div>
<div className="flex mt-12 space-x-12">
<div className="bg-amber-100 text-amber-700 font-semibold px-4 py-4 h-36 w-64 rounded-lg shadow-md inline-flex items-start gap-4 text-sm leading-snug max-w-xl">
  <StickyNote className="h-26 w-26 text-yellow-600 mt-1" />
  <span>
    <strong>Currently Working on:</strong> <br />
    <em>GenREADME :</em> A context-aware AI documentation system
    <p> that generates intelligent, ecosystem-informed READMEs.</p>
  </span>
</div>
</div>
</div>
<div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
<div className="relative">
<img alt="Profile Picture" className="rounded-xl shadow-2xl w-full max-w-sm" src={profilePic}/>
<div className="absolute bottom-0 left-0 right-0 bg-black/50 dark:bg-black/50 backdrop-blur-sm p-4 rounded-b-xl max-w-sm mx-auto">
<p className="text-white font-semibold mb-4">Tech Stack</p>
<div className="flex justify-around">
<span className="material-icons text-blue-400 text-3xl"><Code/></span>
<span className="material-icons text-green-400 text-3xl"><Terminal/></span>
</div>
</div>
</div>
</div>
</div>
</div>
  );
};