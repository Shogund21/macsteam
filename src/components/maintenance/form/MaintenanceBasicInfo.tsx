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
  // Watch the current values to ensure re-rendering on changes
  const selectedEquipmentId = form.watch("equipment_id");
  const selectedTechnicianId = form.watch("technician_id");

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="equipment_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-gray-700">Equipment</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value ? String(field.value) : undefined}
            >
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
                      value={String(item.id)}
                      className="py-3 text-sm hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">- {item.model}</span>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-equipment-available" disabled>
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
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value ? String(field.value) : undefined}
            >
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
                      value={String(tech.id)}
                      className="py-3 text-sm hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                    >
                      <span className="font-medium">{tech.firstName} {tech.lastName}</span>
                      <span className="text-gray-500 ml-2">- {tech.specialization}</span>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-technician-available" disabled>
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