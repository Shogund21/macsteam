import { format } from "date-fns";
import { MaintenanceCheck } from "@/types/maintenance";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MaintenanceTableRowProps {
  check: MaintenanceCheck;
  onStatusChange: (id: string, status: "completed" | "pending" | "issue_found") => Promise<void>;
}

const MaintenanceTableRow = ({
  check,
  onStatusChange,
}: MaintenanceTableRowProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "issue_found":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-semibold">
            Check Date: {format(new Date(check.check_date), "PPP")}
          </h3>
          <p className="text-sm text-muted-foreground">ID: {check.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(check.status)}>
            {check.status?.replace("_", " ").toUpperCase()}
          </Badge>
          <Select
            defaultValue={check.status}
            onValueChange={(value: "completed" | "pending" | "issue_found") =>
              onStatusChange(check.id, value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="issue_found">Issue Found</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTableRow;