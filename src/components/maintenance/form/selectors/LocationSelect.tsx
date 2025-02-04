import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface LocationSelectProps {
  form: UseFormReturn<any>;
}

const LocationSelect = ({ form }: LocationSelectProps) => {
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
        throw error;
      }
      
      console.log('Locations fetched:', data);
      return data || [];
    },
  });

  return (
    <FormField
      control={form.control}
      name="location_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-gray-700">Location</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || ""}
            defaultValue=""
          >
            <FormControl>
              <SelectTrigger 
                className="w-full bg-white border border-gray-200 h-12 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <SelectValue 
                  placeholder="Select location" 
                  className="text-gray-600"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent 
              className="z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-[--radix-select-trigger-width] max-h-[300px] overflow-y-auto"
            >
              {locations && locations.length > 0 ? (
                locations.map((loc) => (
                  <SelectItem 
                    key={loc.id} 
                    value={loc.id}
                    className="py-3 px-4 hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
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
                  value="no-location-available" 
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