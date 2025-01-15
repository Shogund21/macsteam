import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface AHUMaintenanceFieldsProps {
  form: UseFormReturn<any>;
}

const AHUMaintenanceFields = ({ form }: AHUMaintenanceFieldsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">AHU Daily Preventative Maintenance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Air Filter Status */}
        <FormField
          control={form.control}
          name="air_filter_cleaned"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Air Filter Cleaned</FormLabel>
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

        {/* Fan Belt Condition */}
        <FormField
          control={form.control}
          name="fan_belt_condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fan Belt Condition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent position="popper" className="bg-white z-[100]">
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="needs_replacement">Needs Replacement</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fan Bearings */}
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

        {/* Fan Noise Level */}
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

        {/* Dampers Operation */}
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

        {/* Coils Condition */}
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

        {/* Sensors Operation */}
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

        {/* Motor Condition */}
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

        {/* Drain Pan Status */}
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

        {/* Airflow Reading */}
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

        {/* Airflow Unit */}
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
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="troubleshooting_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Troubleshooting Notes</FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-white" placeholder="Document any troubleshooting performed..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="corrective_actions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Corrective Actions Taken</FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-white" placeholder="List any corrective actions taken..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maintenance_recommendations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maintenance Recommendations</FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-white" placeholder="Provide recommendations for future maintenance..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AHUMaintenanceFields;