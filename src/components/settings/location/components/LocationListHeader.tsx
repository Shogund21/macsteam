
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface LocationListHeaderProps {
  locationsCount: number;
  onAddClick: () => void;
}

export const LocationListHeader = ({ 
  locationsCount, 
  onAddClick
}: LocationListHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-medium">All Locations</h3>
        <p className="text-sm text-gray-500">
          {locationsCount} locations found
        </p>
      </div>
      
      <Button 
        onClick={onAddClick}
        variant="default"
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Location
      </Button>
    </div>
  );
};
