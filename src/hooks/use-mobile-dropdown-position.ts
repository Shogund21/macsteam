
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from './use-mobile';

export function useMobileDropdownPosition() {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState<{ left: number; right: number; width: number } | null>(null);
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMobile || !triggerRef.current) {
      setPosition(null);
      return;
    }

    const calculatePosition = () => {
      if (!triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Calculate safe bounds with 16px margins
      const leftMargin = 16;
      const rightMargin = 16;
      const availableWidth = viewportWidth - leftMargin - rightMargin;
      
      setPosition({
        left: leftMargin,
        right: rightMargin,
        width: availableWidth
      });
    };

    calculatePosition();
    
    const resizeObserver = new ResizeObserver(calculatePosition);
    resizeObserver.observe(triggerRef.current);
    
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('orientationchange', calculatePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('orientationchange', calculatePosition);
    };
  }, [isMobile]);

  return { triggerRef, position, isMobile };
}
