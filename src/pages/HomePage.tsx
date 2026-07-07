import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Gamepad2, Brain, Trophy, History, BarChart3, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Brain size={24} className="text-primary group-hover:text-primary-light transition-colors" />,
    title: 'Unbeatable AI',
    description: 'Challenge our Minimax algorithm, mathematically designed to never lose a game.',
  },
  {
    icon: <Trophy size={24} className="text-secondary group-hover:text-secondary-light transition-colors" />,
    title: 'Achievements',
    description: 'Unlock unique badges as you hit milestones, win streaks, and conquer the Hard AI.',
  },
  {
    icon: <BarChart3 size={24} className="text-accent group-hover:text-accent-light transition-colors" />,
    title: 'Advanced Stats',
    description: 'Visualize your gaming performance over time with beautiful, interactive charts.',
  },
  {
    icon: <History size={24} className="text-success group-hover:text-[#33ffa6] transition-colors" />,
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
    let timeoutId: NodeJS.Timeout;
    
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

      for (let i = 0; i < moves.length; i++) {
        setBoard((prev) => {
          const newBoard = [...prev];
          newBoard[moves[i].index] = moves[i].symbol;
          return newBoard;
        });
        await new Promise((r) => setTimeout(r, 600));
      }

      // Show win line
      setWinLine([2, 5, 8]);
      await new Promise((r) => setTimeout(r, 2000));
      
      // Loop
      playSequence();
    };

    playSequence();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative w-full max-w-[320px] aspect-square mx-auto lg:ml-auto">
      {/* Glow behind the board */}
      <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse-glow" />
      
      {/* The Board */}
      <div className="relative z-10 w-full h-full glass rounded-3xl p-4 md:p-6 shadow-2xl border border-white/10 grid grid-cols-3 gap-2 bg-dark-bg/40 backdrop-blur-xl">
        {board.map((cell, index) => {
          const isWinningCell = winLine?.includes(index);
          return (
            <div 
              key={index} 
              className={`
                rounded-xl flex items-center justify-center text-4xl font-bold transition-all duration-300
                bg-white/5 border border-white/5
                ${cell ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
                ${isWinningCell ? 'bg-primary/20 border-primary/40 shadow-[0_0_15px_rgba(108,99,255,0.4)]' : ''}
              `}
            >
              {cell === 'X' && (
                <span className={`text-secondary animate-bounce-in ${isWinningCell ? 'drop-shadow-[0_0_8px_rgba(255,101,132,0.8)]' : ''}`}>
                  X
                </span>
              )}
              {cell === 'O' && (
                <span className={`text-accent animate-bounce-in ${isWinningCell ? 'drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]' : ''}`}>
                  O
                </span>
              )}
            </div>
          );
        })}
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-semibold tracking-wide mb-6 shadow-sm">
            <Sparkles size={14} />
            <span>The Ultimate Tic-Tac-Toe Experience</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-[family-name:var(--font-heading)] mb-6 tracking-tight text-white/95 leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
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
              className="sm:w-auto"
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
              variant="glass"
              hover
              className="text-left group"
            >
              <div
                className="animate-slide-up h-full flex flex-col"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2 text-white/90 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary/70 leading-relaxed flex-grow">
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
