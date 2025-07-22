import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Lightbulb, Palette, Keyboard } from 'lucide-react';

interface NotificationBarProps {
}

export const NotificationBar: React.FC<NotificationBarProps> = ({  }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-blue-600 text-white border-b border-blue-500">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <Lightbulb className="w-4 h-4" />
          <span className="text-sm font-medium">Get Started with Bhakti's Portfolio</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-blue-700 rounded transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-blue-700 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Content */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Explore the Portfolio</h3>
              <p className="text-blue-100 text-sm mb-4">
                Navigate through different sections, learn about my experience, and discover my projects.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span>Click files in the explorer to view content</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span>Use terminal commands for quick navigation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span>Right-click resume.pdf to download</span>
                </div>
              </div>
            </div>

            {/* Right Content - Theme Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4" />
                <span className="font-medium">Choose your theme</span>
              </div>
              <p className="text-blue-100 text-sm mb-3">
                The right theme helps you focus on the content and provides a better viewing experience.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-700 rounded p-2 text-center">
                  <div className="w-full h-8 bg-gray-900 rounded mb-1 flex items-center justify-center">
                    <div className="w-1 h-4 bg-blue-400 mr-1"></div>
                    <div className="w-2 h-3 bg-green-400 mr-1"></div>
                    <div className="w-1 h-2 bg-yellow-400"></div>
                  </div>
                  <span className="text-xs">Dark Theme</span>
                </div>
                <div className="bg-blue-700 rounded p-2 text-center">
                  <div className="w-full h-8 bg-white rounded mb-1 flex items-center justify-center">
                    <div className="w-1 h-4 bg-blue-600 mr-1"></div>
                    <div className="w-2 h-3 bg-green-600 mr-1"></div>
                    <div className="w-1 h-2 bg-yellow-600"></div>
                  </div>
                  <span className="text-xs">Light Theme</span>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-blue-200 flex items-center gap-1">
                <Keyboard className="w-3 h-3" />
                <span>Tip: Use the settings icon in the top bar to switch themes</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};