import { useState, useEffect, useCallback } from 'react';

 interface UseThemeReturn {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
 }

 /**
  * useTheme hook provides theme management functionality with local storage persistence.
  * @returns An object containing the current theme and a function to toggle the theme.
  */
 const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  /**
  * Loads the theme from local storage on component mount.
  */
  useEffect(() => {
  try {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || storedTheme === 'light') {
  setTheme(storedTheme);
  } else {
  setTheme('light');
  }
  } catch (error) {
  console.error('Error loading theme from localStorage:', error);
  }
  }, []);

  /**
  * Toggles the theme and persists it in local storage.
  */
  const toggleTheme = useCallback(() => {
  setTheme((prevTheme) => {
  const newTheme = prevTheme === 'light' ? 'dark' : 'light';

  try {
  localStorage.setItem('theme', newTheme);
  } catch (error) {
  console.error('Error setting theme in localStorage:', error);
  }

  try {
  document.documentElement.setAttribute('data-theme', newTheme);
  } catch (error) {
  console.error('Error setting data-theme attribute:', error);
  }
  return newTheme;
  });
  }, []);

  /**
  * Applies the theme to the document element.
  */
  useEffect(() => {
  try {
  document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
  console.error('Error setting data-theme attribute:', error);
  }
  }, [theme]);

  useTheme.displayName = 'useTheme';

  return { theme, toggleTheme };
 };

 export default useTheme;