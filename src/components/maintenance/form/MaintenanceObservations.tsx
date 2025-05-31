
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface MaintenanceObservationsProps {
  form: UseFormReturn<any>;
}

const MaintenanceObservations = ({ form }: MaintenanceObservationsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="unusual_noise"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Unusual Noise</FormLabel>
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

      {form.watch("unusual_noise") && (
        <FormField
          control={form.control}
          name="unusual_noise_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Noise Description</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  value={field.value || ""} 
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="vibration_observed"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Vibration Observed</FormLabel>
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

      {form.watch("vibration_observed") && (
        <FormField
          control={form.control}
          name="vibration_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vibration Description</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  value={field.value || ""} 
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes (Optional)</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value || ""} 
                className="bg-white"
                placeholder="Enter any additional observations or notes (optional)"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MaintenanceObservations;
