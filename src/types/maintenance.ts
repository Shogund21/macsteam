import { Database } from "@/integrations/supabase/types";

export type MaintenanceCheckStatus = Database["public"]["Enums"]["maintenance_check_status"];

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

export interface Technician {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  isAvailable: boolean;
}

export interface MaintenanceCheck {
  id: string;
  check_date: string | null;
  equipment_id: string | null;
  technician_id: string | null;
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
  equipment?: Equipment;
  technician?: Technician;
}