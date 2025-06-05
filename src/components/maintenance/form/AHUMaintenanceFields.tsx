
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
  
  return (
    <div 
      className="w-full space-y-6 mobile-checklist-force-visible" 
      data-component="ahu-maintenance-fields"
      data-force-visible="true"
      style={isMobile ? { 
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        backgroundColor: '#ffffff',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        minHeight: '200px'
      } : {}}
    >
      <h2 className={`font-semibold mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>
        AHU Daily Preventative Maintenance
      </h2>
      
      {isMobile && (
        <div className="p-3 bg-blue-100 border border-blue-400 rounded text-sm mb-4">
          <strong>📱 Mobile AHU Checklist:</strong><br />
          This checklist should be fully visible and functional on mobile.
        </div>
      )}
      
      <div className="w-full space-y-6 mobile-checklist-force-visible" data-force-visible="true">
        <div className="w-full space-y-6">
          <AHUFilterAndBelt form={form} />
          <AHUFanAndDampers form={form} />
        </div>
        <div className="w-full space-y-6">
          <AHUConditionChecks form={form} />
          <AHUAirflowAndDrainage form={form} />
        </div>
      </div>

      <AHUNotes form={form} />
    </div>
  );
};

export default AHUMaintenanceFields;
