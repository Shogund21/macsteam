
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
    <div 
      className="ahu-maintenance-container space-y-6"
      style={{ 
        width: '100%', 
        display: 'block', 
        visibility: 'visible', 
        opacity: 1,
        minHeight: '300px'
      }}
    >
      {isMobile && (
        <div style={{
          backgroundColor: '#fce4ec',
          padding: '12px',
          borderRadius: '6px',
          fontSize: '13px',
          color: '#ad1457',
          marginBottom: '16px',
          fontWeight: 'bold',
          border: '1px solid #f8bbd9'
        }}>
          📱 Mobile: AHU Maintenance Fields - Now Rendering!
        </div>
      )}
      
      <h2 className="text-xl font-semibold mb-4">AHU Daily Preventative Maintenance</h2>
      
      <div 
        className={isMobile ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-6"}
        style={{ 
          width: '100%', 
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : undefined,
          gap: isMobile ? '16px' : undefined
        }}
      >
        <div style={{ width: '100%', marginBottom: '16px' }}>
          <AHUFilterAndBelt form={form} />
        </div>
        <div style={{ width: '100%', marginBottom: '16px' }}>
          <AHUFanAndDampers form={form} />
        </div>
        <div style={{ width: '100%', marginBottom: '16px' }}>
          <AHUConditionChecks form={form} />
        </div>
        <div style={{ width: '100%', marginBottom: '16px' }}>
          <AHUAirflowAndDrainage form={form} />
        </div>
      </div>

      <div style={{ width: '100%', marginTop: '24px' }}>
        <AHUNotes form={form} />
      </div>
    </div>
  );
};

export default AHUMaintenanceFields;
