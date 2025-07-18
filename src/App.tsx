import  { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Workstation from './components/Workstation';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Experience from './components/Experience.tsx';
import Projects from './components/Projects';
import SkillsSection from './components/SkillsSection';
import Terminal from './components/Terminal';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import { useAnalytics } from './hooks/useAnalytics';
import './index.css';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  // Track analytics
  useAnalytics();

  // Create modal root element
  useEffect(() => {
    let modalContainer = document.getElementById('modal-root');
    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.id = 'modal-root';
      modalContainer.style.position = 'fixed';
      modalContainer.style.top = '0';
      modalContainer.style.left = '0';
      modalContainer.style.width = '100%';
      modalContainer.style.height = '100%';
      modalContainer.style.zIndex = '999999';
      modalContainer.style.pointerEvents = 'none';
      document.body.appendChild(modalContainer);
    }
    setModalRoot(modalContainer);

    return () => {
      const container = document.getElementById('modal-root');
      if (container && !container.hasChildNodes()) {
        document.body.removeChild(container);
      }
    };
  }, []);

  const toggleTheme = () => setIsDark(!isDark);
  const openResumeModal = () => setIsResumeModalOpen(true);
  const closeResumeModal = () => setIsResumeModalOpen(false);

  return (
    <>
      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
        {/* Navigation */}
        <div style={{ position: 'relative', zIndex: 50 }}>
          <Navigation isDark={isDark} toggleTheme={toggleTheme} />
        </div>

        {/* Workstation Hero */}
        <div className="relative">
          <Workstation isDark={isDark} toggleTheme={toggleTheme} />
        </div>

        {/* Header Section */}
        <section id="about">
          <Header 
            isDark={isDark} 
            openResumeModal={openResumeModal}
          />
        </section>

        {/* Main Content */}
        <main className="pt-16">
          <section id="experience">
            <Experience isDark={isDark} />
          </section>
          
          <section id="skills" className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4">
              <SkillsSection isDark={isDark}/>
            </div>
          </section>
       
          <Projects isDark={isDark} />
        </main>

        {/* Interactive Terminal */}
        <Terminal isDark={isDark} />

        {/* Footer */}
        <section id="contact">
          <Footer isDark={isDark} />
        </section>
      </div>

      {/* Portal for Modal - Renders outside main app */}
      {modalRoot && isResumeModalOpen && createPortal(
        <div style={{ pointerEvents: 'auto' }}>
          <ResumeModal 
            isOpen={isResumeModalOpen}
            onClose={closeResumeModal}
            isDark={isDark}
          />
        </div>,
        modalRoot
      )}
    </>
  );
}

export default App;