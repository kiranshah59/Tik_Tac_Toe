// ============================================================
// Core Types & Interfaces for Tic-Tac-Toe Application
// ============================================================

/** Player symbols */
export type Symbol = 'X' | 'O';

/** Individual cell state — either a symbol or empty */
export type CellValue = Symbol | null;

/** The game board represented as a flat array */
export type Board = CellValue[];

/** Supported board sizes */
export type BoardSize = 3 | 4 | 5;

/** Game modes */
export type GameMode = 'pvp' | 'pvc';

/** AI difficulty levels */
export type Difficulty = 'easy' | 'medium' | 'hard';

/** Current game status */
export type GameStatus = 'idle' | 'playing' | 'won' | 'draw';

/** Theme options */
export type Theme = 'light' | 'dark';

/** Player information */
export interface Player {
  name: string;
  symbol: Symbol;
  isAI: boolean;
}

/** Game settings configured before starting */
export interface GameSettings {
  mode: GameMode;
  boardSize: BoardSize;
  difficulty: Difficulty;
  players: [Player, Player];
  firstPlayer: 0 | 1;
  soundEnabled: boolean;
  timerEnabled: boolean;
  timerDuration: number;
}

/** A single move record for undo/redo */
export interface Move {
  cellIndex: number;
  symbol: Symbol;
  timestamp: number;
}

/** Score tracking */
export interface Score {
  player1Wins: number;
  player2Wins: number;
  draws: number;
  gamesPlayed: number;
}

/** Full game state */
export interface GameState {
  board: Board;
  currentPlayerIndex: 0 | 1;
  status: GameStatus;
  winner: Player | null;
  winningCombination: number[] | null;
  moveHistory: Move[];
  undoneHistory: Move[];
  score: Score;
  moveCount: number;
  gameStartTime: number | null;
}

/** Match record stored in history */
export interface MatchRecord {
  id: string;
  date: string;
  players: [string, string];
  playerSymbols: [Symbol, Symbol];
  winner: string | null;
  winnerSymbol: Symbol | null;
  numberOfMoves: number;
  duration: number; // in seconds
  boardSize: BoardSize;
  mode: GameMode;
  difficulty?: Difficulty;
  moves: Move[];
}

/** Achievement definition */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  category: AchievementCategory;
}

/** Achievement unlock record */
export interface AchievementUnlock {
  achievementId: string;
  unlockedAt: string;
  progress: number;
}

/** Achievement categories */
export type AchievementCategory = 'wins' | 'streak' | 'special' | 'games';

/** Statistics data */
export interface PlayerStats {
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  winPercentage: number;
  longestWinStreak: number;
  currentWinStreak: number;
  averageMovesPerWin: number;
  gamesAgainstAI: number;
  winsAgainstHardAI: number;
}

/** Toast notification type */
export type ToastType = 'success' | 'error' | 'info' | 'warning';

/** Toast notification */
export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
