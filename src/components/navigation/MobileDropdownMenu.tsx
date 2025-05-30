
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, Wrench, Building2, ClipboardList, BarChart4, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, right: 'auto' });
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

  const calculateMenuPosition = () => {
    if (!buttonRef.current) return;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Menu dimensions
    const menuWidth = viewportWidth < 640 ? Math.min(280, viewportWidth * 0.9) : 240;
    const estimatedMenuHeight = 300; // Approximate height
    
    // Calculate horizontal position
    let left = buttonRect.left + buttonRect.width / 2 - menuWidth / 2; // Center under button
    const rightEdge = left + menuWidth;
    const leftEdge = left;
    
    // Adjust if menu would overflow viewport
    if (rightEdge > viewportWidth - 16) {
      left = viewportWidth - menuWidth - 16; // 16px margin from right edge
    }
    if (leftEdge < 16) {
      left = 16; // 16px margin from left edge
    }
    
    // Calculate vertical position
    let top = buttonRect.bottom + 8; // 8px gap below button
    
    // Check if menu would overflow bottom of viewport
    if (top + estimatedMenuHeight > viewportHeight - 16) {
      top = buttonRect.top - estimatedMenuHeight - 8; // Position above button
      // If still overflows, position at top with some margin
      if (top < 16) {
        top = 16;
      }
    }
    
    setMenuPosition({ top, left, right: 'auto' });
  };

  const toggleMenu = () => {
    if (!isOpen) {
      calculateMenuPosition();
    }
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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculateMenuPosition();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      };
    }
  }, [isOpen]);

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
            className={cn(
              "fixed z-[9999] animate-scale-in",
              "w-[90vw] max-w-[280px] sm:w-60", // Responsive width
              "max-h-[60vh] overflow-y-auto", // Scrollable content
              "rounded-lg bg-white shadow-lg border border-gray-100"
            )}
            style={{ 
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              transformOrigin: 'top center'
            }}
          >
            <div className="p-2 flex flex-col gap-1">
              <Button
                variant="ghost"
                className="flex items-center justify-start px-3 py-2 text-left w-full min-h-[40px]"
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
                    "flex items-center gap-2 px-3 py-2 text-sm rounded-md w-full min-h-[40px]",
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
