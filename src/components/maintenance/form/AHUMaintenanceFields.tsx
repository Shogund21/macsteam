
import { UseFormReturn } from "react-hook-form";
import { Filter, Fan, Gauge, Droplets, FileText } from "lucide-react";
import ChecklistSection from "./sections/ChecklistSection";
import ChecklistProgress from "./sections/ChecklistProgress";
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
  
  // Calculate completion status for each section
  const getSectionCompletion = () => {
    const values = form.getValues();
    
    return [
      {
        name: "Filter & Belt Inspection",
        completed: !!(values.air_filter_status && values.belt_condition)
      },
      {
        name: "Fan & Dampers",
        completed: !!(values.fan_belt_condition && values.dampers_operation)
      },
      {
        name: "Condition Checks",
        completed: !!(values.coils_condition && values.motor_condition)
      },
      {
        name: "Airflow & Drainage",
        completed: !!(values.airflow_reading && values.drain_pan_status)
      },
      {
        name: "Notes & Observations",
        completed: !!values.notes
      }
    ];
  };

  const sections = getSectionCompletion();
  
  return (
    <div className="w-full space-y-4">
      <div className={`text-center ${isMobile ? 'py-3 px-3' : 'py-4 px-4'} bg-blue-50 border border-blue-200 rounded-lg`}>
        <h2 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'} text-blue-800 mb-2`}>
          AHU Daily Preventative Maintenance
        </h2>
        <p className="text-sm text-blue-600">Complete all sections below for thorough maintenance check</p>
      </div>
      
      <ChecklistProgress sections={sections} />
      
      <div className="space-y-4">
        <ChecklistSection
          title="Filter & Belt Inspection"
          icon={<Filter className="h-5 w-5" />}
          colorScheme="blue"
          completed={sections[0].completed}
        >
          <AHUFilterAndBelt form={form} />
        </ChecklistSection>

        <ChecklistSection
          title="Fan & Dampers Operation"
          icon={<Fan className="h-5 w-5" />}
          colorScheme="green"
          completed={sections[1].completed}
        >
          <AHUFanAndDampers form={form} />
        </ChecklistSection>

        <ChecklistSection
          title="General Condition Checks"
          icon={<Gauge className="h-5 w-5" />}
          colorScheme="orange"
          completed={sections[2].completed}
        >
          <AHUConditionChecks form={form} />
        </ChecklistSection>

        <ChecklistSection
          title="Airflow & Drainage Systems"
          icon={<Droplets className="h-5 w-5" />}
          colorScheme="purple"
          completed={sections[3].completed}
        >
          <AHUAirflowAndDrainage form={form} />
        </ChecklistSection>

        <ChecklistSection
          title="Notes & Additional Observations"
          icon={<FileText className="h-5 w-5" />}
          colorScheme="red"
          completed={sections[4].completed}
        >
          <AHUNotes form={form} />
        </ChecklistSection>
      </div>
    </div>
  );
};

export default AHUMaintenanceFields;
