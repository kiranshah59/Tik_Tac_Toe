// ============================================================
// GameSettingsPage — Configure game before playing
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';
import { useGameStore } from '../stores/gameStore';
import { AnimatedBoardPreview } from '../components/ui/AnimatedBoardPreview';
import {
  Users, Bot, ArrowLeftRight, Play,
  Volume2, VolumeX, Clock, Timer,
  Grid3X3, Zap, Brain, Shield, Gamepad2, User,
} from 'lucide-react';
import type { BoardSize, Difficulty, GameMode } from '../types';

/* ── Shared active/inactive button styling ── */
const selectionCard = (active: boolean) => `
  relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
  ${active
    ? 'bg-[#111832] border-[#6366F1]/50 shadow-[0_0_24px_rgba(99,102,241,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]'
    : 'bg-[#0b1022] border-white/[0.04] hover:border-white/[0.1] hover:bg-[#0e1430]'
  }
`;

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
    { mode: 'pvp', label: 'Player vs Player', icon: <Users size={26} />, desc: 'Play with a friend' },
    { mode: 'pvc', label: 'Player vs AI', icon: <Bot size={26} />, desc: 'Challenge the computer' },
  ];

  const difficultyOptions: { value: Difficulty; label: string; icon: React.ReactNode; desc: string }[] = [
    { value: 'easy', label: 'Easy', icon: <Zap size={18} />, desc: 'Random moves' },
    { value: 'medium', label: 'Medium', icon: <Shield size={18} />, desc: 'Basic strategy' },
    { value: 'hard', label: 'Hard', icon: <Brain size={18} />, desc: 'Unbeatable AI' },
  ];

  const boardSizes: { size: BoardSize; label: string }[] = [
    { size: 3, label: '3 × 3' },
    { size: 4, label: '4 × 4' },
    { size: 5, label: '5 × 5' },
  ];

  /* ── Section header ── */
  const SectionTitle = ({ children }: { children: string }) => (
    <h2 className="text-[11px] font-extrabold text-[#7a85a3] uppercase tracking-[0.18em] mb-4">{children}</h2>
  );

  /* ── iOS-style toggle ── */
  const Toggle = ({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) => (
    <button
      onClick={onToggle}
      className={`
        w-[48px] h-[26px] rounded-full transition-all duration-300 cursor-pointer relative flex-shrink-0
        ${enabled
          ? 'bg-gradient-to-r from-[#6366F1] to-[#818CF8] shadow-[0_0_10px_rgba(99,102,241,0.5)]'
          : 'bg-[#1a2240]'
        }
      `}
      role="switch"
      aria-checked={enabled}
      aria-label={label}
    >
      <div
        className={`
          absolute top-[3px] w-[20px] h-[20px] rounded-full bg-white shadow-sm
          transition-all duration-300
          ${enabled ? 'left-[calc(100%-23px)]' : 'left-[3px]'}
        `}
      />
    </button>
  );

  return (
    <div
      className="w-[calc(100%-120px)] max-w-[1400px] mx-auto z-10 relative animate-slide-up"
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* ═══ CSS GRID: two columns ═══ */}
      <div
        className="grid items-start gap-10"
        style={{ gridTemplateColumns: '2fr 3fr' }}
      >
        {/* ═══════════════════════════════════════
            LEFT COLUMN — 40%
            ═══════════════════════════════════════ */}
        <div className="flex flex-col items-start gap-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111832] border border-[#6366F1]/20 shadow-[0_0_16px_rgba(99,102,241,0.08)]">
            <Gamepad2 size={14} className="text-[#818CF8]" />
            <span className="text-[13px] font-semibold text-[#A5B4FC] tracking-wide">Let's Play</span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-[2.75rem] sm:text-[3.25rem] font-black font-[family-name:var(--font-heading)] tracking-tight leading-[1.1] mb-4">
              <span className="text-white">Choose Your</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7]">
                Game Settings
              </span>
            </h1>
            <p className="text-[15px] text-[#7a85a3] leading-relaxed max-w-[400px]">
              Customize the rules, pick your opponents, and get ready for an exciting match!
            </p>
          </div>

          {/* Animated Board — 380–420px */}
          <div className="w-full max-w-[400px]">
            <AnimatedBoardPreview />
          </div>
        </div>

        {/* ═══════════════════════════════════════
            RIGHT COLUMN — 60% — Single glass card
            ═══════════════════════════════════════ */}
        <div
          className="rounded-[24px] border border-white/[0.06] backdrop-blur-xl shadow-[0_8px_80px_rgba(0,0,0,0.45)]"
          style={{
            padding: '48px',
            background: 'linear-gradient(135deg, rgba(15,20,45,0.85) 0%, rgba(10,14,35,0.9) 100%)',
          }}
        >
          <div className="flex flex-col" style={{ gap: '40px' }}>

            {/* ── GAME MODE ── */}
            <section>
              <SectionTitle>Game Mode</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                {modeOptions.map(({ mode, label, icon, desc }) => {
                  const active = settings.mode === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => setMode(mode)}
                      className={`${selectionCard(active)} p-6 text-left`}
                    >
                      {active && <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/8 to-transparent pointer-events-none" />}
                      <div className="relative z-10 flex items-center gap-4">
                        <div className={`${active ? 'text-[#A78BFA]' : 'text-[#556080]'} transition-colors`}>
                          {icon}
                        </div>
                        <div>
                          <div className={`font-bold text-[16px] ${active ? 'text-white' : 'text-[#8a94b5]'}`}>{label}</div>
                          <div className="text-[13px] text-[#556080] mt-0.5">{desc}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ── PLAYERS ── */}
            <section>
              <SectionTitle>Players</SectionTitle>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">
                {/* Player 1 */}
                <div>
                  <label className="text-[11px] text-[#7a85a3] mb-2 block font-semibold tracking-wide">
                    Player 1 ({settings.players[0].symbol})
                  </label>
                  <div className={`flex items-center gap-3 h-[56px] px-4 rounded-xl border transition-all ${
                    'bg-[#0b1022] border-[#6366F1]/40 shadow-[0_0_10px_rgba(99,102,241,0.12)]'
                  }`}>
                    <User size={16} className="text-[#A78BFA] flex-shrink-0" />
                    <input
                      type="text"
                      value={settings.players[0].name}
                      onChange={(e) => setPlayerName(0, e.target.value)}
                      className="bg-transparent outline-none text-sm text-white w-full placeholder-[#556080]"
                      placeholder="Player 1"
                      maxLength={20}
                    />
                  </div>
                </div>

                {/* Swap */}
                <button
                  onClick={swapSymbols}
                  className="h-[56px] px-5 rounded-xl border border-white/[0.06] hover:border-[#A78BFA]/30 bg-transparent hover:bg-white/[0.03] text-[#A78BFA] hover:text-white flex items-center gap-2 text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <ArrowLeftRight size={16} />
                  Swap Symbols
                </button>

                {/* Player 2 */}
                <div>
                  <label className="text-[11px] text-[#7a85a3] mb-2 block font-semibold tracking-wide">
                    {settings.mode === 'pvc' ? 'Computer' : 'Player 2'} ({settings.players[1].symbol})
                  </label>
                  <div className="flex items-center gap-3 h-[56px] px-4 rounded-xl bg-[#0b1022] border border-white/[0.04] transition-all">
                    <User size={16} className="text-[#556080] flex-shrink-0" />
                    <input
                      type="text"
                      value={settings.players[1].name}
                      onChange={(e) => setPlayerName(1, e.target.value)}
                      disabled={settings.mode === 'pvc'}
                      className="bg-transparent outline-none text-sm text-white w-full placeholder-[#556080] disabled:opacity-40"
                      placeholder="Player 2"
                      maxLength={20}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ── BOARD SIZE ── */}
            <section>
              <SectionTitle>Board Size</SectionTitle>
              <div className="grid grid-cols-3 gap-4">
                {boardSizes.map(({ size, label }) => {
                  const active = settings.boardSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setBoardSize(size)}
                      className={`${selectionCard(active)} h-[60px] flex items-center justify-center gap-2.5`}
                    >
                      <Grid3X3 size={16} className={active ? 'text-[#A78BFA]' : 'text-[#556080]'} />
                      <span className={`font-bold text-sm ${active ? 'text-white' : 'text-[#7a85a3]'}`}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ── DIFFICULTY (PvC only) ── */}
            {settings.mode === 'pvc' && (
              <section className="animate-scale-in">
                <SectionTitle>Difficulty</SectionTitle>
                <div className="grid grid-cols-3 gap-4">
                  {difficultyOptions.map(({ value, label, icon, desc }) => {
                    const active = settings.difficulty === value;
                    return (
                      <button
                        key={value}
                        onClick={() => setDifficulty(value)}
                        className={`${selectionCard(active)} p-4 text-left`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={active ? 'text-[#A78BFA]' : 'text-[#556080]'}>{icon}</div>
                          <span className={`font-bold text-sm ${active ? 'text-white' : 'text-[#7a85a3]'}`}>{label}</span>
                        </div>
                        <div className="text-[11px] text-[#556080] pl-[26px]">{desc}</div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── WHO PLAYS FIRST ── */}
            <section>
              <SectionTitle>Who Plays First?</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                {[0, 1].map((index) => {
                  const active = settings.firstPlayer === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setFirstPlayer(index as 0 | 1)}
                      className={`${selectionCard(active)} p-5 text-left`}
                    >
                      {active && <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/8 to-transparent pointer-events-none" />}
                      <div className="relative z-10 flex items-center gap-3">
                        <User size={18} className={active ? 'text-[#A78BFA]' : 'text-[#556080]'} />
                        <span className={`font-semibold text-sm ${active ? 'text-white' : 'text-[#7a85a3]'}`}>
                          {settings.players[index].name} ({settings.players[index].symbol})
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ── OPTIONS ── */}
            <section>
              <SectionTitle>Options</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                {/* Sound */}
                <div className="flex items-center justify-between p-5 rounded-2xl bg-[#0b1022] border border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    {settings.soundEnabled
                      ? <Volume2 size={18} className="text-[#A78BFA] flex-shrink-0" />
                      : <VolumeX size={18} className="text-[#556080] flex-shrink-0" />
                    }
                    <div>
                      <div className="text-sm font-semibold text-white">Sound Effects</div>
                      <div className="text-[11px] text-[#556080] mt-0.5">Game sounds and music</div>
                    </div>
                  </div>
                  <Toggle enabled={settings.soundEnabled} onToggle={() => setSoundEnabled(!settings.soundEnabled)} label="Toggle sound effects" />
                </div>

                {/* Timer */}
                <div className="flex items-center justify-between p-5 rounded-2xl bg-[#0b1022] border border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    {settings.timerEnabled
                      ? <Timer size={18} className="text-[#A78BFA] flex-shrink-0" />
                      : <Clock size={18} className="text-[#556080] flex-shrink-0" />
                    }
                    <div>
                      <div className="text-sm font-semibold text-white">Move Timer</div>
                      <div className="text-[11px] text-[#556080] mt-0.5">15 seconds per move</div>
                    </div>
                  </div>
                  <Toggle enabled={settings.timerEnabled} onToggle={() => setTimerEnabled(!settings.timerEnabled)} label="Toggle move timer" />
                </div>
              </div>
            </section>

            {/* ── START GAME ── */}
            <button
              onClick={handleStartGame}
              className="w-full h-[64px] rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E6] hover:to-[#7C3AED] text-white font-bold text-[17px] flex items-center justify-center gap-3 shadow-[0_4px_32px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_40px_rgba(99,102,241,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              <Play size={20} fill="white" />
              Start Game
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};
