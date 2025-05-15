import { useState, useCallback, useEffect } from 'react';
 

 interface UseToggleProps {
  initialValue?: boolean;
  ariaLabel?: string;
 }
 

 type UseToggleReturn = [boolean, () => void];
 

 const useToggle = ({ initialValue = false, ariaLabel }: UseToggleProps): UseToggleReturn => {
  const [value, setValue] = useState<boolean>(initialValue);
  const [safeAriaLabel, setSafeAriaLabel] = useState(ariaLabel);
 

  useEffect(() => {
  if (!ariaLabel) {
  console.warn('useToggle hook: Missing aria-label. Provide a descriptive label for accessibility.');
  }
 

  // Basic XSS prevention for ariaLabel
  const sanitizedLabel = ariaLabel ? ariaLabel.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
  setSafeAriaLabel(sanitizedLabel);
  }, [ariaLabel]);
 

  const toggle = useCallback(() => {
  setValue((currentValue) => !currentValue);
  }, []);
 

  return [value, toggle];
 };
 

 export default useToggle;