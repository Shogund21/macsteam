
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationList } from "../location/LocationList";
import { useCompany } from "@/contexts/CompanyContext";

export const LocationsSection = () => {
  const { currentCompany } = useCompany();
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Location Management</CardTitle>
          <CardDescription className="text-sm md:text-base">
            {currentCompany 
              ? `Add, edit, and manage locations for ${currentCompany.name}.`
              : "Select a company to manage its locations."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LocationList />
        </CardContent>
      </Card>
    </div>
  );
};
