
import { useEffect, useRef } from 'react';
import { useIsMobile } from './use-mobile';

export function useMobileDropdownPosition() {
  const isMobile = useIsMobile();
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMobile) return;

    // Simple approach: just ensure dropdowns are properly constrained via CSS
    // The heavy lifting is now done by the CSS with !important declarations
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
            // Only add the mobile-constrained class, let CSS handle the rest
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

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  return { triggerRef, isMobile };
}
