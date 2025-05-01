
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { LocationFormValues } from "../schemas/locationSchema";

interface LocationNameFieldProps {
  form: UseFormReturn<LocationFormValues>;
}

export const LocationNameField = ({ form }: LocationNameFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location Name (Optional)</FormLabel>
          <FormControl>
            <Input placeholder="Enter location name (will use store number if empty)" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
