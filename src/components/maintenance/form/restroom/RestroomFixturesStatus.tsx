
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MaintenanceFormValues } from "../hooks/useMaintenanceForm";
import FormSection from "../FormSection";

interface RestroomFixturesStatusProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const RestroomFixturesStatus = ({ form }: RestroomFixturesStatusProps) => {
  return (
    <FormSection title="Fixtures Status">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="sink_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sinks</FormLabel>
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
                  <SelectItem value="working">All Working</SelectItem>
                  <SelectItem value="partial">Partially Working</SelectItem>
                  <SelectItem value="leaking">Leaking</SelectItem>
                  <SelectItem value="not_working">Not Working</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="toilet_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Toilets</FormLabel>
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
                  <SelectItem value="working">All Working</SelectItem>
                  <SelectItem value="partial">Partially Working</SelectItem>
                  <SelectItem value="clogged">Clogged</SelectItem>
                  <SelectItem value="leaking">Leaking</SelectItem>
                  <SelectItem value="not_working">Not Working</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="urinal_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Urinals</FormLabel>
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
                  <SelectItem value="working">All Working</SelectItem>
                  <SelectItem value="partial">Partially Working</SelectItem>
                  <SelectItem value="clogged">Clogged</SelectItem>
                  <SelectItem value="leaking">Leaking</SelectItem>
                  <SelectItem value="not_working">Not Working</SelectItem>
                  <SelectItem value="na">Not Applicable</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hand_dryer_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hand Dryers/Paper Towel Dispensers</FormLabel>
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
                  <SelectItem value="working">All Working</SelectItem>
                  <SelectItem value="partial">Partially Working</SelectItem>
                  <SelectItem value="empty">Empty/Needs Refill</SelectItem>
                  <SelectItem value="not_working">Not Working</SelectItem>
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

export default RestroomFixturesStatus;
