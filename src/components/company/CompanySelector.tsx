
import React from "react";
import { useCompany } from "@/contexts/CompanyContext";
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
        }}
      >
        <SelectTrigger className="w-[180px] h-8">
          <SelectValue placeholder="Select company" />
        </SelectTrigger>
        <SelectContent>
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
