
import React, { useEffect, useState } from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';

const MobileEquipmentDebugger = () => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isExpanded, setIsExpanded] = useState(false);
  
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
        },
        contextValues: {
          isMobileFromContext: isMobile,
          equipmentTypeFromContext: equipmentType,
          selectedEquipmentFromContext: selectedEquipment?.name
        },
        browserInfo: {
          userAgent: navigator.userAgent,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          devicePixelRatio: window.devicePixelRatio
        }
      };
      
      setDebugInfo(info);
      console.log('MobileEquipmentDebugger: 📱 COMPREHENSIVE DEBUG UPDATE:', info);
    }
  }, [equipmentId, equipmentType, selectedEquipment, isMobile, form]);
  
  if (!isMobile) return null;
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '11px',
      zIndex: 9999,
      maxWidth: isExpanded ? '90vw' : '250px',
      wordBreak: 'break-word',
      border: '2px solid #ff9800',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    }}>
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer', marginBottom: '8px', fontWeight: 'bold' }}
      >
        📱 Mobile Debug {isExpanded ? '▼' : '▶'}
      </div>
      
      <div>Equipment: {debugInfo.selectedEquipmentName || 'None'}</div>
      <div>Type: {debugInfo.equipmentType || 'None'}</div>
      <div>ID: {debugInfo.equipmentId || 'None'}</div>
      <div style={{ color: debugInfo.renderingState?.shouldRenderFields ? '#4caf50' : '#f44336' }}>
        Should Render: {debugInfo.renderingState?.shouldRenderFields ? 'YES' : 'NO'}
      </div>
      <div>Width: {debugInfo.windowWidth}px</div>
      
      {isExpanded && (
        <div style={{ marginTop: '8px', borderTop: '1px solid #444', paddingTop: '8px' }}>
          <div><strong>Context Values:</strong></div>
          <div>isMobile: {String(debugInfo.contextValues?.isMobileFromContext)}</div>
          <div>Equipment Type: {debugInfo.contextValues?.equipmentTypeFromContext || 'null'}</div>
          <div>Selected Equipment: {debugInfo.contextValues?.selectedEquipmentFromContext || 'null'}</div>
          
          <div style={{ marginTop: '8px' }}><strong>Rendering Conditions:</strong></div>
          <div>Has Equipment ID: {String(debugInfo.renderingState?.hasEquipmentId)}</div>
          <div>Has Equipment Type: {String(debugInfo.renderingState?.hasEquipmentType)}</div>
          <div>Has Selected Equipment: {String(debugInfo.renderingState?.hasSelectedEquipment)}</div>
          
          <div style={{ marginTop: '8px' }}><strong>Browser Info:</strong></div>
          <div>Viewport: {debugInfo.browserInfo?.viewport}</div>
          <div>Device Ratio: {debugInfo.browserInfo?.devicePixelRatio}</div>
          <div>User Agent: {debugInfo.browserInfo?.userAgent?.substring(0, 50)}...</div>
        </div>
      )}
    </div>
  );
};

export default MobileEquipmentDebugger;
