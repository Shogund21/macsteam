
export interface MaintenanceChecksTable {
  Row: {
    id: string;
    check_date: string | null;
    equipment_id: string | null;
    technician_id: string | null;
    equipment_type: string | null;
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
    status: 'completed' | 'pending' | 'issue_found' | null;
    created_at: string | null;
    updated_at: string | null;
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
    
    // Motor Performance Fields
    active_current_limit_setpoint: string | null;
    average_motor_current_pla: string | null;
    motor_frequency: string | null;
    starter_motor_current_l1: string | null;
    starter_motor_current_l2: string | null;
    starter_motor_current_l3: string | null;
    
    // Evaporator Fields
    active_chilled_water_setpoint: string | null;
    evap_leaving_water_temp: string | null;
    evap_entering_water_temp: string | null;
    evap_sat_rfgt_temp: string | null;
    evap_rfgt_pressure: string | null;
    evap_approach_temp: string | null;
    
    // Condenser Fields
    cond_entering_water_temp: string | null;
    cond_leaving_water_temp: string | null;
    cond_sat_rfgt_temp: string | null;
    cond_rfgt_pressure: string | null;
    cond_approach_temp: string | null;
    differential_refrigerant_pressure: string | null;
    
    // Compressor Fields
    compressor_running_status: string | null;
    chiller_control_signal: string | null;
    compressor_starts_count: string | null;
    oil_differential_pressure: string | null;
    oil_pump_discharge_pressure: string | null;
    oil_tank_pressure: string | null;
    compressor_running_time: string | null;
    compressor_refrigerant_discharge_temp: string | null;
  };
  Insert: {
    id?: string;
    check_date?: string | null;
    equipment_id?: string | null;
    technician_id?: string | null;
    equipment_type?: string | null;
    chiller_pressure_reading?: number | null;
    chiller_temperature_reading?: number | null;
    air_filter_status?: string | null;
    belt_condition?: string | null;
    refrigerant_level?: string | null;
    unusual_noise?: boolean | null;
    unusual_noise_description?: string | null;
    vibration_observed?: boolean | null;
    vibration_description?: string | null;
    oil_level_status?: string | null;
    condenser_condition?: string | null;
    notes?: string | null;
    status?: 'completed' | 'pending' | 'issue_found' | null;
    created_at?: string | null;
    updated_at?: string | null;
    air_filter_cleaned?: boolean | null;
    fan_belt_condition?: string | null;
    fan_bearings_lubricated?: boolean | null;
    fan_noise_level?: string | null;
    dampers_operation?: string | null;
    coils_condition?: string | null;
    sensors_operation?: string | null;
    motor_condition?: string | null;
    drain_pan_status?: string | null;
    airflow_reading?: number | null;
    airflow_unit?: string | null;
    troubleshooting_notes?: string | null;
    corrective_actions?: string | null;
    maintenance_recommendations?: string | null;
    images?: string[] | null;
    
    // Motor Performance Fields
    active_current_limit_setpoint?: string | null;
    average_motor_current_pla?: string | null;
    motor_frequency?: string | null;
    starter_motor_current_l1?: string | null;
    starter_motor_current_l2?: string | null;
    starter_motor_current_l3?: string | null;
    
    // Evaporator Fields
    active_chilled_water_setpoint?: string | null;
    evap_leaving_water_temp?: string | null;
    evap_entering_water_temp?: string | null;
    evap_sat_rfgt_temp?: string | null;
    evap_rfgt_pressure?: string | null;
    evap_approach_temp?: string | null;
    
    // Condenser Fields
    cond_entering_water_temp?: string | null;
    cond_leaving_water_temp?: string | null;
    cond_sat_rfgt_temp?: string | null;
    cond_rfgt_pressure?: string | null;
    cond_approach_temp?: string | null;
    differential_refrigerant_pressure?: string | null;
    
    // Compressor Fields
    compressor_running_status?: string | null;
    chiller_control_signal?: string | null;
    compressor_starts_count?: string | null;
    oil_differential_pressure?: string | null;
    oil_pump_discharge_pressure?: string | null;
    oil_tank_pressure?: string | null;
    compressor_running_time?: string | null;
    compressor_refrigerant_discharge_temp?: string | null;
  };
  Update: {
    id?: string;
    check_date?: string | null;
    equipment_id?: string | null;
    technician_id?: string | null;
    equipment_type?: string | null;
    chiller_pressure_reading?: number | null;
    chiller_temperature_reading?: number | null;
    air_filter_status?: string | null;
    belt_condition?: string | null;
    refrigerant_level?: string | null;
    unusual_noise?: boolean | null;
    unusual_noise_description?: string | null;
    vibration_observed?: boolean | null;
    vibration_description?: string | null;
    oil_level_status?: string | null;
    condenser_condition?: string | null;
    notes?: string | null;
    status?: 'completed' | 'pending' | 'issue_found' | null;
    created_at?: string | null;
    updated_at?: string | null;
    air_filter_cleaned?: boolean | null;
    fan_belt_condition?: string | null;
    fan_bearings_lubricated?: boolean | null;
    fan_noise_level?: string | null;
    dampers_operation?: string | null;
    coils_condition?: string | null;
    sensors_operation?: string | null;
    motor_condition?: string | null;
    drain_pan_status?: string | null;
    airflow_reading?: number | null;
    airflow_unit?: string | null;
    troubleshooting_notes?: string | null;
    corrective_actions?: string | null;
    maintenance_recommendations?: string | null;
    images?: string[] | null;
    
    // Motor Performance Fields
    active_current_limit_setpoint?: string | null;
    average_motor_current_pla?: string | null;
    motor_frequency?: string | null;
    starter_motor_current_l1?: string | null;
    starter_motor_current_l2?: string | null;
    starter_motor_current_l3?: string | null;
    
    // Evaporator Fields
    active_chilled_water_setpoint?: string | null;
    evap_leaving_water_temp?: string | null;
    evap_entering_water_temp?: string | null;
    evap_sat_rfgt_temp?: string | null;
    evap_rfgt_pressure?: string | null;
    evap_approach_temp?: string | null;
    
    // Condenser Fields
    cond_entering_water_temp?: string | null;
    cond_leaving_water_temp?: string | null;
    cond_sat_rfgt_temp?: string | null;
    cond_rfgt_pressure?: string | null;
    cond_approach_temp?: string | null;
    differential_refrigerant_pressure?: string | null;
    
    // Compressor Fields
    compressor_running_status?: string | null;
    chiller_control_signal?: string | null;
    compressor_starts_count?: string | null;
    oil_differential_pressure?: string | null;
    oil_pump_discharge_pressure?: string | null;
    oil_tank_pressure?: string | null;
    compressor_running_time?: string | null;
    compressor_refrigerant_discharge_temp?: string | null;
  };
}
