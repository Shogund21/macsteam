import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Equipment } from "@/types/maintenance";

interface EquipmentSelectProps {
  form: UseFormReturn<any>;
  locationId: string;
}

const EquipmentSelect = ({ form, locationId }: EquipmentSelectProps) => {
  const { data: equipmentList = [], isLoading } = useQuery({
    queryKey: ['equipment', locationId],
    queryFn: async () => {
      console.log('Starting equipment fetch for location:', locationId);
      
      if (!locationId) {
        console.log('No location ID provided');
        return [];
      }

      // First get the location data with detailed logging
      const { data: locationData, error: locationError } = await supabase
        .from('locations')
        .select('*')
        .eq('id', locationId)
        .maybeSingle();
      
      if (locationError) {
        console.error('Error fetching location:', locationError);
        throw locationError;
      }

      if (!locationData) {
        console.log('Location not found for ID:', locationId);
        return [];
      }
      
      console.log('Location data found:', {
        id: locationData.id,
        name: locationData.name,
        storeNumber: locationData.store_number,
        isActive: locationData.is_active
      });

      // Fetch all active equipment with detailed logging
      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'active')
        .order('name');
      
      if (equipmentError) {
        console.error('Error fetching equipment:', equipmentError);
        throw equipmentError;
      }

      console.log('All active equipment:', equipment?.slice(0, 2));

      // More flexible location string normalization
      const normalizeLocation = (loc: string) => {
        if (!loc) return '';
        // Convert to lowercase but keep spaces and basic punctuation
        return loc.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // Keep spaces and hyphens
          .trim();
      };

      const locationName = locationData.name ? normalizeLocation(locationData.name) : '';
      const storeNumber = locationData.store_number ? normalizeLocation(locationData.store_number) : '';
      
      console.log('Normalized location identifiers:', {
        locationName,
        storeNumber,
        originalName: locationData.name,
        originalStoreNumber: locationData.store_number
      });

      // Filter equipment with more flexible matching
      const filteredEquipment = equipment?.filter(eq => {
        if (!eq.location) {
          console.log(`Equipment ${eq.name} has no location set`);
          return false;
        }
        
        const equipLocation = normalizeLocation(eq.location);
        console.log(`Checking equipment: ${eq.name}, Location: ${eq.location}, Normalized: ${equipLocation}`);

        // More flexible matching patterns
        const patterns = [
          equipLocation.includes(locationName),
          equipLocation.includes(storeNumber),
          equipLocation.includes(`store ${storeNumber}`),
          equipLocation.includes(`building ${storeNumber}`),
          equipLocation === locationName,
          equipLocation === storeNumber,
          // Additional patterns with spaces preserved
          equipLocation.includes(`location ${storeNumber}`),
          equipLocation.includes(`site ${storeNumber}`),
          // Match with or without spaces
          equipLocation.replace(/\s/g, '').includes(storeNumber.replace(/\s/g, '')),
          equipLocation.replace(/\s/g, '').includes(locationName.replace(/\s/g, ''))
        ];

        const matches = patterns.some(match => match);
        if (matches) {
          console.log(`Match found for equipment: ${eq.name} with location: ${eq.location}`);
        }

        return matches;
      });

      console.log('Filtered equipment results:', {
        total: filteredEquipment?.length,
        items: filteredEquipment
      });

      return filteredEquipment || [];
    },
    enabled: !!locationId,
  });

  return (
    <FormField
      control={form.control}
      name="equipment_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-gray-700">Equipment</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || ""}
            defaultValue={field.value || ""}
          >
            <FormControl>
              <SelectTrigger 
                className="w-full bg-white border border-gray-200 h-12 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <SelectValue 
                  placeholder="Select equipment" 
                  className="text-gray-600"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent 
              className="bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-[--radix-select-trigger-width] max-h-[300px] overflow-y-auto"
            >
              {!isLoading ? (
                equipmentList.length > 0 ? (
                  equipmentList.map((item) => (
                    <SelectItem 
                      key={item.id} 
                      value={item.id}
                      className="py-3 px-4 hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{item.name}</span>
                        <span className="text-sm text-gray-500">
                          {item.model} - {item.location}
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem 
                    value="no-equipment" 
                    disabled 
                    className="py-3 text-sm text-gray-500"
                  >
                    {locationId ? "No equipment found for this location" : "Please select a location first"}
                  </SelectItem>
                )
              ) : (
                <SelectItem 
                  value="loading" 
                  disabled 
                  className="py-3 text-sm text-gray-500"
                >
                  Loading equipment...
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

export default EquipmentSelect;
