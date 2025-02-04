import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Equipment, Technician } from "@/types/maintenance";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MaintenanceBasicInfoProps {
  form: UseFormReturn<any>;
  equipment: Equipment[];
  technicians: Technician[];
}

const MaintenanceBasicInfo = ({ form, equipment, technicians }: MaintenanceBasicInfoProps) => {
  const { data: locations = [], isLoading: isLoadingLocations } = useQuery({
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

  const { data: equipmentList = [], isLoading: isLoadingEquipment } = useQuery({
    queryKey: ['equipment', form.watch('location_id')],
    queryFn: async () => {
      console.log('Starting equipment fetch...');
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'active')
        .order('name');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      
      console.log('Equipment fetched:', data);
      return data || [];
    },
  });

  const filteredEquipment = form.watch('location_id') 
    ? equipmentList.filter(eq => eq.location === locations.find(loc => loc.id === form.watch('location_id'))?.name)
    : equipmentList;

  console.log('Filtered equipment:', filteredEquipment);

  return (
    <div className="space-y-6">
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

      <FormField
        control={form.control}
        name="equipment_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-700">Equipment</FormLabel>
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
                    placeholder="Select equipment" 
                    className="text-gray-600"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-[--radix-select-trigger-width] max-h-[300px] overflow-y-auto"
              >
                {filteredEquipment && filteredEquipment.length > 0 ? (
                  filteredEquipment.map((item) => (
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
                    value="no-equipment-available" 
                    disabled 
                    className="py-3 text-sm text-gray-500"
                  >
                    {form.watch('location_id') ? "No equipment in this location" : "No equipment available"}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage className="text-sm text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="technician_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-700">Technician</FormLabel>
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
                    placeholder="Select technician" 
                    className="text-gray-600"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-[--radix-select-trigger-width] max-h-[300px] overflow-y-auto"
              >
                {technicians && technicians.length > 0 ? (
                  technicians.map((tech) => (
                    <SelectItem 
                      key={tech.id} 
                      value={tech.id}
                      className="py-3 px-4 hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {tech.firstName} {tech.lastName}
                        </span>
                        <span className="text-sm text-gray-500">
                          {tech.specialization}
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem 
                    value="no-technician-available" 
                    disabled 
                    className="py-3 text-sm text-gray-500"
                  >
                    No technicians available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage className="text-sm text-red-500" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MaintenanceBasicInfo;