
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LocationTable } from "./LocationTable";
import { useLocationList } from "./hooks/useLocationList";
import { LocationListHeader } from "./components/LocationListHeader";
import { LocationListLoading } from "./components/LocationListLoading";
import { LocationFormDialog } from "./components/LocationFormDialog";
import { useCompany } from "@/contexts/CompanyContext";

export const LocationList = () => {
  const { currentCompany } = useCompany();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  const { 
    locations, 
    isLoading, 
    isDialogOpen, 
    editLocation, 
    setIsDialogOpen, 
    handleDelete, 
    handleEdit, 
    handleSuccess, 
    openAddDialog, 
    closeDialog
  } = useLocationList();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session && !error);
    };
    
    checkAuth();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  console.log('LocationList rendering with:', { 
    locationsCount: locations?.length, 
    isLoading,
    dialogOpen: isDialogOpen,
    isAuthenticated,
    companySelected: currentCompany?.id ? true : false
  });

  // If we're still checking authentication, show loading
  if (isAuthenticated === null) {
    return <LocationListLoading />;
  }

  return (
    <div className="space-y-4">
      {!isAuthenticated && (
        <Alert variant="destructive" className="bg-red-100 text-red-800 border border-red-200 mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You must be logged in to manage locations.
          </AlertDescription>
        </Alert>
      )}
      
      <LocationListHeader 
        locationsCount={locations?.length || 0} 
        onAddClick={isAuthenticated ? openAddDialog : () => {}}
        isAuthenticated={isAuthenticated}
      />
      
      <LocationFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={editLocation || undefined}
        onSuccess={handleSuccess}
        title={editLocation ? "Edit Location" : "Add New Location"}
        description={
          editLocation 
            ? "Update the location information below." 
            : "Enter the details for the new location."
        }
      />

      {isLoading ? (
        <LocationListLoading />
      ) : (
        <LocationTable
          locations={locations || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSuccess={handleSuccess}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
};
