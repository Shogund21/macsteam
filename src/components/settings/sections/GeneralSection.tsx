
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TechnicianManagement from "../TechnicianManagement";

export const GeneralSection = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Technician Management</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Add, remove, and manage technicians in your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TechnicianManagement />
        </CardContent>
      </Card>
    </div>
  );
};
