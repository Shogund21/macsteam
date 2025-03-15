
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MaintenanceFormValues } from "../hooks/useMaintenanceForm";
import FormSection from "../FormSection";

interface ElevatorOperationalStatusProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const ElevatorOperationalStatus = ({ form }: ElevatorOperationalStatusProps) => {
  return (
    <FormSection title="Elevator Operational Status">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="elevator_operation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Elevator Operation</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value || ""}
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="sluggish">Sluggish</SelectItem>
                  <SelectItem value="erratic">Erratic</SelectItem>
                  <SelectItem value="inoperative">Inoperative</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="door_operation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Door Operation</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value || ""}
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="noisy">Noisy</SelectItem>
                  <SelectItem value="misaligned">Misaligned</SelectItem>
                  <SelectItem value="inoperative">Inoperative</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FormField
          control={form.control}
          name="unusual_noise_elevator"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Unusual Noise</FormLabel>
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

        <FormField
          control={form.control}
          name="vibration_elevator"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Abnormal Vibration</FormLabel>
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

export default ElevatorOperationalStatus;
