import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";

export interface DocumentFilters {
  keyword: string;
  category?: string;
  startDate?: Date;
  endDate?: Date;
}

interface DocumentSearchProps {
  onSearch: (filters: DocumentFilters) => void;
}

export const DocumentSearch = ({ onSearch }: DocumentSearchProps) => {
  const [filters, setFilters] = useState<DocumentFilters>({
    keyword: "",
  });

  const handleFilterChange = (key: keyof DocumentFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const categories = [
    { id: "maintenance", name: "Maintenance" },
    { id: "inspection", name: "Inspection" },
    { id: "repair", name: "Repair" },
    { id: "installation", name: "Installation" },
    { id: "other", name: "Other" }
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Input
            placeholder="Search documents..."
            value={filters.keyword}
            onChange={(e) => handleFilterChange("keyword", e.target.value)}
            className="w-full"
          />
        </div>
        
        <Select
          value={filters.category || undefined}
          onValueChange={(value) => handleFilterChange("category", value)}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div>
          <DatePicker
            selected={filters.startDate}
            onChange={(date) => handleFilterChange("startDate", date)}
            placeholderText="Start Date"
            className="w-full"
          />
        </div>

        <div>
          <DatePicker
            selected={filters.endDate}
            onChange={(date) => handleFilterChange("endDate", date)}
            placeholderText="End Date"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};