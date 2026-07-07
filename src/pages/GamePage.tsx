// ============================================================
// GamePage — Main game view
// ============================================================

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { useTimer } from '../hooks/useTimer';
import { GameBoard } from '../components/game/GameBoard';
import { Scoreboard } from '../components/game/Scoreboard';
import { Timer } from '../components/game/Timer';
import { TurnIndicator } from '../components/game/TurnIndicator';
import { GameOverModal } from '../components/game/GameOverModal';
import { Button } from '../components/ui/Button';
import {
  Undo2, Redo2, Lightbulb, RotateCcw,
  RefreshCw, Home, Settings,
} from 'lucide-react';

export const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const settings = useGameStore((s) => s.settings);
  const status = useGameStore((s) => s.status);
  const moveHistory = useGameStore((s) => s.moveHistory);
  const undoneHistory = useGameStore((s) => s.undoneHistory);
  const isAIThinking = useGameStore((s) => s.isAIThinking);
  const undoMove = useGameStore((s) => s.undoMove);
  const redoMove = useGameStore((s) => s.redoMove);
  const showHint = useGameStore((s) => s.showHint);
  const newMatch = useGameStore((s) => s.newMatch);
  const resetScore = useGameStore((s) => s.resetScore);

  // Activate the timer
  useTimer();

  // Redirect if no settings configured
  useEffect(() => {
    if (!settings) {
      navigate('/settings');
    }
  }, [settings, navigate]);

  if (!settings) return null;

  const canUndo = moveHistory.length > 0 && status === 'playing' && !isAIThinking;
  const canRedo = undoneHistory.length > 0 && status === 'playing' && !isAIThinking;
  const canHint = status === 'playing' && !isAIThinking;

  return (
    <div className="py-6 px-4 max-w-lg mx-auto w-full space-y-6 animate-fade-in z-10 relative">
      {/* Top bar — Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          icon={<Home size={16} />}
          onClick={() => navigate('/')}
        >
          Home
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<Settings size={16} />}
          onClick={() => navigate('/settings')}
        >
          Settings
        </Button>
      </div>

      {/* Turn Indicator */}
      <TurnIndicator />

      {/* Timer */}
      <Timer />

      {/* Game Board */}
      <GameBoard />

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button
          variant="ghost"
          size="sm"
          icon={<Undo2 size={16} />}
          disabled={!canUndo}
          onClick={undoMove}
          aria-label="Undo move"
        >
          Undo
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<Redo2 size={16} />}
          disabled={!canRedo}
          onClick={redoMove}
          aria-label="Redo move"
        >
          Redo
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<Lightbulb size={16} />}
          disabled={!canHint}
          onClick={showHint}
          aria-label="Show hint"
        >
          Hint
        </Button>
      </div>

      {/* Scoreboard */}
      <Scoreboard />

      {/* Bottom Actions */}
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          icon={<RotateCcw size={14} />}
          onClick={newMatch}
        >
          New Match
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<RefreshCw size={14} />}
          onClick={resetScore}
        >
          Reset Score
        </Button>
      </div>

      {/* Game Over Modal */}
      <GameOverModal />
    </div>
  );
};
