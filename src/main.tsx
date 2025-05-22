
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

// Get root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  // Create root element if it doesn't exist (extreme fallback)
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  console.error("Root element was missing - created fallback root");
}

// Get root element and render directly without StrictMode
ReactDOM.createRoot(rootElement || document.getElementById('root')!).render(<App />);

// Force visibility multiple times
const forceVisibility = () => {
  document.querySelectorAll('#root, #root > div, .dashboard-content, .overflow-container').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'block';
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    }
  });
};

// Apply visibility fixes immediately and multiple times
forceVisibility();
setTimeout(forceVisibility, 100);
setTimeout(forceVisibility, 500);
setTimeout(forceVisibility, 1000);

// Set viewport height for mobile devices
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Set viewport height once and on resize
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
