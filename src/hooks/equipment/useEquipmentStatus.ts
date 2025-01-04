import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const useEquipmentStatus = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateStatus = async (equipmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('equipment')
        .update({ status: newStatus })
        .eq('id', equipmentId);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['equipment'] });
      
      toast({
        title: "Status Updated",
        description: `Equipment status has been updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update equipment status. Please try again.",
      });
    }
  };

  return { updateStatus };
};