// ============================================================
// AchievementsPage — Achievement grid with unlock status
// ============================================================

import React from 'react';
import { useAchievementsStore } from '../stores/achievementsStore';
import { ACHIEVEMENTS } from '../utils/constants';
import { Card } from '../components/ui/Card';
import { Trophy, Lock } from 'lucide-react';
import { formatDate } from '../utils/gameLogic';
import type { Achievement } from '../types';

export const AchievementsPage: React.FC = () => {
  const unlocked = useAchievementsStore((s) => s.unlocked);
  const unlockedIds = new Set(unlocked.map((u) => u.achievementId));

  const totalUnlocked = unlocked.length;
  const totalAchievements = ACHIEVEMENTS.length;
  const completionPercent = Math.round((totalUnlocked / totalAchievements) * 100);

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto w-full animate-slide-up z-10 relative">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-2">
          Achievements
        </h1>
        <p className="text-secondary text-sm">
          {totalUnlocked} of {totalAchievements} unlocked
        </p>

        {/* Progress bar */}
        <div className="max-w-xs mx-auto mt-4">
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full gradient-bg transition-all duration-700 ease-out"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <span className="text-xs text-secondary mt-1 block">{completionPercent}% Complete</span>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map((achievement, index) => {
          const isUnlocked = unlockedIds.has(achievement.id);
          const unlockRecord = unlocked.find((u) => u.achievementId === achievement.id);

          return (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              isUnlocked={isUnlocked}
              unlockedAt={unlockRecord?.unlockedAt}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

// ─── Achievement Card Sub-component ────────────────────────

const AchievementCard: React.FC<{
  achievement: Achievement;
  isUnlocked: boolean;
  unlockedAt?: string;
  index: number;
}> = ({ achievement, isUnlocked, unlockedAt, index }) => {
  return (
    <Card
      variant="glass"
      className={`
        !p-4 transition-all duration-300
        ${isUnlocked
          ? 'border-primary/30 shadow-lg shadow-primary/10'
          : 'opacity-60 grayscale'
        }
      `}
    >
      <div
        className="flex items-start gap-4 animate-slide-up"
        style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
      >
        {/* Icon */}
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0
          ${isUnlocked
            ? 'bg-primary/20 shadow-inner'
            : 'bg-white/5'
          }
        `}>
          {isUnlocked ? achievement.icon : <Lock size={24} className="text-secondary" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-sm">{achievement.title}</h3>
            {isUnlocked && <Trophy size={14} className="text-primary" />}
          </div>
          <p className="text-xs text-secondary leading-relaxed mb-2">
            {achievement.description}
          </p>
          {isUnlocked && unlockedAt && (
            <span className="text-xs text-primary/70">
              Unlocked {formatDate(unlockedAt)}
            </span>
          )}
          {!isUnlocked && (
            <span className="text-xs text-secondary/50 italic">Locked</span>
          )}
        </div>
      </div>
    </Card>
  );
};
