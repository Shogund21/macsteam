
import React, { useEffect, useState } from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';

const MobileEquipmentDebugger = () => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();
  const [debugInfo, setDebugInfo] = useState<any>({});
  
  const equipmentId = form.watch('equipment_id');
  
  useEffect(() => {
    if (isMobile) {
      const info = {
        timestamp: new Date().toISOString(),
        equipmentId,
        equipmentType,
        selectedEquipmentName: selectedEquipment?.name,
        windowWidth: window.innerWidth,
        formValues: form.getValues(),
        renderingState: {
          hasEquipmentId: !!equipmentId,
          hasEquipmentType: !!equipmentType,
          hasSelectedEquipment: !!selectedEquipment,
          shouldRenderFields: !!equipmentId && !!equipmentType
        }
      };
      
      setDebugInfo(info);
      console.log('MobileEquipmentDebugger: 📱 DEBUG UPDATE:', info);
    }
  }, [equipmentId, equipmentType, selectedEquipment, isMobile, form]);
  
  if (!isMobile) return null;
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '8px',
      borderRadius: '4px',
      fontSize: '10px',
      zIndex: 9999,
      maxWidth: '200px',
      wordBreak: 'break-word'
    }}>
      <div>📱 Mobile Debug</div>
      <div>Equipment: {debugInfo.selectedEquipmentName || 'None'}</div>
      <div>Type: {debugInfo.equipmentType || 'None'}</div>
      <div>ID: {debugInfo.equipmentId || 'None'}</div>
      <div>Should Render: {debugInfo.renderingState?.shouldRenderFields ? 'YES' : 'NO'}</div>
      <div>Width: {debugInfo.windowWidth}px</div>
    </div>
  );
};

export default MobileEquipmentDebugger;
