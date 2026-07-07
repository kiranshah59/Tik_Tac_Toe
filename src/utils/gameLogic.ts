// ============================================================
// Game Logic Utilities
// ============================================================

import type { Board, BoardSize, CellValue, Symbol } from '../types';
import { WINNING_COMBINATIONS } from './constants';

/** Create an empty board of given size */
export function createEmptyBoard(size: BoardSize): Board {
  return Array(size * size).fill(null);
}

/** Get all empty cell indices */
export function getEmptyCells(board: Board): number[] {
  return board.reduce<number[]>((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, []);
}

/** Check if the board is full (draw condition) */
export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

/** Result of checking for a winner */
export interface WinResult {
  winner: Symbol;
  combination: number[];
}

/**
 * Check if there's a winner on the board.
 * Returns the winning symbol and the winning combination, or null.
 */
export function checkWinner(board: Board, size: BoardSize): WinResult | null {
  const combinations = WINNING_COMBINATIONS[size];

  for (const combo of combinations) {
    const firstCell: CellValue = board[combo[0]];
    if (firstCell === null) continue;

    const isWin = combo.every((index) => board[index] === firstCell);
    if (isWin) {
      return { winner: firstCell, combination: combo };
    }
  }

  return null;
}

/**
 * Evaluate if the game is over.
 * Returns 'won' with details, 'draw', or 'playing'.
 */
export function evaluateGameState(
  board: Board,
  size: BoardSize
): { status: 'won'; winner: Symbol; combination: number[] } | { status: 'draw' } | { status: 'playing' } {
  const winResult = checkWinner(board, size);
  if (winResult) {
    return { status: 'won', winner: winResult.winner, combination: winResult.combination };
  }
  if (isBoardFull(board)) {
    return { status: 'draw' };
  }
  return { status: 'playing' };
}

/** Get the opposite symbol */
export function getOppositeSymbol(symbol: Symbol): Symbol {
  return symbol === 'X' ? 'O' : 'X';
}

/** Generate a unique ID for match records */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/** Format seconds into MM:SS display */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/** Format a date string for display */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
