
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

// Force visibility of key elements with more targeted approach
export const useForceVisibility = () => {
  useEffect(() => {
    const forceContentVisibility = () => {
      // Target critical content elements
      const criticalSelectors = [
        '.dashboard-content',
        '.overflow-container',
        '[data-radix-sidebar-inset]',
        '[data-radix-sidebar-content]',
        '.min-h-[200px]'
      ];
      
      // Apply visibility without disrupting flex layouts
      document.querySelectorAll(criticalSelectors.join(', ')).forEach(el => {
        if (el instanceof HTMLElement) {
          if (!el.classList.contains('flex') && !el.classList.contains('flex-1')) {
            el.style.display = 'block';
          }
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
    };
    
    // Apply twice with delay to ensure rendering
    forceContentVisibility();
    const timer = setTimeout(forceContentVisibility, 300);
    
    return () => clearTimeout(timer);
  }, []);
};
