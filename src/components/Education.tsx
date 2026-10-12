import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-primary/10 text-brand-primary dark:text-[#35D0BA] mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-light-textHeading dark:text-white tracking-tight mb-2">
            Education & Certifications
          </h2>
          <p className="text-sm text-light-textMuted dark:text-dark-textMuted">
            Formal science degree and intensive full-stack programming certification.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION_DATA.map((edu, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 sm:p-7 space-y-4 hover:border-brand-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-[#35D0BA] shrink-0">
                  {idx === 0 ? <GraduationCap className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-black/5 dark:bg-white/5 border border-light-border dark:border-dark-border text-light-textHeading dark:text-white">
                  {edu.badge}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-light-textHeading dark:text-white">
                  {edu.degree}
                </h3>
                <p className="text-sm font-semibold text-brand-primary dark:text-[#35D0BA] mt-0.5">
                  {edu.institution}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-light-textMuted dark:text-dark-textMuted mt-1">
                  <Calendar className="w-3 h-3 text-brand-primary dark:text-[#35D0BA]" />
                  <span>{edu.period}</span>
                </div>
              </div>

              <p className="text-xs text-light-textMuted dark:text-dark-textMuted leading-relaxed pt-2 border-t border-light-border/60 dark:border-dark-border/60">
                {edu.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
