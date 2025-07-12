
import { Volume2 } from 'lucide-react';

interface ProfileGreetingProps {
  isDark: boolean;
  name: string;
  onPlayAudio: () => void;
}

const ProfileGreeting: React.FC<ProfileGreetingProps> = ({ isDark, name, onPlayAudio }) => {

  return (
    <div className="text-center lg:text-left mb-6">
      {/* Greeting */}
      <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
        <span className="text-4xl">👋</span>
        <span className={`text-xl md:text-2xl font-medium ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Hi, I'm
        </span>
      </div>

      {/* Animated Name with Volume Button */}
      <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
        <h1 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${
          isDark ? 'text-white' : 'text-gray-900'
        } relative`}>
          {name}
        </h1>
        
        {/* Volume Button */}
        <button
          onClick={onPlayAudio}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 button-highlighter glow-highlighter ${
            isDark 
              ? 'bg-gray-800 hover:bg-gray-700 text-blue-400 border border-gray-600' 
              : 'bg-white hover:bg-gray-50 text-blue-600 border border-gray-200'
          } shadow-lg hover:shadow-xl hover:scale-110`}
          title="Listen to pronunciation"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Pronunciation Guide */}
      <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
        <span className={`text-sm font-mono px-2 py-1 rounded ${
          isDark 
            ? 'bg-gray-800 text-gray-400 border border-gray-700' 
            : 'bg-gray-100 text-gray-600 border border-gray-200'
        }`}>
          /BHAK-ti/ /VOH-ruh/
        </span>
        <span className={`text-xs ${
          isDark ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Click volume to hear pronunciation
        </span>
      </div>
    </div>
  );
};

export default ProfileGreeting;