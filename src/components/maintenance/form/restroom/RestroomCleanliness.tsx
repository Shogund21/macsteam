
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import FormSection from "../FormSection";

interface RestroomCleanlinessProps {
  form: UseFormReturn<any>;
}

const RestroomCleanliness = ({ form }: RestroomCleanlinessProps) => {
  return (
    <FormSection title="Cleanliness">
      <FormField
        control={form.control}
        name="floor_cleaned"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Floor Cleaned</FormLabel>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="surfaces_cleaned"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Surfaces Cleaned</FormLabel>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
};

export default RestroomCleanliness;
