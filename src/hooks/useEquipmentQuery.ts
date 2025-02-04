import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { normalizeString } from "@/utils/locationMatching";

export const useEquipmentQuery = (locationId: string) => {
  return useQuery({
    queryKey: ['equipment', locationId],
    queryFn: async () => {
      if (!locationId) {
        console.log('No location ID provided');
        return [];
      }

      console.log('Fetching equipment for location:', locationId);

      // Get location data first
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

      // Fetch all equipment and filter by location
      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment')
        .select('*')
        .order('name');
      
      if (equipmentError) {
        console.error('Equipment fetch error:', equipmentError);
        throw equipmentError;
      }

      // Log detailed equipment information for debugging
      console.log('All equipment before filtering:', equipment?.map(e => ({
        id: e.id,
        name: e.name,
        location: e.location
      })));

      // Filter equipment based on location match
      const filteredEquipment = equipment?.filter(e => {
        const normalizedLocation = normalizeString(e.location);
        const normalizedStoreNumber = normalizeString(locationData.store_number);
        const isMatch = normalizedLocation.includes(normalizedStoreNumber);
        
        console.log('Equipment location check:', {
          equipmentName: e.name,
          equipmentLocation: e.location,
          storeNumber: locationData.store_number,
          normalizedLocation,
          normalizedStoreNumber,
          isMatch
        });

        return isMatch;
      });

      console.log('Filtered equipment:', filteredEquipment?.map(e => ({
        id: e.id,
        name: e.name,
        location: e.location,
        store_number: locationData.store_number
      })));

      return filteredEquipment || [];
    },
    enabled: !!locationId,
  });
};