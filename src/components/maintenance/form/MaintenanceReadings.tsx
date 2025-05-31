
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
  
  console.log('MaintenanceReadings: 📱 MOBILE RENDER:', { isMobile, width: typeof window !== 'undefined' ? window.innerWidth : 'unknown' });
  
  return (
    <div className={`maintenance-readings-container ${isMobile ? 'mobile-readings-layout space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}`}>
      {isMobile && (
        <div className="mobile-debug-indicator" style={{
          backgroundColor: '#e3f2fd',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#1565c0',
          marginBottom: '12px',
          fontWeight: 'bold'
        }}>
          📱 Mobile: Maintenance Readings Section
        </div>
      )}
      
      <FormField
        control={form.control}
        name="chiller_pressure_reading"
        render={({ field }) => (
          <FormItem className={isMobile ? 'mobile-form-item' : ''}>
            <FormLabel>Chiller Pressure Reading (PSI)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`bg-white border border-gray-200 ${isMobile ? 'mobile-select-trigger' : ''}`}>
                  <SelectValue placeholder="Enter pressure or select NA" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
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
          <FormItem className={isMobile ? 'mobile-form-item' : ''}>
            <FormLabel>Chiller Temperature Reading (°F)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`bg-white border border-gray-200 ${isMobile ? 'mobile-select-trigger' : ''}`}>
                  <SelectValue placeholder="Enter temperature or select NA" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
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
          <FormItem className={isMobile ? 'mobile-form-item' : ''}>
            <FormLabel>Air Filter Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`bg-white border border-gray-200 ${isMobile ? 'mobile-select-trigger' : ''}`}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
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
          <FormItem className={isMobile ? 'mobile-form-item' : ''}>
            <FormLabel>Belt Condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`bg-white border border-gray-200 ${isMobile ? 'mobile-select-trigger' : ''}`}>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
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
  );
};

export default MaintenanceReadings;
