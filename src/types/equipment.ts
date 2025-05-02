
export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  location: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  status: string;
  
  // Properties for location handling in the UI
  isSpecialLocation?: boolean;
  originalLocationId?: string; 
  displayWarning?: boolean;
}
