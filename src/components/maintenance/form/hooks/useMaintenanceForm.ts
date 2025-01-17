import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MaintenanceCheckStatus } from "@/types/maintenance";

const baseSchema = z.object({
  equipment_id: z.string().min(1, "Equipment is required"),
  technician_id: z.string().min(1, "Technician is required"),
  equipment_type: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  unusual_noise: z.boolean().optional().nullable(),
  unusual_noise_description: z.string().optional().nullable(),
  vibration_observed: z.boolean().optional().nullable(),
  vibration_description: z.string().optional().nullable(),
  images: z.array(z.string()).optional().nullable(),
});

const standardHVACSchema = baseSchema.extend({
  chiller_pressure_reading: z.string().optional().nullable(),
  chiller_temperature_reading: z.string().optional().nullable(),
  air_filter_status: z.string().optional().nullable(),
  belt_condition: z.string().optional().nullable(),
  refrigerant_level: z.string().optional().nullable(),
  oil_level_status: z.string().optional().nullable(),
  condenser_condition: z.string().optional().nullable(),
});

const ahuSchema = baseSchema.extend({
  air_filter_cleaned: z.boolean().optional().nullable(),
  fan_belt_condition: z.string().optional().nullable(),
  fan_bearings_lubricated: z.boolean().optional().nullable(),
  fan_noise_level: z.string().optional().nullable(),
  dampers_operation: z.string().optional().nullable(),
  coils_condition: z.string().optional().nullable(),
  sensors_operation: z.string().optional().nullable(),
  motor_condition: z.string().optional().nullable(),
  drain_pan_status: z.string().optional().nullable(),
  airflow_reading: z.string().optional().nullable(),
  airflow_unit: z.string().optional().nullable(),
  troubleshooting_notes: z.string().optional().nullable(),
  corrective_actions: z.string().optional().nullable(),
  maintenance_recommendations: z.string().optional().nullable(),
});

export type MaintenanceFormValues = z.infer<typeof standardHVACSchema> & z.infer<typeof ahuSchema>;

export const useMaintenanceForm = () => {
  return useForm<MaintenanceFormValues>({
    resolver: zodResolver(standardHVACSchema),
    defaultValues: {
      unusual_noise: false,
      vibration_observed: false,
      air_filter_cleaned: false,
      fan_bearings_lubricated: false,
    },
  });
};