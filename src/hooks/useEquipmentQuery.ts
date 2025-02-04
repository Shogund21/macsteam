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
        // If no location found, fetch all equipment
        const { data: allEquipment, error: allEquipmentError } = await supabase
          .from('equipment')
          .select('*')
          .order('name');
        
        if (allEquipmentError) {
          console.error('Equipment fetch error:', allEquipmentError);
          throw allEquipmentError;
        }

        console.log('No location found, returning all equipment:', allEquipment);
        return allEquipment || [];
      }

      console.log('Location data:', locationData);

      // Fetch all equipment
      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment')
        .select('*')
        .order('name');
      
      if (equipmentError) {
        console.error('Equipment fetch error:', equipmentError);
        throw equipmentError;
      }

      // Log all equipment for debugging
      console.log('All equipment before filtering:', equipment?.map(e => ({
        id: e.id,
        name: e.name,
        location: e.location
      })));

      // Filter equipment based on location match
      const matchedEquipment = equipment?.filter(e => {
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

      // If no equipment matches the location, return all equipment
      if (!matchedEquipment?.length) {
        console.log('No equipment matches location, returning all equipment:', equipment);
        return equipment || [];
      }

      console.log('Matched equipment:', matchedEquipment?.map(e => ({
        id: e.id,
        name: e.name,
        location: e.location,
        store_number: locationData.store_number
      })));

      return matchedEquipment || [];
    },
    enabled: !!locationId,
  });
};