
import { useEffect } from "react";

// Set viewport height for mobile browsers
export const useViewportHeight = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set viewport height immediately and on window resize
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);
};

// Force visibility of key elements
export const useForceVisibility = () => {
  useEffect(() => {
    const forceContentVisibility = () => {
      // Target all critical content elements
      const selectors = [
        '.dashboard-content',
        '.overflow-container',
        '[data-radix-sidebar-inset]',
        '[data-radix-sidebar-content]',
        '[data-radix-sidebar-root]',
        '#root > div',
        '.min-h-[200px]',
        '.visible',
        '[data-testid="sidebar-inset"]',
        '[data-testid="mobile-content"]'
      ];
      
      // Apply visibility to all matching elements
      document.querySelectorAll(selectors.join(', ')).forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
      
      // Special handling for flex containers
      document.querySelectorAll('.flex, .flex-1').forEach(el => {
        if (el instanceof HTMLElement && window.innerWidth < 768) {
          // On mobile, convert flex to block for more reliable rendering
          el.style.display = 'block';
        } else if (el instanceof HTMLElement) {
          // On desktop, ensure flex is working
          el.style.display = 'flex';
        }
      });
      
      // Force browser repaint
      document.body.style.display = 'none';
      document.body.offsetHeight; // Force reflow
      document.body.style.display = 'block';
    };
    
    // Apply multiple times to ensure visibility
    const times = [0, 150, 500, 1000, 2000];
    const timers = times.map(time => setTimeout(forceContentVisibility, time));
    
    // Force resize events to trigger responsive handlers
    const resizeTimers = times.map(time => 
      setTimeout(() => window.dispatchEvent(new Event('resize')), time)
    );
    
    return () => {
      [...timers, ...resizeTimers].forEach(timer => clearTimeout(timer));
    };
  }, []);
};
