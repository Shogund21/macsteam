import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";

interface Technician {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
}

interface TechnicianListProps {
  technicians: Technician[];
  onDelete: (id: string) => void;
}

const TechnicianList = ({ technicians, onDelete }: TechnicianListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Current Technicians</h3>
      <div className="divide-y divide-gray-200">
        {technicians?.map((technician) => (
          <div
            key={technician.id}
            className="flex items-center justify-between py-4"
          >
            <div>
              <p className="font-medium">
                {technician.firstName} {technician.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {technician.specialization}
              </p>
              <p className="text-sm text-muted-foreground">
                {technician.email} • {technician.phone}
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(technician.id)}
            >
              <UserX className="mr-2" />
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianList;