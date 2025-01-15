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

  return (
    <TableRow className="border-b">
      <TableCell className="w-[180px] whitespace-nowrap">
        {format(new Date(check.check_date || ""), "PPP")}
      </TableCell>
      <TableCell className="w-[180px] whitespace-nowrap">
        {check.equipment?.name || "N/A"}
      </TableCell>
      <TableCell className="w-[180px] whitespace-nowrap">
        {check.equipment?.location || "Not specified"}
      </TableCell>
      <TableCell className="w-[200px] whitespace-nowrap">
        {check.technician
          ? `${check.technician.firstName} ${check.technician.lastName}`
          : "Unassigned"}
      </TableCell>
      <TableCell className="w-[150px]">
        <Select
          value={check.status || "pending"}
          onValueChange={(value) =>
            onStatusChange(check.id, value as MaintenanceCheckStatus)
          }
        >
          <SelectTrigger className="w-[140px] h-10 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="issue_found">Issue Found</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="w-[100px] text-right">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDetails(true)}
          className="inline-flex items-center gap-2"
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