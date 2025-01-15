export interface EquipmentTable {
  Row: {
    id: string;
    name: string;
    model: string;
    serialNumber: string;
    location: string;
    lastMaintenance: string | null;
    nextMaintenance: string | null;
    status: string;
  };
  Insert: {
    id?: string;
    name: string;
    model: string;
    serialNumber: string;
    location: string;
    lastMaintenance?: string | null;
    nextMaintenance?: string | null;
    status: string;
  };
  Update: {
    id?: string;
    name?: string;
    model?: string;
    serialNumber?: string;
    location?: string;
    lastMaintenance?: string | null;
    nextMaintenance?: string | null;
    status?: string;
  };
}