import React, { useState } from 'react';
import { Layers, ShieldCheck, Database, Server, Globe, Info } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('all');

  return (
    <div className="rounded-2xl bg-black/20 dark:bg-black/40 border border-light-border dark:border-dark-border p-5 sm:p-6 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-light-border/60 dark:border-dark-border/60">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-brand-primary dark:text-[#35D0BA]" />
          <h4 className="font-bold text-base text-light-textHeading dark:text-white">
            The Great Ayurveda — Clean Architecture & Multi-Site Layout
          </h4>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-brand-primary/10 text-brand-primary dark:text-[#35D0BA]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ASP.NET Core 10 MVC + EF Core</span>
        </div>
      </div>

      {/* Layer Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'all', label: 'All Layers' },
          { id: 'presentation', label: '1. Presentation (Web & Admin)' },
          { id: 'core', label: '2. Domain & Application Core' },
          { id: 'infra', label: '3. Infrastructure & Persistence' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveLayer(tab.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeLayer === tab.id
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-black/5 dark:bg-white/5 text-light-textMuted dark:text-dark-textMuted hover:text-light-textHeading dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Interactive Diagram Canvas */}
      <div className="space-y-4">
        {/* TOP TIER: Presentation Layer (Two Separate Web Apps) */}
        {(activeLayer === 'all' || activeLayer === 'presentation') && (
          <div className="p-4 rounded-xl bg-white/40 dark:bg-[#121722]/80 border border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-[#35D0BA] mb-3">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Presentation Layer (Separate Ports & Cookie Schemes)
              </span>
              <span className="text-[10px] text-light-textMuted dark:text-dark-textMuted font-mono">Cookie Isolation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Public Site */}
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-brand-primary/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-light-textHeading dark:text-white">
                    Ayurveda.Web (Public MVC)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/10 text-green-500 font-medium">
                    Port A
                  </span>
                </div>
                <p className="text-xs text-light-textMuted dark:text-dark-textMuted">
                  Customer product search, shopping cart, coupons, simulated demo checkout, and appointment booking.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary dark:text-[#35D0BA]">Customer Role</span>
                  <span className="px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary dark:text-[#35D0BA]">Doctor Clinical Desk</span>
                </div>
              </div>

              {/* Admin Site */}
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-[#35D0BA]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-light-textHeading dark:text-white">
                    Ayurveda.Admin (Back-Office)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-400 font-medium">
                    Port B (Isolated)
                  </span>
                </div>
                <p className="text-xs text-light-textMuted dark:text-dark-textMuted">
                  SuperAdmin dashboard, doctor approvals, inventory management, audit logging, and finance reporting.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#35D0BA]/10 text-[#35D0BA]">SuperAdmin</span>
                  <span className="px-2 py-0.5 rounded bg-[#35D0BA]/10 text-[#35D0BA]">CatalogManager</span>
                  <span className="px-2 py-0.5 rounded bg-[#35D0BA]/10 text-[#35D0BA]">FinanceManager</span>
                  <span className="px-2 py-0.5 rounded bg-[#35D0BA]/10 text-[#35D0BA]">SupportAgent</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MIDDLE TIER: Shared Core (Domain & Application) */}
        {(activeLayer === 'all' || activeLayer === 'core') && (
          <div className="p-4 rounded-xl bg-white/40 dark:bg-[#121722]/80 border border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-[#35D0BA] mb-3">
              <span className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5" />
                Shared Core (Clean Architecture)
              </span>
              <span className="text-[10px] text-light-textMuted dark:text-dark-textMuted font-mono">Zero UI Dependencies</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Application Layer */}
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-light-border dark:border-dark-border space-y-2">
                <span className="font-bold text-sm text-light-textHeading dark:text-white block">
                  Application Layer
                </span>
                <p className="text-xs text-light-textMuted dark:text-dark-textMuted">
                  Interfaces, DTOs, ViewModels, and consultation abstractions:
                </p>
                <ul className="text-xs font-mono text-brand-primary dark:text-[#35D0BA] space-y-1 pl-2">
                  <li>• ICallProvider (Simulated Call abstraction)</li>
                  <li>• ITelephonyProvider (Future WebRTC contract)</li>
                  <li>• IOrderService & IAppointmentService</li>
                </ul>
              </div>

              {/* Domain Layer */}
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-light-border dark:border-dark-border space-y-2">
                <span className="font-bold text-sm text-light-textHeading dark:text-white block">
                  Domain Layer
                </span>
                <p className="text-xs text-light-textMuted dark:text-dark-textMuted">
                  Pure Enterprise Entities & Domain Rules:
                </p>
                <div className="flex flex-wrap gap-1.5 text-xs font-mono text-light-textHeading dark:text-white">
                  <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">User</span>
                  <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">Doctor</span>
                  <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">Product</span>
                  <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">Order</span>
                  <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">Prescription</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM TIER: Infrastructure Layer */}
        {(activeLayer === 'all' || activeLayer === 'infra') && (
          <div className="p-4 rounded-xl bg-white/40 dark:bg-[#121722]/80 border border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-[#35D0BA] mb-3">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                Infrastructure & Persistence Layer
              </span>
              <span className="text-[10px] text-light-textMuted dark:text-dark-textMuted font-mono">SQL Server + EF Core</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-light-border dark:border-dark-border">
                <span className="font-bold text-light-textHeading dark:text-white block mb-1">EF Core DbContext</span>
                <p className="text-light-textMuted dark:text-dark-textMuted">Atomic database transactions for order stock reservations.</p>
              </div>
              <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-light-border dark:border-dark-border">
                <span className="font-bold text-light-textHeading dark:text-white block mb-1">ASP.NET Core Identity</span>
                <p className="text-light-textMuted dark:text-dark-textMuted">BCrypt password hashing, lockout after 5 attempts, and anti-forgery tokens.</p>
              </div>
              <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-light-border dark:border-dark-border">
                <span className="font-bold text-light-textHeading dark:text-white block mb-1">Audit Log Repository</span>
                <p className="text-light-textMuted dark:text-dark-textMuted">Logging admin actions (who, what, when, IP) for compliance.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footnote on honesty & WebRTC roadmap */}
      <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <span>
          <strong>Architecture Transparency:</strong> The current project implements the full Clean Architecture,
          RBAC policies, and simulated consultation screens with <code>ICallProvider</code>. A real WebRTC peer
          connection and SignalR signaling hub represent the planned roadmap progression.
        </span>
      </div>
    </div>
  );
};
