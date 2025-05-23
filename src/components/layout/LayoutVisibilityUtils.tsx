
import { useEffect } from "react";

// Set viewport height for mobile browsers
export const useViewportHeight = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      // This sets a CSS variable that can be used instead of vh units
      // which don't work well on mobile browsers due to address bar
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set viewport height immediately
    setViewportHeight();
    
    // Set up event listeners for orientation and resize
    window.addEventListener('resize', setViewportHeight, { passive: true });
    window.addEventListener('orientationchange', setViewportHeight, { passive: true });
    
    // Force a recheck after a short delay to catch any post-render adjustments
    const recheckTimeout = setTimeout(setViewportHeight, 200);
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
      clearTimeout(recheckTimeout);
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
