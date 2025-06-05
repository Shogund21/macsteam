
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LocationSelectProps {
  form: UseFormReturn<any>;
}

const LocationSelect = ({ form }: LocationSelectProps) => {
  const selectedLocationId = form.watch('location_id');
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Log current selection for debugging
  useEffect(() => {
    console.log('LocationSelect: Current location_id value:', selectedLocationId);
  }, [selectedLocationId]);

  const { data: locations = [], isLoading, error } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      try {
        console.log('Starting locations fetch...');
        const { data, error } = await supabase
          .from('locations')
          .select('*')
          .eq('is_active', true)
          .order('name');
        
        if (error) {
          console.error('Error fetching locations:', error);
          // Return empty array instead of throwing to prevent crashes
          return [];
        }
        
        console.log('Locations fetched:', data?.length || 0, 'locations');
        return data || [];
      } catch (error) {
        console.error('Locations fetch exception:', error);
        return [];
      }
    },
    retry: 1,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  const handleLocationChange = (value: string) => {
    console.log('LocationSelect: Changing location_id to:', value);
    
    try {
      // CRITICAL FIX: Verify the location ID is valid before setting it
      const selectedLocation = locations.find(loc => loc.id === value);
      
      if (!selectedLocation && value !== '') {
        console.warn('Selected location ID not found in available locations:', value);
      } else if (selectedLocation) {
        console.log('Valid location selected:', selectedLocation.name, 'with ID:', selectedLocation.id);
      }
      
      // CRITICAL FIX: Set the location_id in the form with proper options to ensure it's tracked
      form.setValue('location_id', value, { 
        shouldDirty: true, 
        shouldTouch: true,
        shouldValidate: true 
      });
      
      // Clear equipment selection when location changes
      // This prevents location/equipment mismatch
      form.setValue('equipment_id', '', { 
        shouldDirty: true, 
        shouldTouch: true 
      });
      
      // Log the form state after making changes
      setTimeout(() => {
        console.log('LocationSelect: Form state after change (delayed):', {
          location_id: form.getValues('location_id'),
          equipment_id: form.getValues('equipment_id')
        });
      }, 100);
    } catch (error) {
      console.error('Error in handleLocationChange:', error);
    }
  };

  return (
    <FormField
      control={form.control}
      name="location_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-gray-700">Location</FormLabel>
          <Select
            onValueChange={handleLocationChange}
            value={field.value || ""}
            defaultValue={field.value || ""}
          >
            <FormControl>
              <SelectTrigger 
                className={`w-full bg-white border border-gray-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  isMobile ? 'min-h-[52px] text-base px-4' : 'h-12'
                }`}
              >
                <SelectValue 
                  placeholder={isLoading ? "Loading locations..." : "Select location"} 
                  className="text-gray-600"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent 
              className={`bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-[--radix-select-trigger-width] max-h-[300px] overflow-y-auto ${
                isMobile ? 'z-[9999]' : 'z-[1000]'
              }`}
              position="popper"
              sideOffset={4}
            >
              {isLoading ? (
                <SelectItem 
                  value="loading-placeholder" 
                  disabled 
                  className={`text-gray-500 ${isMobile ? 'py-4 px-4 text-base' : 'py-3 px-4 text-sm'}`}
                >
                  Loading locations...
                </SelectItem>
              ) : error ? (
                <SelectItem 
                  value="error-placeholder" 
                  disabled 
                  className={`text-red-500 ${isMobile ? 'py-4 px-4 text-base' : 'py-3 px-4 text-sm'}`}
                >
                  Error loading locations
                </SelectItem>
              ) : locations.length > 0 ? (
                locations.map((loc) => (
                  <SelectItem 
                    key={loc.id} 
                    value={loc.id}
                    className={`hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600 ${
                      isMobile ? 'py-4 px-4' : 'py-3 px-4'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className={`font-medium text-gray-900 ${isMobile ? 'text-base' : ''}`}>{loc.name}</span>
                      <span className={`text-gray-500 ${isMobile ? 'text-sm mt-1' : 'text-sm'}`}>
                        Store #{loc.store_number}
                      </span>
                    </div>
                  </SelectItem>
                ))
              ) : (
                <SelectItem 
                  value="no-locations-placeholder" 
                  disabled 
                  className={`text-gray-500 ${isMobile ? 'py-4 px-4 text-base' : 'py-3 px-4 text-sm'}`}
                >
                  No locations available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default LocationSelect;
