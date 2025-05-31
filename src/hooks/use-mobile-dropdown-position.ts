
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from './use-mobile';

interface MobilePosition {
  left: number;
  right: number;
  width: number;
}

export function useMobileDropdownPosition() {
  const isMobile = useIsMobile();
  const triggerRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<MobilePosition | null>(null);

  useEffect(() => {
    if (!isMobile) {
      setPosition(null);
      return;
    }

    const calculatePosition = () => {
      const availableWidth = window.innerWidth - 24; // 12px margin on each side
      const newPosition = {
        left: 12,
        right: 12,
        width: availableWidth
      };
      setPosition(newPosition);
    };

    // Calculate position immediately
    calculatePosition();

    // Simple approach: just ensure dropdowns are properly constrained via CSS
    const ensureDropdownConstraints = () => {
      const selectors = [
        '[data-radix-select-content]',
        '[data-radix-dropdown-menu-content]'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element: Element) => {
          const htmlElement = element as HTMLElement;
          if (htmlElement && htmlElement.style) {
            htmlElement.classList.add('mobile-dropdown-constrained');
          }
        });
      });
    };

    // Monitor for dropdown opening with a simple observer
    const observer = new MutationObserver(ensureDropdownConstraints);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true, 
      attributeFilter: ['data-state'] 
    });

    // Also run once on mount
    ensureDropdownConstraints();

    // Recalculate position on window resize
    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return { triggerRef, isMobile, position };
}
