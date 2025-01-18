import { TableCell, TableRow } from "@/components/ui/table";
import { MaintenanceCheck, MaintenanceCheckStatus } from "@/types/maintenance";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import MaintenanceCheckDetails from "../MaintenanceCheckDetails";
import EditMaintenanceDialog from "../EditMaintenanceDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MaintenanceTableRowProps {
  check: MaintenanceCheck;
  onStatusChange: (id: string, status: MaintenanceCheckStatus) => void;
  onDelete: () => void;
}

const MaintenanceTableRow = ({
  check,
  onStatusChange,
  onDelete,
}: MaintenanceTableRowProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: MaintenanceCheckStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "issue_found":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('hvac_maintenance_checks')
        .delete()
        .eq('id', check.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Maintenance check deleted successfully",
      });
      onDelete();
    } catch (error) {
      console.error('Error deleting maintenance check:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete maintenance check",
      });
    }
  };

  return (
    <TableRow className="border-b hover:bg-gray-50/50 transition-colors">
      <TableCell className="font-medium">
        {format(new Date(check.check_date || ""), "PPP")}
      </TableCell>
      <TableCell>
        <span className="font-medium">{check.equipment?.name || "N/A"}</span>
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
          {check.equipment?.location || "Not specified"}
        </span>
      </TableCell>
      <TableCell>
        {check.technician
          ? `${check.technician.firstName} ${check.technician.lastName}`
          : "Unassigned"}
      </TableCell>
      <TableCell>
        <Select
          value={check.status || "pending"}
          onValueChange={(value) =>
            onStatusChange(check.id, value as MaintenanceCheckStatus)
          }
        >
          <SelectTrigger 
            className={`w-[140px] h-9 ${getStatusColor(check.status as MaintenanceCheckStatus)}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="issue_found">Issue Found</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDetails(true)}
          className="inline-flex items-center gap-2 hover:bg-gray-50"
        >
          <Eye className="h-4 w-4" />
          <span>View</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowEditDialog(true)}
          className="inline-flex items-center gap-2 hover:bg-gray-50"
        >
          <Pencil className="h-4 w-4" />
          <span>Edit</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
          className="inline-flex items-center gap-2 hover:bg-gray-50 text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </Button>

        <MaintenanceCheckDetails
          check={check}
          open={showDetails}
          onOpenChange={setShowDetails}
        />

        <EditMaintenanceDialog
          check={check}
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          onComplete={onDelete}
        />

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Maintenance Check</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this maintenance check? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default MaintenanceTableRow;