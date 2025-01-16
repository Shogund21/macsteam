import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PasswordProtectionModal from "@/components/equipment/PasswordProtectionModal";
import { useEffect, useState } from "react";
import { EquipmentList } from "@/components/equipment/EquipmentList";

const Equipment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const wasAuthenticated = sessionStorage.getItem("equipment-authenticated");
    if (wasAuthenticated === "true") {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
    }
  }, []);

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true);
    setShowPasswordModal(false);
    sessionStorage.setItem("equipment-authenticated", "true");
  };

  const { data: equipment, isLoading } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('location', { ascending: true })
        .order('name');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data;
    },
    enabled: isAuthenticated,
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
      const { error: maintenanceDeleteError } = await supabase
        .from('hvac_maintenance_checks')
        .delete()
        .eq('equipment_id', id);

      if (maintenanceDeleteError) {
        console.error('Error deleting maintenance checks:', maintenanceDeleteError);
        throw maintenanceDeleteError;
      }

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

  if (!isAuthenticated) {
    return (
      <Layout>
        <PasswordProtectionModal
          isOpen={showPasswordModal}
          onClose={() => navigate("/")}
          onSuccess={handlePasswordSuccess}
        />
      </Layout>
    );
  }

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
        ) : (
          <EquipmentList 
            equipment={equipment || []}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </div>
    </Layout>
  );
};

export default Equipment;