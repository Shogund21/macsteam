
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { useCompany } from "@/contexts/CompanyContext";
import { UserDropdown } from "./UserDropdown";

interface SidebarHeaderProps {
  isMobile: boolean;
}

export function SidebarHeader({ isMobile }: SidebarHeaderProps) {
  const { currentCompany } = useCompany();
  
  return (
    <div className="flex h-[60px] items-center justify-between border-b px-4">
      <Link to="/" className="flex items-center gap-2 font-semibold">
        <Building2 className="h-5 w-5 flex-shrink-0" />
        <span className="truncate max-w-[120px]">{currentCompany?.name || "Your Company"}</span>
      </Link>
      {isMobile ? (
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm">
            Menu
          </Button>
        </SheetTrigger>
      ) : (
        <UserDropdown />
      )}
    </div>
  );
}
