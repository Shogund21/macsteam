import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MaintenanceBasicInfoProps {
  form: UseFormReturn<any>;
  equipment: any[];
  technicians: any[];
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
      return data;
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="equipment_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Equipment</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {equipmentData?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
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
            <FormLabel>Technician</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {technicians?.map((tech) => (
                  <SelectItem key={tech.id} value={tech.id}>
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