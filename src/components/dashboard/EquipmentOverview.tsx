import { Card } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusOptions = [
  "Operational",
  "Under Maintenance",
  "Out of Service",
  "Needs Attention",
];

const EquipmentOverview = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const handleStatusChange = async (equipmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('equipment')
        .update({ status: newStatus })
        .eq('id', equipmentId);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['equipment'] });
      
      toast({
        title: "Status Updated",
        description: "Equipment status has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update equipment status.",
      });
    }
  };

  return (
    <Card className="p-6 glass">
      <h2 className="text-lg font-semibold mb-4">Equipment Overview</h2>
      <div className="space-y-4">
        {equipmentLoading ? (
          <p>Loading equipment data...</p>
        ) : equipmentData && equipmentData.length > 0 ? (
          equipmentData.slice(0, 3).map((equipment) => (
            <div key={equipment.id} className="p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="font-medium">{equipment.name}</p>
                  <p className="text-sm text-muted-foreground">{equipment.location}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center px-3 py-1 text-xs font-medium rounded-full bg-accent hover:bg-accent/80 transition-colors">
                    {equipment.status}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {statusOptions.map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => handleStatusChange(equipment.id, status)}
                        className="cursor-pointer"
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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