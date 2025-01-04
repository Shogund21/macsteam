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
    model: string;
    serialNumber: string;
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
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="font-medium">{equipment.name}</h3>
          <p className="text-sm text-muted-foreground">{equipment.location}</p>
        </div>
        <StatusDropdown
          status={equipment.status}
          onStatusChange={handleStatusChange}
        />
      </div>
      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
        <p>Model: {equipment.model}</p>
        <p>Serial Number: {equipment.serialNumber}</p>
      </div>
    </div>
  );
};

export default EquipmentItem;