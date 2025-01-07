import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { Database } from "@/integrations/supabase/types";
import { format } from "date-fns";

type MaintenanceCheckStatus = Database["public"]["Enums"]["maintenance_check_status"];

interface MaintenanceTableRowProps {
  check: any;
  onStatusChange: (id: string, status: MaintenanceCheckStatus) => void;
}

export const MaintenanceTableRow = ({ check, onStatusChange }: MaintenanceTableRowProps) => {
  return (
    <TableRow key={check.id}>
      <TableCell>
        {format(new Date(check.check_date), 'MMM d, yyyy HH:mm')}
      </TableCell>
      <TableCell>{check.equipment?.name}</TableCell>
      <TableCell>{check.equipment?.location}</TableCell>
      <TableCell>
        {check.technician?.firstName} {check.technician?.lastName}
      </TableCell>
      <TableCell>
        <Badge variant={check.status === 'completed' ? 'default' : 'destructive'}>
          {check.status}
        </Badge>
      </TableCell>
      <TableCell>
        {(check.unusual_noise || check.vibration_observed) && (
          <Badge variant="destructive">Issues Found</Badge>
        )}
      </TableCell>
      <TableCell>
        <Select
          value={check.status}
          onValueChange={(value: MaintenanceCheckStatus) => onStatusChange(check.id, value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Update status" />
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