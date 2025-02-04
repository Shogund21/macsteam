import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { matchesLocation } from "@/utils/locationMatching";

export const useEquipmentQuery = (locationId: string) => {
  return useQuery({
    queryKey: ['equipment', locationId],
    queryFn: async () => {
      if (!locationId) {
        console.log('No location ID provided');
        return [];
      }

      console.log('Fetching equipment for location:', locationId);

      // Get location data
      const { data: locationData, error: locationError } = await supabase
        .from('locations')
        .select('*')
        .eq('id', locationId)
        .maybeSingle();
      
      if (locationError) {
        console.error('Location fetch error:', locationError);
        throw locationError;
      }

      if (!locationData) {
        console.log('Location not found for ID:', locationId);
        return [];
      }

      console.log('Location data:', locationData);

      // Fetch all active equipment
      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'active')
        .order('name');
      
      if (equipmentError) {
        console.error('Equipment fetch error:', equipmentError);
        throw equipmentError;
      }

      console.log('All equipment:', equipment);

      // Filter equipment by location
      const filteredEquipment = equipment?.filter(eq => 
        matchesLocation(eq.location, locationData.store_number)
      );

      console.log('Filtered equipment:', {
        locationStoreNumber: locationData.store_number,
        totalEquipment: equipment?.length,
        filteredCount: filteredEquipment?.length,
        matches: filteredEquipment?.map(e => ({
          name: e.name,
          location: e.location
        }))
      });

      return filteredEquipment || [];
    },
    enabled: !!locationId,
  });
};