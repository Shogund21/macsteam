
import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 640

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const checkIfMobile = () => {
      const viewportWidth = window.innerWidth;
      return viewportWidth <= MOBILE_BREAKPOINT;
    };
    
    // Set initial value
    setIsMobile(checkIfMobile());
    
    // Simplified resize handler with longer debounce
    let timeoutId: number | undefined;
    
    const handleResize = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      
      timeoutId = window.setTimeout(() => {
        const newMobileState = checkIfMobile();
        setIsMobile(newMobileState);
      }, 500); // Longer debounce to reduce re-renders
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return isMobile;
}
