
import React, { useState } from "react";
import { useCompany } from "@/contexts/CompanyContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Building2 } from "lucide-react";

export const CompanySelector = () => {
  const { currentCompany, companies, setCurrentCompany } = useCompany();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (companies.length <= 1) {
    return null; // Don't render the selector if there's only one or no company
  }

  return (
    <div className="flex items-center space-x-2">
      <Building2 className="h-4 w-4 text-muted-foreground" />
      <Select
        value={currentCompany?.id || ""}
        onValueChange={(value) => {
          const selected = companies.find(c => c.id === value);
          if (selected) {
            setCurrentCompany(selected);
          }
          if (isMobile) {
            setOpen(false);
          }
        }}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger className="w-[180px] h-8">
          <SelectValue placeholder="Select company" />
        </SelectTrigger>
        <SelectContent 
          className={`select-content ${isMobile ? 'mobile-select-content' : ''}`}
          position={isMobile ? "popper" : "item-aligned"}
          sideOffset={isMobile ? 15 : 4}
        >
          {companies.map((company) => (
            <SelectItem 
              key={company.id} 
              value={company.id}
              className="select-item"
            >
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
