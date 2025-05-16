
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNav } from "./sidebar/SidebarNav";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export default function Sidebar({ children, className, ...props }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const closeMenuOnMobile = () => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-56 border-r border-gray-200 bg-white transition-transform",
        isCollapsed ? "-translate-x-full" : "",
        className
      )}
      {...props}
    >
      <Sheet open={isCollapsed} onOpenChange={setIsCollapsed}>
        {/* Static sidebar header */}
        <SidebarHeader isMobile={isMobile} />

        {/* Sheet content (mobile view) */}
        <SheetContent side="left" className="p-0">
          <SidebarHeader isMobile={isMobile} />
          
          <div className="space-y-4 py-4">
            <SidebarNav closeMenuOnMobile={closeMenuOnMobile} />
          </div>
        </SheetContent>
        
        {/* Regular sidebar content (desktop view) */}
        <SidebarNav closeMenuOnMobile={closeMenuOnMobile} />
      </Sheet>
    </aside>
  );
}
