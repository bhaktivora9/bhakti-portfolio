import React, { useState } from 'react';
import { Mail, MapPin, Phone, Copy, Check } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

interface ContactSectionProps {
  setActiveTab: (tab: string) => void;
  openTabs: string[];
  setOpenTabs: (tabs: string[] | ((prev: string[]) => string[])) => void;
  isDarkTheme: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  setActiveTab: _setActiveTab, // Prefixed with underscore to indicate intentionally unused
  openTabs: _openTabs, // Prefixed with underscore to indicate intentionally unused
  setOpenTabs: _setOpenTabs, // Prefixed with underscore to indicate intentionally unused
  isDarkTheme
}) => {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
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

  return (
    <div className={`flex-grow p-8 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-light mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Connect, Create, Collaborate!
          </h1>
          <div className={`w-24 h-px mx-auto mb-6 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
          <p className={`text-xl font-light max-w-2xl mx-auto ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    To team up for a hackathon, research collabs, hiring conversations, or just a friendly hello — I'm all ears!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info & Quote */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className={`p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                isDarkTheme 
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mail className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                        Email
                      </p>
                      <p className={`text-lg font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                        {personalInfo.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(personalInfo.email)}
                    className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                      isDarkTheme 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {emailCopied ? (
                      <Check className="text-green-500" size={18} />
                    ) : (
                      <Copy className={isDarkTheme ? 'text-gray-400' : 'text-gray-500'} size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className={`p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                isDarkTheme 
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <MapPin className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                      Location
                    </p>
                    <p className={`text-lg font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className={`p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                isDarkTheme 
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Phone className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                      Phone
                    </p>
                    <p className={`text-lg font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                      Available upon request
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Google Form */}
          <div className={`rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-lg ${
            isDarkTheme 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="animate-fadeIn">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScqnQx6IVwL6AaTOsOZqozF-medBLWCSf0hmPbEl5q74l0CZA/viewform?embedded=true"
                width="100%"
                height="700"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="rounded-xl"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};