import React, { Suspense } from 'react';
 import {
  createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom';
 import MinimalLayout from './components/layout/MinimalLayout';
 import LoadingSpinner from './components/ui/LoadingSpinner';
 

 const HomePage = React.lazy(() => import('./pages/HomePage'));
 const ModelShowcasePage = React.lazy(() => import('./pages/ModelShowcasePage'));
 const ExperiencePage = React.lazy(() => import('./pages/ExperiencePage'));
 const ContactPage = React.lazy(() => import('./pages/ContactPage'));
 const AboutPage = React.lazy(() => import('./pages/AboutPage'));
 

 const router = createBrowserRouter([
  {
  path: '/',
  element: <MinimalLayout><Suspense fallback={<LoadingSpinner />}><HomePage /></Suspense></MinimalLayout>,
  errorElement: <div>Error!</div>,
  },
  {
  path: '/model-showcase',
  element: <MinimalLayout><Suspense fallback={<LoadingSpinner />}><ModelShowcasePage /></Suspense></MinimalLayout>,
  errorElement: <div>Error!</div>,
  },
  {
  path: '/experience',
  element: <MinimalLayout><Suspense fallback={<LoadingSpinner />}><ExperiencePage /></Suspense></MinimalLayout>,
  errorElement: <div>Error!</div>,
  },
  {
  path: '/contact',
  element: <MinimalLayout><Suspense fallback={<LoadingSpinner />}><ContactPage /></Suspense></MinimalLayout>,
  errorElement: <div>Error!</div>,
  },
  {
  path: '/about',
  element: <MinimalLayout><Suspense fallback={<LoadingSpinner />}><AboutPage /></Suspense></MinimalLayout>,
  errorElement: <div>Error!</div>,
  },
 ]);
 

 function App() {
  return (
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
  );
 }
 

 export default App;