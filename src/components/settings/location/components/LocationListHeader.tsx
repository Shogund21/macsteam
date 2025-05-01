
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
        <p className="text-sm text-muted-foreground">
          {locationsCount} locations found
        </p>
      </div>
      
      <DialogTrigger asChild>
        <Button 
          onClick={onAddClick}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Location
        </Button>
      </DialogTrigger>
    </div>
  );
};
