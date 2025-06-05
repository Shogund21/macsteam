
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useMaintenanceFormContext } from "../context/MaintenanceFormContext";

interface MaintenanceReadingsProps {
  form: UseFormReturn<any>;
}

const MaintenanceReadings = ({ form }: MaintenanceReadingsProps) => {
  const { isMobile } = useMaintenanceFormContext();
  
  return (
    <div className="w-full space-y-6">
      <div className={`${isMobile ? 'text-center py-3 px-3 bg-green-50 border border-green-200 rounded-lg' : ''}`}>
        <h3 className={`font-semibold ${isMobile ? 'text-lg text-green-800' : 'text-lg'}`}>
          Maintenance Readings
        </h3>
        {isMobile && (
          <p className="text-sm text-green-600 mt-1">Record all applicable readings</p>
        )}
      </div>
      
      <div className="w-full space-y-4">
        <FormField
          control={form.control}
          name="chiller_pressure_reading"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                Chiller Pressure Reading (PSI)
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[52px] text-base' : ''}`}>
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
              <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                Chiller Temperature Reading (°F)
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[52px] text-base' : ''}`}>
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

        <FormField
          control={form.control}
          name="air_filter_status"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                Air Filter Status
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[52px] text-base' : ''}`}>
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
              <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                Belt Condition
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[52px] text-base' : ''}`}>
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
      </div>
    </div>
  );
};

export default MaintenanceReadings;
