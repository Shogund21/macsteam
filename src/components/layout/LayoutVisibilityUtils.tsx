
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

// This hook is no longer needed as we're relying on CSS for visibility
export const useForceVisibility = () => {
  // Empty implementation - we're now using CSS-based visibility
  useEffect(() => {
    // No-op - CSS handles visibility now
    return () => {};
  }, []);
};
