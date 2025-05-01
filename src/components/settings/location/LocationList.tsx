
import { Dialog } from "@/components/ui/dialog";
import { LocationTable } from "./LocationTable";
import { useLocationList } from "./hooks/useLocationList";
import { LocationListHeader } from "./components/LocationListHeader";
import { LocationListLoading } from "./components/LocationListLoading";
import { LocationFormDialog } from "./components/LocationFormDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCompany } from "@/contexts/CompanyContext";

export const LocationList = () => {
  const { companies } = useCompany();
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
    closeDialog,
    currentCompany
  } = useLocationList();

  console.log('LocationList rendering with:', { 
    locationsCount: locations?.length, 
    isLoading, 
    hasCompanies: companies.length > 0,
    currentCompanyId: currentCompany?.id 
  });

  // Check if we need to show the "Add Company First" message
  const showAddCompanyMessage = companies.length === 0;
  
  // Check if we need to show the "Select Company" message
  const showSelectCompanyMessage = !showAddCompanyMessage && !currentCompany;

  return (
    <div className="space-y-4">
      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            closeDialog();
          }
        }}
      >
        <LocationListHeader 
          locationsCount={locations?.length || 0} 
          onAddClick={openAddDialog} 
          disabled={showAddCompanyMessage || showSelectCompanyMessage}
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
      </Dialog>

      {showAddCompanyMessage ? (
        <div className="text-center py-6 bg-gray-50 rounded-md border p-4">
          <p className="text-gray-600 mb-4">No companies found. Please add a company first.</p>
          <Button 
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.location.href = '/settings?tab=companies'}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </div>
      ) : showSelectCompanyMessage ? (
        <div className="text-center py-6 bg-gray-50 rounded-md border p-4 text-gray-500">
          Please select a company to view locations.
        </div>
      ) : isLoading ? (
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
