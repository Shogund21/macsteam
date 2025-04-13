
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Company } from "@/types/company";

export const useCompanyData = (userId: string | undefined) => {
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchCompanies = async () => {
    if (!userId) {
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
        .eq("user_id", userId);

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

  // Save selected company to localStorage when it changes
  useEffect(() => {
    if (currentCompany) {
      localStorage.setItem("selectedCompanyId", currentCompany.id);
    }
  }, [currentCompany]);

  return {
    currentCompany,
    setCurrentCompany,
    companies,
    isLoading,
    refreshCompanies: fetchCompanies
  };
};
