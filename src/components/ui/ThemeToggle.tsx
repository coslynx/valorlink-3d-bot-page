import React, { useState, useEffect, useCallback } from 'react';
 import { useTheme } from 'src/hooks/useTheme';
 import 'src/styles/ui/theme-toggle.css';
 

 interface ThemeToggleProps {
  ariaLabel?: string;
 }
 

 const ThemeToggle: React.FC<ThemeToggleProps> = React.memo(({ ariaLabel: initialAriaLabel }) => {
  const { theme, toggleTheme } = useTheme();
  const [safeAriaLabel, setSafeAriaLabel] = useState(initialAriaLabel);
 

  useEffect(() => {
  if (!initialAriaLabel) {
  console.warn('ThemeToggle component: Missing aria-label prop. Please provide a descriptive label for accessibility.');
  }
 

  // Basic XSS prevention for ariaLabel
  const sanitizedLabel = initialAriaLabel ? initialAriaLabel.replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'Toggle theme';
  setSafeAriaLabel(sanitizedLabel);
  }, [initialAriaLabel]);
 

  const handleClick = useCallback(() => {
  toggleTheme();
  }, [toggleTheme]);
 

  try {
  return (
  <button
  className={`bg-white dark:bg-black rounded-full shadow-md transition-colors duration-300 p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 ${theme === 'dark' ? 'dark-mode' : ''}`}
  onClick={handleClick}
  aria-label={safeAriaLabel}
  aria-live="polite"
  >
  {theme === 'light' ? (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="w-6 h-6 text-red-500"
  >
  <path
  strokeLinecap="round"
  strokeLinejoin="round"
  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-5.477-5.477l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591m-3.182 4.773A11.036 11.036 0 004.217 10.906c0-6.069 4.93-11 11-11s11 4.93 11 11a11.036 11.036 0 00-4.217 2.203m-6.364 3.618A11.037 11.037 0 0113 16.906c0 6.07-4.931 11-11 11s-11-4.93-11-11a11.037 11.037 0 013.182-5.982"
  />
  </svg>
  ) : (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="w-6 h-6 text-red-500"
  >
  <path
  strokeLinecap="round"
  strokeLinejoin="round"
  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752 1.199.3 2.477.5 3.813.5 4.04 0 7.45-2.215 7.45-5.422 0-3.207-3.411-5.422-7.45-5.422-3.336 0-4.614.2-5.813.5a9.726 9.726 0 01-4.748 3.752c0 5.385 4.365 9.75 9.75 9.75 1.33 0 2.597-.266 3.752-.748m4.144 4.144L21 21m-4.144-4.144c0 2.203-1.797 4-4 4s-4-1.797-4-4 1.797-4 4-4 4 1.797 4 4z"
  />
  </svg>
  )}
  </button>
  );
  } catch (error) {
  console.error('Error rendering ThemeToggle:', error);
  return (
  <span className="text-red-500 font-roboto" aria-live="assertive">
  Theme toggle failed to load
  </span>
  );
  }
 });
 

 ThemeToggle.displayName = 'ThemeToggle';
 

 export default ThemeToggle;