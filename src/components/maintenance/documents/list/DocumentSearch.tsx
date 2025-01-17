import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";

interface DocumentSearchProps {
  onSearch: (filters: DocumentFilters) => void;
}

export interface DocumentFilters {
  keyword: string;
  category?: string;
  startDate?: Date;
  endDate?: Date;
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
          value={filters.category}
          onValueChange={(value) => handleFilterChange("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            <SelectItem value="manuals">Manuals</SelectItem>
            <SelectItem value="service_records">Service Records</SelectItem>
            <SelectItem value="invoices">Invoices</SelectItem>
            <SelectItem value="inspection_reports">Inspection Reports</SelectItem>
            <SelectItem value="compliance">Compliance Documents</SelectItem>
            <SelectItem value="warranties">Warranties</SelectItem>
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