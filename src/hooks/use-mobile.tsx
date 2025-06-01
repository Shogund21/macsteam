
import { useState, useEffect, useCallback } from "react"

const MOBILE_BREAKPOINT = 1024 // Increased to capture tablets like iPad (822px)

export function useIsMobile() {
  // Default to false to prevent unnecessary mobile exclusions
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  
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
    
    // Set initial value only once
    if (!isInitialized) {
      const initialMobileState = checkIfMobile();
      setIsMobile(initialMobileState);
      setIsInitialized(true);
      console.log('📱 Initial mobile state set to:', initialMobileState, 'with breakpoint:', MOBILE_BREAKPOINT);
    }
    
    // Handle resize with proper debouncing
    let timeoutId: number | undefined;
    
    const handleViewportChange = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      
      timeoutId = window.setTimeout(() => {
        const newMobileState = checkIfMobile();
        setIsMobile(prevState => {
          if (prevState !== newMobileState) {
            console.log('📱 Mobile state changing from', prevState, 'to', newMobileState);
            return newMobileState;
          }
          return prevState;
        });
      }, 250); // Increased debounce time
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
  }, [checkIfMobile, isInitialized]);

  return isMobile;
}
