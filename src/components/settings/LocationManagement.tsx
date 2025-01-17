import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import LocationForm from './location/LocationForm';
import LocationList from './location/LocationList';
import EditLocationDialog from './location/EditLocationDialog';
import { Location } from './location/types';

const LocationManagement = () => {
  const [locations, setLocations] = useState<Location[]>([
    { id: "776A", name: "776A - Main Building" },
    { id: "776B", name: "Ahu 1,2,6,7,8,9 2nd floor chiller mech room - 776B" },
    { id: "776B", name: "Ahu 13,14,15 3rd floor house keeping office - 776B" },
    { id: "776B", name: "Ahu 16,17,18 Location 3rd floor engineering shop/mech room - 776B" },
    { id: "776B", name: "Ahu 3,4,5,11,12 2nd floor luggage stock/mech room - 776B" },
    { id: "777", name: "777 - East Wing" },
    { id: "778", name: "AHU 1 - 778" },
    { id: "778", name: "AHU 2 - 778" },
    { id: "778", name: "AHU 3 - 778" },
    { id: "778", name: "AHU 4 - 778" },
    { id: "778", name: "AHU 5 - 778" },
    { id: "778", name: "AHU 6 - 778" },
  ]);

  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [editLocationId, setEditLocationId] = useState('');
  const [editLocationName, setEditLocationName] = useState('');
  const { toast } = useToast();

  const handleAddLocation = (id: string, name: string) => {
    const newLocation = {
      id,
      name: name || id, // Use ID as name if name is not provided
    };

    setLocations([...locations, newLocation]);
    toast({
      title: "Success",
      description: "Location added successfully",
    });
  };

  const handleEditClick = (location: Location) => {
    setEditingLocation(location);
    setEditLocationId(location.id);
    setEditLocationName(location.name);
  };

  const handleSaveEdit = () => {
    if (!editLocationId) {
      toast({
        title: "Error",
        description: "Location ID is required",
        variant: "destructive",
      });
      return;
    }

    const updatedLocations = locations.map(loc => 
      loc === editingLocation 
        ? { 
            id: editLocationId, 
            name: editLocationName || editLocationId
          }
        : loc
    );

    setLocations(updatedLocations);
    setEditingLocation(null);
    
    toast({
      title: "Success",
      description: "Location updated successfully",
    });
  };

  return (
    <div className="space-y-4">
      <LocationForm onAddLocation={handleAddLocation} />
      <LocationList 
        locations={locations}
        onEditClick={handleEditClick}
      />
      <EditLocationDialog
        isOpen={!!editingLocation}
        location={editingLocation}
        editLocationId={editLocationId}
        editLocationName={editLocationName}
        onClose={() => setEditingLocation(null)}
        onSave={handleSaveEdit}
        onIdChange={setEditLocationId}
        onNameChange={setEditLocationName}
      />
    </div>
  );
};

export default LocationManagement;