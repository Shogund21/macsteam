
export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  location: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  status: string;
  
  // Properties for cross-location compatibility (internal tracking)
  isSpecialLocation?: boolean;
  originalLocationId?: string; 
  displayWarning?: boolean; // Always false now - no warnings shown
}
