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

const MaintenanceTableRow = ({
  check,
  onStatusChange,
}: MaintenanceTableRowProps) => {
  const [showDetails, setShowDetails] = useState(false);

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
      <TableCell className="text-right">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDetails(true)}
          className="inline-flex items-center gap-2 hover:bg-gray-50"
        >
          <Eye className="h-4 w-4" />
          <span>View</span>
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

export default MaintenanceTableRow;