import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element with id "root" not found in index.html');
} else {
  // The non-null assertion operator (!) is used because we've explicitly checked
  // that rootElement is not null in the if statement above. This is safe
  // because the render method requires a non-null element.
  const root = ReactDOM.createRoot(rootElement);
  try {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to render the app:', error);
  }
}