
import React, { createContext, useContext, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MaintenanceCheck, Equipment, Technician } from '@/types/maintenance';
import { MaintenanceFormValues } from '../form/hooks/useMaintenanceForm';

interface MaintenanceFormContextType {
  form: UseFormReturn<MaintenanceFormValues>;
  initialData?: MaintenanceCheck;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  equipment: Equipment[];
  technicians: Technician[];
  selectedEquipment?: Equipment;
  equipmentType: string | null;
  isMobile: boolean;
}

const MaintenanceFormContext = createContext<MaintenanceFormContextType | undefined>(undefined);

export const useMaintenanceFormContext = () => {
  const context = useContext(MaintenanceFormContext);
  if (!context) {
    throw new Error('useMaintenanceFormContext must be used within a MaintenanceFormProvider');
  }
  return context;
};

interface MaintenanceFormProviderProps {
  children: React.ReactNode;
  form: UseFormReturn<MaintenanceFormValues>;
  initialData?: MaintenanceCheck;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  equipment: Equipment[];
  technicians: Technician[];
  selectedEquipment?: Equipment;
  equipmentType: string | null;
  isMobile: boolean;
}

export const MaintenanceFormProvider: React.FC<MaintenanceFormProviderProps> = ({
  children,
  ...contextValues
}) => {
  return (
    <MaintenanceFormContext.Provider value={contextValues}>
      {children}
    </MaintenanceFormContext.Provider>
  );
};
