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

interface MaintenanceTableRowProps {
  check: MaintenanceCheck;
  onStatusChange: (id: string, status: MaintenanceCheckStatus) => void;
}

export const MaintenanceTableRow = ({
  check,
  onStatusChange,
}: MaintenanceTableRowProps) => {
  return (
    <TableRow>
      <TableCell>{format(new Date(check.check_date || ''), 'PPP')}</TableCell>
      <TableCell>{check.equipment?.name || 'N/A'}</TableCell>
      <TableCell>{check.equipment?.location || 'Not specified'}</TableCell>
      <TableCell>
        {check.technician ? 
          `${check.technician.firstName} ${check.technician.lastName}` : 
          'Unassigned'
        }
      </TableCell>
      <TableCell>
        <Select
          defaultValue={check.status || 'pending'}
          onValueChange={(value) => 
            onStatusChange(check.id, value as MaintenanceCheckStatus)
          }
        >
          <SelectTrigger className="w-[130px] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="issue_found">Issue Found</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
};