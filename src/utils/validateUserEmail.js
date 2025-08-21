// src/utils/validateUserEmail.js

/**
 * Simple, robust email validation (for UI forms).
 * @param {string} email
 * @returns {boolean}
 */
export function validateUserEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
