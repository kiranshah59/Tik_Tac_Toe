// ============================================================
// Toggle Component — Theme toggle switch
// ============================================================

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-16 h-8 rounded-full p-1
        transition-all duration-300 ease-out
        cursor-pointer
        ${isDark
          ? 'bg-dark-border shadow-inner shadow-black/20'
          : 'bg-yellow-200 shadow-inner shadow-yellow-300/30'
        }
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={isDark}
    >
      {/* Sliding circle */}
      <div
        className={`
          absolute top-1 w-6 h-6 rounded-full
          flex items-center justify-center
          transition-all duration-300 ease-out
          ${isDark
            ? 'left-[calc(100%-28px)] bg-primary shadow-lg shadow-primary/40'
            : 'left-1 bg-white shadow-lg shadow-yellow-400/30'
          }
        `}
      >
        {isDark ? (
          <Moon size={14} className="text-white" />
        ) : (
          <Sun size={14} className="text-yellow-500" />
        )}
      </div>
    </button>
  );
};
