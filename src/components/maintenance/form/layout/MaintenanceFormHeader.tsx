
import React from 'react';
import { MaintenanceCheck } from '@/types/maintenance';

interface MaintenanceFormHeaderProps {
  initialData?: MaintenanceCheck;
  isMobile: boolean;
}

const MaintenanceFormHeader = ({ initialData, isMobile }: MaintenanceFormHeaderProps) => {
  return (
    <div className={`${isMobile ? 'text-center mb-4' : ''}`}>
      <h2 className={`text-xl ${isMobile ? '' : 'text-2xl'} font-bold`}>
        {initialData ? 'Edit Maintenance Check' : 'New Maintenance Check'}
      </h2>
    </div>
  );
};

export default MaintenanceFormHeader;
