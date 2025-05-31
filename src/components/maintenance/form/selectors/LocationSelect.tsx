
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
    console.log('LocationSelect: Is mobile:', isMobile);
  }, [selectedLocationId, isMobile]);

  const { data: locations = [], isLoading } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      console.log('Starting locations fetch...');
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) {
        console.error('Error fetching locations:', error);
        toast({
          title: "Error loading locations",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      console.log('Locations fetched:', data?.length || 0, 'locations');
      return data || [];
    },
  });

  const handleLocationChange = (value: string) => {
    console.log('LocationSelect: Changing location_id to:', value);
    console.log('LocationSelect: Mobile dropdown triggered');
    
    try {
      // Set the location_id in the form with proper options to ensure it's tracked
      form.setValue('location_id', value, { 
        shouldDirty: true, 
        shouldTouch: true,
        shouldValidate: true 
      });
      
      // Clear equipment selection when location changes
      form.setValue('equipment_id', '', { 
        shouldDirty: true, 
        shouldTouch: true 
      });
      
      // Force form to trigger watchers
      form.trigger(['location_id', 'equipment_id']);
    } catch (error) {
      console.error('Error in handleLocationChange:', error);
      toast({
        title: "Error selecting location",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    console.log('LocationSelect: Dropdown open state changed:', open, 'isMobile:', isMobile);
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
            onOpenChange={handleOpenChange}
            value={field.value || ""}
            defaultValue={field.value || ""}
          >
            <FormControl>
              <SelectTrigger 
                className={`w-full bg-white border border-gray-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  isMobile ? 'min-h-[52px] text-base px-4' : 'h-12'
                }`}
                onClick={() => console.log('LocationSelect: Trigger clicked, isMobile:', isMobile)}
              >
                <SelectValue 
                  placeholder={isLoading ? "Loading locations..." : "Select location"} 
                  className="text-gray-600"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent 
              className="z-[10000] bg-white divide-y divide-gray-100 rounded-lg shadow-lg max-h-[300px] overflow-y-auto"
              position="popper"
              side="bottom"
              align="start"
              sideOffset={isMobile ? 8 : 4}
              onOpenAutoFocus={() => console.log('LocationSelect: Content opened')}
            >
              {isLoading ? (
                <SelectItem 
                  value="loading-placeholder" 
                  disabled 
                  className="py-3 px-4 text-sm text-gray-500"
                >
                  Loading locations...
                </SelectItem>
              ) : locations.length > 0 ? (
                locations.map((loc) => (
                  <SelectItem 
                    key={loc.id} 
                    value={loc.id}
                    className="py-3 px-4 hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                    onClick={() => console.log('LocationSelect: Item clicked:', loc.name)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{loc.name}</span>
                      <span className="text-sm text-gray-500">
                        Store #{loc.store_number}
                      </span>
                    </div>
                  </SelectItem>
                ))
              ) : (
                <SelectItem 
                  value="no-locations-placeholder" 
                  disabled 
                  className="py-3 text-sm text-gray-500"
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
