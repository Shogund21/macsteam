import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Location } from "./types";

interface LocationItemProps {
  location: Location;
  onEditClick: (location: Location) => void;
}

const LocationItem = ({ location, onEditClick }: LocationItemProps) => {
  return (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
      <div>
        <p className="font-medium">{location.name}</p>
        <p className="text-sm text-gray-500">ID: {location.id}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEditClick(location)}
      >
        <Pencil className="w-4 h-4 mr-2" />
        Edit
      </Button>
    </div>
  );
};

export default LocationItem;