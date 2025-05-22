
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

// Get root element and render App within React's control
ReactDOM.createRoot(rootElement || document.getElementById('root')!).render(<App />);

// Set viewport height for mobile devices
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Set viewport height once and on resize
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
