
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { LocationFormValues } from "../schemas/locationSchema";

interface StoreNumberFieldProps {
  form: UseFormReturn<LocationFormValues>;
}

export const StoreNumberField = ({ form }: StoreNumberFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="store_number"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Store Number</FormLabel>
          <FormControl>
            <Input placeholder="Enter store number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
