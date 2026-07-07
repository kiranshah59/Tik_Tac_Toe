// ============================================================
// GameOverModal Component — Win/Draw announcement with confetti
// ============================================================

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '../../stores/gameStore';
import { useHistoryStore } from '../../stores/historyStore';
import { useAchievementsStore, type AchievementCheckData } from '../../stores/achievementsStore';
import { useToastStore } from '../../stores/toastStore';
import { soundService } from '../../services/soundService';
import { ACHIEVEMENTS } from '../../utils/constants';
import { generateId } from '../../utils/gameLogic';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Trophy, RotateCcw, Home, Handshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { MatchRecord } from '../../types';

export const GameOverModal: React.FC = () => {
  const status = useGameStore((s) => s.status);
  const winner = useGameStore((s) => s.winner);
  const settings = useGameStore((s) => s.settings);
  const moveCount = useGameStore((s) => s.moveCount);
  const gameStartTime = useGameStore((s) => s.gameStartTime);
  const moveHistory = useGameStore((s) => s.moveHistory);
  const score = useGameStore((s) => s.score);
  const newMatch = useGameStore((s) => s.newMatch);
  const addMatch = useHistoryStore((s) => s.addMatch);
  const checkAndUnlock = useAchievementsStore((s) => s.checkAndUnlock);
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();

  const isOpen = status === 'won' || status === 'draw';

  // Fire confetti and save match on game end
  useEffect(() => {
    if (!isOpen || !settings) return;

    // Save match to history
    const duration = gameStartTime ? Math.round((Date.now() - gameStartTime) / 1000) : 0;
    const match: MatchRecord = {
      id: generateId(),
      date: new Date().toISOString(),
      players: [settings.players[0].name, settings.players[1].name],
      playerSymbols: [settings.players[0].symbol, settings.players[1].symbol],
      winner: winner?.name ?? null,
      winnerSymbol: winner?.symbol ?? null,
      numberOfMoves: moveCount,
      duration,
      boardSize: settings.boardSize,
      mode: settings.mode,
      difficulty: settings.mode === 'pvc' ? settings.difficulty : undefined,
      moves: moveHistory,
    };
    addMatch(match);

    // Check achievements
    const totalWins = score.player1Wins; // Assuming player 1 is the human
    const totalGames = score.gamesPlayed;
    const defeatedHardAI =
      status === 'won' &&
      winner?.name === settings.players[0].name &&
      settings.mode === 'pvc' &&
      settings.difficulty === 'hard';

    const checkData: AchievementCheckData = {
      totalWins,
      totalGames,
      currentWinStreak: 0, // Simplified; full streak tracking would need more state
      defeatedHardAI,
    };

    const newlyUnlocked = checkAndUnlock(checkData);
    if (newlyUnlocked.length > 0) {
      setTimeout(() => {
        soundService.play('achieve');
        for (const id of newlyUnlocked) {
          const ach = ACHIEVEMENTS.find((a) => a.id === id);
          if (ach) {
            addToast('success', `🏆 Achievement Unlocked: ${ach.title}!`, 5000);
          }
        }
      }, 1500);
    }

    // Fire confetti for wins
    if (status === 'won') {
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#6C63FF', '#FF6584', '#00D9FF'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#6C63FF', '#FF6584', '#00D9FF'],
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => {}} showCloseButton={false} size="sm">
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center animate-bounce-in">
          {status === 'won' ? (
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <Trophy size={40} className="text-primary" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-warning/20 flex items-center justify-center">
              <Handshake size={40} className="text-warning" />
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          {status === 'won' ? (
            <>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-2">
                🎉 Victory!
              </h2>
              <p className="text-secondary">
                <span className="font-semibold">{winner?.name}</span> ({winner?.symbol}) wins!
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-warning mb-2">
                🤝 It's a Draw!
              </h2>
              <p className="text-secondary">Great match! Neither player won.</p>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="surface-card rounded-xl p-3 text-center">
            <div className="text-xs text-secondary">Moves</div>
            <div className="text-lg font-bold">{moveCount}</div>
          </div>
          <div className="surface-card rounded-xl p-3 text-center">
            <div className="text-xs text-secondary">Duration</div>
            <div className="text-lg font-bold">
              {gameStartTime ? `${Math.round((Date.now() - gameStartTime) / 1000)}s` : '—'}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            icon={<RotateCcw size={18} />}
            onClick={newMatch}
          >
            Play Again
          </Button>
          <Button
            variant="ghost"
            size="md"
            fullWidth
            icon={<Home size={18} />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </Modal>
  );
};
