
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"
import { useSidebar } from "./sidebar-context"

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  const handleInteraction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>) => {
    // Prevent default behavior
    event.preventDefault();
    event.stopPropagation();
    
    // Toggle the sidebar
    toggleSidebar();
    
    // Call the original onClick if provided
    if (onClick && event.type === 'click') {
      onClick(event as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    }
  };

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9 touch-manipulation", className)}
      onClick={handleInteraction}
      onTouchEnd={handleInteraction}
      onPointerDown={(e) => {
        // Prevent any pointer events from being captured by other elements
        e.stopPropagation();
      }}
      style={{
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        minHeight: "40px",
        minWidth: "40px",
        zIndex: 100
      }}
      aria-label="Toggle Sidebar"
      {...props}
    >
      <PanelLeft className="h-5 w-5" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});

SidebarTrigger.displayName = "SidebarTrigger"
