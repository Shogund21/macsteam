
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import FormSection from "./FormSection";

interface ElevatorMaintenanceFieldsProps {
  form: UseFormReturn<any>;
}

const ElevatorMaintenanceFields = ({ form }: ElevatorMaintenanceFieldsProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Elevator Maintenance Check</h3>
      
      <FormSection title="Operational Status">
        <FormField
          control={form.control}
          name="elevator_operation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operational Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select operational status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fully_operational">Fully Operational</SelectItem>
                  <SelectItem value="minor_issues">Minor Issues</SelectItem>
                  <SelectItem value="major_issues">Major Issues</SelectItem>
                  <SelectItem value="non_operational">Non-operational</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="door_operation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Door Operation</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select door status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="smooth">Smooth</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="noisy">Noisy</SelectItem>
                  <SelectItem value="irregular">Irregular</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="unusual_noises"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Unusual Noises Detected</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <FormSection title="Phone System">
        <FormField
          control={form.control}
          name="emergency_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Phone Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select emergency phone status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="non_operational">Non-operational</SelectItem>
                  <SelectItem value="not_tested">Not Tested</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone_test_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Phone Test Date (if known)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <FormSection title="Lighting Status">
        <FormField
          control={form.control}
          name="lighting_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lighting Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lighting status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all_operational">All Lights Operational</SelectItem>
                  <SelectItem value="partially_operational">Some Lights Out</SelectItem>
                  <SelectItem value="non_operational">All Lights Out</SelectItem>
                  <SelectItem value="flickering">Flickering</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="emergency_lighting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Lighting Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select emergency lighting status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="non_operational">Non-operational</SelectItem>
                  <SelectItem value="not_tested">Not Tested</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>
      
      <FormSection title="Additional Information">
        <FormField
          control={form.control}
          name="elevator_notes"
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

export default ElevatorMaintenanceFields;
