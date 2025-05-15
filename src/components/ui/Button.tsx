import React, { ReactNode, MouseEventHandler, memo, useCallback, useEffect } from 'react';
 import 'src/styles/ui/button.css';
 

 interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  ariaLabel?: string;
 }
 

 const Button: React.FC<ButtonProps> = memo(({ children, onClick, disabled = false, ariaLabel }) => {
  const handleClick = useCallback(
  (event: React.MouseEvent<HTMLButtonElement>) => {
  if (!disabled && onClick) {
  onClick(event);
  }
  },
  [onClick, disabled]
  );
 

  useEffect(() => {
  if (!ariaLabel) {
  console.warn('Button component: Missing aria-label prop. Please provide a descriptive label for accessibility.');
  }
  }, [ariaLabel]);
 

  try {
  return (
  <button
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed font-roboto transition-colors duration-200 select-none"
  onClick={handleClick}
  disabled={disabled}
  aria-label={ariaLabel}
  aria-disabled={disabled}
  tabIndex={disabled ? -1 : 0}
  >
  {children}
  </button>
  );
  } catch (error) {
  console.error('Error rendering Button:', error);
  return (
  <span className="text-red-500 font-roboto" aria-live="assertive">
  An error occurred while rendering the button.
  </span>
  );
  }
 });
 

 Button.displayName = 'Button';
 

 export default Button;