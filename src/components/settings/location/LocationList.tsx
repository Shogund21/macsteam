
import { Dialog } from "@/components/ui/dialog";
import { LocationTable } from "./LocationTable";
import { useLocationList } from "./hooks/useLocationList";
import { LocationListHeader } from "./components/LocationListHeader";
import { LocationListLoading } from "./components/LocationListLoading";
import { LocationFormDialog } from "./components/LocationFormDialog";

export const LocationList = () => {
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

  console.log('LocationList rendering with:', { 
    locationsCount: locations?.length, 
    isLoading,
    dialogOpen: isDialogOpen
  });

  return (
    <div className="space-y-4">
      <LocationListHeader 
        locationsCount={locations?.length || 0} 
        onAddClick={openAddDialog} 
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
