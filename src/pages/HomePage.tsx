import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { AnimatedBoardPreview } from '../components/ui/AnimatedBoardPreview';
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
          <div className="w-full max-w-[320px]">
            <AnimatedBoardPreview />
          </div>
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
