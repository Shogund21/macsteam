
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMaintenanceData = () => {
  // Fetch equipment data
  const { data: equipment = [], isLoading: isLoadingEquipment, error: equipmentError } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      console.log('Starting equipment fetch...');
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      
      console.log('Equipment fetched:', data?.length, 'items');
      return data || [];
    },
  });

  // Fetch technicians data
  const { data: technicians = [], isLoading: isLoadingTechnicians, error: techniciansError } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      console.log('Starting technicians fetch...');
      const { data, error } = await supabase
        .from('technicians')
        .select('*')
        .eq('isAvailable', true)
        .order('firstName');
      
      if (error) {
        console.error('Error fetching technicians:', error);
        throw error;
      }
      
      console.log('Technicians fetched:', data?.length, 'items');
      return data || [];
    },
  });

  return {
    equipment,
    technicians,
    isLoading: isLoadingEquipment || isLoadingTechnicians,
    error: equipmentError || techniciansError
  };
};
