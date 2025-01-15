import { EquipmentTable } from './equipment';
import { MaintenanceChecksTable } from './maintenance';
import { ProjectsTable } from './projects';
import { TechniciansTable } from './technicians';

export interface Database {
  public: {
    Tables: {
      equipment: EquipmentTable;
      hvac_maintenance_checks: MaintenanceChecksTable;
      projects: ProjectsTable;
      technicians: TechniciansTable;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      maintenance_check_status: "completed" | "pending" | "issue_found";
    };
    CompositeTypes: Record<string, never>;
  };
}