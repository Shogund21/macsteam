
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { normalizeString } from "@/utils/locationMatching";
import { useToast } from "@/hooks/use-toast";

export const useEquipmentQuery = (locationId: string) => {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: ['equipment', locationId],
    queryFn: async () => {
      if (!locationId) {
        console.log('No location ID provided');
        return [];
      }

      console.log('Fetching equipment for location:', locationId);

      try {
        // Get location data first
        const { data: locationData, error: locationError } = await supabase
          .from('locations')
          .select('*')
          .eq('id', locationId)
          .maybeSingle();
        
        if (locationError) {
          console.error('Location fetch error:', locationError);
          toast({
            title: "Error loading location data",
            description: locationError.message,
            variant: "destructive",
          });
          throw locationError;
        }

        if (!locationData) {
          console.error(`Location ID ${locationId} not found in database`);
          toast({
            title: "Location not found",
            description: `The selected location (ID: ${locationId}) could not be found.`,
            variant: "destructive",
          });
          return [];
        }

        console.log('Location data retrieved successfully:', locationData);

        // Fetch all equipment
        const { data: equipment, error: equipmentError } = await supabase
          .from('equipment')
          .select('*')
          .order('name');
        
        if (equipmentError) {
          console.error('Equipment fetch error:', equipmentError);
          toast({
            title: "Error loading equipment",
            description: equipmentError.message,
            variant: "destructive",
          });
          throw equipmentError;
        }

        if (!equipment || equipment.length === 0) {
          console.log('No equipment found in database');
          return [];
        }

        console.log('Location data:', locationData);
        console.log('All equipment before filtering:', equipment);

        // Filter equipment based on location or name containing store number
        const matchedEquipment = equipment?.filter(e => {
          // CRITICAL FIX: For restrooms, flag and log their original location for transparency
          const isRestroom = e.name.toLowerCase().includes('restroom');
          if (isRestroom) {
            // Add a property to indicate this is a restroom with a potentially different location
            e.isSpecialLocation = true;
            e.originalLocationId = e.location; // Store original location for reference
            e.displayWarning = e.location !== locationId;
            
            console.log(`Restroom "${e.name}" has database location "${e.location}" but will use selected location ID: ${locationId}`);
            // We include all restrooms regardless of their location in the DB
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

          if (isMatch) {
            console.log(`Equipment "${e.name}" matches location ${locationData.name}`);
          }

          return isMatch;
        });

        if (!matchedEquipment?.length) {
          console.log('No equipment matches found for location:', locationData.name);
          return equipment || [];
        }

        console.log(`Found ${matchedEquipment.length} equipment items for location ${locationData.name}`);
        return matchedEquipment;
      } catch (error) {
        console.error('Error in useEquipmentQuery:', error);
        toast({
          title: "Error fetching equipment",
          description: error instanceof Error ? error.message : "An unknown error occurred while loading equipment",
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: !!locationId,
    // Don't refetch unnecessarily - this helps prevent UI flickering
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: false,
    retry: 1, // Only retry once to avoid endless error loops
    meta: {
      onError: (error: Error) => {
        console.error('Equipment query error:', error);
        toast({
          title: "Error loading equipment",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  });
};
