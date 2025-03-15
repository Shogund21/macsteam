
import { UseFormReturn } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useEquipmentTypeDetection = (form: UseFormReturn<any>) => {
  const { data: equipment = [], isLoading: isLoadingEquipment } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      console.log('Starting equipment fetch...');
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      
      console.log('Equipment fetched:', data);
      return data || [];
    },
  });

  const { data: technicians = [], isLoading: isLoadingTechnicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      console.log('Starting technicians fetch...');
      const { data, error } = await supabase
        .from('technicians')
        .select('*')
        .eq('isAvailable', true)
        .order('firstName');
      
      if (error) {
        console.error('Error fetching technicians:', error);
        throw error;
      }
      
      return data || [];
    },
  });

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );

  const getEquipmentType = () => {
    if (!selectedEquipment) return null;
    const name = selectedEquipment.name.toLowerCase();
    
    // Check for specific equipment types
    if (name.includes('ahu') || name.includes('air handler')) return 'ahu';
    if (name.includes('chiller')) return 'chiller';
    if (name.includes('cooling tower')) return 'cooling_tower';
    if (name.includes('restroom')) return 'restroom';
    if (name.includes('elevator')) return 'elevator';
    
    return 'general';
  };

  const equipmentType = getEquipmentType();

  return {
    equipmentType,
    selectedEquipment,
    equipment,
    technicians,
    isLoadingEquipment,
    isLoadingTechnicians
  };
};
