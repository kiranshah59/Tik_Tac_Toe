// ============================================================
// Settings Store — Game configuration management
// ============================================================

import { create } from 'zustand';
import type { BoardSize, Difficulty, GameMode, GameSettings } from '../types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '../utils/constants';
import { getFromStorage, saveToStorage } from '../services/storageService';

interface SettingsState {
  settings: GameSettings;
  setMode: (mode: GameMode) => void;
  setBoardSize: (size: BoardSize) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setPlayerName: (index: 0 | 1, name: string) => void;
  swapSymbols: () => void;
  setFirstPlayer: (index: 0 | 1) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setTimerEnabled: (enabled: boolean) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: getFromStorage<GameSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),

  setMode: (mode) =>
    set((state) => {
      const newSettings: GameSettings = {
        ...state.settings,
        mode,
        players: [
          state.settings.players[0],
          {
            ...state.settings.players[1],
            name: mode === 'pvc' ? 'Computer' : 'Player 2',
            isAI: mode === 'pvc',
          },
        ],
      };
      saveToStorage(STORAGE_KEYS.SETTINGS, newSettings);
      return { settings: newSettings };
    }),

  setBoardSize: (boardSize) =>
    set((state) => {
      const newSettings = { ...state.settings, boardSize };
      saveToStorage(STORAGE_KEYS.SETTINGS, newSettings);
      return { settings: newSettings };
    }),

  setDifficulty: (difficulty) =>
    set((state) => {
      const newSettings = { ...state.settings, difficulty };
      saveToStorage(STORAGE_KEYS.SETTINGS, newSettings);
      return { settings: newSettings };
    }),

  setPlayerName: (index, name) =>
    set((state) => {
      const players = [...state.settings.players] as GameSettings['players'];
      players[index] = { ...players[index], name };
      const newSettings = { ...state.settings, players };
      saveToStorage(STORAGE_KEYS.SETTINGS, newSettings);
      return { settings: newSettings };
    }),

  swapSymbols: () =>
    set((state) => {
      const players: GameSettings['players'] = [
        { ...state.settings.players[0], symbol: state.settings.players[1].symbol },
        { ...state.settings.players[1], symbol: state.settings.players[0].symbol },
      ];
      const newSettings = { ...state.settings, players };
      saveToStorage(STORAGE_KEYS.SETTINGS, newSettings);
      return { settings: newSettings };
    }),

  setFirstPlayer: (index) =>
    set((state) => {
      const newSettings = { ...state.settings, firstPlayer: index };
      saveToStorage(STORAGE_KEYS.SETTINGS, newSettings);
      return { settings: newSettings };
    }),

  setSoundEnabled: (soundEnabled) =>
    set((state) => {
      const newSettings = { ...state.settings, soundEnabled };
      saveToStorage(STORAGE_KEYS.SETTINGS, newSettings);
      return { settings: newSettings };
    }),

  setTimerEnabled: (timerEnabled) =>
    set((state) => {
      const newSettings = { ...state.settings, timerEnabled };
      saveToStorage(STORAGE_KEYS.SETTINGS, newSettings);
      return { settings: newSettings };
    }),

  resetSettings: () => {
    saveToStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    set({ settings: DEFAULT_SETTINGS });
  },
}));
