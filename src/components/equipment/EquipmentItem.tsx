import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import StatusDropdown from "./StatusDropdown";
import { useQueryClient } from "@tanstack/react-query";

interface EquipmentItemProps {
  equipment: {
    id: string;
    name: string;
    location: string;
    status: string;
  };
}

const EquipmentItem = ({ equipment }: EquipmentItemProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleStatusChange = async (newStatus: string) => {
    try {
      const { error } = await supabase
        .from('equipment')
        .update({ status: newStatus })
        .eq('id', equipment.id);

      if (error) throw error;

      // Invalidate and refetch equipment data
      queryClient.invalidateQueries({ queryKey: ['equipment'] });

      toast({
        title: "Status updated",
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

  return (
    <div className="p-4 rounded-lg border border-border bg-background">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="font-medium">{equipment.name}</p>
          <p className="text-sm text-muted-foreground">{equipment.location}</p>
        </div>
        <StatusDropdown
          status={equipment.status}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default EquipmentItem;