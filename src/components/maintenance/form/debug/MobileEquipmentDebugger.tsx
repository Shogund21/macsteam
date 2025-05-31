
import React, { useEffect, useState } from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';

const MobileEquipmentDebugger = () => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [showManualToggle, setShowManualToggle] = useState(false);
  
  const equipmentId = form.watch('equipment_id');
  
  useEffect(() => {
    const info = {
      timestamp: new Date().toISOString(),
      equipmentId,
      equipmentType,
      selectedEquipmentName: selectedEquipment?.name,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
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
      mobileDetection: {
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        aspectRatio: (window.innerWidth / window.innerHeight).toFixed(2),
        devicePixelRatio: window.devicePixelRatio,
        maxTouchPoints: navigator.maxTouchPoints,
        userAgent: navigator.userAgent.substring(0, 80),
        hasTouchCapability: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        hasOrientationCapability: 'orientation' in window || 'onorientationchange' in window,
        manualOverride: localStorage.getItem('force-mobile-mode'),
        breakpointCheck: window.innerWidth < 1200 ? 'MOBILE' : 'DESKTOP'
      }
    };
    
    setDebugInfo(info);
    console.log('MobileEquipmentDebugger: 📱 COMPREHENSIVE MOBILE DEBUG:', info);
  }, [equipmentId, equipmentType, selectedEquipment, isMobile, form]);
  
  const toggleManualMobile = (force: boolean) => {
    localStorage.setItem('force-mobile-mode', String(force));
    window.location.reload(); // Reload to apply the change
  };
  
  const clearManualOverride = () => {
    localStorage.removeItem('force-mobile-mode');
    window.location.reload();
  };
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '11px',
      zIndex: 9999,
      maxWidth: isExpanded ? '90vw' : '280px',
      wordBreak: 'break-word',
      border: isMobile ? '3px solid #4caf50' : '3px solid #f44336',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      fontFamily: 'monospace'
    }}>
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer', marginBottom: '8px', fontWeight: 'bold', fontSize: '12px' }}
      >
        📱 Mobile Debug {isExpanded ? '▼' : '▶'} | Status: {isMobile ? '✅ MOBILE' : '❌ DESKTOP'}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <div>Equipment: {debugInfo.selectedEquipmentName || 'None'}</div>
        <div>Type: {debugInfo.equipmentType || 'None'}</div>
        <div>ID: {debugInfo.equipmentId || 'None'}</div>
        <div style={{ color: debugInfo.renderingState?.shouldRenderFields ? '#4caf50' : '#f44336' }}>
          Should Render: {debugInfo.renderingState?.shouldRenderFields ? 'YES' : 'NO'}
        </div>
        <div>Screen: {debugInfo.mobileDetection?.viewportWidth}x{debugInfo.mobileDetection?.viewportHeight}</div>
        <div>Breakpoint: {debugInfo.mobileDetection?.breakpointCheck}</div>
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <button 
          onClick={() => setShowManualToggle(!showManualToggle)}
          style={{ 
            backgroundColor: '#2196f3', 
            color: 'white', 
            border: 'none', 
            padding: '4px 8px', 
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'pointer'
          }}
        >
          Manual Toggle {showManualToggle ? '▼' : '▶'}
        </button>
      </div>
      
      {showManualToggle && (
        <div style={{ marginBottom: '8px', padding: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
          <div style={{ marginBottom: '4px', fontSize: '10px' }}>Force Mobile Mode:</div>
          <button 
            onClick={() => toggleManualMobile(true)}
            style={{ 
              backgroundColor: '#4caf50', 
              color: 'white', 
              border: 'none', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '10px',
              cursor: 'pointer',
              marginRight: '4px'
            }}
          >
            Force Mobile
          </button>
          <button 
            onClick={() => toggleManualMobile(false)}
            style={{ 
              backgroundColor: '#f44336', 
              color: 'white', 
              border: 'none', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '10px',
              cursor: 'pointer',
              marginRight: '4px'
            }}
          >
            Force Desktop
          </button>
          <button 
            onClick={clearManualOverride}
            style={{ 
              backgroundColor: '#ff9800', 
              color: 'white', 
              border: 'none', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '10px',
              cursor: 'pointer'
            }}
          >
            Auto
          </button>
        </div>
      )}
      
      {isExpanded && (
        <div style={{ marginTop: '8px', borderTop: '1px solid #444', paddingTop: '8px', fontSize: '10px' }}>
          <div><strong>Mobile Detection Details:</strong></div>
          <div>Viewport: {debugInfo.mobileDetection?.viewportWidth}x{debugInfo.mobileDetection?.viewportHeight}</div>
          <div>Aspect Ratio: {debugInfo.mobileDetection?.aspectRatio}</div>
          <div>Device Pixel Ratio: {debugInfo.mobileDetection?.devicePixelRatio}</div>
          <div>Touch Points: {debugInfo.mobileDetection?.maxTouchPoints}</div>
          <div>Has Touch: {String(debugInfo.mobileDetection?.hasTouchCapability)}</div>
          <div>Has Orientation: {String(debugInfo.mobileDetection?.hasOrientationCapability)}</div>
          <div>Manual Override: {debugInfo.mobileDetection?.manualOverride || 'None'}</div>
          
          <div style={{ marginTop: '8px' }}><strong>Context Values:</strong></div>
          <div>isMobile: {String(debugInfo.contextValues?.isMobileFromContext)}</div>
          <div>Equipment Type: {debugInfo.contextValues?.equipmentTypeFromContext || 'null'}</div>
          <div>Selected Equipment: {debugInfo.contextValues?.selectedEquipmentFromContext || 'null'}</div>
          
          <div style={{ marginTop: '8px' }}><strong>Rendering Conditions:</strong></div>
          <div style={{ color: debugInfo.renderingState?.hasEquipmentId ? '#4caf50' : '#f44336' }}>
            Has Equipment ID: {String(debugInfo.renderingState?.hasEquipmentId)}
          </div>
          <div style={{ color: debugInfo.renderingState?.hasEquipmentType ? '#4caf50' : '#f44336' }}>
            Has Equipment Type: {String(debugInfo.renderingState?.hasEquipmentType)}
          </div>
          <div style={{ color: debugInfo.renderingState?.hasSelectedEquipment ? '#4caf50' : '#f44336' }}>
            Has Selected Equipment: {String(debugInfo.renderingState?.hasSelectedEquipment)}
          </div>
          
          <div style={{ marginTop: '8px', fontSize: '9px', opacity: 0.8 }}>
            User Agent: {debugInfo.mobileDetection?.userAgent}...
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileEquipmentDebugger;
