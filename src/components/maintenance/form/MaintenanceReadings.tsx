
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Thermometer, Gauge2, Filter, Settings } from "lucide-react";
import ChecklistSection from "./sections/ChecklistSection";
import FormFieldGroup from "./sections/FormFieldGroup";
import { useMaintenanceFormContext } from "../context/MaintenanceFormContext";

interface MaintenanceReadingsProps {
  form: UseFormReturn<any>;
}

const MaintenanceReadings = ({ form }: MaintenanceReadingsProps) => {
  const { isMobile } = useMaintenanceFormContext();
  
  return (
    <div className="w-full space-y-4">
      <ChecklistSection
        title="Equipment Readings & Status"
        icon={<Gauge2 className="h-5 w-5" />}
        colorScheme="blue"
      >
        <FormFieldGroup 
          title="Pressure & Temperature Readings"
          description="Record current system readings"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="chiller_pressure_reading"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  <Gauge2 className="h-4 w-4" />
                  Chiller Pressure Reading (PSI)
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}>
                      <SelectValue placeholder="Enter pressure or select NA" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent 
                    className="bg-white border border-gray-200 shadow-lg z-[200]"
                    position="popper"
                    sideOffset={4}
                  >
                    <SelectItem value="NA">Not Applicable</SelectItem>
                    {[...Array(100)].map((_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i} PSI
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
            name="chiller_temperature_reading"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  <Thermometer className="h-4 w-4" />
                  Chiller Temperature Reading (°F)
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}>
                      <SelectValue placeholder="Enter temperature or select NA" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent 
                    className="bg-white border border-gray-200 shadow-lg z-[200]"
                    position="popper"
                    sideOffset={4}
                  >
                    <SelectItem value="NA">Not Applicable</SelectItem>
                    {[...Array(150)].map((_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i}°F
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>

        <FormFieldGroup 
          title="Component Status Checks"
          description="Inspect filter and belt conditions"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="air_filter_status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  <Filter className="h-4 w-4" />
                  Air Filter Status
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent 
                    className="bg-white border border-gray-200 shadow-lg z-[200]"
                    position="popper"
                    sideOffset={4}
                  >
                    <SelectItem value="NA">Not Applicable</SelectItem>
                    <SelectItem value="clean">Clean</SelectItem>
                    <SelectItem value="needs_cleaning">Needs Cleaning</SelectItem>
                    <SelectItem value="needs_replacement">Needs Replacement</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="belt_condition"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  <Settings className="h-4 w-4" />
                  Belt Condition
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent 
                    className="bg-white border border-gray-200 shadow-lg z-[200]"
                    position="popper"
                    sideOffset={4}
                  >
                    <SelectItem value="NA">Not Applicable</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="needs_replacement">Needs Replacement</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>
      </ChecklistSection>
    </div>
  );
};

export default MaintenanceReadings;
