import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, isDark }) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Render modal using portal directly to body
  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 999999 }}
    >
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75"
        style={{ backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />
      
      {/* Modal Content - No blur */}
      <div 
        className={`relative w-full h-full max-w-6xl max-h-[95vh] m-4 rounded-lg shadow-2xl ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Header with Close Button */}
        <div className={`flex items-center justify-between p-4 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Resume - Bhakti Vora
          </h2>
          
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isDark 
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
            title="Close (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className={`p-6 h-[calc(100%-4rem)] ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}>
          <div className={`w-full h-full rounded-lg overflow-hidden shadow-lg border ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <iframe
              src="/Bhakti Vora Resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
              className="w-full h-full border-0"
              title="Resume PDF"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ResumeModal;