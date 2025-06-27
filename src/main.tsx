
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import './index.css'

// Force visibility immediately
document.documentElement.style.display = 'block';
document.documentElement.style.visibility = 'visible';
document.body.style.display = 'block';
document.body.style.visibility = 'visible';

// Get or create root element
let rootElement = document.getElementById('root');
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
}

// Force root visibility
rootElement.style.display = 'block';
rootElement.style.visibility = 'visible';
rootElement.style.minHeight = '100vh';

// Emergency fallback content
const showFallback = () => {
  if (!rootElement!.hasChildNodes()) {
    rootElement!.innerHTML = `
      <div style="padding: 20px; text-align: center; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2>AssetGuardian</h2>
        <p>Loading application...</p>
        <button onclick="window.location.reload()" style="margin-top: 10px; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 4px;">
          Refresh
        </button>
      </div>
    `;
  }
};

// Show fallback immediately if needed
setTimeout(showFallback, 100);

// Render React app
try {
  ReactDOM.createRoot(rootElement).render(<App />);
} catch (error) {
  console.error('React render error:', error);
  showFallback();
}

// Set viewport height for mobile devices
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setViewportHeight();
window.addEventListener('resize', setViewportHeight);

// Force content visibility after render
setTimeout(() => {
  document.querySelectorAll('#root, #root > *, body, html').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'block';
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    }
  });
}, 200);

console.log('Application initialization complete');
