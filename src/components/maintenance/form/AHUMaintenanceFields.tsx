
import { UseFormReturn } from "react-hook-form";
import AHUFilterAndBelt from "./ahu/AHUFilterAndBelt";
import AHUFanAndDampers from "./ahu/AHUFanAndDampers";
import AHUConditionChecks from "./ahu/AHUConditionChecks";
import AHUAirflowAndDrainage from "./ahu/AHUAirflowAndDrainage";
import AHUNotes from "./ahu/AHUNotes";
import { useMaintenanceFormContext } from "../context/MaintenanceFormContext";

interface AHUMaintenanceFieldsProps {
  form: UseFormReturn<any>;
}

const AHUMaintenanceFields = ({ form }: AHUMaintenanceFieldsProps) => {
  const { isMobile } = useMaintenanceFormContext();
  
  console.log('AHUMaintenanceFields: 📱 RENDERING - isMobile:', isMobile);
  
  return (
    <div className="ahu-maintenance-container space-y-6">
      {isMobile && (
        <div className="mobile-debug-indicator" style={{
          backgroundColor: '#fce4ec',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#ad1457',
          marginBottom: '12px',
          fontWeight: 'bold'
        }}>
          📱 Mobile: AHU Maintenance Fields
        </div>
      )}
      
      <h2 className="text-xl font-semibold">AHU Daily Preventative Maintenance</h2>
      
      <div className={isMobile ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
        <AHUFilterAndBelt form={form} />
        <AHUFanAndDampers form={form} />
        <AHUConditionChecks form={form} />
        <AHUAirflowAndDrainage form={form} />
      </div>

      <AHUNotes form={form} />
    </div>
  );
};

export default AHUMaintenanceFields;
