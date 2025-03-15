
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import FormSection from "./FormSection";

interface RestroomMaintenanceFieldsProps {
  form: UseFormReturn<any>;
}

const RestroomMaintenanceFields = ({ form }: RestroomMaintenanceFieldsProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Restroom Maintenance Check</h3>
      
      <FormSection title="Sink Status">
        <FormField
          control={form.control}
          name="sink_operation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sink Operation</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="needs_repair">Needs Repair</SelectItem>
                  <SelectItem value="non_operational">Non-operational</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sink_water_pressure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Water Pressure</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select water pressure" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="sink_leakage"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Leakage Detected</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <FormSection title="Toilet Status">
        <FormField
          control={form.control}
          name="toilet_operation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Toilet Operation</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="needs_repair">Needs Repair</SelectItem>
                  <SelectItem value="non_operational">Non-operational</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="toilet_flush_quality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flush Quality</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select flush quality" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="weak">Weak</SelectItem>
                  <SelectItem value="excessive">Excessive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="toilet_leakage"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Leakage Detected</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <FormSection title="General Restroom Status">
        <FormField
          control={form.control}
          name="cleanliness_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cleanliness Level</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cleanliness level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="supplies_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplies Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplies status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="well_stocked">Well Stocked</SelectItem>
                  <SelectItem value="adequate">Adequate</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="depleted">Depleted</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="restroom_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter any additional notes or observations" 
                  {...field} 
                  className="h-20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>
    </>
  );
};

export default RestroomMaintenanceFields;
