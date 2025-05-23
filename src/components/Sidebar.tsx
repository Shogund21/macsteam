
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetOverlay } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNav } from "./sidebar/SidebarNav";
import { useSidebar } from "./ui/sidebar";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export default function Sidebar({ children, className, ...props }: SidebarProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const { open: isOpen, setOpen } = useSidebar();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle opening/closing sidebar when device type changes
  useEffect(() => {
    if (!isMobile) {
      setOpen(true); // Always show sidebar on desktop
    }
    // Don't automatically close on mobile to avoid conditional rendering issues
  }, [isMobile, setOpen]);

  // Don't attempt to render before mounting to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const closeMenuOnMobile = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  // For desktop: standard sidebar in page layout with fixed width and position
  if (!isMobile) {
    return (
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-48 border-r border-gray-200 bg-white transition-all",
          !isOpen ? "-translate-x-full" : "translate-x-0",
          className
        )}
        {...props}
      >
        <SidebarHeader isMobile={isMobile} />
        <SidebarNav closeMenuOnMobile={closeMenuOnMobile} />
      </aside>
    );
  }
  
  // For mobile: enhanced sheet component for slide-out effect with improved touch handling
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetOverlay className="z-40" />
      <SheetContent 
        side="left" 
        className="p-0 w-80 max-w-[85%] overflow-y-auto h-full z-50 bg-white border-r touch-manipulation"
        onInteractOutside={(e) => {
          // Prevent closing when clicking the trigger button
          if (e.target && (e.target as HTMLElement).closest('[data-sidebar="trigger"]')) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        style={{
          touchAction: "pan-y", // Enable vertical scrolling
          WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
          paddingBottom: "env(safe-area-inset-bottom)" // iOS safe area
        }}
      >
        <SidebarHeader isMobile={isMobile} />
        <div className="space-y-4 py-4 overflow-y-auto">
          <SidebarNav closeMenuOnMobile={closeMenuOnMobile} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
