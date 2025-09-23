import { useState, useEffect } from 'react';

export const useScrollSpy = (fileNames: string[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState(fileNames[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.main-content-area');
      if (!container) return;
      
      const scrollPosition = container.scrollTop + offset;

      for (let i = fileNames.length - 1; i >= 0; i--) {
        const section = document.getElementById(fileNames[i]);
        if (section && section.offsetTop - container.scrollTop <= offset) {
          setActiveSection(fileNames[i]);
          break;
        }
      }
    };

    const container = document.querySelector('.main-content-area');
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    handleScroll(); // Call once to set initial state

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fileNames, offset]);

  return activeSection;
};