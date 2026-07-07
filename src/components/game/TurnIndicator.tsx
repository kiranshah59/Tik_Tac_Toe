// ============================================================
// TurnIndicator Component — Shows current player's turn
// ============================================================

import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { Bot } from 'lucide-react';

export const TurnIndicator: React.FC = () => {
  const settings = useGameStore((s) => s.settings);
  const currentPlayerIndex = useGameStore((s) => s.currentPlayerIndex);
  const status = useGameStore((s) => s.status);
  const isAIThinking = useGameStore((s) => s.isAIThinking);

  if (!settings || status !== 'playing') return null;

  const currentPlayer = settings.players[currentPlayerIndex];
  const isX = currentPlayer.symbol === 'X';

  return (
    <div
      className="flex items-center justify-center gap-3 animate-fade-in"
      aria-live="polite"
      aria-label={`Current turn: ${currentPlayer.name} (${currentPlayer.symbol})`}
    >
      {/* Symbol indicator */}
      <div
        className={`
          w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg
          transition-all duration-300
          ${isX
            ? 'bg-secondary/20 text-secondary shadow-lg shadow-secondary/20'
            : 'bg-accent/20 text-accent shadow-lg shadow-accent/20'
          }
        `}
      >
        {currentPlayer.symbol}
      </div>

      <div className="text-center">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold">{currentPlayer.name}</span>
          {currentPlayer.isAI && <Bot size={14} className="text-primary" />}
        </div>
        <span className="text-xs text-secondary">
          {isAIThinking ? (
            <span className="flex items-center gap-1">
              Thinking
              <span className="inline-flex gap-0.5">
                <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </span>
          ) : (
            "It's your turn"
          )}
        </span>
      </div>
    </div>
  );
};
