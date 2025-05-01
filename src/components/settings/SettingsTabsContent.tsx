
import { TabsContent } from "@/components/ui/tabs";
import { GeneralSection } from "./sections/GeneralSection";
import { NotificationsSection } from "./sections/NotificationsSection";
import { LocationsSection } from "./sections/LocationsSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { MaintenanceSection } from "./sections/MaintenanceSection";
import { DocumentationSection } from "./sections/DocumentationSection";
import { AppearanceSection } from "./sections/AppearanceSection";
import { CompaniesSection } from "./sections/CompaniesSection";

interface SettingsTabsContentProps {
  isMobile: boolean;
}

const SettingsTabsContent = ({ isMobile }: SettingsTabsContentProps) => {
  return (
    <div className={`${isMobile ? 'mt-0' : 'mt-2'}`}>
      <TabsContent value="general" className="mt-0">
        <GeneralSection />
      </TabsContent>
      <TabsContent value="notifications" className="mt-0">
        <NotificationsSection />
      </TabsContent>
      <TabsContent value="locations" className="mt-0">
        <LocationsSection />
      </TabsContent>
      <TabsContent value="companies" className="mt-0">
        <CompaniesSection />
      </TabsContent>
      <TabsContent value="features" className="mt-0">
        <FeaturesSection />
      </TabsContent>
      <TabsContent value="maintenance" className="mt-0">
        <MaintenanceSection />
      </TabsContent>
      <TabsContent value="appearance" className="mt-0">
        <AppearanceSection />
      </TabsContent>
      <TabsContent value="documentation" className="mt-0">
        <DocumentationSection />
      </TabsContent>
    </div>
  );
};

export default SettingsTabsContent;
