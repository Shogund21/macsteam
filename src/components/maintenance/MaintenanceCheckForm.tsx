
import { Form } from "@/components/ui/form";
import { MaintenanceCheck } from "@/types/maintenance";
import MaintenanceBasicInfo from "./form/MaintenanceBasicInfo";
import FormSection from "./form/FormSection";
import FormActions from "./form/FormActions";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import { useMaintenanceFormSubmit } from "./form/hooks/useMaintenanceFormSubmit";
import { useEquipmentTypeDetection } from "./form/hooks/useEquipmentTypeDetection";
import MaintenanceFieldsRenderer from "./form/MaintenanceFieldsRenderer";
import DocumentManager from "./documents/DocumentManager";
import { useIsMobile } from "@/hooks/use-mobile";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
  initialData?: MaintenanceCheck;
}

const MaintenanceCheckForm = ({ onComplete, initialData }: MaintenanceCheckFormProps) => {
  const form = useMaintenanceForm(initialData);
  const handleSubmit = useMaintenanceFormSubmit(onComplete, initialData);
  const isMobile = useIsMobile();
  const { equipmentType, isLoadingEquipment, isLoadingTechnicians, equipment, technicians } = 
    useEquipmentTypeDetection(form);

  if (isLoadingEquipment || isLoadingTechnicians) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6">
          <div className={`${isMobile ? 'text-center mb-4' : ''}`}>
            <h2 className={`text-xl ${isMobile ? '' : 'text-2xl'} font-bold`}>
              {initialData ? 'Edit Maintenance Check' : 'New Maintenance Check'}
            </h2>
          </div>
          
          <FormSection>
            <MaintenanceBasicInfo 
              form={form} 
              equipment={equipment} 
              technicians={technicians} 
            />
          </FormSection>
          
          <FormSection>
            <MaintenanceFieldsRenderer 
              form={form}
              equipmentType={equipmentType}
            />
          </FormSection>

          <FormSection>
            <DocumentManager equipmentId={form.watch('equipment_id')} />
          </FormSection>

          <FormActions 
            onCancel={onComplete}
            isEditing={!!initialData}
          />
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;
