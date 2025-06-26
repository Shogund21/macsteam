
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { EquipmentList } from "@/components/equipment/EquipmentList";
import { EquipmentAuth } from "@/components/equipment/EquipmentAuth";
import { useEquipmentStatus } from "@/hooks/equipment/useEquipmentStatus";
import type { Equipment } from "@/types/equipment";

const Equipment = () => {
  const navigate = useNavigate();
  const { handleStatusChange, handleDelete } = useEquipmentStatus();

  const { data: equipmentData, isLoading } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('name', { ascending: true }); // Sort by name (equipment type) alphabetically
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data;
    },
  });

  // Map database fields to Equipment interface
  const equipment: Equipment[] = equipmentData?.map(item => ({
    id: item.id,
    name: item.name,
    model: item.model || '',
    serialNumber: item.serial_number || '', // Map snake_case to camelCase
    location: item.location,
    lastMaintenance: item.lastMaintenance,
    nextMaintenance: item.nextMaintenance,
    status: item.status || ''
  })) || [];

  return (
    <Layout>
      <EquipmentAuth>
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
              className="w-full md:w-auto bg-blue-800 hover:bg-blue-900 text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Equipment
            </Button>
          </div>

          {isLoading ? (
            <p className="text-center py-4">Loading equipment...</p>
          ) : (
            <EquipmentList 
              equipment={equipment}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}
        </div>
      </EquipmentAuth>
    </Layout>
  );
};

export default Equipment;
