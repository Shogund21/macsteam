
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { LocationFormValues } from "../schemas/locationSchema";

interface ActiveStatusFieldProps {
  form: UseFormReturn<LocationFormValues>;
}

export const ActiveStatusField = ({ form }: ActiveStatusFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="is_active"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">
              Active
            </FormLabel>
            <p className="text-sm text-muted-foreground">
              Is this location currently active?
            </p>
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
  );
};
