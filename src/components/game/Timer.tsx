// ============================================================
// Timer Component — Countdown timer bar
// ============================================================

import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { Clock } from 'lucide-react';

export const Timer: React.FC = () => {
  const timerSeconds = useGameStore((s) => s.timerSeconds);
  const settings = useGameStore((s) => s.settings);
  const status = useGameStore((s) => s.status);

  if (!settings?.timerEnabled || status !== 'playing') return null;

  const maxTime = settings.timerDuration;
  const percentage = (timerSeconds / maxTime) * 100;

  // Color based on remaining time
  const getColor = (): string => {
    if (percentage > 60) return 'bg-success';
    if (percentage > 30) return 'bg-warning';
    return 'bg-error';
  };

  const getTextColor = (): string => {
    if (percentage > 60) return 'text-success';
    if (percentage > 30) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="w-full max-w-sm mx-auto" aria-label={`Timer: ${timerSeconds} seconds remaining`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Clock size={14} className={getTextColor()} />
          <span className={`text-xs font-medium ${getTextColor()}`}>Time Left</span>
        </div>
        <span
          className={`
            text-sm font-bold font-[family-name:var(--font-heading)]
            ${getTextColor()}
            ${timerSeconds <= 5 ? 'animate-timer-pulse' : ''}
          `}
        >
          {timerSeconds}s
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${getColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={timerSeconds}
          aria-valuemin={0}
          aria-valuemax={maxTime}
        />
      </div>
    </div>
  );
};
