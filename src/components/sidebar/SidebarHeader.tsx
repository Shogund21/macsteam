
import { Building2, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/contexts/CompanyContext";
import { UserDropdown } from "./UserDropdown";
import { useSidebar } from "../ui/sidebar";
import { CompanySelector } from "../company/CompanySelector";

interface SidebarHeaderProps {
  isMobile: boolean;
}

export function SidebarHeader({ isMobile }: SidebarHeaderProps) {
  const { currentCompany } = useCompany();
  const { toggleSidebar } = useSidebar();
  
  return (
    <div className="flex h-[60px] items-center justify-between border-b px-4 bg-white">
      <Link to="/" className="flex items-center gap-2 font-semibold">
        <Building2 className="h-5 w-5 flex-shrink-0" />
        <span className="truncate max-w-[120px]">{currentCompany?.name || "Your Company"}</span>
      </Link>
      {isMobile ? (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar}
          className="focus:outline-none"
          aria-label="Toggle Menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
      ) : (
        <div className="flex items-center gap-2 z-[100]">
          <div className="relative z-[100]">
            <CompanySelector />
          </div>
          <div className="relative z-[100]">
            <UserDropdown />
          </div>
        </div>
      )}
    </div>
  );
}
