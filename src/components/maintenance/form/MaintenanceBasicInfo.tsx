import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Equipment, Technician } from "@/types/maintenance";

interface MaintenanceBasicInfoProps {
  form: UseFormReturn<any>;
  equipment: Equipment[];
  technicians: Technician[];
}

const MaintenanceBasicInfo = ({ form, equipment, technicians }: MaintenanceBasicInfoProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="equipment_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Equipment</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger className="w-full bg-white border-gray-200 h-12">
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px] overflow-y-auto bg-white">
                {equipment?.map((item) => (
                  <SelectItem 
                    key={item.id} 
                    value={item.id}
                    className="py-3 text-sm"
                  >
                    {item.name} - {item.model}
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
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger className="w-full bg-white border-gray-200 h-12">
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px] overflow-y-auto bg-white">
                {technicians?.map((tech) => (
                  <SelectItem 
                    key={tech.id} 
                    value={tech.id}
                    className="py-3 text-sm"
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