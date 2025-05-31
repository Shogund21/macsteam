
import { useState, useEffect, useCallback } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Default to true for mobile-first approach to avoid blank screens on phones
  const [isMobile, setIsMobile] = useState<boolean>(true);
  
  const checkIfMobile = useCallback(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return true;
    
    // Check multiple conditions to better detect mobile devices
    const viewportWidth = window.innerWidth;
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    // UserAgent based detection as fallback
    const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent);
    
    // Width based detection (primary)
    const isMobileViewport = viewportWidth < MOBILE_BREAKPOINT;
    
    // Touch capability check
    const hasTouchCapability = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      (navigator as any).msMaxTouchPoints > 0;
    
    // Prioritize viewport width for consistent behavior
    return isMobileViewport || (isMobileUserAgent && hasTouchCapability);
  }, []);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial value - check right away
    setIsMobile(checkIfMobile());
    
    // Handle both resize and orientation changes with debouncing
    let timeoutId: number | undefined;
    
    const handleViewportChange = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      
      timeoutId = window.setTimeout(() => {
        setIsMobile(checkIfMobile());
      }, 100);
    };
    
    window.addEventListener('resize', handleViewportChange, { passive: true });
    window.addEventListener('orientationchange', handleViewportChange, { passive: true });
    
    // Force recheck after a short delay to account for any layout shifts
    const recheckTimeout = setTimeout(() => {
      setIsMobile(checkIfMobile());
    }, 200);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      clearTimeout(recheckTimeout);
    };
  }, [checkIfMobile]);

  return isMobile;
}
