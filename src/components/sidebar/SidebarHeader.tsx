
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/contexts/CompanyContext";
import { UserDropdown } from "./UserDropdown";
import { useState } from "react";

interface SidebarHeaderProps {
  isMobile: boolean;
}

export function SidebarHeader({ isMobile }: SidebarHeaderProps) {
  const { currentCompany } = useCompany();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="flex h-[60px] items-center justify-between border-b px-4">
      <Link to="/" className="flex items-center gap-2 font-semibold">
        <Building2 className="h-5 w-5 flex-shrink-0" />
        <span className="truncate max-w-[120px]">{currentCompany?.name || "Your Company"}</span>
      </Link>
      {isMobile ? (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
        >
          Menu
        </Button>
      ) : (
        <UserDropdown />
      )}
    </div>
  );
}
