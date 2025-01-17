import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationFormProps {
  onAddLocation: (id: string, name: string) => void;
}

const LocationForm = ({ onAddLocation }: LocationFormProps) => {
  const [newLocationId, setNewLocationId] = useState('');
  const [newLocationName, setNewLocationName] = useState('');
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

    onAddLocation(newLocationId, newLocationName);
    setNewLocationId('');
    setNewLocationName('');
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
    </div>
  );
};

export default LocationForm;