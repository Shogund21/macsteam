import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const maintenanceFormSchema = z.object({
  equipment_id: z.string({ required_error: "Equipment is required" }),
  technician_id: z.string({ required_error: "Technician is required" }),
  equipment_type: z.string().nullable().optional(),
  chiller_pressure_reading: z.string().nullable().optional(),
  chiller_temperature_reading: z.string().nullable().optional(),
  air_filter_status: z.string().nullable().optional(),
  belt_condition: z.string().nullable().optional(),
  refrigerant_level: z.string().nullable().optional(),
  unusual_noise: z.boolean().nullable().optional(),
  unusual_noise_description: z.string().nullable().optional(),
  vibration_observed: z.boolean().nullable().optional(),
  vibration_description: z.string().nullable().optional(),
  oil_level_status: z.string().nullable().optional(),
  condenser_condition: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  air_filter_cleaned: z.boolean().nullable().optional(),
  fan_belt_condition: z.string().nullable().optional(),
  fan_bearings_lubricated: z.boolean().nullable().optional(),
  fan_noise_level: z.string().nullable().optional(),
  dampers_operation: z.string().nullable().optional(),
  coils_condition: z.string().nullable().optional(),
  sensors_operation: z.string().nullable().optional(),
  motor_condition: z.string().nullable().optional(),
  drain_pan_status: z.string().nullable().optional(),
  airflow_reading: z.string().nullable().optional(),
  airflow_unit: z.string().nullable().optional(),
  troubleshooting_notes: z.string().nullable().optional(),
  corrective_actions: z.string().nullable().optional(),
  maintenance_recommendations: z.string().nullable().optional(),
  images: z.array(z.string()).nullable().optional(),
});

export type MaintenanceFormValues = z.infer<typeof maintenanceFormSchema>;

export const useMaintenanceForm = () => {
  return useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceFormSchema),
    defaultValues: {
      unusual_noise: false,
      vibration_observed: false,
      air_filter_cleaned: false,
      fan_bearings_lubricated: false,
    },
  });
};