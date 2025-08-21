// src/utils/debounce.js

/**
 * Debounce function, returns a debounced version.
 * Used for search input etc.
 * @param {Function} fn
 * @param {number} delay ms
 * @return {Function}
 */
export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
