import React from 'react';
 import styles from 'src/styles/layout/minimal-layout.css';
 

 interface MinimalLayoutProps {
  children: React.ReactNode;
 }
 

 const MinimalLayout: React.FC<MinimalLayoutProps> = React.memo(({ children }) => {
  try {
  return (
  <main className={`container mx-auto py-8 ${styles.minimalLayout}`} aria-label="Main content">
  {children !== null && children !== undefined ? (
  children
  ) : (
  <div>No content available</div>
  )}
  </main>
  );
  } catch (error) {
  console.error('Error rendering MinimalLayout:', error);
  return <div>An error occurred while rendering the layout.</div>;
  }
 });
 

 MinimalLayout.displayName = 'MinimalLayout';
 

 export default MinimalLayout;