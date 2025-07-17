// CertificateModal.tsx
import React, { useState } from 'react';
import { X, ExternalLink, Loader2, AlertCircle, Award } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  isDark?: boolean;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ 
  isOpen, 
  onClose, 
  url, 
  title,
  isDark = false 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className={`rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`p-8 flex items-center justify-between border-b ${
          isDark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <Award className={`w-6 h-6 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <div>
              <h3 className={`text-lg font-semibold ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>{title}</h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>UC Berkeley Executive Education</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-md transition-colors ${
                isDark 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
              title="Open in new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <button 
              onClick={onClose}
              className={`p-2 rounded-md transition-colors ${
                isDark 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {/* Loading State */}
          {loading && (
            <div className={`absolute inset-0 flex items-center justify-center z-10 ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                  Loading certificate...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className={`absolute inset-0 flex items-center justify-center z-10 ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="text-center max-w-md mx-auto p-6">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h4 className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Unable to load certificate
                </h4>
                <p className={`mb-6 text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  The certificate preview couldn't be loaded. Please view it in a new tab.
                </p>
                <a 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2 font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Certificate</span>
                </a>
              </div>
            </div>
          )}

          {/* Certificate iframe */}
          <iframe
            src={url}
            className="w-full h-[75vh] border-0"
            title="Certificate Preview"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            loading="lazy"
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 flex justify-between items-center border-t ${
          isDark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {error ? 'Preview unavailable' : 'Certificate loaded'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={onClose}
              className={`px-4 py-2 border rounded-lg transition-colors font-medium ${
                isDark
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Close
            </button>
            <a 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Full Certificate</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;