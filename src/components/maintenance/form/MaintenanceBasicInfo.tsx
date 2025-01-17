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
            <FormLabel className="text-base font-semibold text-gray-700">Equipment</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full bg-white border border-gray-200 h-12 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <SelectValue 
                    placeholder="Select equipment" 
                    className="text-gray-600"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px] overflow-y-auto bg-white border border-gray-200 shadow-lg">
                {equipment && equipment.length > 0 ? (
                  equipment.map((item) => (
                    <SelectItem 
                      key={item.id} 
                      value={item.id}
                      className="py-3 text-sm hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                    >
                      {item.name} - {item.model}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-equipment" disabled>
                    No equipment available
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full bg-white border border-gray-200 h-12 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <SelectValue 
                    placeholder="Select technician" 
                    className="text-gray-600"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px] overflow-y-auto bg-white border border-gray-200 shadow-lg">
                {technicians && technicians.length > 0 ? (
                  technicians.map((tech) => (
                    <SelectItem 
                      key={tech.id} 
                      value={tech.id}
                      className="py-3 text-sm hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                    >
                      {tech.firstName} {tech.lastName} - {tech.specialization}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-technician" disabled>
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