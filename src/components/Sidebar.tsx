
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
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
    } else {
      setOpen(false); // Hide sidebar by default on mobile
    }
  }, [isMobile, setOpen]);

  if (!mounted) {
    return null;
  }

  const closeMenuOnMobile = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Desktop sidebar */}
      {!isMobile && (
        <aside
          className={cn(
            "fixed left-0 top-0 z-40 h-screen w-52 border-r border-gray-200 bg-white transition-all md:translate-x-0",
            !isOpen ? "-translate-x-full" : "",
            className
          )}
          {...props}
        >
          <SidebarHeader isMobile={isMobile} />
          <SidebarNav closeMenuOnMobile={closeMenuOnMobile} />
        </aside>
      )}

      {/* Mobile sidebar with sheet */}
      {isMobile && (
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetContent side="left" className="p-0 w-64 max-w-[85%] overflow-y-auto">
            <SidebarHeader isMobile={isMobile} />
            <div className="space-y-4 py-4">
              <SidebarNav closeMenuOnMobile={closeMenuOnMobile} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
