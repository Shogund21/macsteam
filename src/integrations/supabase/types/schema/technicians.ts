export interface TechniciansTable {
  Row: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialization: string;
    isAvailable: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
  Insert: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialization: string;
    isAvailable?: boolean | null;
    createdAt?: string | null;
    updatedAt?: string | null;
  };
  Update: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    specialization?: string;
    isAvailable?: boolean | null;
    createdAt?: string | null;
    updatedAt?: string | null;
  };
}