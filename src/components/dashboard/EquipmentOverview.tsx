import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const EquipmentOverview = () => {
  const { data: equipmentData, isLoading: equipmentLoading } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data;
    },
  });

  return (
    <Card className="p-6 glass">
      <h2 className="text-lg font-semibold mb-4">Equipment Overview</h2>
      <div className="space-y-4">
        {equipmentLoading ? (
          <p>Loading equipment data...</p>
        ) : equipmentData && equipmentData.length > 0 ? (
          equipmentData.slice(0, 3).map((equipment) => (
            <div key={equipment.id} className="p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{equipment.name}</p>
                  <p className="text-sm text-muted-foreground">{equipment.location}</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent">
                  {equipment.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No equipment data available</p>
        )}
      </div>
    </Card>
  );
};

export default EquipmentOverview;