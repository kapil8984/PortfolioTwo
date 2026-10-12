import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-primary/10 text-brand-primary dark:text-[#35D0BA] mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-light-textHeading dark:text-white tracking-tight mb-4">
            Employment History
          </h2>
          <p className="text-base sm:text-lg text-light-textMuted dark:text-dark-textMuted">
            Documented full-time software engineering milestones and production responsibilities.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto">
          {EXPERIENCE_DATA.map((exp, index) => (
            <div key={index} className="relative pl-6 sm:pl-10 pb-12 border-l-2 border-brand-primary/30 dark:border-brand-primary/40 last:border-0 last:pb-0">
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-brand-primary border-4 border-light-bg dark:border-dark-bg shadow-glow-primary" />

              {/* Experience Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-light-border dark:border-dark-border pb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-light-textHeading dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-base font-semibold text-brand-primary dark:text-[#35D0BA] mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-light-textMuted dark:text-dark-textMuted">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/5 dark:bg-white/5 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-brand-primary dark:text-[#35D0BA]" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/5 dark:bg-white/5">
                      <MapPin className="w-3.5 h-3.5 text-brand-primary dark:text-[#35D0BA]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-light-textMuted dark:text-dark-textMuted leading-relaxed">
                  {exp.summary}
                </p>

                {/* Documented Responsibilities */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-light-textHeading dark:text-white flex items-center gap-1.5">
                    <ChevronRight className="w-4 h-4 text-brand-primary dark:text-[#35D0BA]" />
                    Documented Production Contributions
                  </h4>
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-3 text-sm text-light-textMuted dark:text-dark-textMuted leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#35D0BA] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-black/5 dark:bg-white/5 text-light-textHeading dark:text-white border border-light-border dark:border-dark-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
