
export interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  address: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CompanyContextType {
  currentCompany: Company | null;
  companies: Company[];
  isLoading: boolean;
  setCurrentCompany: (company: Company | null) => void;
  refreshCompanies: () => Promise<void>;
  addUserToCompany: (userId: string, companyId: string, role?: string, isAdmin?: boolean) => Promise<void>;
  createCompany: (companyData: { name: string } & Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>) => Promise<Company>;
}
