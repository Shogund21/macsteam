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
      
      // First get the location data for the selected location ID
      let locationData = null;
      if (locationId) {
        const { data } = await supabase
          .from('locations')
          .select('name, store_number')
          .eq('id', locationId)
          .maybeSingle();
        
        locationData = data;
        console.log('Location data:', locationData);
      }

      // Then fetch all active equipment
      const { data: allEquipment, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'active')
        .order('name');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }

      // If we have a location selected, filter equipment by location name or store number
      let filteredEquipment = allEquipment;
      if (locationData) {
        filteredEquipment = allEquipment.filter(eq => {
          const equipLocation = eq.location?.toLowerCase();
          const locationName = locationData.name?.toLowerCase();
          const storeNumber = locationData.store_number?.toLowerCase();
          
          return equipLocation && (
            equipLocation.includes(locationName) || 
            equipLocation.includes(storeNumber) ||
            equipLocation.includes(`store ${storeNumber}`) ||
            equipLocation.includes(`building ${storeNumber}`)
          );
        });
      }
      
      console.log('Filtered equipment:', filteredEquipment);
      return filteredEquipment || [];
    },
    enabled: true,
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
                    {locationId ? "No equipment in this location" : "No equipment available"}
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