
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Thermometer, Gauge, Filter, Settings, Zap, Activity } from "lucide-react";
import ChecklistSection from "./sections/ChecklistSection";
import FormFieldGroup from "./sections/FormFieldGroup";
import { useMaintenanceFormContext } from "../context/MaintenanceFormContext";

interface MaintenanceReadingsProps {
  form: UseFormReturn<any>;
}

const MaintenanceReadings = ({ form }: MaintenanceReadingsProps) => {
  const { isMobile } = useMaintenanceFormContext();
  
  return (
    <div className="w-full space-y-6">
      {/* Motor Performance Section */}
      <ChecklistSection
        title="Motor Performance & Current Readings"
        icon={<Zap className="h-5 w-5" />}
        colorScheme="orange"
      >
        <FormFieldGroup 
          title="Motor Current Analysis"
          description="Record motor current limits and phase readings"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="active_current_limit_setpoint"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  <Activity className="h-4 w-4" />
                  Active Current Limit Setpoint (%)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 80.0"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="average_motor_current_pla"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  <Activity className="h-4 w-4" />
                  Average Motor Current % PLA
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 67.0"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="motor_frequency"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  <Settings className="h-4 w-4" />
                  Motor Frequency (Hz)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 60.0"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>

        <FormFieldGroup 
          title="3-Phase Motor Current Readings"
          description="Record individual phase current readings (Amps)"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="starter_motor_current_l1"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Starter Motor Current L1 (A)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 133.0"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="starter_motor_current_l2"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Starter Motor Current L2 (A)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 138.0"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="starter_motor_current_l3"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Starter Motor Current L3 (A)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 140.0"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>
      </ChecklistSection>

      {/* Evaporator Section */}
      <ChecklistSection
        title="Evaporator Performance"
        icon={<Thermometer className="h-5 w-5" />}
        colorScheme="blue"
      >
        <FormFieldGroup 
          title="Evaporator Temperature Readings"
          description="Record chilled water and refrigerant temperatures"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="active_chilled_water_setpoint"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Active Chilled Water Setpoint (°F)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 45.0"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="evap_leaving_water_temp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Evap Leaving Water Temp (°F)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 45.1"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="evap_entering_water_temp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Evap Entering Water Temp (°F)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 45.9"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>

        <FormFieldGroup 
          title="Evaporator Pressure Readings"
          description="Record refrigerant pressure and approach temperature"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="evap_sat_rfgt_temp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Evap Sat Rfgt Temp (°F)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 42.9"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="evap_rfgt_pressure"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Evap Rfgt Pressure (PSIG)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., -8.5"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="evap_approach_temp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Evap Approach Temp (°F)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 2.1"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>
      </ChecklistSection>

      {/* Condenser Section */}
      <ChecklistSection
        title="Condenser Performance"
        icon={<Settings className="h-5 w-5" />}
        colorScheme="red"
      >
        <FormFieldGroup 
          title="Condenser Temperature Readings"
          description="Record condenser water temperatures"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="cond_entering_water_temp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Cond Entering Water Temp (°F)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 80.7"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cond_leaving_water_temp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Cond Leaving Water Temp (°F)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 85.2"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cond_sat_rfgt_temp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Cond Sat Rfgt Temp (°F)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 85.4"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>

        <FormFieldGroup 
          title="Condenser Pressure & Flow"
          description="Record refrigerant pressure and water flow status"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="cond_rfgt_pressure"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Cond Rfgt Pressure (PSIG)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 2.0"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cond_approach_temp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Cond Approach Temp (°F)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 0.2"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="differential_refrigerant_pressure"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Differential Refrigerant Pressure (PSID)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 10.48"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>
      </ChecklistSection>

      {/* Compressor Section */}
      <ChecklistSection
        title="Compressor Performance"
        icon={<Gauge className="h-5 w-5" />}
        colorScheme="green"
      >
        <FormFieldGroup 
          title="Compressor Operational Status"
          description="Record compressor running status and control signals"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="compressor_running_status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Compressor Running Status
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-[200]">
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="stopped">Stopped</SelectItem>
                    <SelectItem value="starting">Starting</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chiller_control_signal"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Chiller Control Signal (%)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 52.2"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="compressor_starts_count"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Compressor Starts Count
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 2020"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>

        <FormFieldGroup 
          title="Oil System Performance"
          description="Record oil pressure, temperature, and pump status"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="oil_differential_pressure"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Oil Differential Pressure (PSID)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 25.45"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oil_pump_discharge_pressure"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Oil Pump Discharge Pressure (PSIG)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 18.2"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oil_tank_pressure"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Oil Tank Pressure (PSIG)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., -7.3"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>

        <FormFieldGroup 
          title="Compressor Runtime & Temperature"
          description="Record operational time and discharge temperature"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="compressor_running_time"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Compressor Running Time (Hr:Min)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 18030:53"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="compressor_refrigerant_discharge_temp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  Compressor Refrigerant Discharge Temp (°F)
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 106.6"
                    className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>
      </ChecklistSection>

      {/* Legacy Fields for Compatibility */}
      <ChecklistSection
        title="Additional System Checks"
        icon={<Filter className="h-5 w-5" />}
        colorScheme="purple"
      >
        <FormFieldGroup 
          title="General System Status"
          description="Additional maintenance checks and observations"
          columns={isMobile ? 1 : 2}
        >
          <FormField
            control={form.control}
            name="air_filter_status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  <Filter className="h-4 w-4" />
                  Air Filter Status
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-[200]">
                    <SelectItem value="NA">Not Applicable</SelectItem>
                    <SelectItem value="clean">Clean</SelectItem>
                    <SelectItem value="needs_cleaning">Needs Cleaning</SelectItem>
                    <SelectItem value="needs_replacement">Needs Replacement</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="belt_condition"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${isMobile ? 'text-base' : ''}`}>
                  <Settings className="h-4 w-4" />
                  Belt Condition
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[48px] text-base' : ''}`}>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-[200]">
                    <SelectItem value="NA">Not Applicable</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="needs_replacement">Needs Replacement</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGroup>
      </ChecklistSection>
    </div>
  );
};

export default MaintenanceReadings;
