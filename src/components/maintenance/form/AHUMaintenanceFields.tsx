
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
    >
      <div className={`${isMobile ? 'text-center py-4 px-3 bg-blue-50 border border-blue-200 rounded-lg' : ''}`}>
        <h2 className={`font-semibold ${isMobile ? 'text-lg text-blue-800' : 'text-xl'} mb-2`}>
          AHU Daily Preventative Maintenance
        </h2>
        {isMobile && (
          <p className="text-sm text-blue-600">Complete all sections below</p>
        )}
      </div>
      
      <div className="w-full space-y-6 mobile-checklist-force-visible" data-force-visible="true">
        <AHUFilterAndBelt form={form} />
        <AHUFanAndDampers form={form} />
        <AHUConditionChecks form={form} />
        <AHUAirflowAndDrainage form={form} />
        <AHUNotes form={form} />
      </div>
    </div>
  );
};

export default AHUMaintenanceFields;
