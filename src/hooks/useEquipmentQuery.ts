
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

      // Fetch all equipment
      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment')
        .select('*')
        .order('name');
      
      if (equipmentError) {
        console.error('Equipment fetch error:', equipmentError);
        throw equipmentError;
      }

      if (!locationData) {
        console.log('Location not found, returning all equipment:', equipment);
        return equipment || [];
      }

      console.log('Location data:', locationData);
      console.log('All equipment before filtering:', equipment);

      // Filter equipment based on location or name containing store number
      const matchedEquipment = equipment?.filter(e => {
        // Preserve the exact location of equipment items, especially for restrooms
        // Don't default restrooms to specific locations based on matching logic
        if (e.name.toLowerCase().includes('restroom')) {
          console.log(`Keeping restroom "${e.name}" with its original location: "${e.location}"`);
          return true;
        }
        
        const normalizedLocation = normalizeString(e.location);
        const normalizedStoreNumber = normalizeString(locationData.store_number);
        const normalizedName = normalizeString(e.name);
        
        // Match if location contains store number OR name contains store number
        // Also include elevators for any location
        const isElevator = e.name.toLowerCase().includes('elevator');
        
        const isMatch = normalizedLocation.includes(normalizedStoreNumber) || 
                       normalizedName.includes(normalizedStoreNumber) ||
                       normalizedLocation.includes('dadeland home') ||
                       isElevator;

        console.log('Equipment match check:', {
          equipmentName: e.name,
          equipmentLocation: e.location,
          storeNumber: locationData.store_number,
          normalizedLocation,
          normalizedStoreNumber,
          normalizedName,
          isElevator,
          isMatch
        });

        return isMatch;
      });

      if (!matchedEquipment?.length) {
        console.log('No equipment matches found, returning all equipment:', equipment);
        return equipment || [];
      }

      console.log('Matched equipment:', matchedEquipment);
      return matchedEquipment;
    },
    enabled: !!locationId,
  });
};
