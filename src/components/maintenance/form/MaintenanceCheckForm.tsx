
import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import MaintenanceBasicInfo from "./MaintenanceBasicInfo";
import MaintenanceReadings from "./MaintenanceReadings";
import MaintenanceStatus from "./MaintenanceStatus";
import MaintenanceObservations from "./MaintenanceObservations";
import AHUMaintenanceFields from "./AHUMaintenanceFields";
import ElevatorMaintenanceFields from "./ElevatorMaintenanceFields";
import RestroomMaintenanceFields from "./RestroomMaintenanceFields";
import { useMaintenanceForm } from "./hooks/useMaintenanceForm";
import { useState } from "react";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";
import { useMaintenanceFormSubmit } from "./hooks/useMaintenanceFormSubmit";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useMaintenanceForm();
  const { toast } = useToast();
  const handleSubmit = useMaintenanceFormSubmit(onComplete);

  const { data: equipment, isLoading: isLoadingEquipment } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'active');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: technicians, isLoading: isLoadingTechnicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technicians')
        .select('*')
        .eq('isAvailable', true);
      
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (values: MaintenanceFormValues) => {
    console.log('Form submission started with values:', values);
    
    if (isSubmitting) {
      console.log('Preventing double submission');
      return;
    }
    
    if (!values.equipment_id || !values.technician_id) {
      console.error('Missing required fields:', { 
        equipment_id: values.equipment_id, 
        technician_id: values.technician_id 
      });
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please select both equipment and technician",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await handleSubmit(values);
    } finally {
      console.log('Form submission completed');
      setIsSubmitting(false);
    }
  };

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );

  const getEquipmentType = () => {
    if (!selectedEquipment) return null;
    const name = selectedEquipment.name.toLowerCase();
    if (name.includes('ahu') || name.includes('air handler')) return 'ahu';
    if (name.includes('elevator')) return 'elevator';
    if (name.includes('restroom')) return 'restroom';
    return 'general';
  };

  const equipmentType = getEquipmentType();
  const isLoading = isLoadingEquipment || isLoadingTechnicians;

  if (isLoading) {
    return <div className="p-6 text-center">Loading form data...</div>;
  }

  return (
    <Form {...form}>
      <form 
        className="space-y-6 bg-white p-6 rounded-lg shadow"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.getValues());
        }}
      >
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment || []} 
          technicians={technicians || []} 
        />
        
        {equipmentType === 'ahu' && <AHUMaintenanceFields form={form} />}
        {equipmentType === 'elevator' && <ElevatorMaintenanceFields form={form} />}
        {equipmentType === 'restroom' && <RestroomMaintenanceFields form={form} />}
        {(!equipmentType || equipmentType === 'general') && (
          <>
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onComplete}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="default"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Check"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;
