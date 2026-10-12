import React, { useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Tag } from 'lucide-react';
import { Project } from '../types/portfolio';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#121722] border border-light-border dark:border-dark-border rounded-2xl shadow-2xl p-6 sm:p-8 text-left">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-light-border dark:border-dark-border pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary dark:text-[#35D0BA]">
                {project.category}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  project.status === 'Production App'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}
              >
                {project.status}
              </span>
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-light-textHeading dark:text-white">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-light-textMuted dark:text-dark-textMuted hover:text-light-textHeading dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-8">
          {/* Status Alert Banner if Demo */}
          {project.status === 'Portfolio Demo' && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-800 dark:text-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <p className="font-semibold mb-0.5">Portfolio Demonstration Notice</p>
                <p className="leading-relaxed">
                  {project.statusDescription} As documented in the project summary, consultation video screens,
                  OTP, and payments are currently simulated for architectural evaluation. Real WebRTC, live payment
                  gateways, and production hosting represent future milestones.
                </p>
              </div>
            </div>
          )}

          {/* Overview & Problem/Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-light-textHeading dark:text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-brand-primary dark:text-[#35D0BA]" />
                Project Overview
              </h3>
              <p className="text-sm text-light-textMuted dark:text-dark-textMuted leading-relaxed">
                {project.overview}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-light-textHeading dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-primary dark:text-[#35D0BA]" />
                Problem & Solution
              </h3>
              <p className="text-sm text-light-textMuted dark:text-dark-textMuted leading-relaxed">
                {project.problemSolution}
              </p>
            </div>
          </div>

          {/* Documented Features */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-light-textHeading dark:text-white">
              Documented Features & Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${
                    feat.isSimulated
                      ? 'bg-amber-500/5 dark:bg-amber-500/5 border-amber-500/30'
                      : 'bg-black/5 dark:bg-white/5 border-light-border dark:border-dark-border'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="font-semibold text-sm text-light-textHeading dark:text-white">
                      {feat.title}
                    </h4>
                    {feat.isSimulated && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
                        Simulated
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-light-textMuted dark:text-dark-textMuted leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Architecture Diagram (if available) */}
          {project.architecture?.diagramAvailable && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-light-textHeading dark:text-white mb-2">
                Architectural Breakdown
              </h3>
              <ArchitectureDiagram />
            </div>
          )}

          {/* Swati's Documented Contributions */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-light-textHeading dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#35D0BA]" />
              Engineering Role & Contributions
            </h3>
            <ul className="space-y-2">
              {project.contributions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-light-textMuted dark:text-dark-textMuted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary dark:bg-[#35D0BA] mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Known Limitations / Source Note */}
          {project.limitations && project.limitations.length > 0 && (
            <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-light-border dark:border-dark-border space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-light-textHeading dark:text-white flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Documented Implementation Limits
              </h3>
              <ul className="space-y-1 text-xs text-light-textMuted dark:text-dark-textMuted pl-2 list-disc list-inside">
                {project.limitations.map((limit, lIdx) => (
                  <li key={lIdx}>{limit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Badges */}
          <div className="pt-2 border-t border-light-border dark:border-dark-border">
            <span className="block text-xs font-medium text-light-textMuted dark:text-dark-textMuted mb-2">
              Technologies & Frameworks
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-[#35D0BA]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-light-border dark:border-dark-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-black/5 dark:bg-white/10 text-light-textHeading dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
