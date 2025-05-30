
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, Wrench, Building2, ClipboardList, BarChart4, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ right: 0, left: 'auto' });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { toggleSidebar } = useSidebar();
  
  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Equipment", icon: Wrench, path: "/equipment" },
    { title: "Projects", icon: Building2, path: "/projects" },
    { title: "Maintenance", icon: ClipboardList, path: "/maintenance-checks" },
    { title: "Analytics", icon: BarChart4, path: "/analytics" },
    { title: "Settings", icon: Settings, path: "/settings" }
  ];

  // Calculate optimal menu position based on button location and viewport
  const calculateMenuPosition = () => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const menuWidth = 200; // Reduced from 224px (w-56) to 200px for mobile
    
    // Check if there's enough space on the right
    const spaceOnRight = viewportWidth - buttonRect.right;
    
    if (spaceOnRight >= menuWidth) {
      // Enough space on the right, align to the right edge of button
      setMenuPosition({ right: 0, left: 'auto' });
    } else {
      // Not enough space on the right, position from the left edge
      const leftPosition = Math.max(8, buttonRect.left - menuWidth + buttonRect.width);
      setMenuPosition({ 
        right: 'auto', 
        left: Math.min(leftPosition, viewportWidth - menuWidth - 8)
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      calculateMenuPosition();
      
      // Recalculate on window resize or orientation change
      const handleResize = () => calculateMenuPosition();
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      };
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };
  
  const handleSidebarToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSidebar();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button 
        ref={buttonRef}
        variant="ghost" 
        size="icon"
        onClick={toggleMenu}
        className="h-12 w-12 rounded-full bg-white/90 shadow-sm touch-manipulation"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-dropdown-menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-40 animate-fade-in"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={menuRef}
            id="mobile-dropdown-menu"
            className="fixed top-16 w-50 max-w-[200px] rounded-lg bg-white shadow-lg border border-gray-100 z-[9999] animate-scale-in overflow-y-auto max-h-[70vh]"
            style={{
              transformOrigin: 'top right',
              right: menuPosition.right !== 'auto' ? `${menuPosition.right}px` : 'auto',
              left: menuPosition.left !== 'auto' ? `${menuPosition.left}px` : 'auto',
            }}
          >
            <div className="p-2 flex flex-col gap-1">
              <Button
                variant="ghost"
                className="flex items-center justify-start px-3 py-2 text-left w-full"
                onClick={handleSidebarToggle}
              >
                <span className="text-sm">Full Navigation</span>
              </Button>
              
              <div className="h-px bg-gray-100 my-1" />
              
              {menuItems.map((item) => (
                <Link 
                  key={item.title} 
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm rounded-md w-full",
                    "hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  )}
                  onClick={handleItemClick}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
