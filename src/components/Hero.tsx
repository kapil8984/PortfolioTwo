import React, { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, MapPin, Terminal, Layers, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenAIChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAIChat }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for rotating titles
  useEffect(() => {
    const titles = PERSONAL_INFO.heroRotatingTitles;
    const currentFullTitle = titles[titleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentFullTitle.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullTitle.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullTitle.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center relative z-10 flex flex-col items-center">
        {/* Location badge & availability */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/70 dark:bg-[#121722]/80 backdrop-blur-md border border-light-border dark:border-dark-border text-light-textMuted dark:text-dark-textMuted mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35D0BA] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#35D0BA]" />
          </span>
          <MapPin className="w-3.5 h-3.5 text-brand-primary dark:text-[#35D0BA]" />
          <span>Based in Indore, India</span>
          <span className="mx-1 text-light-border dark:text-dark-border">•</span>
          <span className="text-light-textHeading dark:text-white font-semibold">1.5+ Years Experience</span>
        </div>

        {/* Small Intro */}
        <p className="text-xs sm:text-sm font-bold tracking-widest text-brand-primary dark:text-[#35D0BA] uppercase mb-4">
          HELLO, I'M SWATI BARETHA
        </p>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-light-textHeading dark:text-white max-w-4xl leading-[1.15] mb-6">
          Building Digital Experiences with{' '}
          <span className="gradient-text">.NET and Modern Web</span> Technologies.
        </h1>

        {/* Rotating Typewriter Title */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-light-border dark:border-dark-border text-base sm:text-xl font-mono text-light-textHeading dark:text-white shadow-inner">
            <Terminal className="w-4 h-4 text-brand-primary dark:text-[#35D0BA]" />
            <span className="font-semibold text-brand-primary dark:text-[#35D0BA]">{displayText}</span>
            <span className="w-2 h-5 bg-brand-primary dark:bg-[#35D0BA] animate-pulse" />
          </div>
        </div>

        {/* Supporting Description */}
        <p className="max-w-2xl text-base sm:text-lg text-light-textMuted dark:text-dark-textMuted leading-relaxed mb-10">
          {PERSONAL_INFO.heroDescription} Proven track record shipping cross-platform mobile apps,
          clean MVVM architecture, and high-performance cloud integrations.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          {/* Primary CTA */}
          <button
            onClick={() => scrollTo('projects')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-brand-primary text-white hover:bg-brand-primaryHover shadow-glow-primary transition-all duration-200 hover:-translate-y-0.5"
          >
            <Layers className="w-4 h-4" />
            <span>Explore My Work</span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-[#121722] text-light-textHeading dark:text-white border border-light-border dark:border-dark-border hover:border-brand-primary/50 hover:bg-light-cardHover dark:hover:bg-[#1B2436] transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
          >
            <Mail className="w-4 h-4 text-brand-primary dark:text-[#35D0BA]" />
            <span>Contact Me</span>
          </button>

          {/* Download Resume CTA */}
          <a
            href={PERSONAL_INFO.resumeUrl}
            download="Swati_Baretha_Resume.pdf"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-black/5 dark:bg-white/5 text-light-textHeading dark:text-white border border-light-border dark:border-dark-border hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-brand-primary dark:text-[#35D0BA]" />
            <span>Download Resume</span>
          </a>

          {/* AI Assistant Quick Pill */}
          <button
            onClick={onOpenAIChat}
            className="flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-brand-primary/10 to-[#35D0BA]/10 text-brand-primary dark:text-[#35D0BA] border border-brand-primary/30 hover:border-brand-primary transition-all duration-200 hover:-translate-y-0.5"
            title="Chat with Swati's AI Assistant"
          >
            <Sparkles className="w-4 h-4 text-[#35D0BA]" />
            <span>Ask AI Assistant</span>
          </button>
        </div>

        {/* Abstract Identity Badge (Clean developer monogram & highlights) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl w-full text-left">
          <div className="p-3.5 rounded-xl bg-white/60 dark:bg-[#121722]/60 backdrop-blur-sm border border-light-border dark:border-dark-border/80">
            <p className="text-xl sm:text-2xl font-extrabold text-light-textHeading dark:text-white">2+</p>
            <p className="text-xs text-light-textMuted dark:text-dark-textMuted font-medium">Production Apps Shipped</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/60 dark:bg-[#121722]/60 backdrop-blur-sm border border-light-border dark:border-dark-border/80">
            <p className="text-xl sm:text-2xl font-extrabold text-brand-primary dark:text-[#35D0BA]">90+</p>
            <p className="text-xs text-light-textMuted dark:text-dark-textMuted font-medium">REST APIs Integrated</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/60 dark:bg-[#121722]/60 backdrop-blur-sm border border-light-border dark:border-dark-border/80">
            <p className="text-xl sm:text-2xl font-extrabold text-light-textHeading dark:text-white">20+</p>
            <p className="text-xs text-light-textMuted dark:text-dark-textMuted font-medium">Mobile Screens Architected</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/60 dark:bg-[#121722]/60 backdrop-blur-sm border border-light-border dark:border-dark-border/80">
            <p className="text-xl sm:text-2xl font-extrabold text-brand-primary dark:text-[#35D0BA]">100%</p>
            <p className="text-xs text-light-textMuted dark:text-dark-textMuted font-medium">Clean MVVM Architecture</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo('about')}
          className="mt-12 text-light-textMuted dark:text-dark-textMuted hover:text-light-textHeading dark:hover:text-white transition-colors focus:outline-none"
          aria-label="Scroll down to About section"
        >
          <ArrowDown className="w-5 h-5 animate-bounce mx-auto" />
        </button>
      </div>
    </section>
  );
};
