import React, { useState } from 'react';
import { Code, Mail, Linkedin, Github, Copy, Check } from 'lucide-react';
import profile from '../data/profile.json';

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
    <footer className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            Let's Connect
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            I'm always interested in discussing new opportunities, innovative projects, and collaborations.
          </p>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full text-center items-center">
            {/* Left Column: Social Icons */}
            <div className="flex flex-col items-center gap-6">
              <h4 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                Connect on Socials
              </h4>
              <div className="flex gap-6 text-2xl">
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className={`transition hover:scale-110 ${
                    isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                  }`}
                >
                  <Mail size={32} />
                </a>
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
              </div>
            </div>

            {/* Center Column: OR separator */}
            <div className="hidden lg:flex items-center justify-center">
              <div
                className={`text-lg font-semibold px-4 py-2 border rounded-full ${
                  isDark ? 'text-gray-300 border-gray-600' : 'text-gray-600 border-gray-300'
                }`}
              >
                OR
              </div>
            </div>

            {/* Right Column: Copy Email */}
            <div className="flex flex-col items-center gap-4">
              <h4 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                Copy My Email
              </h4>
              <button
                onClick={handleCopy}
                title="Click to copy email"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg transition hover:scale-105 ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
                }`}
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">{profile.email}</span>
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={`text-center border-t pt-8 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
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
