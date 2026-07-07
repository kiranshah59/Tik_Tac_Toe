// ============================================================
// Achievements Store — Tracks and unlocks achievements
// ============================================================

import { create } from 'zustand';
import type { AchievementUnlock, MatchRecord } from '../types';
import { ACHIEVEMENTS, STORAGE_KEYS } from '../utils/constants';
import { getFromStorage, saveToStorage } from '../services/storageService';

interface AchievementsState {
  unlocked: AchievementUnlock[];
  checkAndUnlock: (stats: AchievementCheckData) => string[]; // returns newly unlocked IDs
  resetAchievements: () => void;
}

/** Data passed to check achievements */
export interface AchievementCheckData {
  totalWins: number;
  totalGames: number;
  currentWinStreak: number;
  defeatedHardAI: boolean;
  recentMatch?: MatchRecord;
}

export const useAchievementsStore = create<AchievementsState>((set, get) => ({
  unlocked: getFromStorage<AchievementUnlock[]>(STORAGE_KEYS.ACHIEVEMENTS, []),

  checkAndUnlock: (stats) => {
    const { unlocked } = get();
    const newlyUnlocked: string[] = [];
    const unlockedIds = new Set(unlocked.map((u) => u.achievementId));

    for (const achievement of ACHIEVEMENTS) {
      if (unlockedIds.has(achievement.id)) continue;

      let shouldUnlock = false;

      switch (achievement.category) {
        case 'wins':
          shouldUnlock = stats.totalWins >= achievement.requirement;
          break;
        case 'streak':
          shouldUnlock = stats.currentWinStreak >= achievement.requirement;
          break;
        case 'games':
          shouldUnlock = stats.totalGames >= achievement.requirement;
          break;
        case 'special':
          if (achievement.id === 'beat_hard_ai') {
            shouldUnlock = stats.defeatedHardAI;
          }
          break;
      }

      if (shouldUnlock) {
        newlyUnlocked.push(achievement.id);
      }
    }

    if (newlyUnlocked.length > 0) {
      const newUnlocks: AchievementUnlock[] = newlyUnlocked.map((id) => ({
        achievementId: id,
        unlockedAt: new Date().toISOString(),
        progress: ACHIEVEMENTS.find((a) => a.id === id)?.requirement ?? 0,
      }));

      const updatedUnlocked = [...unlocked, ...newUnlocks];
      saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, updatedUnlocked);
      set({ unlocked: updatedUnlocked });
    }

    return newlyUnlocked;
  },

  resetAchievements: () => {
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, []);
    set({ unlocked: [] });
  },
}));
