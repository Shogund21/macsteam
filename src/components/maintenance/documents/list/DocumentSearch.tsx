import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DocumentSearchProps {
  onCategoryChange: (category: string) => void;
}

const DocumentSearch = ({ onCategoryChange }: DocumentSearchProps) => {
  const categories = [
    { id: "maintenance", name: "Maintenance" },
    { id: "inspection", name: "Inspection" },
    { id: "repair", name: "Repair" },
    { id: "installation", name: "Installation" },
    { id: "other", name: "Other" }
  ];

  return (
    <div className="flex items-center space-x-4 mb-4">
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[200px] bg-white">
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
    </div>
  );
};

export default DocumentSearch;