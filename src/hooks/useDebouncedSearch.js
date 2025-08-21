// src/hooks/useDebouncedSearch.js
import { useState, useEffect } from 'react';

/**
 * Debounces search input for UI/UX performance.
 * @param {number} delay milliseconds
 */
export function useDebouncedSearch(delay = 350) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  return [debouncedValue, setSearchTerm, searchTerm];
}