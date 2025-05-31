
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { useMaintenanceFormContext } from "../context/MaintenanceFormContext";

interface MaintenanceObservationsProps {
  form: UseFormReturn<any>;
}

const MaintenanceObservations = ({ form }: MaintenanceObservationsProps) => {
  const { isMobile } = useMaintenanceFormContext();
  
  console.log('MaintenanceObservations: 📱 MOBILE RENDER:', { isMobile, width: typeof window !== 'undefined' ? window.innerWidth : 'unknown' });
  
  return (
    <div className={`maintenance-observations-container ${isMobile ? 'mobile-observations-layout' : ''} space-y-4`}>
      {isMobile && (
        <div className="mobile-debug-indicator" style={{
          backgroundColor: '#e8f5e8',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#2e7d32',
          marginBottom: '12px',
          fontWeight: 'bold'
        }}>
          📱 Mobile: Maintenance Observations Section
        </div>
      )}
      
      <FormField
        control={form.control}
        name="unusual_noise"
        render={({ field }) => (
          <FormItem className={`flex flex-row items-center justify-between rounded-lg border p-4 ${isMobile ? 'mobile-switch-item' : ''}`}>
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
            <FormItem className={isMobile ? 'mobile-form-item' : ''}>
              <FormLabel>Noise Description</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  value={field.value || ""} 
                  className={`bg-white ${isMobile ? 'mobile-textarea' : ''}`}
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
          <FormItem className={`flex flex-row items-center justify-between rounded-lg border p-4 ${isMobile ? 'mobile-switch-item' : ''}`}>
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
            <FormItem className={isMobile ? 'mobile-form-item' : ''}>
              <FormLabel>Vibration Description</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  value={field.value || ""} 
                  className={`bg-white ${isMobile ? 'mobile-textarea' : ''}`}
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
          <FormItem className={isMobile ? 'mobile-form-item' : ''}>
            <FormLabel>Additional Notes (Optional)</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value || ""} 
                className={`bg-white ${isMobile ? 'mobile-textarea' : ''}`}
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
