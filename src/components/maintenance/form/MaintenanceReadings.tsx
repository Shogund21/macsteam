import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface MaintenanceReadingsProps {
  form: UseFormReturn<any>;
}

const MaintenanceReadings = ({ form }: MaintenanceReadingsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="chiller_pressure_reading"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chiller Pressure Reading (PSI)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Enter pressure or select NA" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
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
          <FormItem>
            <FormLabel>Chiller Temperature Reading (°F)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Enter temperature or select NA" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
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
          <FormItem>
            <FormLabel>Air Filter Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
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
          <FormItem>
            <FormLabel>Belt Condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
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