import React, { memo, useEffect, useState } from 'react';
 import 'src/styles/ui/loading-spinner.css';
 import { useLoadingManager } from 'src/hooks/useLoadingManager';
 

 /**
  * A component that displays a loading spinner with customizable size and color.
  */
 interface LoadingSpinnerProps {
  /**
  * The size of the loading spinner. Options: 'sm', 'md', 'lg'.
  * @default 'md'
  */
  size?: 'sm' | 'md' | 'lg';
  /**
  * The color of the loading spinner.
  * @default 'red-500'
  */
  color?: string;
  /**
  * String for aria-label, descriptive for accessibility.
  * @default 'Loading'
  */
  ariaLabel?: string;
 }
 

 const LoadingSpinner: React.FC<LoadingSpinnerProps> = memo(({ size = 'md', color = 'red-500', ariaLabel = 'Loading' }) => {
  const { isLoading } = useLoadingManager();
  const [safeAriaLabel, setSafeAriaLabel] = useState(ariaLabel);
 

  useEffect(() => {
  if (!ariaLabel) {
  console.warn('LoadingSpinner component: Missing aria-label prop. Please provide a descriptive label for accessibility.');
  }
 

  // Basic XSS prevention for ariaLabel
  const sanitizedLabel = ariaLabel ? ariaLabel.replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'Loading';
  setSafeAriaLabel(sanitizedLabel);
  }, [ariaLabel]);
 

  const getSizeClass = (): string => {
  switch (size) {
  case 'sm':
  return 'h-4 w-4';
  case 'lg':
  return 'h-8 w-8';
  default:
  return 'h-6 w-6';
  }
  };
 

  try {
  return isLoading ? (
  <div
  className={`animate-spin rounded-full border-t-2 border-b-2 border-${color} ${getSizeClass()} font-roboto`}
  aria-label={safeAriaLabel}
  ></div>
  ) : null;
  } catch (error) {
  console.error('Error rendering LoadingSpinner:', error);
  return (
  <span className="text-red-500 font-roboto" aria-live="assertive">
  An error occurred while rendering the loading spinner.
  </span>
  );
  }
 });
 

 LoadingSpinner.displayName = 'LoadingSpinner';
 

 export default LoadingSpinner;