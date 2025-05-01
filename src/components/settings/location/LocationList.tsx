
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LocationForm } from "./LocationForm";
import { LocationTable } from "./LocationTable";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const LocationList = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editLocation, setEditLocation] = useState<any>(null);

  const { data: locations, refetch, isLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      console.log('Fetching locations...');
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .order("name");
      
      if (error) {
        console.error("Error fetching locations:", error);
        throw error;
      }
      
      console.log('Fetched locations:', data);
      return data || [];
    },
    refetchOnWindowFocus: false,
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("locations").delete().eq("id", id);
      if (error) {
        console.error("Delete error:", error);
        throw error;
      }
      toast({ title: "Success", description: "Location deleted successfully" });
      await refetch(); // Force refetch after deletion
    } catch (error) {
      console.error("Error deleting location:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete location. Please try again.",
      });
    }
  };

  const handleEdit = (location: any) => {
    console.log("Editing location:", location);
    setEditLocation(location);
    setIsDialogOpen(true);
  };

  const handleSuccess = async () => {
    console.log("Success callback triggered, refetching data");
    try {
      // Force a complete refetch to get fresh data from the database
      await refetch();
      setIsDialogOpen(false);
      setEditLocation(null);
    } catch (error) {
      console.error("Error refetching data after success:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh data. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">All Locations</h3>
          <p className="text-sm text-gray-500">
            {locations?.length || 0} locations found
          </p>
        </div>
        
        <Dialog 
          open={isDialogOpen} 
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditLocation(null);
              // Always force a refetch when dialog is closed
              console.log("Dialog closed - forcing data refetch");
              refetch();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                setEditLocation(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editLocation ? "Edit Location" : "Add New Location"}
              </DialogTitle>
              <DialogDescription>
                {editLocation 
                  ? "Update the location information below." 
                  : "Enter the details for the new location."}
              </DialogDescription>
            </DialogHeader>
            <LocationForm 
              initialData={editLocation} 
              onSuccess={handleSuccess} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      ) : (
        <LocationTable
          locations={locations || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};
