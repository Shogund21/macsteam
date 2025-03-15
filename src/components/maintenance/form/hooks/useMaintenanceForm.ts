
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MaintenanceCheck } from "@/types/maintenance";

const naString = z.union([z.string(), z.literal("NA")]);

export const maintenanceFormSchema = z.object({
  selected_location: z.string().optional(),
  equipment_id: z.string().min(1, "Equipment is required"),
  technician_id: z.string().min(1, "Technician is required"),
  equipment_type: z.string().optional(),
  
  // Standard HVAC fields
  chiller_pressure_reading: naString.optional(),
  chiller_temperature_reading: naString.optional(),
  air_filter_status: naString.optional(),
  belt_condition: naString.optional(),
  refrigerant_level: naString.optional(),
  unusual_noise: z.boolean().default(false),
  unusual_noise_description: z.string().optional(),
  vibration_observed: z.boolean().default(false),
  vibration_description: z.string().optional(),
  oil_level_status: naString.optional(),
  condenser_condition: naString.optional(),
  notes: z.string().optional(),
  
  // AHU specific fields
  air_filter_cleaned: z.boolean().optional(),
  fan_belt_condition: naString.optional(),
  fan_bearings_lubricated: z.boolean().optional(),
  fan_noise_level: naString.optional(),
  dampers_operation: naString.optional(),
  coils_condition: naString.optional(),
  sensors_operation: naString.optional(),
  motor_condition: naString.optional(),
  drain_pan_status: naString.optional(),
  airflow_reading: naString.optional(),
  airflow_unit: z.string().optional(),
  
  // Restroom specific fields
  sink_operation: z.string().optional(),
  sink_water_pressure: z.string().optional(),
  sink_leakage: z.boolean().optional(),
  toilet_operation: z.string().optional(),
  toilet_flush_quality: z.string().optional(),
  toilet_leakage: z.boolean().optional(),
  cleanliness_level: z.string().optional(),
  supplies_status: z.string().optional(),
  restroom_notes: z.string().optional(),
  
  // Elevator specific fields
  elevator_operation: z.string().optional(),
  door_operation: z.string().optional(),
  unusual_noises: z.boolean().optional(),
  emergency_phone: z.string().optional(),
  phone_test_date: z.string().optional(),
  lighting_status: z.string().optional(),
  emergency_lighting: z.string().optional(),
  elevator_notes: z.string().optional(),
  
  // Common fields
  troubleshooting_notes: z.string().optional(),
  corrective_actions: z.string().optional(),
  maintenance_recommendations: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export type MaintenanceFormValues = z.infer<typeof maintenanceFormSchema>;

export const useMaintenanceForm = (initialData?: MaintenanceCheck) => {
  const defaultValues = initialData
    ? {
        ...initialData,
        chiller_pressure_reading: initialData.chiller_pressure_reading?.toString() || "NA",
        chiller_temperature_reading: initialData.chiller_temperature_reading?.toString() || "NA",
        airflow_reading: initialData.airflow_reading?.toString() || "NA",
      }
    : {
        unusual_noise: false,
        vibration_observed: false,
        air_filter_cleaned: false,
        fan_bearings_lubricated: false,
        sink_leakage: false,
        toilet_leakage: false,
        unusual_noises: false,
        selected_location: "",
        equipment_id: "",
        technician_id: "",
      };

  return useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceFormSchema),
    defaultValues,
    mode: "onSubmit",
  });
};
