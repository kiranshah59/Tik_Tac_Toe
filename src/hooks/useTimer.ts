// ============================================================
// useTimer Hook — Manages countdown timer for moves
// ============================================================

import { useEffect, useRef } from 'react';
import { useGameStore } from '../stores/gameStore';

/**
 * Custom hook that ticks the game timer every second.
 * Automatically pauses when game is not in 'playing' state.
 */
export function useTimer(): void {
  const tickTimer = useGameStore((s) => s.tickTimer);
  const isTimerRunning = useGameStore((s) => s.isTimerRunning);
  const status = useGameStore((s) => s.status);
  const settings = useGameStore((s) => s.settings);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isTimerRunning && status === 'playing' && settings?.timerEnabled) {
      intervalRef.current = setInterval(() => {
        tickTimer();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTimerRunning, status, tickTimer, settings?.timerEnabled]);
}
