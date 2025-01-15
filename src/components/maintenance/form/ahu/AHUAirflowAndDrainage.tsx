import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface AHUAirflowAndDrainageProps {
  form: UseFormReturn<any>;
}

const AHUAirflowAndDrainage = ({ form }: AHUAirflowAndDrainageProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="drain_pan_status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Drain Pan Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="popper" className="bg-white z-[100]">
                <SelectItem value="clear">Clear</SelectItem>
                <SelectItem value="partially_blocked">Partially Blocked</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="airflow_reading"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Airflow Reading</FormLabel>
            <FormControl>
              <Input type="number" {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="airflow_unit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Airflow Unit</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="popper" className="bg-white z-[100]">
                <SelectItem value="cfm">CFM</SelectItem>
                <SelectItem value="m3/h">m³/h</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AHUAirflowAndDrainage;