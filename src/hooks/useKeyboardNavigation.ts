// ============================================================
// useKeyboardNavigation Hook — Arrow key navigation for game board
// ============================================================

import { useCallback, useState, useEffect } from 'react';
import type { BoardSize } from '../types';

interface UseKeyboardNavigationReturn {
  focusedIndex: number;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  setFocusedIndex: (index: number) => void;
}

/**
 * Custom hook for keyboard navigation on the game board.
 * Supports arrow keys for navigation and Enter/Space for selection.
 */
export function useKeyboardNavigation(
  boardSize: BoardSize,
  onSelect: (index: number) => void,
  disabled: boolean = false
): UseKeyboardNavigationReturn {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const totalCells = boardSize * boardSize;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      let newIndex = focusedIndex;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          newIndex = focusedIndex - boardSize;
          if (newIndex < 0) newIndex += totalCells;
          break;
        case 'ArrowDown':
          e.preventDefault();
          newIndex = focusedIndex + boardSize;
          if (newIndex >= totalCells) newIndex -= totalCells;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = focusedIndex - 1;
          if (newIndex < 0) newIndex = totalCells - 1;
          break;
        case 'ArrowRight':
          e.preventDefault();
          newIndex = focusedIndex + 1;
          if (newIndex >= totalCells) newIndex = 0;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onSelect(focusedIndex);
          return;
        default:
          return;
      }

      setFocusedIndex(newIndex);
    },
    [focusedIndex, boardSize, totalCells, onSelect, disabled]
  );

  // Reset focused index when board size changes
  useEffect(() => {
    setFocusedIndex(0);
  }, [boardSize]);

  return { focusedIndex, handleKeyDown, setFocusedIndex };
}
