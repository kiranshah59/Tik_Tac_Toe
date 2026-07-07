// ============================================================
// Application Constants & Default Values
// ============================================================

import type { Achievement, GameSettings, BoardSize } from '../types';

/** Default timer duration in seconds */
export const DEFAULT_TIMER_DURATION = 15;

/** Default game settings */
export const DEFAULT_SETTINGS: GameSettings = {
  mode: 'pvp',
  boardSize: 3,
  difficulty: 'medium',
  players: [
    { name: 'Player 1', symbol: 'X', isAI: false },
    { name: 'Player 2', symbol: 'O', isAI: false },
  ],
  firstPlayer: 0,
  soundEnabled: true,
  timerEnabled: true,
  timerDuration: DEFAULT_TIMER_DURATION,
};

/**
 * Generate all winning combinations for a given board size.
 * For a 3×3 board, that's 3 rows + 3 cols + 2 diagonals = 8 combinations.
 * For NxN, winning condition is N in a row.
 */
export function getWinningCombinations(size: BoardSize): number[][] {
  const combinations: number[][] = [];

  // Rows
  for (let row = 0; row < size; row++) {
    const combo: number[] = [];
    for (let col = 0; col < size; col++) {
      combo.push(row * size + col);
    }
    combinations.push(combo);
  }

  // Columns
  for (let col = 0; col < size; col++) {
    const combo: number[] = [];
    for (let row = 0; row < size; row++) {
      combo.push(row * size + col);
    }
    combinations.push(combo);
  }

  // Main diagonal (top-left to bottom-right)
  const mainDiag: number[] = [];
  for (let i = 0; i < size; i++) {
    mainDiag.push(i * size + i);
  }
  combinations.push(mainDiag);

  // Anti diagonal (top-right to bottom-left)
  const antiDiag: number[] = [];
  for (let i = 0; i < size; i++) {
    antiDiag.push(i * size + (size - 1 - i));
  }
  combinations.push(antiDiag);

  return combinations;
}

/** Pre-computed winning combinations for common sizes */
export const WINNING_COMBINATIONS: Record<BoardSize, number[][]> = {
  3: getWinningCombinations(3),
  4: getWinningCombinations(4),
  5: getWinningCombinations(5),
};

/** Achievement definitions */
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_victory',
    title: 'First Victory',
    description: 'Win your first game',
    icon: '🏆',
    requirement: 1,
    category: 'wins',
  },
  {
    id: 'win_5',
    title: 'Winning Streak',
    description: 'Win 5 games',
    icon: '⭐',
    requirement: 5,
    category: 'wins',
  },
  {
    id: 'win_10',
    title: 'Champion',
    description: 'Win 10 games',
    icon: '👑',
    requirement: 10,
    category: 'wins',
  },
  {
    id: 'win_25',
    title: 'Legendary',
    description: 'Win 25 games',
    icon: '🔥',
    requirement: 25,
    category: 'wins',
  },
  {
    id: 'streak_3',
    title: 'Hot Streak',
    description: 'Win 3 games in a row',
    icon: '🔥',
    requirement: 3,
    category: 'streak',
  },
  {
    id: 'streak_5',
    title: 'Unstoppable',
    description: 'Win 5 games in a row',
    icon: '💫',
    requirement: 5,
    category: 'streak',
  },
  {
    id: 'beat_hard_ai',
    title: 'AI Slayer',
    description: 'Defeat the Hard AI',
    icon: '🤖',
    requirement: 1,
    category: 'special',
  },
  {
    id: 'play_10',
    title: 'Getting Started',
    description: 'Play 10 games',
    icon: '🎮',
    requirement: 10,
    category: 'games',
  },
  {
    id: 'play_50',
    title: 'Dedicated Player',
    description: 'Play 50 games',
    icon: '🎯',
    requirement: 50,
    category: 'games',
  },
  {
    id: 'play_100',
    title: 'Tic-Tac-Toe Master',
    description: 'Play 100 games',
    icon: '🏅',
    requirement: 100,
    category: 'games',
  },
];

/** LocalStorage keys */
export const STORAGE_KEYS = {
  THEME: 'ttt-theme',
  SETTINGS: 'ttt-settings',
  HISTORY: 'ttt-history',
  ACHIEVEMENTS: 'ttt-achievements',
  STATS: 'ttt-stats',
  SCORE: 'ttt-score',
} as const;

/** Navigation links */
export const NAV_LINKS = [
  { path: '/', label: 'Home', icon: 'Home' },
  { path: '/play', label: 'Play', icon: 'Gamepad2' },
  { path: '/history', label: 'History', icon: 'History' },
  { path: '/stats', label: 'Stats', icon: 'BarChart3' },
  { path: '/achievements', label: 'Achievements', icon: 'Trophy' },
] as const;
