import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EquipmentItem } from "@/components/equipment/EquipmentItem";

const EquipmentOverview = () => {
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

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-blue-50/80 backdrop-blur-sm shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-[#1EAEDB]">Equipment Overview</h2>
      <div className="space-y-4">
        {equipmentLoading ? (
          <p>Loading equipment data...</p>
        ) : equipmentData && equipmentData.length > 0 ? (
          equipmentData.slice(0, 3).map((equipment) => (
            <EquipmentItem key={equipment.id} equipment={equipment} />
          ))
        ) : (
          <p>No equipment data available</p>
        )}
      </div>
    </Card>
  );
};

export default EquipmentOverview;