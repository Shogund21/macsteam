
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";

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
      
      <DialogTrigger asChild>
        <Button 
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={onAddClick}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Location
        </Button>
      </DialogTrigger>
    </div>
  );
};
