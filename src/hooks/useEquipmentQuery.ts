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

      // Fetch all equipment without filtering
      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment')
        .select('*')
        .order('name');
      
      if (equipmentError) {
        console.error('Equipment fetch error:', equipmentError);
        throw equipmentError;
      }

      console.log('All equipment before filtering:', equipment);

      // Filter equipment based on store number match
      const normalizedStoreNumber = normalizeString(locationData.store_number);
      const filteredEquipment = equipment?.filter(item => {
        // Clean up and normalize the location string
        const itemLocation = item.location?.trim() || '';
        const normalizedItemLocation = normalizeString(itemLocation);
        
        // Check for exact match after normalization
        const isMatch = normalizedItemLocation === normalizedStoreNumber;
        
        console.log(`Equipment: ${item.name} - Location: ${itemLocation} - Normalized: ${normalizedItemLocation} - Store: ${locationData.store_number} (${normalizedStoreNumber}) - Match: ${isMatch}`);
        
        return isMatch;
      });

      console.log('Filtered equipment:', filteredEquipment);
      console.log('Equipment count:', filteredEquipment?.length);
      console.log('Equipment types:', filteredEquipment?.map(e => e.name).join(', '));

      return filteredEquipment || [];
    },
    enabled: !!locationId,
  });
};