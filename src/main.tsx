
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

// Force immediate render with no animation frame delay
const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

// Render synchronously
root.render(
  <App />
)

// Force visibility after a small delay
setTimeout(() => {
  document.querySelectorAll('.dashboard-content, .overflow-container').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = 'block'
      el.style.visibility = 'visible'
    }
  })
  
  // Force resize event to trigger responsive adjustments
  window.dispatchEvent(new Event('resize'))
}, 100)
