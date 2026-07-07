// ============================================================
// Cell Component — Individual cell with animated X/O
// ============================================================

import React from 'react';
import type { CellValue } from '../../types';

interface CellProps {
  value: CellValue;
  index: number;
  onClick: () => void;
  isWinning: boolean;
  isHint: boolean;
  isFocused: boolean;
  disabled: boolean;
  boardSize: number;
  currentPlayerSymbol: string;
}

/** SVG animated X mark */
const XMark: React.FC<{ isWinning: boolean }> = ({ isWinning }) => (
  <svg viewBox="0 0 100 100" className={`w-[60%] h-[60%] ${isWinning ? 'drop-shadow-[0_0_12px_rgba(255,101,132,0.8)]' : ''}`}>
    <line
      x1="20" y1="20" x2="80" y2="80"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      className="text-secondary"
      style={{
        strokeDasharray: 85,
        strokeDashoffset: 85,
        animation: 'draw-x 0.4s ease-out forwards',
      }}
    />
    <line
      x1="80" y1="20" x2="20" y2="80"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      className="text-secondary"
      style={{
        strokeDasharray: 85,
        strokeDashoffset: 85,
        animation: 'draw-x 0.4s ease-out 0.15s forwards',
      }}
    />
  </svg>
);

/** SVG animated O mark */
const OMark: React.FC<{ isWinning: boolean }> = ({ isWinning }) => (
  <svg viewBox="0 0 100 100" className={`w-[60%] h-[60%] ${isWinning ? 'drop-shadow-[0_0_12px_rgba(0,217,255,0.8)]' : ''}`}>
    <circle
      cx="50" cy="50" r="35"
      fill="none"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      className="text-accent"
      style={{
        strokeDasharray: 220,
        strokeDashoffset: 220,
        animation: 'draw-o 0.5s ease-out forwards',
      }}
    />
  </svg>
);

export const Cell: React.FC<CellProps> = ({
  value,
  index,
  onClick,
  isWinning,
  isHint,
  isFocused,
  disabled,
  boardSize,
  currentPlayerSymbol,
}) => {
  const row = Math.floor(index / boardSize) + 1;
  const col = (index % boardSize) + 1;

  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`
        relative aspect-square rounded-xl
        flex items-center justify-center
        transition-all duration-200 ease-out
        cursor-pointer disabled:cursor-default
        group
        ${isWinning
          ? 'bg-primary/20 scale-105 neon-glow animate-bounce-in'
          : 'surface-card hover:bg-primary/10 active:scale-95'
        }
        ${isHint
          ? 'ring-2 ring-success ring-offset-2 ring-offset-transparent animate-pulse-glow'
          : ''
        }
        ${isFocused
          ? 'ring-2 ring-primary ring-offset-2 ring-offset-transparent'
          : ''
        }
        ${!value && !disabled
          ? 'hover:shadow-lg hover:shadow-primary/10'
          : ''
        }
      `}
      aria-label={
        value
          ? `Cell row ${row}, column ${col}: ${value}`
          : `Empty cell row ${row}, column ${col}`
      }
      tabIndex={isFocused ? 0 : -1}
    >
      {/* Rendered symbol */}
      {value === 'X' && <XMark isWinning={isWinning} />}
      {value === 'O' && <OMark isWinning={isWinning} />}

      {/* Hover ghost preview */}
      {!value && !disabled && (
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity duration-200">
          {currentPlayerSymbol === 'X' ? (
            <svg viewBox="0 0 100 100" className="w-[60%] h-[60%]">
              <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-secondary" />
              <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-secondary" />
            </svg>
          ) : (
            <svg viewBox="0 0 100 100" className="w-[60%] h-[60%]">
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="12" className="text-accent" />
            </svg>
          )}
        </span>
      )}

      {/* Hint indicator */}
      {isHint && !value && (
        <span className="absolute text-success text-xs font-bold animate-bounce-in">
          ★
        </span>
      )}
    </button>
  );
};
