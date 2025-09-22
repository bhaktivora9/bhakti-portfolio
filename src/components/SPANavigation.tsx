import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { User, Briefcase, FolderOpen, Mail, Award, FileText, Code } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  hash: string;
}

interface SPANavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'About', icon: User, hash: '#about' },
  { id: 'work', label: 'Experience', icon: Briefcase, hash: '#work' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, hash: '#projects' },
  { id: 'skills', label: 'Skills', icon: Code, hash: '#skills' },
  { id: 'education', label: 'Education', icon: Award, hash: '#education' },
  { id: 'contact', label: 'Contact', icon: Mail, hash: '#contact' },
  { id: 'resume', label: 'Resume', icon: FileText, hash: '#resume' }
];

export const SPANavigation: React.FC<SPANavigationProps> = ({ activeSection, onSectionChange }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Update hash without triggering page reload
      window.history.pushState(null, '', `#${sectionId}`);
      onSectionChange(sectionId);
    }
  };

  return (
    <nav 
      className={`
        ${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-lg backdrop-blur-sm bg-vscode-bg-primary/95' : 'relative bg-vscode-bg-primary'}
        border-b border-vscode-border transition-all duration-300
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-vscode-text-active">Bhakti Vora</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                      flex items-center gap-2 hover:bg-vscode-bg-secondary
                      ${isActive 
                        ? 'bg-vscode-accent text-white' 
                        : 'text-vscode-text-secondary hover:text-vscode-text-active'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="bg-vscode-bg-secondary inline-flex items-center justify-center p-2 rounded-md text-vscode-text-secondary hover:text-vscode-text-active hover:bg-vscode-bg-tertiary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-vscode-accent"
            >
              <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-vscode-bg-secondary">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                  flex items-center gap-2
                  ${isActive 
                    ? 'bg-vscode-accent text-white' 
                    : 'text-vscode-text-secondary hover:text-vscode-text-active hover:bg-vscode-bg-tertiary'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

// Hook to handle URL hash navigation
export const useHashNavigation = (onSectionChange: (section: string) => void) => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash && navItems.find(item => item.id === hash)) {
        onSectionChange(hash);
        const element = document.getElementById(`section-${hash}`);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };

    // Handle initial hash on page load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [onSectionChange]);
};

// Scroll spy hook to update active section based on scroll position
export const useScrollSpy = (sectionIds: string[], onSectionChange: (section: string) => void) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for sticky header
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(`section-${sectionIds[i]}`);
        if (element && element.offsetTop <= scrollPosition) {
          onSectionChange(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, onSectionChange]);
};