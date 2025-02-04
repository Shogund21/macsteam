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
      console.log('Fetching equipment for location:', locationId);
      
      if (!locationId) {
        console.log('No location selected, returning empty list');
        return [];
      }

      // First get the location data
      const { data: locationData } = await supabase
        .from('locations')
        .select('name, store_number')
        .eq('id', locationId)
        .maybeSingle();
      
      if (!locationData) {
        console.log('Location not found:', locationId);
        return [];
      }
      
      console.log('Location data:', locationData);

      // Fetch all active equipment
      const { data: equipment, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'active')
        .order('name');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }

      // Normalize location strings for comparison
      const normalizeLocation = (loc: string) => {
        return loc.toLowerCase()
          .replace(/[^a-z0-9]/g, '') // Remove special characters
          .trim();
      };

      const locationName = normalizeLocation(locationData.name || '');
      const storeNumber = normalizeLocation(locationData.store_number || '');
      
      console.log('Normalized location:', { locationName, storeNumber });

      // Filter equipment based on normalized location matching
      const filteredEquipment = equipment.filter(eq => {
        if (!eq.location) return false;
        
        const equipLocation = normalizeLocation(eq.location);
        console.log('Checking equipment location:', equipLocation);
        
        // Check various location format matches
        const matches = [
          equipLocation.includes(locationName),
          equipLocation.includes(storeNumber),
          equipLocation.includes(`store${storeNumber}`),
          equipLocation.includes(`building${storeNumber}`),
          equipLocation === locationName,
          equipLocation === storeNumber,
          // Add fuzzy matching for store numbers
          equipLocation.includes(`loc${storeNumber}`),
          equipLocation.includes(`location${storeNumber}`),
          equipLocation.includes(`site${storeNumber}`)
        ].some(match => match);

        if (matches) {
          console.log('Match found for equipment:', eq.name);
        }

        return matches;
      });

      console.log('Filtered equipment:', filteredEquipment);
      return filteredEquipment;
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
                    {locationId ? "No equipment in this location" : "Please select a location first"}
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