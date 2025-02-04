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

      // Fetch all equipment without any initial filtering
      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment')
        .select('*')
        .order('name');
      
      if (equipmentError) {
        console.error('Equipment fetch error:', equipmentError);
        throw equipmentError;
      }

      console.log('All equipment before filtering:', equipment);

      // Filter equipment based on exact location match after normalization
      const normalizedStoreNumber = normalizeString(locationData.store_number);
      const filteredEquipment = equipment?.filter(item => {
        const normalizedItemLocation = normalizeString(item.location);
        const isMatch = normalizedItemLocation === normalizedStoreNumber;
        console.log(`Comparing locations - Item: ${item.location} (${normalizedItemLocation}) with Store: ${locationData.store_number} (${normalizedStoreNumber}) = ${isMatch}`);
        return isMatch;
      });

      console.log('Filtered equipment:', filteredEquipment);

      return filteredEquipment || [];
    },
    enabled: !!locationId,
  });
};