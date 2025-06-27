
import { useState, useEffect, useCallback } from "react"

const MOBILE_BREAKPOINT = 640 // Mobile breakpoint as specified in requirements

export function useIsMobile() {
  // Default to false to prevent unnecessary mobile exclusions
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const checkIfMobile = useCallback(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return false;
    
    // Use viewport width for mobile detection
    const viewportWidth = window.innerWidth;
    const isMobileViewport = viewportWidth <= MOBILE_BREAKPOINT;
    
    return isMobileViewport;
  }, []);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial value
    const initialMobileState = checkIfMobile();
    setIsMobile(initialMobileState);
    
    // OPTIMIZED: Reduced logging and longer debounce time
    let timeoutId: number | undefined;
    
    const handleViewportChange = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      
      timeoutId = window.setTimeout(() => {
        const newMobileState = checkIfMobile();
        if (newMobileState !== isMobile) {
          setIsMobile(newMobileState);
        }
      }, 300); // Increased debounce time to reduce re-renders
    };
    
    window.addEventListener('resize', handleViewportChange, { passive: true });
    window.addEventListener('orientationchange', handleViewportChange, { passive: true });
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [checkIfMobile, isMobile]);

  return isMobile;
}
