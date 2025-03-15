
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import FormSection from "../FormSection";

interface ElevatorOperationalStatusProps {
  form: UseFormReturn<any>;
}

const ElevatorOperationalStatus = ({ form }: ElevatorOperationalStatusProps) => {
  return (
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
  );
};

export default ElevatorOperationalStatus;
