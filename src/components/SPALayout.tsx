import React, { useState, useEffect } from 'react';
import { SPANavigation, useHashNavigation, useScrollSpy } from './SPANavigation';
import { AboutSection } from '../sections/AboutSection';
import { WorkSection } from '../sections/WorkSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import SkillsSection from '../sections/SkillsSection';
import { EducationSection } from '../sections/EducationSection';
import { ContactSection } from '../sections/ContactSection';
import { ResumeSection } from '../sections/ResumeSection';
import { StatusBar } from './StatusBar';

interface SPALayoutProps {
  isDarkTheme: boolean;
}

export const SPALayout: React.FC<SPALayoutProps> = ({ isDarkTheme }) => {
  const [activeSection, setActiveSection] = useState('about');
  
  // Section IDs for scroll spy
  const sectionIds = ['about', 'work', 'projects', 'skills', 'education', 'contact', 'resume'];
  
  // Handle hash navigation
  useHashNavigation(setActiveSection);
  
  // Handle scroll spy
  useScrollSpy(sectionIds, setActiveSection);

  // Add smooth scroll behavior to the document
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-vscode-bg-primary text-vscode-text-primary">
      {/* Sticky Navigation */}
      <SPANavigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {/* Main Content */}
      <main className="relative">
        
        {/* About Section */}
        <section id="section-about" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-vscode-bg-secondary rounded-lg border border-vscode-border p-6 lg:p-8">
              <AboutSection 
                setActiveTab={() => {}} 
                openTabs={[]} 
                setOpenTabs={() => {}} 
              />
            </div>
          </div>
        </section>

        {/* Work/Experience Section */}
        <section id="section-work" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-vscode-bg-secondary rounded-lg border border-vscode-border p-6 lg:p-8">
              <WorkSection color="var(--vscode-sky)" />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="section-projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-vscode-bg-secondary rounded-lg border border-vscode-border p-6 lg:p-8">
              <ProjectsSection color="var(--vscode-green)" />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="section-skills" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-vscode-bg-secondary rounded-lg border border-vscode-border p-6 lg:p-8">
              <SkillsSection />
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="section-education" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-vscode-bg-secondary rounded-lg border border-vscode-border p-6 lg:p-8">
              <EducationSection color="var(--vscode-purple)" />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="section-contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-vscode-bg-secondary rounded-lg border border-vscode-border p-6 lg:p-8">
              <ContactSection />
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="section-resume" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-vscode-bg-secondary rounded-lg border border-vscode-border p-6 lg:p-8">
              <ResumeSection color="var(--vscode-red)" />
            </div>
          </div>
        </section>
      </main>

      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};