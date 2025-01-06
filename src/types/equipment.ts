export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  location: string;
  lastMaintenance?: string | null;
  nextMaintenance?: string | null;
  status: string;
}