import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface AHUConditionChecksProps {
  form: UseFormReturn<any>;
}

const AHUConditionChecks = ({ form }: AHUConditionChecksProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="coils_condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Coils Condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="popper" className="bg-white z-[100]">
                <SelectItem value="clean">Clean</SelectItem>
                <SelectItem value="needs_cleaning">Needs Cleaning</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sensors_operation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sensors Operation</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select operation status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="popper" className="bg-white z-[100]">
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="needs_calibration">Needs Calibration</SelectItem>
                <SelectItem value="faulty">Faulty</SelectItem>
                <SelectItem value="na">N/A</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="motor_condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Motor Condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="popper" className="bg-white z-[100]">
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="overheating">Overheating</SelectItem>
                <SelectItem value="needs_service">Needs Service</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AHUConditionChecks;