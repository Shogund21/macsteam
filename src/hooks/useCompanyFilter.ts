
import { useCompany } from "@/contexts/CompanyContext";
import { useEffect, useState } from "react";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export const useCompanyFilter = () => {
  const { currentCompany } = useCompany();
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    if (currentCompany?.id) {
      console.log("Setting company ID in filter:", currentCompany.id);
      setCompanyId(currentCompany.id);
    } else {
      console.warn("No company ID available in context");
      setCompanyId(null);
    }
  }, [currentCompany]);

  const applyCompanyFilter = <T>(
    query: PostgrestFilterBuilder<any, any, T[]>
  ): PostgrestFilterBuilder<any, any, T[]> => {
    if (companyId) {
      console.log("Applying company filter:", companyId);
      return query.eq('company_id', companyId);
    }
    console.warn("No company filter applied - missing company ID");
    return query;
  };

  return {
    companyId,
    applyCompanyFilter,
  };
};
