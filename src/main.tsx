import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Mitigate third-party or cross-origin iframe "Script error" messages gracefully
try {
  window.addEventListener('error', (event) => {
    if (!event.message || event.message.includes('Script error') || event.message.includes('Script error.')) {
      event.preventDefault();
      return true;
    }
  });
  window.addEventListener('unhandledrejection', (event) => {
    const msg = event.reason?.message || '';
    if (!msg || msg.includes('Script error') || msg.includes('Script error.')) {
      event.preventDefault();
      return true;
    }
  });
} catch (e) {
  // Ignored in non-window execution runs
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

