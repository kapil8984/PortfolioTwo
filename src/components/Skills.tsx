import React from 'react';
import { Cpu, Server, Smartphone, Layout, Database, Wrench } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      case 'Cpu':
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-primary/10 text-brand-primary dark:text-[#35D0BA] mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-light-textHeading dark:text-white tracking-tight mb-4">
            Structured Technology Matrix
          </h2>
          <p className="text-base sm:text-lg text-light-textMuted dark:text-dark-textMuted">
            Grouped by architectural discipline based on verified professional experience and demonstrated projects.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 dark:bg-brand-primary/15 flex items-center justify-center text-brand-primary dark:text-[#35D0BA] group-hover:scale-105 transition-transform duration-200">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-light-textHeading dark:text-white">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-light-textMuted dark:text-dark-textMuted leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-light-border/60 dark:border-dark-border/60">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/5 text-light-textHeading dark:text-white border border-light-border dark:border-dark-border group-hover:border-brand-primary/30 dark:group-hover:border-[#35D0BA]/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
