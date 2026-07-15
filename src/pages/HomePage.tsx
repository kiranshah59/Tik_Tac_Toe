import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Gamepad2, Brain, Trophy, History, BarChart3, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Brain size={24} className="text-[#3B82F6] group-hover:text-blue-400 transition-colors drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />,
    title: 'Unbeatable AI',
    description: 'Challenge our Minimax algorithm, mathematically designed to never lose a game.',
  },
  {
    icon: <Trophy size={24} className="text-[#A855F7] group-hover:text-purple-400 transition-colors drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />,
    title: 'Achievements',
    description: 'Unlock unique badges as you hit milestones, win streaks, and conquer the Hard AI.',
  },
  {
    icon: <BarChart3 size={24} className="text-[#0EA5E9] group-hover:text-sky-400 transition-colors drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]" />,
    title: 'Advanced Stats',
    description: 'Visualize your gaming performance over time with beautiful, interactive charts.',
  },
  {
    icon: <History size={24} className="text-[#10B981] group-hover:text-emerald-400 transition-colors drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />,
    title: 'Match History',
    description: 'Review your past games, see total duration, and export your match data as JSON.',
  },
];

/** 
 * Decorative Animated Tic-Tac-Toe Board Component 
 * Simulates a quick game playing out in a loop.
 */
const AnimatedBoardPreview: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [winLine, setWinLine] = useState<number[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    const playSequence = async () => {
      // The sequence of moves to demonstrate a win
      const moves = [
        { index: 4, symbol: 'X' }, // Center
        { index: 0, symbol: 'O' }, // Top Left
        { index: 2, symbol: 'X' }, // Top Right
        { index: 6, symbol: 'O' }, // Bottom Left
        { index: 8, symbol: 'X' }, // Bottom Right
        { index: 3, symbol: 'O' }, // Middle Left
        { index: 5, symbol: 'X' }, // Middle Right
      ];

      // Reset
      setBoard(Array(9).fill(null));
      setWinLine(null);
      await new Promise((r) => setTimeout(r, 800));
      if (cancelled) return;

      for (let i = 0; i < moves.length; i++) {
        setBoard((prev) => {
          const newBoard = [...prev];
          newBoard[moves[i].index] = moves[i].symbol;
          return newBoard;
        });
        await new Promise((r) => setTimeout(r, 600));
        if (cancelled) return;
      }

      // Show win line
      setWinLine([2, 5, 8]);
      await new Promise((r) => setTimeout(r, 2000));
      if (cancelled) return;
      
      // Loop
      playSequence();
    };

    playSequence();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="relative w-full max-w-[320px] aspect-square mx-auto lg:ml-auto">
      {/* Glow behind the board */}
      <div className="absolute inset-0 bg-[#4F46E5]/20 blur-[80px] rounded-full animate-pulse-glow" />
      
      {/* Background Particles (using absolute divs) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-1 h-1 bg-cyan-400 rounded-full blur-[1px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-1.5 h-1.5 bg-purple-400 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 -left-4 w-1 h-1 bg-blue-400 rounded-full blur-[0.5px]" />
        <div className="absolute bottom-1/3 -right-6 w-1 h-1 bg-cyan-300 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      {/* The Board */}
      <div className="relative z-10 w-full h-full rounded-3xl p-4 md:p-6 shadow-[0_0_40px_rgba(79,70,229,0.3),inset_0_0_20px_rgba(79,70,229,0.2)] border border-[#4F46E5]/50 grid grid-cols-3 gap-2 bg-[#0c1226]/80 backdrop-blur-xl">
        {board.map((cell, index) => {
          const isWinningCell = winLine?.includes(index);
          return (
            <div 
              key={index} 
              className={`
                rounded-xl flex items-center justify-center text-5xl font-bold transition-all duration-300
                bg-transparent border border-[#4F46E5]/20
                ${cell ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
                ${isWinningCell ? 'bg-[#4F46E5]/10 shadow-[inset_0_0_15px_rgba(79,70,229,0.3)]' : ''}
              `}
            >
              {cell === 'X' && (
                <span className={`text-[#A78BFA] animate-bounce-in drop-shadow-[0_0_15px_rgba(167,139,250,0.8)]`}>
                  X
                </span>
              )}
              {cell === 'O' && (
                <span className={`text-[#22D3EE] animate-bounce-in drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]`}>
                  O
                </span>
              )}
            </div>
          );
        })}
        {/* Winning Line Overlay */}
        {winLine && (
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center animate-fade-in">
             <div className="w-[110%] h-1 bg-[#A78BFA] shadow-[0_0_20px_rgba(167,139,250,1),0_0_40px_rgba(167,139,250,0.6)] transform rotate-45 flex items-center justify-center relative rounded-full">
               <div className="absolute w-2 h-2 bg-white rounded-full left-[15%] shadow-[0_0_10px_white]"></div>
               <div className="absolute w-2 h-2 bg-white rounded-full right-[15%] shadow-[0_0_10px_white]"></div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center justify-start relative z-10 min-h-full">
      
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28 min-h-[75vh] flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8">
        
        {/* Left: Text Content */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131B3A] border border-blue-500/20 text-xs font-semibold tracking-wide mb-6 shadow-sm">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-blue-400">The Ultimate Tic-Tac-Toe Experience</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-[family-name:var(--font-heading)] mb-6 tracking-tight text-white/95 leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#8B5CF6] drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              Tic-Tac-Toe
            </span>
            <br />
            Reimagined.
          </h1>
          
          <p className="text-base sm:text-lg text-secondary/80 mb-10 max-w-[600px] leading-relaxed">
            Step into the arena with a modern glassmorphism design, intelligent AI opponents, and rich statistics. Play locally against a friend or challenge the unbeatable computer.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              icon={<Gamepad2 size={20} />}
              onClick={() => navigate('/settings')}
              fullWidth
              className="sm:w-auto hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300"
            >
              Play Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<Trophy size={18} />}
              onClick={() => navigate('/achievements')}
              fullWidth
              className="sm:w-auto"
            >
              Achievements
            </Button>
          </div>
        </div>

        {/* Right: Animated Decorative Board */}
        <div className="flex-1 w-full flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '200ms' }}>
          <AnimatedBoardPreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              variant="solid"
              hover
              className="text-left group h-full hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:border-primary/40 transition-all duration-500 relative"
            >
              <div
                className="animate-slide-up h-full flex flex-col"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="w-12 h-12 rounded-xl bg-transparent flex items-center justify-start mb-5 shadow-none">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2 text-white/95 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#8a94b5] leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Decorative Bottom Spacing */}
      <div className="h-16" />
    </div>
  );
};
