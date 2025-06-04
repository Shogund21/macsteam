
import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEquipmentQuery } from '@/hooks/useEquipmentQuery';

interface MobileEquipmentSelectorProps {
  form: UseFormReturn<any>;
  locationId: string;
}

const MobileEquipmentSelector = ({ 
  form, 
  locationId
}: MobileEquipmentSelectorProps) => {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('');
  const { data: equipment = [], isLoading, isError } = useEquipmentQuery(locationId);

  console.log('🔧 MobileEquipmentSelector render:', {
    locationId,
    selectedEquipmentId,
    equipmentCount: equipment?.length || 0
  });

  const handleEquipmentChange = (value: string) => {
    console.log('🔧 Mobile Equipment Selection STARTING:', {
      newValue: value,
      previousValue: selectedEquipmentId,
      timestamp: new Date().toISOString()
    });

    setSelectedEquipmentId(value);
    
    // CRITICAL: Multiple form update strategies for mobile reliability
    form.setValue('equipment_id', value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });

    // Force immediate form validation and re-render
    form.trigger('equipment_id');
    
    console.log('🔧 Mobile Equipment Selection COMPLETED:', {
      selectedValue: value,
      formValue: form.getValues('equipment_id'),
      timestamp: new Date().toISOString()
    });

    // Delayed verification to ensure state propagation
    setTimeout(() => {
      const currentFormValue = form.getValues('equipment_id');
      console.log('🔧 Mobile Equipment Selection VERIFICATION:', {
        expectedValue: value,
        actualFormValue: currentFormValue,
        success: currentFormValue === value
      });
      
      // Force trigger if values don't match
      if (currentFormValue !== value) {
        console.warn('🔧 Mobile Equipment Selection MISMATCH - forcing update');
        form.setValue('equipment_id', value, { shouldValidate: true });
        form.trigger();
      }
    }, 100);
  };

  // Sync with form when component mounts or form value changes externally
  useEffect(() => {
    const formEquipmentId = form.getValues('equipment_id');
    if (formEquipmentId && formEquipmentId !== selectedEquipmentId) {
      setSelectedEquipmentId(formEquipmentId);
    }
  }, [form, selectedEquipmentId]);

  const isDisabled = !locationId;

  return (
    <div className="w-full space-y-2">
      <label className="block text-base font-semibold text-gray-700">
        Equipment
      </label>
      
      <Select
        onValueChange={handleEquipmentChange}
        value={selectedEquipmentId}
        disabled={isDisabled}
      >
        <SelectTrigger className="w-full min-h-[52px] text-base px-4 bg-white border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <SelectValue 
            placeholder={
              isDisabled 
                ? "Select a location first" 
                : isLoading 
                ? "Loading equipment..." 
                : "Select equipment"
            }
            className="text-gray-600"
          />
        </SelectTrigger>
        
        <SelectContent className="z-[9999] bg-white max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <SelectItem value="loading-placeholder" disabled className="py-4 px-4 text-base text-gray-500">
              Loading equipment...
            </SelectItem>
          ) : isError ? (
            <SelectItem value="error-placeholder" disabled className="py-4 px-4 text-base text-red-500">
              Error loading equipment
            </SelectItem>
          ) : equipment.length > 0 ? (
            equipment.map((eq) => (
              <SelectItem 
                key={eq.id} 
                value={eq.id}
                className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50 py-4 px-4"
              >
                <div className="flex flex-col w-full">
                  <span className="font-medium text-gray-900 text-base">
                    {eq.name}
                  </span>
                  <span className="text-gray-500 text-sm mt-1">
                    {eq.model ? `Model: ${eq.model}` : 'No model specified'}
                  </span>
                </div>
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-equipment-placeholder" disabled className="py-4 px-4 text-base text-gray-500">
              No equipment available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MobileEquipmentSelector;
