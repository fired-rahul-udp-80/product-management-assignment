import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce values (e.g. search input)
 * @param {*} value - The input value to debounce
 * @param {number} delay - Debounce delay in milliseconds
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
