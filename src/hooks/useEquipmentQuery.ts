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

      // Fetch all equipment where location contains the store number
      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment')
        .select('*')
        .ilike('location', `%${locationData.store_number}%`)
        .order('name');
      
      if (equipmentError) {
        console.error('Equipment fetch error:', equipmentError);
        throw equipmentError;
      }

      // Log detailed equipment information for debugging
      console.log('Equipment found:', equipment?.length);
      console.log('Equipment details:', equipment?.map(e => ({
        id: e.id,
        name: e.name,
        location: e.location,
        store_number: locationData.store_number,
        match: normalizeString(e.location).includes(normalizeString(locationData.store_number))
      })));

      // Return all equipment that matches the location
      return equipment || [];
    },
    enabled: !!locationId,
  });
};