
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MaintenanceFormValues } from "../hooks/useMaintenanceForm";
import FormSection from "../FormSection";

interface ElevatorSafetyFeaturesProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const ElevatorSafetyFeatures = ({ form }: ElevatorSafetyFeaturesProps) => {
  return (
    <FormSection title="Safety Features">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="emergency_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Phone</FormLabel>
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
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="non_operational">Non-operational</SelectItem>
                  <SelectItem value="not_tested">Not Tested</SelectItem>
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
              <FormLabel>Elevator Lighting</FormLabel>
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
                  <SelectItem value="fully_functional">Fully Functional</SelectItem>
                  <SelectItem value="partially_functional">Partially Functional</SelectItem>
                  <SelectItem value="non_operational">Non-operational</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
};

export default ElevatorSafetyFeatures;
