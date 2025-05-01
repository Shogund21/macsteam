
import { useCompany } from "@/contexts/CompanyContext";
import { useEffect, useState } from "react";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export const useCompanyFilter = () => {
  const { currentCompany } = useCompany();
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    if (currentCompany?.id) {
      setCompanyId(currentCompany.id);
    } else {
      setCompanyId(null);
    }
  }, [currentCompany]);

  const applyCompanyFilter = <T>(
    query: PostgrestFilterBuilder<any, any, T[]>
  ): PostgrestFilterBuilder<any, any, T[]> => {
    if (companyId) {
      return query.eq('company_id', companyId);
    }
    return query;
  };

  return {
    companyId,
    applyCompanyFilter,
  };
};
