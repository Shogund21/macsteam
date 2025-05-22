
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

// Force content visibility on important elements
export const useForceVisibility = () => {
  useEffect(() => {
    // Force visibility of critical elements
    const forceVisibility = () => {
      document.querySelectorAll('.dashboard-content, .overflow-container').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
    };
    
    // Apply multiple times to ensure content appears
    forceVisibility();
    const timers = [100, 300, 500].map(delay => setTimeout(forceVisibility, delay));
    
    return () => timers.forEach(clearTimeout);
  }, []);
};
