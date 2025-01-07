import { Database } from "@/integrations/supabase/types";

export type MaintenanceCheckStatus = Database["public"]["Enums"]["maintenance_check_status"];

export interface MaintenanceCheck {
  id: string;
  check_date: string;
  equipment_id: string;
  technician_id: string;
  chiller_pressure_reading: number;
  chiller_temperature_reading: number;
  air_filter_status: string;
  belt_condition: string;
  refrigerant_level: string;
  unusual_noise: boolean;
  unusual_noise_description?: string;
  vibration_observed: boolean;
  vibration_description?: string;
  oil_level_status: string;
  condenser_condition: string;
  notes?: string;
  status: MaintenanceCheckStatus;
  equipment?: {
    name: string;
    location: string;
  };
  technician?: {
    firstName: string;
    lastName: string;
  };
}