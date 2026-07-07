// ============================================================
// Scoreboard Component — Win/Draw/Games tracking
// ============================================================

import React from 'react';
import { useGameStore } from '../../stores/gameStore';

export const Scoreboard: React.FC = () => {
  const score = useGameStore((s) => s.score);
  const settings = useGameStore((s) => s.settings);

  const player1Name = settings?.players[0]?.name ?? 'Player 1';
  const player2Name = settings?.players[1]?.name ?? 'Player 2';
  const player1Symbol = settings?.players[0]?.symbol ?? 'X';
  const player2Symbol = settings?.players[1]?.symbol ?? 'O';

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm mx-auto" aria-label="Scoreboard">
      {/* Player 1 */}
      <div className="surface-card rounded-xl p-3 text-center transition-all duration-300">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className={`text-sm font-bold ${player1Symbol === 'X' ? 'text-secondary' : 'text-accent'}`}>
            {player1Symbol}
          </span>
          <span className="text-xs text-secondary truncate max-w-[60px]">{player1Name}</span>
        </div>
        <div className="text-2xl font-bold font-[family-name:var(--font-heading)] gradient-text">
          {score.player1Wins}
        </div>
      </div>

      {/* Draws */}
      <div className="surface-card rounded-xl p-3 text-center transition-all duration-300">
        <div className="text-xs text-secondary mb-1">Draws</div>
        <div className="text-2xl font-bold font-[family-name:var(--font-heading)] text-warning">
          {score.draws}
        </div>
      </div>

      {/* Player 2 */}
      <div className="surface-card rounded-xl p-3 text-center transition-all duration-300">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className={`text-sm font-bold ${player2Symbol === 'X' ? 'text-secondary' : 'text-accent'}`}>
            {player2Symbol}
          </span>
          <span className="text-xs text-secondary truncate max-w-[60px]">{player2Name}</span>
        </div>
        <div className="text-2xl font-bold font-[family-name:var(--font-heading)] gradient-text">
          {score.player2Wins}
        </div>
      </div>
    </div>
  );
};
