// ============================================================
// Theme Store — Dark/Light mode management
// ============================================================

import { create } from 'zustand';
import type { Theme } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { getFromStorage, saveToStorage } from '../services/storageService';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

/** Detect user's preferred color scheme */
function getInitialTheme(): Theme {
  const saved = getFromStorage<Theme | null>(STORAGE_KEYS.THEME, null);
  if (saved) return saved;
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'dark'; // Default to dark for the premium feel
}

/** Apply theme class to the document root */
function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  saveToStorage(STORAGE_KEYS.THEME, theme);
}

export const useThemeStore = create<ThemeState>((set) => {
  // Apply initial theme on store creation
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  return {
    theme: initialTheme,

    toggleTheme: () => {
      set((state) => {
        const newTheme: Theme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        return { theme: newTheme };
      });
    },

    setTheme: (theme: Theme) => {
      applyTheme(theme);
      set({ theme });
    },
  };
});
