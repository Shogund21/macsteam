export interface ProjectsTable {
  Row: {
    id: string;
    name: string;
    description: string | null;
    status: string;
    startdate: string | null;
    enddate: string | null;
    priority: string;
    createdat: string | null;
    updatedat: string | null;
    location: string | null;
  };
  Insert: {
    id?: string;
    name: string;
    description?: string | null;
    status: string;
    startdate?: string | null;
    enddate?: string | null;
    priority: string;
    createdat?: string | null;
    updatedat?: string | null;
    location?: string | null;
  };
  Update: {
    id?: string;
    name?: string;
    description?: string | null;
    status?: string;
    startdate?: string | null;
    enddate?: string | null;
    priority?: string;
    createdat?: string | null;
    updatedat?: string | null;
    location?: string | null;
  };
}