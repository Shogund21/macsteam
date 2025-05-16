
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
      ) : (
        <UserDropdown />
      )}
    </div>
  );
}
