
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormSection from "../FormSection";

interface ElevatorLightingStatusProps {
  form: UseFormReturn<any>;
}

const ElevatorLightingStatus = ({ form }: ElevatorLightingStatusProps) => {
  return (
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
  );
};

export default ElevatorLightingStatus;
