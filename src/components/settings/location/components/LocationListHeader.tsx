
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
          onClick={onAddClick}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Location
        </Button>
      </DialogTrigger>
    </div>
  );
};
