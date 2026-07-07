// ============================================================
// Game Store — Core game state management
// ============================================================

import { create } from 'zustand';
import type { GameSettings, GameState, GameStatus, Move, Score } from '../types';
import { createEmptyBoard, evaluateGameState } from '../utils/gameLogic';
import { STORAGE_KEYS } from '../utils/constants';
import { getFromStorage, saveToStorage } from '../services/storageService';
import { getAIMove, getHintMove } from '../services/aiService';
import { soundService } from '../services/soundService';

interface GameStore extends GameState {
  settings: GameSettings | null;
  score: Score;
  timerSeconds: number;
  isTimerRunning: boolean;
  hintCell: number | null;
  isAIThinking: boolean;

  // Actions
  initGame: (settings: GameSettings) => void;
  makeMove: (cellIndex: number) => void;
  undoMove: () => void;
  redoMove: () => void;
  resetGame: () => void;
  newMatch: () => void;
  resetScore: () => void;
  tickTimer: () => void;
  resetTimer: () => void;
  showHint: () => void;
  clearHint: () => void;
  handleTimerExpiry: () => void;
}

const INITIAL_SCORE: Score = { player1Wins: 0, player2Wins: 0, draws: 0, gamesPlayed: 0 };

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  board: [],
  currentPlayerIndex: 0,
  status: 'idle' as GameStatus,
  winner: null,
  winningCombination: null,
  moveHistory: [],
  undoneHistory: [],
  moveCount: 0,
  gameStartTime: null,
  settings: null,
  score: getFromStorage<Score>(STORAGE_KEYS.SCORE, INITIAL_SCORE),
  timerSeconds: 15,
  isTimerRunning: false,
  hintCell: null,
  isAIThinking: false,

  /** Initialize a new game with given settings */
  initGame: (settings: GameSettings) => {
    const board = createEmptyBoard(settings.boardSize);
    soundService.setEnabled(settings.soundEnabled);

    set({
      board,
      currentPlayerIndex: settings.firstPlayer,
      status: 'playing',
      winner: null,
      winningCombination: null,
      moveHistory: [],
      undoneHistory: [],
      moveCount: 0,
      gameStartTime: Date.now(),
      settings,
      timerSeconds: settings.timerDuration,
      isTimerRunning: true,
      hintCell: null,
      isAIThinking: false,
    });

    // If AI goes first, make AI move
    if (settings.players[settings.firstPlayer].isAI) {
      setTimeout(() => {
        const state = get();
        if (state.status === 'playing' && state.settings) {
          const aiMoveIndex = getAIMove(
            state.board,
            state.settings.boardSize,
            state.settings.players[state.currentPlayerIndex].symbol,
            state.settings.difficulty
          );
          state.makeMove(aiMoveIndex);
        }
      }, 500);
    }
  },

  /** Make a move at the given cell index */
  makeMove: (cellIndex: number) => {
    const state = get();
    if (!state.settings) return;
    if (state.status !== 'playing') return;
    if (state.board[cellIndex] !== null) return;

    const currentPlayer = state.settings.players[state.currentPlayerIndex];
    const newBoard = [...state.board];
    newBoard[cellIndex] = currentPlayer.symbol;

    const move: Move = {
      cellIndex,
      symbol: currentPlayer.symbol,
      timestamp: Date.now(),
    };

    // Play move sound
    soundService.play('move');

    // Check game result
    const result = evaluateGameState(newBoard, state.settings.boardSize);

    if (result.status === 'won') {
      soundService.play('win');
      const newScore = { ...state.score };
      if (state.currentPlayerIndex === 0) {
        newScore.player1Wins++;
      } else {
        newScore.player2Wins++;
      }
      newScore.gamesPlayed++;
      saveToStorage(STORAGE_KEYS.SCORE, newScore);

      set({
        board: newBoard,
        status: 'won',
        winner: currentPlayer,
        winningCombination: result.combination,
        moveHistory: [...state.moveHistory, move],
        undoneHistory: [],
        moveCount: state.moveCount + 1,
        score: newScore,
        isTimerRunning: false,
        hintCell: null,
        isAIThinking: false,
      });
      return;
    }

    if (result.status === 'draw') {
      soundService.play('draw');
      const newScore = { ...state.score, draws: state.score.draws + 1, gamesPlayed: state.score.gamesPlayed + 1 };
      saveToStorage(STORAGE_KEYS.SCORE, newScore);

      set({
        board: newBoard,
        status: 'draw',
        winner: null,
        winningCombination: null,
        moveHistory: [...state.moveHistory, move],
        undoneHistory: [],
        moveCount: state.moveCount + 1,
        score: newScore,
        isTimerRunning: false,
        hintCell: null,
        isAIThinking: false,
      });
      return;
    }

    // Game continues — switch player
    const nextPlayerIndex: 0 | 1 = state.currentPlayerIndex === 0 ? 1 : 0;

    set({
      board: newBoard,
      currentPlayerIndex: nextPlayerIndex,
      moveHistory: [...state.moveHistory, move],
      undoneHistory: [],
      moveCount: state.moveCount + 1,
      timerSeconds: state.settings.timerDuration,
      hintCell: null,
      isAIThinking: state.settings.players[nextPlayerIndex].isAI,
    });

    // If next player is AI, make AI move after a short delay
    if (state.settings.players[nextPlayerIndex].isAI) {
      setTimeout(() => {
        const currentState = get();
        if (currentState.status === 'playing' && currentState.settings) {
          const aiMoveIndex = getAIMove(
            currentState.board,
            currentState.settings.boardSize,
            currentState.settings.players[currentState.currentPlayerIndex].symbol,
            currentState.settings.difficulty
          );
          currentState.makeMove(aiMoveIndex);
        }
      }, 600);
    }
  },

  /** Undo the last move */
  undoMove: () => {
    const state = get();
    if (!state.settings) return;
    if (state.moveHistory.length === 0) return;
    if (state.status !== 'playing' && state.status !== 'won' && state.status !== 'draw') return;

    // In PvC, undo two moves (player + AI)
    let movesToUndo = 1;
    if (state.settings.mode === 'pvc' && state.moveHistory.length >= 2) {
      movesToUndo = 2;
    }

    const newHistory = [...state.moveHistory];
    const newUndone = [...state.undoneHistory];
    const newBoard = [...state.board];

    for (let i = 0; i < movesToUndo && newHistory.length > 0; i++) {
      const lastMove = newHistory.pop()!;
      newUndone.push(lastMove);
      newBoard[lastMove.cellIndex] = null;
    }

    const previousPlayerIndex = movesToUndo === 2
      ? state.currentPlayerIndex
      : state.currentPlayerIndex === 0 ? 1 : 0;

    set({
      board: newBoard,
      moveHistory: newHistory,
      undoneHistory: newUndone,
      currentPlayerIndex: previousPlayerIndex as 0 | 1,
      status: 'playing',
      winner: null,
      winningCombination: null,
      moveCount: state.moveCount - movesToUndo,
      timerSeconds: state.settings.timerDuration,
      isTimerRunning: true,
      hintCell: null,
    });
  },

  /** Redo an undone move */
  redoMove: () => {
    const state = get();
    if (!state.settings) return;
    if (state.undoneHistory.length === 0) return;

    let movesToRedo = 1;
    if (state.settings.mode === 'pvc' && state.undoneHistory.length >= 2) {
      movesToRedo = 2;
    }

    const newHistory = [...state.moveHistory];
    const newUndone = [...state.undoneHistory];
    const newBoard = [...state.board];

    for (let i = 0; i < movesToRedo && newUndone.length > 0; i++) {
      const move = newUndone.pop()!;
      newHistory.push(move);
      newBoard[move.cellIndex] = move.symbol;
    }

    const nextPlayerIndex = movesToRedo === 2
      ? state.currentPlayerIndex
      : state.currentPlayerIndex === 0 ? 1 : 0;

    // Check if the redo resulted in a game end
    const result = evaluateGameState(newBoard, state.settings.boardSize);

    set({
      board: newBoard,
      moveHistory: newHistory,
      undoneHistory: newUndone,
      currentPlayerIndex: nextPlayerIndex as 0 | 1,
      status: result.status === 'won' ? 'won' : result.status === 'draw' ? 'draw' : 'playing',
      winner: result.status === 'won'
        ? state.settings.players.find(p => p.symbol === result.winner) ?? null
        : null,
      winningCombination: result.status === 'won' ? result.combination : null,
      moveCount: state.moveCount + movesToRedo,
      timerSeconds: state.settings.timerDuration,
      hintCell: null,
    });
  },

  /** Reset the current game (same settings) */
  resetGame: () => {
    const state = get();
    if (!state.settings) return;
    state.initGame(state.settings);
  },

  /** Start a new match (reset board, keep score) */
  newMatch: () => {
    const state = get();
    if (!state.settings) return;
    state.initGame(state.settings);
  },

  /** Reset the score */
  resetScore: () => {
    saveToStorage(STORAGE_KEYS.SCORE, INITIAL_SCORE);
    set({ score: INITIAL_SCORE });
  },

  /** Tick the timer down by 1 second */
  tickTimer: () => {
    const state = get();
    if (!state.isTimerRunning || state.status !== 'playing') return;

    if (state.timerSeconds <= 1) {
      state.handleTimerExpiry();
    } else {
      set({ timerSeconds: state.timerSeconds - 1 });
    }
  },

  /** Reset the timer */
  resetTimer: () => {
    const state = get();
    if (!state.settings) return;
    set({ timerSeconds: state.settings.timerDuration, isTimerRunning: true });
  },

  /** Handle timer expiry — auto-switch turns */
  handleTimerExpiry: () => {
    const state = get();
    if (!state.settings) return;

    soundService.play('error');
    const nextPlayerIndex: 0 | 1 = state.currentPlayerIndex === 0 ? 1 : 0;

    set({
      currentPlayerIndex: nextPlayerIndex,
      timerSeconds: state.settings.timerDuration,
      isTimerRunning: true,
      hintCell: null,
    });

    // If next player is AI, make AI move
    if (state.settings.players[nextPlayerIndex].isAI) {
      setTimeout(() => {
        const currentState = get();
        if (currentState.status === 'playing' && currentState.settings) {
          const aiMoveIndex = getAIMove(
            currentState.board,
            currentState.settings.boardSize,
            currentState.settings.players[currentState.currentPlayerIndex].symbol,
            currentState.settings.difficulty
          );
          currentState.makeMove(aiMoveIndex);
        }
      }, 600);
    }
  },

  /** Show hint for the current player */
  showHint: () => {
    const state = get();
    if (!state.settings || state.status !== 'playing') return;

    const hintCell = getHintMove(
      state.board,
      state.settings.boardSize,
      state.settings.players[state.currentPlayerIndex].symbol
    );
    set({ hintCell });

    // Clear hint after 2 seconds
    setTimeout(() => {
      set({ hintCell: null });
    }, 2000);
  },

  /** Clear the hint */
  clearHint: () => set({ hintCell: null }),
}));
