
import { useState, useEffect, useCallback } from "react"

const MOBILE_BREAKPOINT = 1024 // Reduced from 1200px to be less aggressive

export function useIsMobile() {
  // Default to false to prevent unnecessary mobile exclusions
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const checkIfMobile = useCallback(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return false;
    
    // Check multiple conditions to better detect mobile devices
    const viewportWidth = window.innerWidth;
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    // UserAgent based detection - be more specific
    const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    // Width based detection (reduced breakpoint)
    const isMobileViewport = viewportWidth < MOBILE_BREAKPOINT;
    
    // Touch capability check
    const hasTouchCapability = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      (navigator as any).msMaxTouchPoints > 0;
    
    // Only consider it mobile if it's a small viewport AND has touch OR is clearly a mobile user agent
    const isMobileDevice = (isMobileViewport && hasTouchCapability) || 
                          (isMobileUserAgent && viewportWidth < 1200);
    
    // Debug logging
    console.log('📱 Mobile Detection:', {
      viewportWidth,
      isMobileUserAgent,
      isMobileViewport,
      hasTouchCapability,
      finalDecision: isMobileDevice
    });
    
    return isMobileDevice;
  }, []);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial value
    setIsMobile(checkIfMobile());
    
    // Handle resize with debouncing
    let timeoutId: number | undefined;
    
    const handleViewportChange = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      
      timeoutId = window.setTimeout(() => {
        setIsMobile(checkIfMobile());
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
