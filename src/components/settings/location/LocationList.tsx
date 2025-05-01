
import { Dialog } from "@/components/ui/dialog";
import { LocationTable } from "./LocationTable";
import { useLocationList } from "./hooks/useLocationList";
import { LocationListHeader } from "./components/LocationListHeader";
import { LocationListLoading } from "./components/LocationListLoading";
import { LocationFormDialog } from "./components/LocationFormDialog";
import { useCompany } from "@/contexts/CompanyContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const LocationList = () => {
  const { currentCompany } = useCompany();
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

  const noCompanySelected = !currentCompany?.id;

  console.log('LocationList rendering with:', { 
    locationsCount: locations?.length, 
    isLoading,
    dialogOpen: isDialogOpen,
    companySelected: !noCompanySelected
  });

  return (
    <div className="space-y-4">
      {noCompanySelected && (
        <Alert variant="default" className="mb-4 bg-amber-50 border-amber-200 text-amber-800 border">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No company selected. Location management may be limited.
          </AlertDescription>
        </Alert>
      )}
      
      <LocationListHeader 
        locationsCount={locations?.length || 0} 
        onAddClick={openAddDialog} 
        disabled={noCompanySelected}
      />
      
      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            closeDialog();
          }
        }}
      >
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
      </Dialog>

      {isLoading ? (
        <LocationListLoading />
      ) : (
        <LocationTable
          locations={locations || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};
