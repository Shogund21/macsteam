import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPasswordForm } from "../AdminPasswordForm";
import TechnicianManagement from "../TechnicianManagement";

export const GeneralSection = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Admin Access</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Enter the admin password to gain access to location management.
          </CardDescription>
        </CardHeader>
        <CardContent className="block">
          <AdminPasswordForm />
        </CardContent>
      </Card>

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