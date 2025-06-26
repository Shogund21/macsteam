
import * as z from "zod";

/**
 * String field that can also be "NA"
 */
export const naString = z.union([z.string(), z.literal("NA")]);

/**
 * Zod schema for maintenance form validation
 */
export const maintenanceFormSchema = z.object({
  selected_location: z.string().optional(),
  location_id: z.string().optional(),
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
  notes: z.string().optional().nullable(),
  
  // Motor Performance Fields
  active_current_limit_setpoint: z.string().optional(),
  average_motor_current_pla: z.string().optional(),
  motor_frequency: z.string().optional(),
  starter_motor_current_l1: z.string().optional(),
  starter_motor_current_l2: z.string().optional(),
  starter_motor_current_l3: z.string().optional(),
  
  // Evaporator Fields
  active_chilled_water_setpoint: z.string().optional(),
  evap_leaving_water_temp: z.string().optional(),
  evap_entering_water_temp: z.string().optional(),
  evap_sat_rfgt_temp: z.string().optional(),
  evap_rfgt_pressure: z.string().optional(),
  evap_approach_temp: z.string().optional(),
  
  // Condenser Fields
  cond_entering_water_temp: z.string().optional(),
  cond_leaving_water_temp: z.string().optional(),
  cond_sat_rfgt_temp: z.string().optional(),
  cond_rfgt_pressure: z.string().optional(),
  cond_approach_temp: z.string().optional(),
  differential_refrigerant_pressure: z.string().optional(),
  
  // Compressor Fields
  compressor_running_status: z.string().optional(),
  chiller_control_signal: z.string().optional(),
  compressor_starts_count: z.string().optional(),
  oil_differential_pressure: z.string().optional(),
  oil_pump_discharge_pressure: z.string().optional(),
  oil_tank_pressure: z.string().optional(),
  compressor_running_time: z.string().optional(),
  compressor_refrigerant_discharge_temp: z.string().optional(),
  
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
  
  // Elevator fields
  elevator_operation: z.string().optional(),
  door_operation: z.string().optional(),
  unusual_noise_elevator: z.boolean().optional(),
  vibration_elevator: z.boolean().optional(),
  emergency_phone: z.string().optional(),
  elevator_lighting: z.string().optional(),
  elevator_notes: z.string().optional().nullable(),
  
  // Restroom fields
  sink_status: z.string().optional(),
  toilet_status: z.string().optional(),
  urinal_status: z.string().optional(),
  hand_dryer_status: z.string().optional(),
  cleanliness_level: z.string().optional(),
  soap_supply: z.string().optional(),
  toilet_paper_supply: z.string().optional(),
  floor_condition: z.string().optional(),
  restroom_notes: z.string().optional().nullable(),
  
  // Common fields
  troubleshooting_notes: z.string().optional().nullable(),
  corrective_actions: z.string().optional().nullable(),
  maintenance_recommendations: z.string().optional().nullable(),
  images: z.array(z.string()).optional(),
});

/**
 * Type definition for form values inferred from schema
 */
export type MaintenanceFormValues = z.infer<typeof maintenanceFormSchema>;
