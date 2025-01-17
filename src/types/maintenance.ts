import { Database } from "@/integrations/supabase/types";

export type MaintenanceCheckStatus = Database["public"]["Enums"]["maintenance_check_status"];

// Full Equipment type for forms
export interface Equipment {
  id: string;
  name: string;
  location: string;
  model: string;
  serialNumber: string;
  lastMaintenance: string | null;
  nextMaintenance: string | null;
  status: string;
}

// Full Technician type for forms
export interface Technician {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Simplified Equipment type for maintenance checks
export interface MaintenanceEquipment {
  name: string;
  location: string;
}

// Simplified Technician type for maintenance checks
export interface MaintenanceTechnician {
  firstName: string;
  lastName: string;
}

export interface MaintenanceCheck {
  id: string;
  check_date: string | null;
  equipment_id: string | null;
  technician_id: string | null;
  equipment_type: string | null;
  // Standard HVAC fields
  chiller_pressure_reading: number | null;
  chiller_temperature_reading: number | null;
  air_filter_status: string | null;
  belt_condition: string | null;
  refrigerant_level: string | null;
  unusual_noise: boolean | null;
  unusual_noise_description: string | null;
  vibration_observed: boolean | null;
  vibration_description: string | null;
  oil_level_status: string | null;
  condenser_condition: string | null;
  notes: string | null;
  status: MaintenanceCheckStatus | null;
  // AHU specific fields
  air_filter_cleaned: boolean | null;
  fan_belt_condition: string | null;
  fan_bearings_lubricated: boolean | null;
  fan_noise_level: string | null;
  dampers_operation: string | null;
  coils_condition: string | null;
  sensors_operation: string | null;
  motor_condition: string | null;
  drain_pan_status: string | null;
  airflow_reading: number | null;
  airflow_unit: string | null;
  troubleshooting_notes: string | null;
  corrective_actions: string | null;
  maintenance_recommendations: string | null;
  images: string[] | null;
  // Cooling Tower specific fields
  general_inspection: string | null;
  water_system_status: string | null;
  fill_media_condition: string | null;
  drift_eliminators_condition: string | null;
  fan_assembly_status: string | null;
  motor_lubrication_status: string | null;
  pump_seals_condition: string | null;
  strainer_status: string | null;
  sump_basin_condition: string | null;
  drainage_system_status: string | null;
  control_system_status: string | null;
  sensor_status: string | null;
  seasonal_preparation_status: string | null;
  vibration_monitoring: string | null;
  emergency_shutdown_status: string | null;
  safety_features_status: string | null;
  equipment?: MaintenanceEquipment;
  technician?: MaintenanceTechnician;
}