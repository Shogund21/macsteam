
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EquipmentItem } from "@/components/equipment/EquipmentItem";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Equipment } from "@/types/equipment";

const EquipmentOverview = () => {
  const navigate = useNavigate();
  
  const { data: equipmentData, isLoading: equipmentLoading } = useQuery({
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
    <Card className="border-none shadow-lg bg-gradient-to-br from-white to-purple-50 animate-fade-in">
      <CardHeader className="bg-white pb-2">
        <CardTitle className="text-lg font-bold text-black">Equipment Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {equipmentLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse h-6 w-40 bg-gray-200 rounded"></div>
            </div>
          ) : equipment && equipment.length > 0 ? (
            <>
              {equipment.slice(0, 3).map((equipmentItem) => (
                <EquipmentItem key={equipmentItem.id} equipment={equipmentItem} />
              ))}
              <Button 
                onClick={() => navigate("/equipment")}
                variant="ghost" 
                className="w-full mt-4 text-[#1EAEDB] hover:text-[#33C3F0] hover:bg-blue-50"
              >
                View All Equipment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <p className="text-black text-center py-4">No equipment data available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentOverview;
