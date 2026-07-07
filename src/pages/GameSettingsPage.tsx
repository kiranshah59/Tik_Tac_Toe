// ============================================================
// GameSettingsPage — Configure game before playing
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';
import { useGameStore } from '../stores/gameStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Users, Bot, ArrowLeftRight, Play,
  Volume2, VolumeX, Clock, Timer,
  Grid3X3, Zap, Brain, Shield,
} from 'lucide-react';
import type { BoardSize, Difficulty, GameMode } from '../types';

export const GameSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    settings,
    setMode,
    setBoardSize,
    setDifficulty,
    setPlayerName,
    swapSymbols,
    setFirstPlayer,
    setSoundEnabled,
    setTimerEnabled,
  } = useSettingsStore();
  const initGame = useGameStore((s) => s.initGame);

  const handleStartGame = () => {
    initGame(settings);
    navigate('/play');
  };

  const modeOptions: { mode: GameMode; label: string; icon: React.ReactNode; desc: string }[] = [
    { mode: 'pvp', label: 'Player vs Player', icon: <Users size={24} />, desc: 'Play with a friend' },
    { mode: 'pvc', label: 'Player vs AI', icon: <Bot size={24} />, desc: 'Challenge the computer' },
  ];

  const difficultyOptions: { value: Difficulty; label: string; icon: React.ReactNode; desc: string }[] = [
    { value: 'easy', label: 'Easy', icon: <Zap size={20} />, desc: 'Random moves' },
    { value: 'medium', label: 'Medium', icon: <Shield size={20} />, desc: 'Basic strategy' },
    { value: 'hard', label: 'Hard', icon: <Brain size={20} />, desc: 'Unbeatable AI' },
  ];

  const boardSizes: { size: BoardSize; label: string }[] = [
    { size: 3, label: '3×3' },
    { size: 4, label: '4×4' },
    { size: 5, label: '5×5' },
  ];

  return (
    <div className="py-8 px-4 max-w-2xl mx-auto w-full space-y-6 animate-slide-up z-10 relative">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-2">
          Game Settings
        </h1>
        <p className="text-secondary text-sm">Configure your game before playing</p>
      </div>

      {/* Game Mode */}
      <Card variant="glass">
        <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Game Mode</h2>
        <div className="grid grid-cols-2 gap-3">
          {modeOptions.map(({ mode, label, icon, desc }) => (
            <button
              key={mode}
              onClick={() => setMode(mode)}
              className={`
                p-4 rounded-xl text-left transition-all duration-200
                cursor-pointer
                ${settings.mode === mode
                  ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/10'
                  : 'surface-card hover:bg-white/5 border-2 border-transparent'
                }
              `}
            >
              <div className={`mb-2 ${settings.mode === mode ? 'text-primary' : 'text-secondary'}`}>
                {icon}
              </div>
              <div className="font-semibold text-sm">{label}</div>
              <div className="text-xs text-secondary mt-0.5">{desc}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Player Names */}
      <Card variant="glass">
        <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Players</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-secondary mb-1 block">
              Player 1 ({settings.players[0].symbol})
            </label>
            <input
              type="text"
              value={settings.players[0].name}
              onChange={(e) => setPlayerName(0, e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
              placeholder="Enter name..."
              maxLength={20}
            />
          </div>

          {/* Swap symbols button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowLeftRight size={16} />}
              onClick={swapSymbols}
            >
              Swap Symbols
            </Button>
          </div>

          <div>
            <label className="text-xs text-secondary mb-1 block">
              {settings.mode === 'pvc' ? 'Computer' : 'Player 2'} ({settings.players[1].symbol})
            </label>
            <input
              type="text"
              value={settings.players[1].name}
              onChange={(e) => setPlayerName(1, e.target.value)}
              disabled={settings.mode === 'pvc'}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm disabled:opacity-50"
              placeholder="Enter name..."
              maxLength={20}
            />
          </div>
        </div>
      </Card>

      {/* Difficulty (only for PvC) */}
      {settings.mode === 'pvc' && (
        <Card variant="glass" className="animate-scale-in">
          <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Difficulty</h2>
          <div className="grid grid-cols-3 gap-3">
            {difficultyOptions.map(({ value, label, icon, desc }) => (
              <button
                key={value}
                onClick={() => setDifficulty(value)}
                className={`
                  p-3 rounded-xl text-center transition-all duration-200
                  cursor-pointer
                  ${settings.difficulty === value
                    ? 'bg-primary/20 border-2 border-primary'
                    : 'surface-card hover:bg-white/5 border-2 border-transparent'
                  }
                `}
              >
                <div className={`mx-auto mb-1 ${settings.difficulty === value ? 'text-primary' : 'text-secondary'}`}>
                  {icon}
                </div>
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-secondary mt-0.5">{desc}</div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Board Size */}
      <Card variant="glass">
        <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Board Size</h2>
        <div className="grid grid-cols-3 gap-3">
          {boardSizes.map(({ size, label }) => (
            <button
              key={size}
              onClick={() => setBoardSize(size)}
              className={`
                p-3 rounded-xl text-center transition-all duration-200
                cursor-pointer
                ${settings.boardSize === size
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'surface-card hover:bg-white/5 border-2 border-transparent'
                }
              `}
            >
              <Grid3X3 size={20} className={`mx-auto mb-1 ${settings.boardSize === size ? 'text-primary' : 'text-secondary'}`} />
              <div className="font-semibold text-sm">{label}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* First Player */}
      <Card variant="glass">
        <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Who Plays First?</h2>
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setFirstPlayer(index as 0 | 1)}
              className={`
                p-3 rounded-xl text-center transition-all duration-200
                cursor-pointer
                ${settings.firstPlayer === index
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'surface-card hover:bg-white/5 border-2 border-transparent'
                }
              `}
            >
              <div className="font-semibold text-sm">
                {settings.players[index].name} ({settings.players[index].symbol})
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Toggles */}
      <Card variant="glass">
        <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Options</h2>
        <div className="space-y-4">
          {/* Sound */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? <Volume2 size={18} className="text-primary" /> : <VolumeX size={18} className="text-secondary" />}
              <div>
                <div className="text-sm font-medium">Sound Effects</div>
                <div className="text-xs text-secondary">Game sounds and music</div>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!settings.soundEnabled)}
              className={`
                w-12 h-6 rounded-full transition-all duration-300 cursor-pointer relative
                ${settings.soundEnabled ? 'bg-primary' : 'bg-white/20'}
              `}
              role="switch"
              aria-checked={settings.soundEnabled}
              aria-label="Toggle sound effects"
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${settings.soundEnabled ? 'left-[calc(100%-22px)]' : 'left-0.5'}`} />
            </button>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.timerEnabled ? <Timer size={18} className="text-primary" /> : <Clock size={18} className="text-secondary" />}
              <div>
                <div className="text-sm font-medium">Move Timer</div>
                <div className="text-xs text-secondary">15 seconds per move</div>
              </div>
            </div>
            <button
              onClick={() => setTimerEnabled(!settings.timerEnabled)}
              className={`
                w-12 h-6 rounded-full transition-all duration-300 cursor-pointer relative
                ${settings.timerEnabled ? 'bg-primary' : 'bg-white/20'}
              `}
              role="switch"
              aria-checked={settings.timerEnabled}
              aria-label="Toggle move timer"
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${settings.timerEnabled ? 'left-[calc(100%-22px)]' : 'left-0.5'}`} />
            </button>
          </div>
        </div>
      </Card>

      {/* Start Game Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        icon={<Play size={22} />}
        onClick={handleStartGame}
        className="animate-pulse-glow"
      >
        Start Game
      </Button>
    </div>
  );
};
