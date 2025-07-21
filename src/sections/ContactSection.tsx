import React, { useState, useEffect } from 'react';
import { Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolio';

interface ContactSectionProps {
  themeClasses: {
    bg: string;
    border: string;
    hover: string;
    borderAccent: string;
  };
}

export const ContactSection: React.FC<ContactSectionProps> = ({ themeClasses }) => {
  const [showForm, setShowForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 py-12 font-[Inter]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-[#395591] text-5xl font-serif font-bold mb-4 hover:scale-105 transition-transform duration-300">
            Connect, Create, Collaborate!
          </h2>
          <p className="text-lg font-semibold italic">
            To team up for a hackathon, research collabs, hiring conversations, or just a friendly hello — I'm all ears!
            <br />
            Drop me a line and let's create something amazing together.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* Social Info */}
          <div className={`md:col-span-5 transition-all duration-1000 ease-out transform delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className={`rounded-lg shadow-lg p-8 ${themeClasses.border} h-full flex flex-col hover:shadow-xl transition-all duration-300 group`}>
              <h3 className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 group-hover:${themeClasses.hover}`}>
                Connect with me
              </h3>

              <div className="flex-1 flex flex-col justify-center space-y-6">
                {/* Email */}
                <div className={`flex items-center justify-center gap-3 p-4  rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group/email`}>
                  <Mail className="h-5 w-5 text-[#5b3a29] group-hover/email:animate-bounce" />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-[#5b3a29] hover:underline font-medium transition-all duration-300"
                  >
                    {personalInfo.email}
                  </a>
                </div>

                {/* GitHub */}
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-3 p-4  ${themeClasses.borderAccent} border border-accent-themed rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md group/github`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
                    alt="GitHub"
                    className="h-6 w-6 group-hover/github:scale-125 group-hover/github:rotate-12 transition-all duration-300"
                    loading="lazy"
                  />
                  <span className="font-medium text-[#5b3a29] group-hover/github:font-bold transition-all duration-300">
                    GitHub
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-3 p-4  rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md group/linkedin`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                    alt="LinkedIn"
                    className="h-6 w-6 group-hover/linkedin:scale-125 group-hover/linkedin:-rotate-12 transition-all duration-300"
                    loading="lazy"
                  />
                  <span className="font-medium text-[#5b3a29] group-hover/linkedin:font-bold transition-all duration-300">
                    LinkedIn
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className={`md:col-span-2 flex items-center justify-center transition-all duration-1000 ease-out delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="flex flex-col items-center">
              <div className={`hidden md:block h-20 w-px  animate-pulse`}></div>
              <div className={`border-themed border-gray-300 rounded-full px-4 py-2 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 animate-pulse`}>
                <span className="text-lg font-bold text-[#5b3a29]">OR</span>
              </div>
              <div className={`hidden md:block h-20 w-px  animate-pulse`}></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`md:col-span-5 transition-all duration-1000 ease-out transform delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className={` rounded-lg shadow-lg border border-gray-100 h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 group`}>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-6 text-center group-hover:text-[#7a523f] transition-colors duration-300">
                  Send a message
                </h3>
                <div className="flex-1 flex items-center justify-center">
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="relative w-full flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg active:scale-95 overflow-hidden group/button"
                  >
                    <div className={`absolute inset-0  opacity-0 group-hover/button:opacity-10 transition-opacity duration-300`}></div>
                    <span className="relative z-10 transition-all duration-300">
                      {showForm ? 'Hide Form' : 'Show Contact Form'}
                    </span>
                    <div className="relative z-10 transition-all duration-300">
                      {showForm ? <ChevronUp className="h-4 w-4 animate-bounce" /> : <ChevronDown className="h-4 w-4 animate-bounce" />}
                    </div>
                    <div className={`absolute inset-0  from-[#7a523f] to-[#8a6350] transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-300`}></div>
                  </button>
                </div>
              </div>

              {/* Collapsible Form */}
              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showForm ? 'max-h-[900px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}>
                <div className="p-4 border-t border-gray-100">
                  {showForm && (
                    <div className="animate-fadeIn">
                      <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLScqnQx6IVwL6AaTOsOZqozF-medBLWCSf0hmPbEl5q74l0CZA/viewform?embedded=true"
                        width="100%"
                        height="700"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        className="rounded-lg w-full transition-all duration-500 hover:shadow-inner"
                        title="Contact Form"
                      >
                        Loading…
                      </iframe>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #5b3a29;
          outline-offset: 2px;
          border-radius: 4px;
        }
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};
