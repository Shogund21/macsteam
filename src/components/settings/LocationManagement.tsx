import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const handleAddLocation = () => {
    if (!newLocationId || !newLocationName) {
      toast({
        title: "Error",
        description: "Please fill in both location ID and name",
        variant: "destructive",
      });
      return;
    }

    const newLocation = {
      id: newLocationId,
      name: newLocationName,
    };

    setLocations([...locations, newLocation]);
    setNewLocationId('');
    setNewLocationName('');

    toast({
      title: "Success",
      description: "Location added successfully",
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
            placeholder="Location Name"
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
              className="p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <p className="font-medium">{location.name}</p>
              <p className="text-sm text-gray-500">ID: {location.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationManagement;