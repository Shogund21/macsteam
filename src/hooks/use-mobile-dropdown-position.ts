
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
    
    // Also force update any existing dropdown content
    const forceDropdownPosition = () => {
      // Calculate available width here too for this function's scope
      const viewportWidth = window.innerWidth;
      const leftMargin = 16;
      const rightMargin = 16;
      const availableWidth = viewportWidth - leftMargin - rightMargin;
      
      setTimeout(() => {
        // Target all possible Radix dropdown selectors
        const selectors = [
          '[data-radix-select-content]',
          '[data-radix-dropdown-menu-content]',
          '[data-radix-popper-content-wrapper]',
          '[data-state="open"][role="listbox"]',
          '[data-state="open"][role="menu"]'
        ];

        selectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((element: Element) => {
            const htmlElement = element as HTMLElement;
            if (htmlElement && htmlElement.style) {
              // Force positioning with high specificity
              htmlElement.style.setProperty('position', 'fixed', 'important');
              htmlElement.style.setProperty('left', '16px', 'important');
              htmlElement.style.setProperty('right', '16px', 'important');
              htmlElement.style.setProperty('width', `${availableWidth}px`, 'important');
              htmlElement.style.setProperty('max-width', `${availableWidth}px`, 'important');
              htmlElement.style.setProperty('min-width', 'auto', 'important');
              htmlElement.style.setProperty('transform', 'none', 'important');
              htmlElement.style.setProperty('z-index', '9999', 'important');
              htmlElement.style.setProperty('background-color', 'white', 'important');
              htmlElement.style.setProperty('border', '1px solid rgba(0,0,0,0.1)', 'important');
            }
          });
        });
      }, 50);
    };

    // Apply positioning on various events
    const resizeObserver = new ResizeObserver(calculatePosition);
    resizeObserver.observe(triggerRef.current);
    
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('orientationchange', calculatePosition);
    
    // Monitor for dropdown opening
    const observer = new MutationObserver(forceDropdownPosition);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true, 
      attributeFilter: ['data-state'] 
    });

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('orientationchange', calculatePosition);
    };
  }, [isMobile]);

  return { triggerRef, position, isMobile };
}
