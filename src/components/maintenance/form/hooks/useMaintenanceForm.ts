import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const maintenanceFormSchema = z.object({
  equipment_id: z.string().min(1, "Equipment is required"),
  technician_id: z.string().min(1, "Technician is required"),
  equipment_type: z.string().optional(),
  chiller_pressure_reading: z.string().min(1, "Pressure reading is required"),
  chiller_temperature_reading: z.string().min(1, "Temperature reading is required"),
  air_filter_status: z.string().min(1, "Air filter status is required"),
  belt_condition: z.string().min(1, "Belt condition is required"),
  refrigerant_level: z.string().min(1, "Refrigerant level is required"),
  unusual_noise: z.boolean().default(false),
  unusual_noise_description: z.string().optional(),
  vibration_observed: z.boolean().default(false),
  vibration_description: z.string().optional(),
  oil_level_status: z.string().min(1, "Oil level status is required"),
  condenser_condition: z.string().min(1, "Condenser condition is required"),
  notes: z.string().optional(),
  // AHU specific fields
  air_filter_cleaned: z.boolean().optional(),
  fan_belt_condition: z.string().optional(),
  fan_bearings_lubricated: z.boolean().optional(),
  fan_noise_level: z.string().optional(),
  dampers_operation: z.string().optional(),
  coils_condition: z.string().optional(),
  sensors_operation: z.string().optional(),
  motor_condition: z.string().optional(),
  drain_pan_status: z.string().optional(),
  airflow_reading: z.string().optional(),
  airflow_unit: z.string().optional(),
  troubleshooting_notes: z.string().optional(),
  corrective_actions: z.string().optional(),
  maintenance_recommendations: z.string().optional(),
  images: z.array(z.string()).optional(),
  // Cooling Tower specific fields
  general_inspection: z.string().optional(),
  water_system_status: z.string().optional(),
  fill_media_condition: z.string().optional(),
  drift_eliminators_condition: z.string().optional(),
  fan_assembly_status: z.string().optional(),
  motor_lubrication_status: z.string().optional(),
  pump_seals_condition: z.string().optional(),
  strainer_status: z.string().optional(),
  sump_basin_condition: z.string().optional(),
  drainage_system_status: z.string().optional(),
  control_system_status: z.string().optional(),
  sensor_status: z.string().optional(),
  seasonal_preparation_status: z.string().optional(),
  vibration_monitoring: z.string().optional(),
  emergency_shutdown_status: z.string().optional(),
  safety_features_status: z.string().optional(),
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