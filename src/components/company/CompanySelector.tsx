
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

  const handleValueChange = (value: string) => {
    const selected = companies.find(c => c.id === value);
    if (selected) {
      setCurrentCompany(selected);
    }
    if (isMobile) {
      // Close after selecting on mobile
      setTimeout(() => setOpen(false), 100);
    }
  };

  // Calculate max width based on available space
  const maxWidth = isMobile ? "150px" : "180px";

  return (
    <div className="flex items-center">
      <Building2 className="h-4 w-4 text-muted-foreground mr-2" />
      <Select
        value={currentCompany?.id || ""}
        onValueChange={handleValueChange}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger 
          className={`h-8 bg-white border border-gray-200 rounded-md px-3`}
          style={{ maxWidth }}
        >
          <SelectValue placeholder="Select company" className="truncate max-w-full" />
        </SelectTrigger>
        <SelectContent 
          className="bg-white border border-gray-200 shadow-md"
          position={isMobile ? "popper" : "item-aligned"}
          sideOffset={isMobile ? 5 : 4}
          align={isMobile ? "center" : "start"}
          avoidCollisions={false}
        >
          {companies.map((company) => (
            <SelectItem 
              key={company.id} 
              value={company.id}
              className="cursor-pointer hover:bg-gray-100"
            >
              <span className="truncate block">{company.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
