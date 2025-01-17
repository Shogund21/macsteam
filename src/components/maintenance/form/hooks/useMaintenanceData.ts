import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMaintenanceData = () => {
  const { data: equipment, error: equipmentError } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'active');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      console.log('Fetched equipment:', data);
      return data;
    },
  });

  const { data: technicians, error: techniciansError } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technicians')
        .select('*')
        .eq('isAvailable', true);
      
      if (error) {
        console.error('Error fetching technicians:', error);
        throw error;
      }
      console.log('Fetched technicians:', data);
      return data;
    },
  });

  return {
    equipment,
    technicians,
    error: equipmentError || techniciansError,
  };
};