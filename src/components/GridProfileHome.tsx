import React from 'react';
import { Code, Briefcase, Award, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolio';

interface Props {
  themeClasses: any;
}

export const GridProfileSection: React.FC<Props> = ({ themeClasses }) => {
  const imageUrl = `${import.meta.env.BASE_URL}assets/${personalInfo.profileImage}?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 gap-6 w-full">
      {/* Top Left - Name and Info */}
      <div className="row-span-1 lg:row-span-1 lg:col-span-1 flex flex-col justify-center space-y-4">
         <h1 className={`text-3xl lg:text-5xl xl:text-6xl font-bold ${themeClasses.textPrimary} leading-tight`}>
              {personalInfo.name}
            </h1>
              <p className={`text-lg lg:text-xl ${themeClasses.textSecondary} font-light min-h-[2rem] lg:min-h-[2.5rem]`}>
                {displayText}
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
              </p>
            <p className={`text-base lg:text-lg ${themeClasses.text} leading-relaxed max-w-2xl`}>
              {personalInfo.bio.split('.')[0]}.
            </p>

      </div>

      {/* Top Right - Profile Image */}
      <div className="row-span-1 lg:row-span-1 lg:col-span-1">
        <div className="aspect-square relative w-full">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
        </div>
      </div>

      {/* Bottom Left - Contact Info & Links */}
      <div className="row-span-1 lg:row-span-1 lg:col-span-1 space-y-4">
        <button 
                onClick={() => setActiveTab('Work.css')}
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span>View Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setActiveTab('Contact.html')}
                className={`px-6 py-3 border-2 ${themeClasses.border} ${themeClasses.text} hover:${themeClasses.textPrimary} hover:border-blue-400 rounded-lg transition-all duration-300 hover:scale-105`}
              >
                Get In Touch
              </button>
      </div>

      {/* Bottom Right - Tech Stack */}
      <div className="row-span-1 lg:row-span-1 lg:col-span-1">
        <div className={`${themeClasses.bgSecondary} rounded-xl p-6 border ${themeClasses.border} h-full`}>
          <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-4`}>Tech Stack</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg hover:bg-blue-500/10 transition-colors">
              <Code className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className={`text-sm font-medium ${themeClasses.textPrimary}`}>Frontend</div>
              <div className={`text-xs ${themeClasses.textSecondary}`}>React, Vue</div>
            </div>
            <div className="text-center p-3 rounded-lg hover:bg-green-500/10 transition-colors">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className={`text-sm font-medium ${themeClasses.textPrimary}`}>Backend</div>
              <div className={`text-xs ${themeClasses.textSecondary}`}>Node, Python</div>
            </div>
            <div className="text-center p-3 rounded-lg hover:bg-purple-500/10 transition-colors">
              <Award className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className={`text-sm font-medium ${themeClasses.textPrimary}`}>Design</div>
              <div className={`text-xs ${themeClasses.textSecondary}`}>UI/UX, Figma</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
