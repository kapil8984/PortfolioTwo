import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

interface AIFloatingButtonProps {
  onClick: () => void;
}

export const AIFloatingButton: React.FC<AIFloatingButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#7C5CFC] to-[#35D0BA] text-white font-semibold text-sm shadow-xl shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-primary/30"
        aria-label="Open Swati's AI Assistant"
      >
        <span className="relative flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse" />
        </span>
        <span className="hidden sm:inline">Ask AI Assistant</span>
        <Sparkles className="w-4 h-4 text-white/80 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};
