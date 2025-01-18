import { format } from "date-fns";
import { MaintenanceCheck } from "@/types/maintenance";
import { Badge } from "@/components/ui/badge";
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
  onStatusChange: (id: string, status: "completed" | "pending" | "issue_found") => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

const MaintenanceTableRow = ({
  check,
  onStatusChange,
  onDelete,
}: MaintenanceTableRowProps) => {
  const [showDetails, setShowDetails] = useState(false);

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

  const getTechnicianName = () => {
    if (!check.technician) return "Unassigned";
    return `${check.technician.firstName} ${check.technician.lastName}`;
  };

  return (
    <>
      <div className="border rounded-lg p-4 space-y-4 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">
              {check.equipment?.name || "Equipment Not Available"}
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Date: {format(new Date(check.check_date || ""), "PPP")}</p>
              <p>Location: {check.equipment?.location || "Location Not Available"}</p>
              <p>Technician: {getTechnicianName()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(check.status || "")}>
              {check.status?.replace("_", " ").toUpperCase()}
            </Badge>
            <Select
              defaultValue={check.status || ""}
              onValueChange={(value: "completed" | "pending" | "issue_found") =>
                onStatusChange(check.id, value)
              }
            >
              <SelectTrigger className="w-[180px] bg-white border-gray-200">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                <SelectItem value="completed" className="cursor-pointer hover:bg-gray-100">
                  Completed
                </SelectItem>
                <SelectItem value="pending" className="cursor-pointer hover:bg-gray-100">
                  Pending
                </SelectItem>
                <SelectItem value="issue_found" className="cursor-pointer hover:bg-gray-100">
                  Issue Found
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowDetails(true)}
              className="hover:bg-blue-50"
            >
              <Eye className="h-4 w-4 text-blue-600" />
            </Button>
          </div>
        </div>
      </div>

      <MaintenanceCheckDetails 
        check={check}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
};

export default MaintenanceTableRow;