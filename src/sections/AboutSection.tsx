import React from 'react';
import { User } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

interface AboutSectionProps {
  isDarkTheme: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isDarkTheme }) => {
  if(isDarkTheme){
    console.log("dark theme");
  }
  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-xl font-bold text-primary-themed mb-4 flex items-center gap-3`}>
          <User className="w-5 h-5 text-blue-400" />
          About Me
        </h1>
        <div className="w-12 h-0.5 bg-blue-400 mb-4"></div>
      </div>
      
      <div className="space-y-6">
        <div className={`bg-secondary-themed border border-themed rounded p-4 `}>
          <div className={`text-sm font-mono text-primary-themed mb-3 `}>
            
            <span className="text-purple-400">public class</span> <span className="text-amber-500 font-semibold">Developer</span> <span className="text-purple-400">extends</span> <span className="text-amber-500 font-semibold">Human</span>
          </div>
          <p className={`text-themed leading-relaxed mb-3 text-sm`}>
            {personalInfo.bio}
          </p>
          <p className={`text-themed leading-relaxed text-sm`}>
            When I'm not coding, you'll find me exploring new technologies, planting, expanding my knowledge.
          </p>
        </div>

        <div className={`bg-secondary-themed border border-themed rounded p-4`}>
          <h3 className={`text-m  text-primary-themed mb-3 font-mono`}>
            <span className="text-purple-400 font-semibold">public static final </span> <span className="text-blue-400">techStack</span> = [
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['JAVA','SPRING FRAMEWORK','DOCKER','KAFKA'].map((tech) => (
              <div key={tech} className={`bg-tertiary-themed border border-themed rounded px-2 py-1 text-center text-sm font-mono`}>
                <span className="text-green-500 font-semibold">"{tech}"</span>
              </div>
            ))}
          </div>
          <div className={`text-sm font-mono text-primary-themed mt-2`}>];</div>
        </div>

         <div className={`bg-secondary-themed border border-themed rounded p-4`}>
          <h3 className={`text-m  text-primary-themed mb-3 font-mono`}>
            <span className="text-purple-400 font-semibold">public ConcurrentLinkedList{`<Activities>`} </span> <span className="text-blue-400">stressRelievingActivities</span> = [
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['PLANTING', 'PLAY CHESS'].map((tech) => (
              <div key={tech} className={`bg-tertiary-themed border border-themed rounded px-2 py-1 text-center text-sm font-mono`}>
                <span className="text-green-500 font-semibold">"{tech}"</span>
              </div>
            ))}
          </div>
          <div className={`text-sm font-mono text-primary-themed mt-2`}>];</div>
        </div>
      </div>
    </div>
  );
};