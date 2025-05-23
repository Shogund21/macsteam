
import * as React from "react"
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE, SIDEBAR_WIDTH_ICON } from "./sidebar-constants" 
import { SidebarProvider, useSidebar } from "./sidebar-context"
import { Sidebar } from "./sidebar"
import { SidebarRail } from "./sidebar-rail"
import { SidebarTrigger } from "./sidebar-trigger"
import { SidebarInset } from "./sidebar-inset"
import { 
  SidebarInput, 
  SidebarHeader, 
  SidebarFooter, 
  SidebarSeparator, 
  SidebarContent 
} from "./content-sections"
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupAction, 
  SidebarGroupContent 
} from "./sidebar-group"
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton
} from "./sidebar-menu"
import { 
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton 
} from "./sidebar-submenu"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Wrap SidebarProvider to maintain the original API
const WrappedSidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SidebarProvider>
>(({ className, style, children, ...props }, ref) => {
  return (
    <SidebarProvider {...props} ref={ref}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
            className
          )}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarProvider>
  );
});
WrappedSidebarProvider.displayName = "SidebarProvider";

// Export all components with their original names
export {
  WrappedSidebarProvider as SidebarProvider,
  Sidebar,
  SidebarRail,
  SidebarTrigger,
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
}
