
import React from "react";
import { UseFormReturn } from "react-hook-form";
import FormSection from "./FormSection";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";

interface RestroomMaintenanceFieldsProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const RestroomMaintenanceFields = ({ form }: RestroomMaintenanceFieldsProps) => {
  return (
    <div className="space-y-6">
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

      <FormSection title="Cleanliness & Supplies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="cleanliness_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overall Cleanliness</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="needs_cleaning">Needs Immediate Cleaning</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="soap_supply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soap Supply</FormLabel>
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
                    <SelectItem value="full">Full</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="empty">Empty</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="toilet_paper_supply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Toilet Paper Supply</FormLabel>
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
                    <SelectItem value="full">Full</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="empty">Empty</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="floor_condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor Condition</FormLabel>
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
                    <SelectItem value="dry_clean">Dry & Clean</SelectItem>
                    <SelectItem value="wet">Wet</SelectItem>
                    <SelectItem value="dirty">Dirty</SelectItem>
                    <SelectItem value="needs_attention">Needs Attention</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </FormSection>

      <FormSection title="Notes">
        <FormField
          control={form.control}
          name="restroom_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional notes or observations about the restroom condition"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>
    </div>
  );
};

export default RestroomMaintenanceFields;
