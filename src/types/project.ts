export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  startdate: string | null;
  enddate: string | null;
  priority: string;
  createdat: string | null;
  updatedat: string | null;
}