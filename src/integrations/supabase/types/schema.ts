export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      equipment: {
        Row: {
          id: string;
          name: string;
          model: string;
          serialNumber: string;
          location: string;
          lastMaintenance: string | null;
          nextMaintenance: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          name: string;
          model: string;
          serialNumber: string;
          location: string;
          lastMaintenance?: string | null;
          nextMaintenance?: string | null;
          status: string;
        };
        Update: {
          id?: string;
          name?: string;
          model?: string;
          serialNumber?: string;
          location?: string;
          lastMaintenance?: string | null;
          nextMaintenance?: string | null;
          status?: string;
        };
      };
      hvac_maintenance_checks: {
        Row: {
          air_filter_status: string | null
          belt_condition: string | null
          check_date: string | null
          chiller_pressure_reading: number | null
          chiller_temperature_reading: number | null
          condenser_condition: string | null
          created_at: string | null
          equipment_id: string | null
          id: string
          notes: string | null
          oil_level_status: string | null
          refrigerant_level: string | null
          status: Database["public"]["Enums"]["maintenance_check_status"] | null
          technician_id: string | null
          unusual_noise: boolean | null
          unusual_noise_description: string | null
          updated_at: string | null
          vibration_description: string | null
          vibration_observed: boolean | null
        }
        Insert: {
          air_filter_status?: string | null
          belt_condition?: string | null
          check_date?: string | null
          chiller_pressure_reading?: number | null
          chiller_temperature_reading?: number | null
          condenser_condition?: string | null
          created_at?: string | null
          equipment_id?: string | null
          id?: string
          notes?: string | null
          oil_level_status?: string | null
          refrigerant_level?: string | null
          status?:
            | Database["public"]["Enums"]["maintenance_check_status"]
            | null
          technician_id?: string | null
          unusual_noise?: boolean | null
          unusual_noise_description?: string | null
          updated_at?: string | null
          vibration_description?: string | null
          vibration_observed?: boolean | null
        }
        Update: {
          air_filter_status?: string | null
          belt_condition?: string | null
          check_date?: string | null
          chiller_pressure_reading?: number | null
          chiller_temperature_reading?: number | null
          condenser_condition?: string | null
          created_at?: string | null
          equipment_id?: string | null
          id?: string
          notes?: string | null
          oil_level_status?: string | null
          refrigerant_level?: string | null
          status?:
            | Database["public"]["Enums"]["maintenance_check_status"]
            | null
          technician_id?: string | null
          unusual_noise?: boolean | null
          unusual_noise_description?: string | null
          updated_at?: string | null
          vibration_description?: string | null
          vibration_observed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "hvac_maintenance_checks_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hvac_maintenance_checks_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          createdat: string | null
          description: string | null
          enddate: string | null
          id: string
          location: string | null
          name: string
          priority: string
          startdate: string | null
          status: string
          updatedat: string | null
        }
        Insert: {
          createdat?: string | null
          description?: string | null
          enddate?: string | null
          id?: string
          location?: string | null
          name: string
          priority: string
          startdate?: string | null
          status: string
          updatedat?: string | null
        }
        Update: {
          createdat?: string | null
          description?: string | null
          enddate?: string | null
          id?: string
          location?: string | null
          name?: string
          priority?: string
          startdate?: string | null
          status?: string
          updatedat?: string | null
        }
        Relationships: []
      }
      technicians: {
        Row: {
          createdAt: string | null
          email: string
          firstName: string
          id: string
          isAvailable: boolean | null
          lastName: string
          phone: string
          specialization: string
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string | null
          email: string
          firstName: string
          id?: string
          isAvailable?: boolean | null
          lastName: string
          phone: string
          specialization: string
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string | null
          email?: string
          firstName?: string
          id?: string
          isAvailable?: boolean | null
          lastName?: string
          phone?: string
          specialization?: string
          updatedAt?: string | null
        }
        Relationships: []
      }
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      maintenance_check_status: "completed" | "pending" | "issue_found";
    };
    CompositeTypes: Record<string, never>;
  };
}
