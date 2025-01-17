export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      equipment: {
        Row: {
          id: string
          lastMaintenance: string | null
          location: string
          model: string
          name: string
          nextMaintenance: string | null
          serialNumber: string
          status: string
        }
        Insert: {
          id?: string
          lastMaintenance?: string | null
          location: string
          model: string
          name: string
          nextMaintenance?: string | null
          serialNumber: string
          status: string
        }
        Update: {
          id?: string
          lastMaintenance?: string | null
          location?: string
          model?: string
          name?: string
          nextMaintenance?: string | null
          serialNumber?: string
          status?: string
        }
        Relationships: []
      }
      hvac_maintenance_checks: {
        Row: {
          air_filter_cleaned: boolean | null
          air_filter_status: string | null
          airflow_reading: number | null
          airflow_unit: string | null
          belt_condition: string | null
          check_date: string | null
          chiller_pressure_reading: number | null
          chiller_temperature_reading: number | null
          coils_condition: string | null
          condenser_condition: string | null
          corrective_actions: string | null
          created_at: string | null
          dampers_operation: string | null
          drain_pan_status: string | null
          equipment_id: string | null
          equipment_type: string | null
          fan_bearings_lubricated: boolean | null
          fan_belt_condition: string | null
          fan_noise_level: string | null
          id: string
          images: string[] | null
          maintenance_recommendations: string | null
          motor_condition: string | null
          notes: string | null
          oil_level_status: string | null
          refrigerant_level: string | null
          sensors_operation: string | null
          status: Database["public"]["Enums"]["maintenance_check_status"] | null
          technician_id: string | null
          troubleshooting_notes: string | null
          unusual_noise: boolean | null
          unusual_noise_description: string | null
          updated_at: string | null
          vibration_description: string | null
          vibration_observed: boolean | null
        }
        Insert: {
          air_filter_cleaned?: boolean | null
          air_filter_status?: string | null
          airflow_reading?: number | null
          airflow_unit?: string | null
          belt_condition?: string | null
          check_date?: string | null
          chiller_pressure_reading?: number | null
          chiller_temperature_reading?: number | null
          coils_condition?: string | null
          condenser_condition?: string | null
          corrective_actions?: string | null
          created_at?: string | null
          dampers_operation?: string | null
          drain_pan_status?: string | null
          equipment_id?: string | null
          equipment_type?: string | null
          fan_bearings_lubricated?: boolean | null
          fan_belt_condition?: string | null
          fan_noise_level?: string | null
          id?: string
          images?: string[] | null
          maintenance_recommendations?: string | null
          motor_condition?: string | null
          notes?: string | null
          oil_level_status?: string | null
          refrigerant_level?: string | null
          sensors_operation?: string | null
          status?:
            | Database["public"]["Enums"]["maintenance_check_status"]
            | null
          technician_id?: string | null
          troubleshooting_notes?: string | null
          unusual_noise?: boolean | null
          unusual_noise_description?: string | null
          updated_at?: string | null
          vibration_description?: string | null
          vibration_observed?: boolean | null
        }
        Update: {
          air_filter_cleaned?: boolean | null
          air_filter_status?: string | null
          airflow_reading?: number | null
          airflow_unit?: string | null
          belt_condition?: string | null
          check_date?: string | null
          chiller_pressure_reading?: number | null
          chiller_temperature_reading?: number | null
          coils_condition?: string | null
          condenser_condition?: string | null
          corrective_actions?: string | null
          created_at?: string | null
          dampers_operation?: string | null
          drain_pan_status?: string | null
          equipment_id?: string | null
          equipment_type?: string | null
          fan_bearings_lubricated?: boolean | null
          fan_belt_condition?: string | null
          fan_noise_level?: string | null
          id?: string
          images?: string[] | null
          maintenance_recommendations?: string | null
          motor_condition?: string | null
          notes?: string | null
          oil_level_status?: string | null
          refrigerant_level?: string | null
          sensors_operation?: string | null
          status?:
            | Database["public"]["Enums"]["maintenance_check_status"]
            | null
          technician_id?: string | null
          troubleshooting_notes?: string | null
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
      maintenance_documents: {
        Row: {
          category: string
          comments: string | null
          equipment_id: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          maintenance_check_id: string | null
          project_id: string | null
          tags: string[] | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          category: string
          comments?: string | null
          equipment_id?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          maintenance_check_id?: string | null
          project_id?: string | null
          tags?: string[] | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          category?: string
          comments?: string | null
          equipment_id?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          maintenance_check_id?: string | null
          project_id?: string | null
          tags?: string[] | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_documents_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_documents_maintenance_check_id_fkey"
            columns: ["maintenance_check_id"]
            isOneToOne: false
            referencedRelation: "hvac_maintenance_checks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      maintenance_check_status: "completed" | "pending" | "issue_found"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
