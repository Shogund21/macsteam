import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { StatusDropdown } from "@/components/equipment/StatusDropdown";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Equipment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: equipment, isLoading } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data;
    },
  });

  const handleStatusChange = async (equipmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("equipment")
        .update({ status: newStatus })
        .eq("id", equipmentId);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      
      toast({
        title: "Success",
        description: `Equipment status has been updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update equipment status",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // First, delete all maintenance checks associated with this equipment
      const { error: maintenanceDeleteError } = await supabase
        .from('hvac_maintenance_checks')
        .delete()
        .eq('equipment_id', id);

      if (maintenanceDeleteError) {
        console.error('Error deleting maintenance checks:', maintenanceDeleteError);
        throw maintenanceDeleteError;
      }

      // Then delete the equipment
      const { error: equipmentDeleteError } = await supabase
        .from('equipment')
        .delete()
        .eq('id', id);

      if (equipmentDeleteError) throw equipmentDeleteError;

      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      
      toast({
        title: "Success",
        description: "Equipment and associated maintenance checks deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete equipment. Please try again.",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Equipment</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              View and manage all equipment
            </p>
          </div>
          <Button 
            onClick={() => navigate("/add-equipment")}
            className="w-full md:w-auto bg-[#1EAEDB] hover:bg-[#33C3F0] text-black"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Equipment
          </Button>
        </div>

        {isLoading ? (
          <p className="text-center py-4">Loading equipment...</p>
        ) : equipment && equipment.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {equipment.map((item) => (
              <Card key={item.id} className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold break-words">{item.name}</h3>
                    <div className="mt-2">
                      <StatusDropdown 
                        status={item.status} 
                        onStatusChange={(newStatus) => handleStatusChange(item.id, newStatus)}
                      />
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white max-w-[90vw] w-[400px] rounded-lg">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Equipment</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will delete the equipment and all associated maintenance checks. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(item.id)}
                          className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="space-y-2 text-sm mt-4">
                  <p><span className="font-medium">Model:</span> {item.model}</p>
                  <p><span className="font-medium">Serial Number:</span> {item.serialNumber}</p>
                  <p><span className="font-medium">Location:</span> {item.location}</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center py-4">No equipment found. Add some equipment to get started.</p>
        )}
      </div>
    </Layout>
  );
};

export default Equipment;