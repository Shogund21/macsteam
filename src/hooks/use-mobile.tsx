
import { useState, useEffect, useCallback } from "react"

const MOBILE_BREAKPOINT = 1024 // Increased to capture tablets like iPad (822px)

export function useIsMobile() {
  // Default to false to prevent unnecessary mobile exclusions
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const checkIfMobile = useCallback(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return false;
    
    // Use viewport width for mobile detection
    const viewportWidth = window.innerWidth;
    const isMobileViewport = viewportWidth <= MOBILE_BREAKPOINT;
    
    // Debug logging with more context
    console.log('📱 Mobile Detection DEBUG (UPDATED):', {
      viewportWidth,
      breakpoint: MOBILE_BREAKPOINT,
      isMobileViewport,
      userAgent: window.navigator.userAgent.substring(0, 50) + '...',
      timestamp: new Date().toISOString()
    });
    
    return isMobileViewport;
  }, []);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial value
    const initialMobileState = checkIfMobile();
    setIsMobile(initialMobileState);
    console.log('📱 Initial mobile state set to:', initialMobileState, 'with breakpoint:', MOBILE_BREAKPOINT);
    
    // Handle resize with debouncing
    let timeoutId: number | undefined;
    
    const handleViewportChange = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      
      timeoutId = window.setTimeout(() => {
        const newMobileState = checkIfMobile();
        console.log('📱 Mobile state changing from', isMobile, 'to', newMobileState);
        setIsMobile(newMobileState);
      }, 150);
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
  }, [checkIfMobile]);

  return isMobile;
}
