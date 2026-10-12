import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIChatModal } from './components/AIChatModal';
import { AIFloatingButton } from './components/AIFloatingButton';
import { InitialLoader } from './components/InitialLoader';

export const AppContent: React.FC = () => {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <div className="relative min-h-screen text-light-textHeading dark:text-dark-textHeading transition-colors duration-300">
      {/* Initial Loader */}
      {isInitialLoading && (
        <InitialLoader onComplete={() => setIsInitialLoading(false)} />
      )}

      {/* Ambient Canvas Background */}
      <BackgroundCanvas />

      {/* Navigation */}
      <Navbar onOpenAIChat={() => setIsAIChatOpen(true)} />

      {/* Main Section Sequence */}
      <main className="relative z-10">
        <Hero onOpenAIChat={() => setIsAIChatOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Assistant Trigger */}
      <AIFloatingButton onClick={() => setIsAIChatOpen(true)} />

      {/* AI Assistant Modal */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
