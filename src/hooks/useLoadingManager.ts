import React, { useState, useCallback, useContext, createContext, ReactNode, useMemo } from 'react';
 

 interface LoadingContextType {
  isLoading: boolean;
  loadingProgress: number;
  setLoading: (isLoading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
 }
 

 const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  loadingProgress: 0,
  setLoading: () => {},
  setLoadingProgress: () => {},
 });
 

 /**
  * useLoadingManager hook provides access to the global loading state and setter functions.
  * @returns An object containing the loading state, loading progress, and setter functions.
  */
 export const useLoadingManager = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
  throw new Error('useLoadingManager must be used within a LoadingProvider');
  }
  return context;
 };
 

 interface LoadingProviderProps {
  children: ReactNode;
 }
 

 /**
  * LoadingProvider component provides the loading state and setter functions to its children.
  */
 export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgressState] = useState<number>(0);
 

  const setLoading = useCallback((isLoading: boolean) => {
  try {
  setIsLoading(isLoading);
  } catch (error) {
  console.error('Error setting isLoading state:', error);
  }
  }, []);
 

  const setLoadingProgress = useCallback((progress: number) => {
  try {
  if (typeof progress !== 'number') {
  throw new Error('Loading progress must be a number.');
  }
  if (progress < 0 || progress > 100) {
  throw new Error('Loading progress must be between 0 and 100.');
  }
  setLoadingProgressState(progress);
  } catch (error: any) {
  console.error('Error setting loading progress:', error.message);
  }
  }, []);
 

  const contextValue: LoadingContextType = useMemo(() => ({
  isLoading,
  loadingProgress,
  setLoading,
  setLoadingProgress,
  }), [isLoading, loadingProgress, setLoading, setLoadingProgress]);
 

  return (
  <LoadingContext.Provider value={contextValue}>
  {children}
  </LoadingContext.Provider>
  );
 };