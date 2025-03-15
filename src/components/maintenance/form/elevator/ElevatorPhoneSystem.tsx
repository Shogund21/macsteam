
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import FormSection from "../FormSection";

interface ElevatorPhoneSystemProps {
  form: UseFormReturn<any>;
}

const ElevatorPhoneSystem = ({ form }: ElevatorPhoneSystemProps) => {
  return (
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
  );
};

export default ElevatorPhoneSystem;
