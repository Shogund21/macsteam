
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, Wrench, Building2, ClipboardList, BarChart4, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
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
              "absolute top-full right-0 mt-2",
              "w-56 sm:w-48 md:w-56", // Responsive width
              "max-h-[70vh] overflow-y-auto", // Max height with scroll
              "rounded-lg bg-white shadow-lg border border-gray-100",
              "z-[9999] animate-scale-in"
            )}
            style={{ transformOrigin: 'top right' }}
          >
            <div className="p-2 flex flex-col gap-1 max-h-full overflow-y-auto">
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
