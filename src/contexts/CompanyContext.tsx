
import React, { createContext, useContext, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCompanyData } from "@/hooks/useCompanyData";
import { useCompanyOperations } from "@/hooks/useCompanyOperations";
import { Company, CompanyContextType } from "@/types/company";

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { 
    currentCompany, 
    setCurrentCompany, 
    companies, 
    isLoading, 
    refreshCompanies 
  } = useCompanyData(user?.id);
  
  const { addUserToCompany, createCompany } = useCompanyOperations();

  // Initialize and fetch companies when the component mounts or user changes
  useEffect(() => {
    refreshCompanies();
  }, [user]);

  // Custom implementation of createCompany that handles user assignment
  const createCompanyWithUser = async (companyData: { name: string } & Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>): Promise<Company> => {
    if (!user) {
      throw new Error("User must be logged in to create a company");
    }

    // Create the company first
    const newCompany = await createCompany(companyData);
    
    // Then add the creator as an admin
    await addUserToCompany(user.id, newCompany.id, "admin", true);
    
    // Refresh the company list
    await refreshCompanies();
    
    return newCompany;
  };

  const value = {
    currentCompany,
    setCurrentCompany,
    companies,
    isLoading,
    refreshCompanies,
    addUserToCompany,
    createCompany: createCompanyWithUser,
  };

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
};
