import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ImageBannerSlider } from './components/ImageBannerSlider';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectItem } from './types';

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');
  const [activeProjectDetail, setActiveProjectDetail] = useState<ProjectItem | null>(null);

  const handleStartProject = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServicePreset(serviceName);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestSimilarProject = (projectTitle: string) => {
    setSelectedServicePreset(`Platform like ${projectTitle}`);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#222222] font-sans antialiased selection:bg-[#3A3F44] selection:text-white flex flex-col">
      {/* Navigation (top bar removed as requested) */}
      <Navbar 
        onOpenAdmin={() => setAdminOpen(true)}
        onSelectService={handleSelectService}
      />

      {/* Dynamic Sliding Banner directly below Navbar */}
      <ImageBannerSlider 
        onRequestQuote={handleStartProject}
        onExplorePortfolio={handleExploreProjects}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onStartProject={handleStartProject}
          onExploreProjects={handleExploreProjects}
        />

        {/* About TechWorks Section */}
        <About />

        {/* 8 Core Capabilities & Services */}
        <Services 
          onSelectService={handleSelectService}
        />

        {/* 10+ Delivered Projects Showcase (Direct display without category filters & skills tags removed) */}
        <Projects 
          onOpenProjectDetail={(project) => setActiveProjectDetail(project)}
          onRequestSimilarProject={handleRequestSimilarProject}
        />

        {/* Experience & Process */}
        <Experience />

        {/* Consultation & Lead Capture Form */}
        <ContactForm 
          selectedServicePreset={selectedServicePreset}
          onSubmissionSuccess={() => {
            // Optional callback
          }}
        />
      </main>

      {/* Professional Footer (without extra CTA box) */}
      <Footer 
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Admin Panel Modal */}
      <AdminModal 
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      {/* Project Case Study Modal (skills removed) */}
      <ProjectDetailModal 
        project={activeProjectDetail}
        onClose={() => setActiveProjectDetail(null)}
        onRequestThisProject={(title) => {
          handleRequestSimilarProject(title);
        }}
      />
    </div>
  );
}
