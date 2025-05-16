
import {
  ActivityIcon,
  BarChart3,
  LayoutDashboard,
  ListChecks,
  ListTree,
  Settings,
  Building2,
  Filter as FilterIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCompany } from "@/contexts/CompanyContext";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export default function Sidebar({ children, className, ...props }: SidebarProps) {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const { currentCompany } = useCompany();

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
        <div className="flex h-[60px] items-center justify-between border-b px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Building2 className="h-6 w-6" />
            <span className="truncate">{currentCompany?.name || "Your Company"}</span>
          </Link>
          {isMobile ? (
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                Menu
              </Button>
            </SheetTrigger>
          ) : null}
        </div>
        <SheetContent side="left" className="p-0">
          <div className="flex h-[60px] items-center justify-between border-b px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Building2 className="h-6 w-6" />
              <span className="truncate">{currentCompany?.name || "Your Company"}</span>
            </Link>
            {isMobile ? (
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  Menu
                </Button>
              </SheetTrigger>
            ) : null}
          </div>

          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <div className="space-y-1">
                <Button
                  variant={pathname === "/" ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/" onClick={closeMenuOnMobile}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Management
              </h2>
              <div className="space-y-1">
                <Button
                  variant={pathname === "/equipment" ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/equipment" onClick={closeMenuOnMobile}>
                    <ListTree className="mr-2 h-4 w-4" />
                    Equipment
                  </Link>
                </Button>
                <Button
                  variant={pathname === "/projects" ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/projects" onClick={closeMenuOnMobile}>
                    <ListChecks className="mr-2 h-4 w-4" />
                    Projects
                  </Link>
                </Button>
                <Button
                  variant={pathname === "/maintenance-checks" ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/maintenance-checks" onClick={closeMenuOnMobile}>
                    <ActivityIcon className="mr-2 h-4 w-4" />
                    Maintenance Checks
                  </Link>
                </Button>
                <Button
                  variant={pathname === "/filter-changes" ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/filter-changes" onClick={closeMenuOnMobile}>
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Filter Changes
                  </Link>
                </Button>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Analytics
              </h2>
              <div className="space-y-1">
                <Button
                  variant={pathname === "/analytics" ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/analytics" onClick={closeMenuOnMobile}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
              </div>
            </div>
            <Separator />
            <div className="px-3 py-2">
              <Button
                variant={pathname === "/settings" ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link to="/settings" onClick={closeMenuOnMobile}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex h-[60px] items-center justify-between border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Building2 className="h-6 w-6" />
          <span className="truncate">{currentCompany?.name || "Your Company"}</span>
        </Link>
        {isMobile ? (
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </SheetTrigger>
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>
              <Link to="/settings">
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/print">
                Print View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link to="/" onClick={closeMenuOnMobile}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Management
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/equipment" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link to="/equipment" onClick={closeMenuOnMobile}>
                <ListTree className="mr-2 h-4 w-4" />
                Equipment
              </Link>
            </Button>
            <Button
              variant={pathname === "/projects" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link to="/projects" onClick={closeMenuOnMobile}>
                <ListChecks className="mr-2 h-4 w-4" />
                Projects
              </Link>
            </Button>
            <Button
              variant={pathname === "/maintenance-checks" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link to="/maintenance-checks" onClick={closeMenuOnMobile}>
                <ActivityIcon className="mr-2 h-4 w-4" />
                Maintenance Checks
              </Link>
            </Button>
            <Button
              variant={pathname === "/filter-changes" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link to="/filter-changes" onClick={closeMenuOnMobile}>
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter Changes
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Analytics
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/analytics" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link to="/analytics" onClick={closeMenuOnMobile}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </Button>
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <Button
            variant={pathname === "/settings" ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start"
            asChild
          >
            <Link to="/settings" onClick={closeMenuOnMobile}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
