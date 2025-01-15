import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";

interface AHUFanAndDampersProps {
  form: UseFormReturn<any>;
}

const AHUFanAndDampers = ({ form }: AHUFanAndDampersProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="fan_bearings_lubricated"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Fan Bearings Lubricated</FormLabel>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fan_noise_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fan Noise Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select noise level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="popper" className="bg-white z-[100]">
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="slight">Slight Noise</SelectItem>
                <SelectItem value="concerning">Concerning Noise</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dampers_operation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dampers Operation</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select operation status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="popper" className="bg-white z-[100]">
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="restricted">Restricted</SelectItem>
                <SelectItem value="faulty">Faulty</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AHUFanAndDampers;