export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  location: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  status: string;
}