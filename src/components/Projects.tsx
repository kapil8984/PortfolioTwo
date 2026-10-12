import React, { useState } from 'react';
import { Layers, ArrowRight, Sparkles, Smartphone, Globe } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectDetailModal } from './ProjectDetailModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectIcon = (category: string) => {
    if (category.includes('Equipment') || category.includes('Operations')) {
      return <Smartphone className="w-5 h-5 text-brand-primary dark:text-[#35D0BA]" />;
    }
    if (category.includes('Pregnancy') || category.includes('Baby')) {
      return <Sparkles className="w-5 h-5 text-brand-primary dark:text-[#35D0BA]" />;
    }
    return <Globe className="w-5 h-5 text-brand-primary dark:text-[#35D0BA]" />;
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-primary/10 text-brand-primary dark:text-[#35D0BA] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-light-textHeading dark:text-white tracking-tight mb-4">
            Production Software & Architectural Systems
          </h2>
          <p className="text-base sm:text-lg text-light-textMuted dark:text-dark-textMuted">
            Real enterprise mobile applications and layered .NET web platforms built with precision.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((proj) => (
            <div
              key={proj.id}
              className="glass-card glass-card-hover rounded-2xl flex flex-col justify-between overflow-hidden group border border-light-border dark:border-dark-border"
            >
              <div className="p-6 sm:p-7 space-y-4">
                {/* Header with Category & Status Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                      {getProjectIcon(proj.category)}
                    </div>
                    <span className="text-xs font-medium text-light-textMuted dark:text-dark-textMuted">
                      {proj.category}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
                      proj.status === 'Production App'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-light-textHeading dark:text-white group-hover:text-brand-primary dark:group-hover:text-[#35D0BA] transition-colors">
                  {proj.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-light-textMuted dark:text-dark-textMuted leading-relaxed">
                  {proj.shortDescription}
                </p>

                {/* Important Highlights Preview */}
                <div className="space-y-1.5 pt-1">
                  {proj.features.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-light-textMuted dark:text-dark-textMuted">
                      <span className="w-1 h-1 rounded-full bg-brand-primary dark:bg-[#35D0BA] mt-1.5 shrink-0" />
                      <span className="truncate">{feat.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Area: Tech Badges & View Details Button */}
              <div className="p-6 sm:p-7 pt-0 space-y-4">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-light-border/60 dark:border-dark-border/60">
                  {proj.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-black/5 dark:bg-white/5 text-light-textHeading dark:text-white border border-light-border dark:border-dark-border"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-black/5 dark:bg-white/5 text-light-textMuted dark:text-dark-textMuted">
                      +{proj.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* View Details Action */}
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-black/5 dark:bg-white/5 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white text-light-textHeading dark:text-white border border-light-border dark:border-dark-border hover:border-transparent transition-all duration-200"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal View */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
