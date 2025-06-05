import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMaintenanceData = () => {
  // Fetch equipment data with improved error handling
  const { data: equipment = [], isLoading: isLoadingEquipment, error: equipmentError } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      try {
        console.log('Starting equipment fetch...');
        const { data, error } = await supabase
          .from('equipment')
          .select('*')
          .order('name');
        
        if (error) {
          console.error('Error fetching equipment:', error);
          // Return empty array instead of throwing to prevent app crashes
          return [];
        }
        
        console.log('Equipment fetched:', data?.length, 'items');
        return data || [];
      } catch (error) {
        console.error('Equipment fetch exception:', error);
        // Return empty array on any error to keep UI functional
        return [];
      }
    },
    retry: 1,
    staleTime: 30000, // Cache for 30 seconds
    refetchOnWindowFocus: false,
  });

  // Fetch technicians data with improved error handling
  const { data: technicians = [], isLoading: isLoadingTechnicians, error: techniciansError } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      try {
        console.log('Starting technicians fetch...');
        const { data, error } = await supabase
          .from('technicians')
          .select('*')
          .eq('isAvailable', true)
          .order('firstName');
        
        if (error) {
          console.error('Error fetching technicians:', error);
          // Return empty array instead of throwing to prevent app crashes
          return [];
        }
        
        console.log('Technicians fetched:', data?.length, 'items');
        return data || [];
      } catch (error) {
        console.error('Technicians fetch exception:', error);
        // Return empty array on any error to keep UI functional
        return [];
      }
    },
    retry: 1,
    staleTime: 30000, // Cache for 30 seconds
    refetchOnWindowFocus: false,
  });

  return {
    equipment,
    technicians,
    isLoading: isLoadingEquipment || isLoadingTechnicians,
    error: equipmentError || techniciansError
  };
};
