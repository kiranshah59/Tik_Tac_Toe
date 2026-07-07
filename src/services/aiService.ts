// ============================================================
// AI Service — Implements Easy, Medium, and Hard AI opponents
// ============================================================

import type { Board, BoardSize, Difficulty, Symbol } from '../types';
import { checkWinner, getEmptyCells, isBoardFull, getOppositeSymbol } from '../utils/gameLogic';
import { WINNING_COMBINATIONS } from '../utils/constants';

/**
 * Get the AI's next move based on difficulty level.
 * Returns the index of the cell to play.
 */
export function getAIMove(
  board: Board,
  size: BoardSize,
  aiSymbol: Symbol,
  difficulty: Difficulty
): number {
  switch (difficulty) {
    case 'easy':
      return getEasyMove(board);
    case 'medium':
      return getMediumMove(board, size, aiSymbol);
    case 'hard':
      return getHardMove(board, size, aiSymbol);
    default:
      return getEasyMove(board);
  }
}

// ─── Easy AI: Pure Random ──────────────────────────────────

function getEasyMove(board: Board): number {
  const emptyCells = getEmptyCells(board);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

// ─── Medium AI: Strategic Random ───────────────────────────

function getMediumMove(board: Board, size: BoardSize, aiSymbol: Symbol): number {
  const humanSymbol = getOppositeSymbol(aiSymbol);

  // 1. Try to win
  const winMove = findWinningMove(board, size, aiSymbol);
  if (winMove !== -1) return winMove;

  // 2. Block opponent's winning move
  const blockMove = findWinningMove(board, size, humanSymbol);
  if (blockMove !== -1) return blockMove;

  // 3. Take center if available (for 3×3)
  const center = Math.floor((size * size) / 2);
  if (size % 2 === 1 && board[center] === null) return center;

  // 4. Take a corner
  const corners = getCorners(size);
  const availableCorners = corners.filter((i) => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. Random
  return getEasyMove(board);
}

/** Find a move that would let the given symbol win immediately */
function findWinningMove(board: Board, size: BoardSize, symbol: Symbol): number {
  const emptyCells = getEmptyCells(board);
  for (const cell of emptyCells) {
    const testBoard = [...board];
    testBoard[cell] = symbol;
    if (checkWinner(testBoard, size)) {
      return cell;
    }
  }
  return -1;
}

/** Get corner indices for a board of given size */
function getCorners(size: BoardSize): number[] {
  return [0, size - 1, size * (size - 1), size * size - 1];
}

// ─── Hard AI: Minimax with Alpha-Beta Pruning ──────────────

function getHardMove(board: Board, size: BoardSize, aiSymbol: Symbol): number {
  const emptyCells = getEmptyCells(board);

  // If board is empty, just pick a corner for speed
  if (emptyCells.length === size * size) {
    return 0;
  }

  // For larger boards, limit the search depth
  const maxDepth = size === 3 ? Infinity : size === 4 ? 6 : 4;

  let bestScore = -Infinity;
  let bestMove = emptyCells[0];

  for (const cell of emptyCells) {
    const newBoard = [...board];
    newBoard[cell] = aiSymbol;

    const score = minimax(
      newBoard,
      size,
      0,
      false,
      aiSymbol,
      -Infinity,
      Infinity,
      maxDepth
    );

    if (score > bestScore) {
      bestScore = score;
      bestMove = cell;
    }
  }

  return bestMove;
}

/**
 * Minimax algorithm with alpha-beta pruning.
 * 
 * @param board - Current board state
 * @param size - Board size
 * @param depth - Current search depth
 * @param isMaximizing - Whether it's the AI's turn (maximizing)
 * @param aiSymbol - The AI's symbol
 * @param alpha - Alpha value for pruning
 * @param beta - Beta value for pruning
 * @param maxDepth - Maximum search depth
 * @returns Score of the position
 */
function minimax(
  board: Board,
  size: BoardSize,
  depth: number,
  isMaximizing: boolean,
  aiSymbol: Symbol,
  alpha: number,
  beta: number,
  maxDepth: number
): number {
  const humanSymbol = getOppositeSymbol(aiSymbol);
  const winResult = checkWinner(board, size);

  // Terminal states
  if (winResult) {
    // Winner found — positive if AI wins, negative if human wins
    return winResult.winner === aiSymbol ? 100 - depth : depth - 100;
  }
  if (isBoardFull(board)) {
    return 0; // Draw
  }
  if (depth >= maxDepth) {
    // Heuristic evaluation for depth-limited search
    return evaluateBoard(board, size, aiSymbol);
  }

  const emptyCells = getEmptyCells(board);

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (const cell of emptyCells) {
      const newBoard = [...board];
      newBoard[cell] = aiSymbol;
      const score = minimax(newBoard, size, depth + 1, false, aiSymbol, alpha, beta, maxDepth);
      maxScore = Math.max(maxScore, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break; // Prune
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const cell of emptyCells) {
      const newBoard = [...board];
      newBoard[cell] = humanSymbol;
      const score = minimax(newBoard, size, depth + 1, true, aiSymbol, alpha, beta, maxDepth);
      minScore = Math.min(minScore, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break; // Prune
    }
    return minScore;
  }
}

/**
 * Heuristic board evaluation for depth-limited search on larger boards.
 * Counts how many winning lines are still possible for each player.
 */
function evaluateBoard(board: Board, size: BoardSize, aiSymbol: Symbol): number {
  const humanSymbol = getOppositeSymbol(aiSymbol);
  let score = 0;

  const combinations = WINNING_COMBINATIONS[size];

  for (const combo of combinations) {
    let aiCount = 0;
    let humanCount = 0;

    for (const index of combo) {
      if (board[index] === aiSymbol) aiCount++;
      else if (board[index] === humanSymbol) humanCount++;
    }

    // Only count lines that are still possible for one side
    if (humanCount === 0) score += Math.pow(10, aiCount);
    if (aiCount === 0) score -= Math.pow(10, humanCount);
  }

  return score;
}

/**
 * Get a hint (best move) for the human player.
 * Uses minimax to find the optimal move.
 */
export function getHintMove(board: Board, size: BoardSize, playerSymbol: Symbol): number {
  return getHardMove(board, size, playerSymbol);
}
