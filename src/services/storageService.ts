// ============================================================
// Storage Service — Type-safe localStorage wrapper
// ============================================================

/**
 * Get a value from localStorage, parsed as JSON.
 * Returns the fallback if the key doesn't exist or parsing fails.
 */
export function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
}

/**
 * Save a value to localStorage as JSON.
 */
export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to save to localStorage (key: ${key}):`, error);
  }
}

/**
 * Remove a value from localStorage.
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove from localStorage (key: ${key}):`, error);
  }
}

/**
 * Clear all application-related data from localStorage.
 * Only clears keys that start with the app prefix.
 */
export function clearAppStorage(prefix: string = 'ttt-'): void {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.warn('Failed to clear app storage:', error);
  }
}

/**
 * Export data as a JSON file download.
 */
export function exportAsJSON(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
