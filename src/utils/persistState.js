// src/utils/persistState.js

/**
 * Enhanced persistence utilities with user-specific storage
 * Supports isolating data per user to prevent data mixing
 */

/**
 * Persists state to localStorage with optional user-specific key
 * @param {string} key - The base key for storage
 * @param {any} value - The value to store
 * @param {string|null} userId - Optional user ID for user-specific storage
 */
export function persistState(key, value, userId = null) {
  try {
    const storageKey = userId ? `kanban_${userId}_${key}` : `kanban_${key}`;
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to persist state:', e);
  }
}

/**
 * Loads persisted state from localStorage
 * @param {string|null} userId - Optional user ID for user-specific loading
 * @returns {object} The loaded state object
 */
export function loadPersistedState(userId = null) {
  let result = {};

  try {
    // Always load auth data (global)
    const auth = localStorage.getItem('kanban_auth');

    // Load kanban data (user-specific if userId provided)
    const kanbanKey = userId ? `kanban_${userId}_kanban` : 'kanban_kanban';
    const kanban = localStorage.getItem(kanbanKey);

    if (auth) {
      result.auth = JSON.parse(auth);
    }

    if (kanban) {
      result.kanban = JSON.parse(kanban);
    }
  } catch (e) {
    console.warn('Failed to load persisted state:', e);
  }

  return result;
}

/**
 * Clears all user-specific data from localStorage
 * Used during logout to ensure clean state
 * @param {string} userId - User ID to clear data for
 */
export function clearUserData(userId) {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(`kanban_${userId}_`)) {
        localStorage.removeItem(key);
      }
    });
    console.log(`Cleared all data for user: ${userId}`);
  } catch (e) {
    console.warn('Failed to clear user data:', e);
  }
}

/**
 * Clears all application data (useful for debugging)
 */
export function clearAllData() {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('kanban_')) {
        localStorage.removeItem(key);
      }
    });
    console.log('Cleared all kanban application data');
  } catch (e) {
    console.warn('Failed to clear all data:', e);
  }
}