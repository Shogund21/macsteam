
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="elevator_operation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operational Status</FormLabel>
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
                  <SelectItem value="normal">Normal Operation</SelectItem>
                  <SelectItem value="requires_attention">Requires Attention</SelectItem>
                  <SelectItem value="out_of_service">Out of Service</SelectItem>
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
                value={field.value || ""}
                defaultValue={field.value || ""}
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
                  <SelectItem value="obstructed">Obstructed</SelectItem>
                  <SelectItem value="faulty">Faulty</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unusual_noise_elevator"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-4">
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
            <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-4">
              <div className="space-y-0.5">
                <FormLabel>Excessive Vibration</FormLabel>
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
