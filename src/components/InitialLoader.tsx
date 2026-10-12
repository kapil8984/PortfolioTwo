import React, { useEffect, useState } from 'react';

interface InitialLoaderProps {
  onComplete: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(10);
  const [statusMessage, setStatusMessage] = useState<string>('Initializing environment...');
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Check if user already saw the loader in this session
    const hasLoaded = sessionStorage.getItem('swati_portfolio_loaded');
    if (hasLoaded) {
      onComplete();
      return;
    }

    const startTime = performance.now();
    let currentProgress = 15;

    // Monitor document and asset readiness
    const checkReadiness = () => {
      const isDocReady = document.readyState === 'complete';
      const elapsed = performance.now() - startTime;

      if (isDocReady && elapsed > 800) {
        currentProgress = 100;
        setStatusMessage('Ready');
        setProgress(100);

        setTimeout(() => {
          setIsFadingOut(true);
          sessionStorage.setItem('swati_portfolio_loaded', 'true');
          setTimeout(() => {
            onComplete();
          }, 500);
        }, 300);
      } else {
        if (currentProgress < 40) {
          currentProgress += 10;
          setStatusMessage('Loading core layout & design tokens...');
        } else if (currentProgress < 75) {
          currentProgress += 8;
          setStatusMessage('Connecting .NET project models...');
        } else if (currentProgress < 95) {
          currentProgress += 5;
          setStatusMessage('Finalizing interactive components...');
        }
        setProgress(Math.min(currentProgress, 95));
      }
    };

    const intervalId = setInterval(checkReadiness, 120);

    // Hard fallback safety timeout to guarantee site reveals even on slow networks
    const fallbackTimeout = setTimeout(() => {
      setProgress(100);
      setStatusMessage('Loaded');
      setIsFadingOut(true);
      sessionStorage.setItem('swati_portfolio_loaded', 'true');
      setTimeout(onComplete, 400);
    }, 2800);

    return () => {
      clearInterval(intervalId);
      clearTimeout(fallbackTimeout);
    };
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0D12] text-white transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6 text-center">
        {/* Animated Brand Mark */}
        <div className="relative mb-6 flex items-center justify-center w-20 h-20 rounded-2xl bg-[#121722] border border-[#232C40] shadow-glow-primary">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#7C5CFC]/30 to-[#35D0BA]/30 animate-pulse-slow pointer-events-none" />
          <span className="font-sans font-extrabold text-3xl gradient-text tracking-tight">SB</span>
        </div>

        {/* Developer Name & Title */}
        <h1 className="text-xl font-bold tracking-tight text-white mb-1">Swati Baretha</h1>
        <p className="text-xs uppercase tracking-widest text-[#94A3B8] mb-6">.NET Full Stack Developer</p>

        {/* Progress Bar */}
        <div className="w-full bg-[#161D2C] rounded-full h-1.5 overflow-hidden mb-3 border border-[#232C40]/80">
          <div
            className="h-full bg-gradient-to-r from-[#7C5CFC] via-[#9F85FF] to-[#35D0BA] transition-all duration-200 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status text & percentage */}
        <div className="w-full flex items-center justify-between text-xs text-[#94A3B8]">
          <span className="truncate pr-2">{statusMessage}</span>
          <span className="font-mono font-medium text-[#35D0BA]">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
