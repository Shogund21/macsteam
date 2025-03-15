
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";
import FormSection from "./FormSection";
import ElevatorOperationalStatus from "./elevator/ElevatorOperationalStatus";
import ElevatorSafetyFeatures from "./elevator/ElevatorSafetyFeatures";
import ElevatorNotes from "./elevator/ElevatorNotes";

interface ElevatorMaintenanceFieldsProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const ElevatorMaintenanceFields = ({ form }: ElevatorMaintenanceFieldsProps) => {
  return (
    <>
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
                    checked={field.value}
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
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </FormSection>

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
              </FormItem>
            )}
          />
        </div>
      </FormSection>

      <FormSection title="Elevator Notes">
        <FormField
          control={form.control}
          name="elevator_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter any additional observations or notes about the elevator"
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
      </FormSection>
    </>
  );
};

export default ElevatorMaintenanceFields;
