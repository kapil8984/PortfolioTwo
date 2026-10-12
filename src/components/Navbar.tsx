import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Bot, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenAIChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAIChat }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Detect active section
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#0B0D12]/85 backdrop-blur-md border-b border-light-border dark:border-dark-border/80 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
          aria-label="Swati Baretha - Back to top"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C5CFC] to-[#35D0BA] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#121722] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-sm gradient-text tracking-tighter">SB</span>
            </div>
          </div>
          <div className="hidden sm:block text-left">
            <span className="block font-bold text-sm tracking-tight text-light-textHeading dark:text-white leading-none">
              Swati Baretha
            </span>
            <span className="text-[11px] font-medium text-light-textMuted dark:text-dark-textMuted">
              .NET Full Stack
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-brand-primary dark:text-[#35D0BA] bg-brand-primary/10 dark:bg-[#35D0BA]/10'
                    : 'text-light-textMuted dark:text-dark-textMuted hover:text-light-textHeading dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}

          {/* AI Assistant Nav Action */}
          <button
            onClick={onOpenAIChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-brand-primary dark:text-[#35D0BA] hover:bg-brand-primary/10 dark:hover:bg-[#35D0BA]/10 transition-colors ml-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            title="Open Swati's AI Assistant"
            aria-label="Open AI Assistant"
          >
            <Bot className="w-4 h-4 text-brand-primary dark:text-[#35D0BA]" />
            <span>AI Assistant</span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-light-textMuted dark:text-dark-textMuted hover:text-light-textHeading dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>

          {/* Resume Download (Desktop) */}
          <a
            href={PERSONAL_INFO.resumeUrl}
            download="Swati_Baretha_Resume.pdf"
            className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-brand-primary text-white hover:bg-brand-primaryHover shadow-sm hover:shadow-glow-primary transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-light-textMuted dark:text-dark-textMuted hover:text-light-textHeading dark:hover:text-white bg-black/5 dark:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-[60px] bg-white/95 dark:bg-[#0B0D12]/95 backdrop-blur-xl border-b border-light-border dark:border-dark-border px-6 py-6 shadow-xl transition-all"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'text-brand-primary dark:text-[#35D0BA] bg-brand-primary/10 dark:bg-[#35D0BA]/10'
                      : 'text-light-textMuted dark:text-dark-textMuted hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIChat();
              }}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-brand-primary dark:text-[#35D0BA] bg-brand-primary/10 dark:bg-[#35D0BA]/10"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span>Ask Swati's AI Assistant</span>
              </div>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Swati_Baretha_Resume.pdf"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider bg-brand-primary text-white hover:bg-brand-primaryHover text-center mt-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
