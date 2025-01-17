export interface MaintenanceDocument {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  category: string;
  equipment_id?: string;
  maintenance_check_id?: string;
  project_id?: string;
  uploaded_by?: string;
  uploaded_at: string;
  comments?: string;
  tags?: string[];
}