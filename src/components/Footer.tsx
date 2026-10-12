import React from 'react';
import { ArrowUp, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-light-border dark:border-dark-border bg-white/50 dark:bg-[#0B0D12]/80 backdrop-blur-md pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C5CFC] to-[#35D0BA] p-[1.5px]">
            <div className="w-full h-full bg-[#121722] rounded-[9px] flex items-center justify-center">
              <span className="font-extrabold text-xs gradient-text">SB</span>
            </div>
          </div>
          <div>
            <span className="font-bold text-sm text-light-textHeading dark:text-white block">
              Swati Baretha
            </span>
            <span className="text-xs text-light-textMuted dark:text-dark-textMuted">
              .NET Full Stack Developer • {PERSONAL_INFO.location}
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-light-textMuted dark:text-dark-textMuted font-medium">
          <a href="#about" className="hover:text-light-textHeading dark:hover:text-white transition-colors">
            About
          </a>
          <a href="#skills" className="hover:text-light-textHeading dark:hover:text-white transition-colors">
            Skills
          </a>
          <a href="#experience" className="hover:text-light-textHeading dark:hover:text-white transition-colors">
            Experience
          </a>
          <a href="#projects" className="hover:text-light-textHeading dark:hover:text-white transition-colors">
            Projects
          </a>
          <a href={PERSONAL_INFO.resumeUrl} download="Swati_Baretha_Resume.pdf" className="hover:text-light-textHeading dark:hover:text-white transition-colors flex items-center gap-1">
            <Download className="w-3 h-3" />
            <span>Resume</span>
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-light-textHeading dark:hover:text-white transition-colors">
            {PERSONAL_INFO.email}
          </a>
        </div>

        {/* Scroll back up button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-light-textMuted dark:text-dark-textMuted hover:text-light-textHeading dark:hover:text-white transition-colors"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-light-border/40 dark:border-dark-border/40 text-center text-xs text-light-textMuted dark:text-dark-textMuted">
        <p>
          © {new Date().getFullYear()} Swati Baretha. Built with modern React, TypeScript, Tailwind CSS & .NET Architecture standards.
        </p>
      </div>
    </footer>
  );
};
