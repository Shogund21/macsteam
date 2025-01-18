import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LocationForm } from "./LocationForm";
import { LocationTable } from "./LocationTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const LocationList = () => {
  const { toast } = useToast();
  const [editLocation, setEditLocation] = useState<any>(null);

  const { data: locations, refetch } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("locations").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Location deleted successfully" });
      refetch();
    } catch (error) {
      console.error("Error deleting location:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete location. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Location</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
          </DialogHeader>
          <LocationForm onSuccess={() => { refetch(); }} />
        </DialogContent>
      </Dialog>

      <LocationTable
        locations={locations || []}
        onEdit={setEditLocation}
        onDelete={handleDelete}
        onSuccess={() => {
          refetch();
          setEditLocation(null);
        }}
      />
    </div>
  );
};