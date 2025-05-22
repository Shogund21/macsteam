
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

// Ensure root element exists
const rootElement = document.getElementById('root');

if (!rootElement) {
  // Create root element if it doesn't exist (extreme fallback)
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  console.error("Root element was missing - created fallback root");
}

// Get root element and render immediately
const root = ReactDOM.createRoot(rootElement || document.getElementById('root')!);

// Sync render without React.StrictMode to avoid double-rendering issues
root.render(<App />);

// Critical - force visibility multiple times
const forceVisibility = () => {
  document.querySelectorAll('#root, #root > div, .dashboard-content, .overflow-container, [data-radix-sidebar-inset], [data-radix-sidebar-content]').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'block';
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    }
  });
  
  // Force resize event to trigger responsive adjustments
  window.dispatchEvent(new Event('resize'));
};

// Apply visibility fixes immediately and multiple times
forceVisibility();

// Multiple attempts over time
[50, 100, 200, 500, 1000, 2000].forEach(delay => {
  setTimeout(forceVisibility, delay);
});

// Set viewport height for mobile devices
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Set it once immediately and on resize
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
