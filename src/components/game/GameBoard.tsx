// ============================================================
// GameBoard Component — Dynamic NxN grid
// ============================================================

import React, { useCallback } from 'react';
import { Cell } from './Cell';
import { useGameStore } from '../../stores/gameStore';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

export const GameBoard: React.FC = () => {
  const board = useGameStore((s) => s.board);
  const settings = useGameStore((s) => s.settings);
  const status = useGameStore((s) => s.status);
  const currentPlayerIndex = useGameStore((s) => s.currentPlayerIndex);
  const winningCombination = useGameStore((s) => s.winningCombination);
  const hintCell = useGameStore((s) => s.hintCell);
  const isAIThinking = useGameStore((s) => s.isAIThinking);
  const makeMove = useGameStore((s) => s.makeMove);

  const boardSize = settings?.boardSize ?? 3;
  const isDisabled = status !== 'playing' || isAIThinking;
  const currentSymbol = settings?.players[currentPlayerIndex]?.symbol ?? 'X';

  const handleCellClick = useCallback(
    (index: number) => {
      if (isDisabled) return;
      if (board[index] !== null) return;
      makeMove(index);
    },
    [isDisabled, board, makeMove]
  );

  const { focusedIndex, handleKeyDown } = useKeyboardNavigation(
    boardSize,
    handleCellClick,
    isDisabled
  );

  // Dynamic grid columns based on board size
  const gridClass = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }[boardSize];

  // Dynamic gap and cell sizing
  const gapClass = boardSize === 3 ? 'gap-3' : boardSize === 4 ? 'gap-2.5' : 'gap-2';
  const maxWidthClass = boardSize === 3 ? 'max-w-sm' : boardSize === 4 ? 'max-w-md' : 'max-w-lg';

  return (
    <div
      className={`grid ${gridClass} ${gapClass} ${maxWidthClass} w-full mx-auto animate-scale-in`}
      role="grid"
      aria-label="Tic-Tac-Toe game board"
      onKeyDown={handleKeyDown}
    >
      {board.map((cellValue, index) => (
        <Cell
          key={index}
          value={cellValue}
          index={index}
          onClick={() => handleCellClick(index)}
          isWinning={winningCombination?.includes(index) ?? false}
          isHint={hintCell === index}
          isFocused={focusedIndex === index}
          disabled={isDisabled}
          boardSize={boardSize}
          currentPlayerSymbol={currentSymbol}
        />
      ))}
    </div>
  );
};
