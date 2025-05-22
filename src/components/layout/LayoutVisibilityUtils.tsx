
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
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);
};

// Force visibility of key elements
export const useForceVisibility = () => {
  useEffect(() => {
    const forceContentVisibility = () => {
      document.querySelectorAll(
        '.dashboard-content, .overflow-container, [data-radix-sidebar-inset], [data-radix-sidebar-content]'
      ).forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
    };
    
    // Apply multiple times to ensure visibility
    const timers = [];
    for (let i = 1; i <= 5; i++) {
      timers.push(setTimeout(() => {
        forceContentVisibility();
        window.dispatchEvent(new Event('resize'));
      }, i * 200));
    }
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);
};
