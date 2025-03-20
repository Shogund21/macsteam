
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

export interface MaintenanceDocument {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  category: string;
  equipment_id?: string;
  maintenance_check_id?: string;
  uploaded_by?: string;
  uploaded_at: string;
  comments?: string;
  tags?: string[];
  project_id?: string;
}

export interface MaintenanceCheck {
  id: string;
  check_date: string | null;
  equipment_id: string | null;
  technician_id: string | null;
  equipment_type: string | null;
  location_id?: string | null;
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
  equipment?: MaintenanceEquipment;
  technician?: MaintenanceTechnician;
}
