import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Equipment, Technician } from "@/types/maintenance";

interface MaintenanceBasicInfoProps {
  form: UseFormReturn<any>;
  equipment: Equipment[];
  technicians: Technician[];
}

const MaintenanceBasicInfo = ({ form, equipment, technicians }: MaintenanceBasicInfoProps) => {
  const { data: equipmentData } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Equipment[];
    },
  });

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="equipment_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Equipment</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full h-12 bg-white border border-gray-200 shadow-sm">
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
                sideOffset={5}
              >
                {equipmentData?.map((item) => (
                  <SelectItem 
                    key={item.id} 
                    value={item.id}
                    className="py-3 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {item.name} - {item.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="technician_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Technician</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full h-12 bg-white border border-gray-200 shadow-sm">
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
                sideOffset={5}
              >
                {technicians?.map((tech) => (
                  <SelectItem 
                    key={tech.id} 
                    value={tech.id}
                    className="py-3 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {tech.firstName} {tech.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MaintenanceBasicInfo;