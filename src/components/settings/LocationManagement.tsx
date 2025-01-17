import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Location {
  id: string;
  name: string;
}

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

  const [newLocationId, setNewLocationId] = useState('');
  const [newLocationName, setNewLocationName] = useState('');
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [editLocationId, setEditLocationId] = useState('');
  const [editLocationName, setEditLocationName] = useState('');
  const { toast } = useToast();

  const handleAddLocation = () => {
    if (!newLocationId) {
      toast({
        title: "Error",
        description: "Please fill in the location ID",
        variant: "destructive",
      });
      return;
    }

    const newLocation = {
      id: newLocationId,
      name: newLocationName || newLocationId, // Use ID as name if name is not provided
    };

    setLocations([...locations, newLocation]);
    setNewLocationId('');
    setNewLocationName('');

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
            name: editLocationName || editLocationId // Use ID as name if name is not provided
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            placeholder="Location ID (e.g., 776A)"
            value={newLocationId}
            onChange={(e) => setNewLocationId(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Input
            placeholder="Location Name (optional)"
            value={newLocationName}
            onChange={(e) => setNewLocationName(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <Button
        onClick={handleAddLocation}
        className="w-full md:w-auto"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Location
      </Button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Current Locations</h3>
        <div className="grid gap-4">
          {locations.map((location, index) => (
            <div
              key={`${location.id}-${index}`}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{location.name}</p>
                <p className="text-sm text-gray-500">ID: {location.id}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(location)}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Location</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Input
                        placeholder="Location ID"
                        value={editLocationId}
                        onChange={(e) => setEditLocationId(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Location Name (optional)"
                        value={editLocationName}
                        onChange={(e) => setEditLocationName(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Button
                      onClick={handleSaveEdit}
                      className="w-full"
                    >
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationManagement;