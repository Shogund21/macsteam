
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Technician } from "@/types/maintenance";
import { useIsMobile } from "@/hooks/use-mobile";

interface TechnicianSelectProps {
  form: UseFormReturn<any>;
  technicians: Technician[];
}

const TechnicianSelect = ({ form, technicians }: TechnicianSelectProps) => {
  const isMobile = useIsMobile();
  
  return (
    <FormField
      control={form.control}
      name="technician_id"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-base font-semibold text-gray-700">Technician</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || "no-technician"}
            defaultValue={field.value || "no-technician"}
          >
            <FormControl>
              <SelectTrigger 
                className={`w-full bg-white border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  isMobile ? 'min-h-[52px] text-base px-4' : 'h-12'
                }`}
              >
                <SelectValue 
                  placeholder="Select technician" 
                  className="text-gray-600"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent 
              className={`bg-white border border-gray-300 rounded-lg shadow-lg max-h-[300px] overflow-y-auto ${
                isMobile ? 'z-[100]' : 'z-50'
              }`}
              position="popper"
              sideOffset={4}
            >
              <SelectItem 
                value="no-technician" 
                className={`cursor-pointer hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-600 ${
                  isMobile ? 'py-4 px-4 text-base min-h-[48px]' : 'py-3 px-4'
                }`}
              >
                No technician selected
              </SelectItem>
              
              {technicians && technicians.length > 0 ? (
                technicians.map((tech) => (
                  <SelectItem 
                    key={tech.id} 
                    value={tech.id}
                    className={`cursor-pointer hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-600 ${
                      isMobile ? 'py-4 px-4 min-h-[48px]' : 'py-3 px-4'
                    }`}
                  >
                    <div className="flex flex-col w-full">
                      <span className={`font-medium text-gray-900 ${isMobile ? 'text-base' : ''}`}>
                        {tech.firstName} {tech.lastName}
                      </span>
                      <span className={`text-gray-500 ${isMobile ? 'text-sm mt-1' : 'text-sm'}`}>
                        {tech.specialization}
                      </span>
                    </div>
                  </SelectItem>
                ))
              ) : (
                <SelectItem 
                  value="no-technicians" 
                  disabled 
                  className={`text-gray-500 ${isMobile ? 'py-4 text-base min-h-[48px]' : 'py-3 text-sm'}`}
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
  );
};

export default TechnicianSelect;
