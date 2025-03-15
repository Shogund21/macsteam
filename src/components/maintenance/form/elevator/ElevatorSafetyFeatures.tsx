
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MaintenanceFormValues } from "../hooks/useMaintenanceForm";
import FormSection from "../FormSection";

interface ElevatorSafetyFeaturesProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const ElevatorSafetyFeatures = ({ form }: ElevatorSafetyFeaturesProps) => {
  return (
    <FormSection title="Elevator Safety Features">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="emergency_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Phone</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="working">Working</SelectItem>
                  <SelectItem value="not_working">Not Working</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="elevator_lighting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lighting Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all_working">All Working</SelectItem>
                  <SelectItem value="partial">Partially Working</SelectItem>
                  <SelectItem value="not_working">Not Working</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alarm_button"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-4">
              <div className="space-y-0.5">
                <FormLabel>Alarm Button Functional</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
};

export default ElevatorSafetyFeatures;
