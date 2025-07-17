import React, { useState } from 'react';
import { Code, Mail, Linkedin, Github, Copy, Check } from 'lucide-react';
import profile from '../data/profile.json';
import SendMessage from './SendMessage';

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            Let's Connect
          </h2>
          <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            I'm always interested in discussing new opportunities, innovative projects, and collaborations.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Section: Centered Socials + Copy */}
          <div className="flex flex-col justify-center items-center gap-6 text-center h-full">
            <h4 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
              Connect on Socials
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href="https://linkedin.com/in/bhaktivora"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`transition hover:scale-110 ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                <Linkedin size={32} />
              </a>
              <a
                href="https://github.com/bhaktivora"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`transition hover:scale-110 ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <Github size={32} />
              </a>
              
              <button
                onClick={handleCopy}
                title="Click to copy email"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition hover:scale-105 ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
                }`}
              >
                <Mail size={32} />
                <span className="hidden sm:inline">{profile.email}</span>
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="flex flex-col items-center lg:items-start space-y-6 w-full">
            <div className={`text-center border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLScqnQx6IVwL6AaTOsOZqozF-medBLWCSf0hmPbEl5q74l0CZA/viewform?embedded=true" width="700" height="600" frameborder="0" marginheight="0" marginwidth="0"     class="rounded-lg shadow-xl"
>Loading…</iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={`text-center border-t pt-8 mt-20 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Built with</span>
            <Code className="w-4 h-4 text-blue-500" />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>and dedication!</span>
          </div>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            © 2025 Bhakti Vora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
