
import { useState, useEffect, useCallback } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Default to true for mobile-first approach to avoid blank screens on phones
  const [isMobile, setIsMobile] = useState<boolean>(true);
  
  const checkIfMobile = useCallback(() => {
    // Check multiple conditions to better detect mobile devices
    const viewportWidth = window.innerWidth;
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    // UserAgent based detection as fallback
    const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent);
    
    // Width based detection (primary)
    const isMobileViewport = viewportWidth < MOBILE_BREAKPOINT;
    
    // Combine all checks - if ANY is true, treat as mobile
    return isMobileViewport || isMobileUserAgent;
  }, []);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial value - check right away
    setIsMobile(checkIfMobile());
    
    // Better resize handling with throttling
    let timeoutId: number | undefined;
    let lastCheck = Date.now();
    
    const handleResize = () => {
      // Throttle checks to max once per 100ms
      const now = Date.now();
      if (now - lastCheck < 100) {
        if (timeoutId) window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          setIsMobile(checkIfMobile());
          lastCheck = Date.now();
        }, 100);
        return;
      }
      
      setIsMobile(checkIfMobile());
      lastCheck = now;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Recheck after a short delay to catch any post-render issues
    setTimeout(() => {
      setIsMobile(checkIfMobile());
    }, 200);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [checkIfMobile]);

  return isMobile;
}
