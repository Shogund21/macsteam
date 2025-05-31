
import { useState, useEffect, useCallback } from "react"

const MOBILE_BREAKPOINT = 1200 // Increased from 768px to capture larger mobile devices and tablets

export function useIsMobile() {
  // Default to true for mobile-first approach to avoid blank screens on phones
  const [isMobile, setIsMobile] = useState<boolean>(true);
  
  const checkIfMobile = useCallback(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return true;
    
    // Check multiple conditions to better detect mobile devices
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    // UserAgent based detection - enhanced patterns
    const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet|kindle|silk|playbook|bb10|windows phone|tizen|bada|meego|palm|symbian|series60|nokia|samsung|lg|htc|motorola|sony|asus|acer|lenovo|huawei|xiaomi|oppo|vivo|oneplus/i.test(userAgent);
    
    // Width based detection (increased breakpoint)
    const isMobileViewport = viewportWidth < MOBILE_BREAKPOINT;
    
    // Touch capability check
    const hasTouchCapability = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      (navigator as any).msMaxTouchPoints > 0;
    
    // Orientation detection (mobile devices typically support orientation changes)
    const hasOrientationCapability = 'orientation' in window || 'onorientationchange' in window;
    
    // Aspect ratio check (mobile devices typically have portrait or narrow landscape ratios)
    const aspectRatio = viewportWidth / viewportHeight;
    const isMobileAspectRatio = aspectRatio < 1.5; // Portrait or narrow landscape
    
    // Device pixel ratio check (many mobile devices have high DPI)
    const hasHighDPI = window.devicePixelRatio > 1;
    
    // Multiple detection methods with scoring
    let mobileScore = 0;
    
    if (isMobileViewport) mobileScore += 3; // High weight for viewport
    if (isMobileUserAgent) mobileScore += 2; // Medium weight for user agent
    if (hasTouchCapability) mobileScore += 2; // Medium weight for touch
    if (hasOrientationCapability) mobileScore += 1; // Low weight for orientation
    if (isMobileAspectRatio && hasTouchCapability) mobileScore += 1; // Bonus for mobile aspect + touch
    if (hasHighDPI && hasTouchCapability) mobileScore += 1; // Bonus for high DPI + touch
    
    // Check for manual override in localStorage
    const manualOverride = localStorage.getItem('force-mobile-mode');
    if (manualOverride === 'true') return true;
    if (manualOverride === 'false') return false;
    
    // Debug logging
    console.log('📱 Mobile Detection Debug:', {
      viewportWidth,
      viewportHeight,
      userAgent: userAgent.substring(0, 100),
      isMobileUserAgent,
      isMobileViewport,
      hasTouchCapability,
      hasOrientationCapability,
      aspectRatio,
      isMobileAspectRatio,
      hasHighDPI,
      mobileScore,
      devicePixelRatio: window.devicePixelRatio,
      maxTouchPoints: navigator.maxTouchPoints,
      finalDecision: mobileScore >= 3
    });
    
    // Return true if mobile score is 3 or higher
    return mobileScore >= 3;
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
