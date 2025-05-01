
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LocationData } from "../schemas/locationSchema";
import { useCompany } from "@/contexts/CompanyContext";
import { useCompanyFilter } from "@/hooks/useCompanyFilter";

export const useLocationList = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editLocation, setEditLocation] = useState<LocationData | null>(null);
  const { currentCompany, companies } = useCompany();
  const { applyCompanyFilter } = useCompanyFilter();

  // Check if we have companies data
  const hasCompanies = Array.isArray(companies) && companies.length > 0;

  // Log the company context for debugging
  console.log('useLocationList context:', { 
    currentCompanyId: currentCompany?.id, 
    hasCompanies, 
    companiesCount: companies?.length 
  });

  const { data: locations, refetch, isLoading } = useQuery({
    queryKey: ["locations", currentCompany?.id],
    queryFn: async () => {
      console.log('Fetching locations for company:', currentCompany?.id);
      
      try {
        // Create base query
        const query = supabase.from("locations").select("*");
        
        // Apply company filter if a company is selected
        let filteredQuery;
        if (currentCompany?.id) {
          console.log('Filtering by company ID:', currentCompany.id);
          filteredQuery = query.eq('company_id', currentCompany.id);
        } else {
          // If no company is selected but we have companies, don't fetch any data
          if (hasCompanies) {
            console.log('No company selected but companies exist');
            return [];
          }
          // If no companies exist at all, fetch all locations (for admin view)
          console.log('No companies exist, fetching all locations');
          filteredQuery = query;
        }
        
        const { data, error } = await filteredQuery.order("created_at", { ascending: false });
        
        if (error) {
          console.error("Error fetching locations:", error);
          throw error;
        }
        
        console.log('Fetched locations:', data?.length || 0);
        return data || [];
      } catch (error: any) {
        console.error("Error in location query:", error);
        toast({
          variant: "destructive",
          title: "Error fetching locations",
          description: error.message || "Failed to fetch locations. Please try again.",
        });
        return [];
      }
    },
    // Always enable the query to properly handle all states
    enabled: true,
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("locations").delete().eq("id", id);
      if (error) {
        console.error("Delete error:", error);
        throw error;
      }
      toast({ title: "Success", description: "Location deleted successfully" });
      await refetch();
    } catch (error: any) {
      console.error("Error deleting location:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete location. Please try again.",
      });
    }
  };

  const handleEdit = (location: LocationData) => {
    console.log("Editing location:", location);
    setEditLocation(location);
    setIsDialogOpen(true);
  };

  const handleSuccess = async () => {
    console.log("Success callback triggered, refetching data");
    try {
      await refetch();
      setIsDialogOpen(false);
      setEditLocation(null);
    } catch (error) {
      console.error("Error refetching data after success:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh data. Please try again.",
      });
    }
  };

  const openAddDialog = () => {
    setEditLocation(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditLocation(null);
    refetch();
  };

  return {
    locations,
    isLoading,
    isDialogOpen,
    editLocation,
    setIsDialogOpen,
    handleDelete,
    handleEdit,
    handleSuccess,
    openAddDialog,
    closeDialog,
    refetch,
    hasCompanies,
    currentCompany,
    companies
  };
};
