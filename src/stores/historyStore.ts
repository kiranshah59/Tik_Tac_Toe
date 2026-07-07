// ============================================================
// History Store — Match history management
// ============================================================

import { create } from 'zustand';
import type { MatchRecord } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { getFromStorage, saveToStorage, exportAsJSON } from '../services/storageService';

interface HistoryState {
  matches: MatchRecord[];
  addMatch: (match: MatchRecord) => void;
  clearHistory: () => void;
  exportHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  matches: getFromStorage<MatchRecord[]>(STORAGE_KEYS.HISTORY, []),

  addMatch: (match) =>
    set((state) => {
      const newMatches = [match, ...state.matches];
      saveToStorage(STORAGE_KEYS.HISTORY, newMatches);
      return { matches: newMatches };
    }),

  clearHistory: () => {
    saveToStorage(STORAGE_KEYS.HISTORY, []);
    set({ matches: [] });
  },

  exportHistory: () => {
    const { matches } = get();
    exportAsJSON(matches, `tictactoe-history-${new Date().toISOString().slice(0, 10)}.json`);
  },
}));
