
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

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

interface CompanyContextType {
  currentCompany: Company | null;
  companies: Company[];
  isLoading: boolean;
  setCurrentCompany: (company: Company | null) => void;
  refreshCompanies: () => Promise<void>;
  addUserToCompany: (userId: string, companyId: string, role?: string, isAdmin?: boolean) => Promise<void>;
  createCompany: (companyData: { name: string } & Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>) => Promise<Company>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchCompanies = async () => {
    if (!user) {
      setCompanies([]);
      setCurrentCompany(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      // Get companies the user has access to through company_users
      const { data: companyUsers, error: companyUsersError } = await supabase
        .from("company_users")
        .select("company_id")
        .eq("user_id", user.id);

      if (companyUsersError) throw companyUsersError;
      
      if (!companyUsers || companyUsers.length === 0) {
        setCompanies([]);
        setCurrentCompany(null);
        setIsLoading(false);
        return;
      }
      
      const companyIds = companyUsers.map(cu => cu.company_id);
      
      // Get company details
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .in("id", companyIds)
        .order("name");

      if (error) throw error;
      
      setCompanies(data || []);
      
      // Set first company as default if we have companies and no current selection
      if (data && data.length > 0 && !currentCompany) {
        const savedCompanyId = localStorage.getItem("selectedCompanyId");
        
        if (savedCompanyId) {
          const savedCompany = data.find(c => c.id === savedCompanyId);
          if (savedCompany) {
            setCurrentCompany(savedCompany);
          } else {
            setCurrentCompany(data[0]);
            localStorage.setItem("selectedCompanyId", data[0].id);
          }
        } else {
          setCurrentCompany(data[0]);
          localStorage.setItem("selectedCompanyId", data[0].id);
        }
      } else if (data && data.length === 0) {
        // If no companies, clear current company
        setCurrentCompany(null);
        localStorage.removeItem("selectedCompanyId");
      } else if (currentCompany && !data.some(c => c.id === currentCompany.id)) {
        // If current company is no longer in the list, select first available
        if (data.length > 0) {
          setCurrentCompany(data[0]);
          localStorage.setItem("selectedCompanyId", data[0].id);
        } else {
          setCurrentCompany(null);
          localStorage.removeItem("selectedCompanyId");
        }
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast({
        title: "Error",
        description: "Could not load companies. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add user to company
  const addUserToCompany = async (
    userId: string,
    companyId: string,
    role: string = "user",
    isAdmin: boolean = false
  ) => {
    try {
      const { error } = await supabase
        .from("company_users")
        .insert([
          {
            user_id: userId,
            company_id: companyId,
            role,
            is_admin: isAdmin,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User added to company successfully",
      });
    } catch (error: any) {
      console.error("Error adding user to company:", error);
      toast({
        title: "Error",
        description: error.message || "Could not add user to company",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Create a new company
  const createCompany = async (companyData: { name: string } & Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>): Promise<Company> => {
    if (!user) {
      throw new Error("User must be logged in to create a company");
    }

    try {
      // Insert company - ensuring name is required in the type
      const { data, error } = await supabase
        .from("companies")
        .insert(companyData)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error("Failed to create company");

      // Add the creator as an admin of the company
      await addUserToCompany(user.id, data.id, "admin", true);

      // Refresh the companies list
      await fetchCompanies();

      toast({
        title: "Success",
        description: "Company created successfully",
      });

      return data;
    } catch (error: any) {
      console.error("Error creating company:", error);
      toast({
        title: "Error",
        description: error.message || "Could not create company",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Initialize and fetch companies when the component mounts or user changes
  useEffect(() => {
    fetchCompanies();
  }, [user]);

  // Save selected company to localStorage when it changes
  useEffect(() => {
    if (currentCompany) {
      localStorage.setItem("selectedCompanyId", currentCompany.id);
    }
  }, [currentCompany]);

  const value = {
    currentCompany,
    setCurrentCompany,
    companies,
    isLoading,
    refreshCompanies: fetchCompanies,
    addUserToCompany,
    createCompany,
  };

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
};
