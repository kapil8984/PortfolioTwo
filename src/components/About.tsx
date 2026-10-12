import React from 'react';
import { User, Code2, Layers, ShieldCheck, Mail, Phone, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_DATA, EXPERIENCE_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-primary/10 text-brand-primary dark:text-[#35D0BA] mb-3">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-light-textHeading dark:text-white tracking-tight mb-4">
            Engineered for Maintainability & High-Performance Backends
          </h2>
          <p className="text-base sm:text-lg text-light-textMuted dark:text-dark-textMuted">
            A developer passionate about clean enterprise architecture, cross-platform mobile ecosystems,
            and reliable database-driven applications.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-bold text-light-textHeading dark:text-white flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-brand-primary dark:text-[#35D0BA]" />
                <span>Professional Background</span>
              </h3>
              <p className="text-light-textMuted dark:text-dark-textMuted leading-relaxed">
                I am a .NET Full Stack Developer with 1.5+ years of hands-on experience building production mobile
                and web applications using C#, .NET MAUI, ASP.NET Core, and Microsoft technologies. My primary focus
                centers on architecting clean MVVM codebases, engineering reusable UI component libraries, and
                connecting scalable cloud backends.
              </p>
              <p className="text-light-textMuted dark:text-dark-textMuted leading-relaxed">
                Throughout my time at Winlancer Technologies, I have delivered 2 cross-platform production apps
                targeting Android and iOS from a single C# codebase. I have integrated over 90+ REST API endpoints
                built on ASP.NET Core, implementing secure token authentication, reactive data binding, and resilient
                offline state management.
              </p>
            </div>

            {/* Architecture Philosophy Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-5 hover:border-brand-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-[#35D0BA] mb-3">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-light-textHeading dark:text-white text-base mb-1">
                  Clean MVVM Architecture
                </h4>
                <p className="text-xs text-light-textMuted dark:text-dark-textMuted leading-relaxed">
                  Decoupling business logic completely from view controls across 20+ mobile screens for testability and zero-downtime maintenance.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 hover:border-brand-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#35D0BA]/10 flex items-center justify-center text-[#35D0BA] mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-light-textHeading dark:text-white text-base mb-1">
                  Secure Cloud Backends
                </h4>
                <p className="text-xs text-light-textMuted dark:text-dark-textMuted leading-relaxed">
                  Integrating ASP.NET Core Identity, RBAC policies, and Azure Blob Storage for real-time media uploads and verified data integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Info / Verified Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-light-border dark:border-dark-border pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-primary dark:text-[#35D0BA]">
                  Verified Information
                </span>
                <h3 className="text-lg font-bold text-light-textHeading dark:text-white mt-1">
                  Candidate Overview
                </h3>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-primary dark:text-[#35D0BA] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-light-textMuted dark:text-dark-textMuted">Location</span>
                    <span className="font-medium text-light-textHeading dark:text-white">{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-brand-primary dark:text-[#35D0BA] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-light-textMuted dark:text-dark-textMuted">Current Employment</span>
                    <span className="font-medium text-light-textHeading dark:text-white">
                      {EXPERIENCE_DATA[0].role}
                    </span>
                    <span className="block text-xs text-light-textMuted dark:text-dark-textMuted">
                      {EXPERIENCE_DATA[0].company} ({EXPERIENCE_DATA[0].period})
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-brand-primary dark:text-[#35D0BA] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-light-textMuted dark:text-dark-textMuted">Education & Certifications</span>
                    <span className="font-medium text-light-textHeading dark:text-white">
                      {EDUCATION_DATA[0].degree}
                    </span>
                    <span className="block text-xs text-light-textMuted dark:text-dark-textMuted">
                      {EDUCATION_DATA[0].institution} ({EDUCATION_DATA[0].period})
                    </span>
                    <span className="block text-xs text-brand-primary dark:text-[#35D0BA] mt-1">
                      {EDUCATION_DATA[1].degree} ({EDUCATION_DATA[1].institution})
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-primary dark:text-[#35D0BA] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-light-textMuted dark:text-dark-textMuted">Email</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-medium text-light-textHeading dark:text-white hover:text-brand-primary dark:hover:text-[#35D0BA] transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-primary dark:text-[#35D0BA] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-light-textMuted dark:text-dark-textMuted">Phone</span>
                    <a
                      href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                      className="font-medium text-light-textHeading dark:text-white hover:text-brand-primary dark:hover:text-[#35D0BA] transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-light-border dark:border-dark-border text-xs text-light-textMuted dark:text-dark-textMuted">
                Active in full-lifecycle Agile software teams collaborating directly with product, QA, and UI/UX designers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
