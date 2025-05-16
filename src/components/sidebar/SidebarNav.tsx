
import { 
  ActivityIcon, 
  BarChart3, 
  LayoutDashboard, 
  ListChecks, 
  ListTree, 
  Settings,
  Filter as FilterIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SidebarNavProps {
  closeMenuOnMobile: () => void;
}

export function SidebarNav({ closeMenuOnMobile }: SidebarNavProps) {
  const { pathname } = useLocation();
  
  return (
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
  );
}
