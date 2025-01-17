import { Location } from "./types";
import LocationItem from "./LocationItem";

interface LocationListProps {
  locations: Location[];
  onEditClick: (location: Location) => void;
}

const LocationList = ({ locations, onEditClick }: LocationListProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Current Locations</h3>
      <div className="grid gap-4">
        {locations.map((location, index) => (
          <LocationItem
            key={`${location.id}-${index}`}
            location={location}
            onEditClick={onEditClick}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationList;