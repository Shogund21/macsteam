
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

  const { data: locations, refetch, isLoading } = useQuery({
    queryKey: ["locations", currentCompany?.id],
    queryFn: async () => {
      console.log('Fetching locations for company:', currentCompany?.id);
      
      if (!currentCompany?.id) {
        console.warn('No company ID available, cannot fetch locations');
        return [];
      }

      const query = supabase
        .from("locations")
        .select("*");
      
      const filteredQuery = applyCompanyFilter(query);
      
      const { data, error } = await filteredQuery.order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching locations:", error);
        throw error;
      }
      
      console.log('Fetched locations:', data);
      return data || [];
    },
    enabled: !!currentCompany?.id,
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
    hasCompanies: companies.length > 0,
    currentCompany
  };
};
