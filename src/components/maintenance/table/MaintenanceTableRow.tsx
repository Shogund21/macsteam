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
import { Eye } from "lucide-react";
import { useState } from "react";
import MaintenanceCheckDetails from "../MaintenanceCheckDetails";

interface MaintenanceTableRowProps {
  check: MaintenanceCheck;
  onStatusChange: (id: string, status: MaintenanceCheckStatus) => void;
}

export const MaintenanceTableRow = ({
  check,
  onStatusChange,
}: MaintenanceTableRowProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <TableRow>
      <TableCell>{format(new Date(check.check_date || ""), "PPP")}</TableCell>
      <TableCell>{check.equipment?.name || "N/A"}</TableCell>
      <TableCell>{check.equipment?.location || "Not specified"}</TableCell>
      <TableCell>
        {check.technician ? 
          `${check.technician.firstName} ${check.technician.lastName}` : 
          "Unassigned"
        }
      </TableCell>
      <TableCell>
        <Select
          value={check.status || "pending"}
          onValueChange={(value) => 
            onStatusChange(check.id, value as MaintenanceCheckStatus)
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="issue_found">Issue Found</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDetails(true)}
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-300 shadow-sm"
        >
          <Eye className="h-4 w-4" />
          <span className="font-medium">View</span>
        </Button>
        <MaintenanceCheckDetails
          check={check}
          open={showDetails}
          onOpenChange={setShowDetails}
        />
      </TableCell>
    </TableRow>
  );
};