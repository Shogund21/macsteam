export interface Technician {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}