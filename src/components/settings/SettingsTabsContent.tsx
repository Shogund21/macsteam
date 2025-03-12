
import { TabsContent } from "@/components/ui/tabs";
import { GeneralSection } from "@/components/settings/sections/GeneralSection";
import { AppearanceSection } from "@/components/settings/sections/AppearanceSection";
import { NotificationsSection } from "@/components/settings/sections/NotificationsSection";
import { DocumentationSection } from "@/components/settings/sections/DocumentationSection";
import { LocationsSection } from "@/components/settings/sections/LocationsSection";
import { MaintenanceSection } from "@/components/settings/sections/MaintenanceSection";
import { FeaturesSection } from "@/components/settings/sections/FeaturesSection";
import { RefactoringRules } from "@/components/refactoring/RefactoringRules";
import FormSection from "@/components/maintenance/form/FormSection";

interface SettingsTabsContentProps {
  isMobile: boolean;
}

const SettingsTabsContent = ({ isMobile }: SettingsTabsContentProps) => {
  if (isMobile) {
    return (
      <FormSection noPadding>
        <TabsContent value="general">
          <GeneralSection />
        </TabsContent>
        
        <TabsContent value="appearance">
          <AppearanceSection />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsSection />
        </TabsContent>
        
        <TabsContent value="documentation">
          <DocumentationSection />
        </TabsContent>
        
        <TabsContent value="locations">
          <LocationsSection />
        </TabsContent>
        
        <TabsContent value="maintenance">
          <MaintenanceSection />
        </TabsContent>

        <TabsContent value="features">
          <FeaturesSection />
        </TabsContent>

        <TabsContent value="refactoring">
          <RefactoringRules />
        </TabsContent>
      </FormSection>
    );
  }
  
  return (
    <>
      <TabsContent value="general">
        <GeneralSection />
      </TabsContent>
      
      <TabsContent value="appearance">
        <AppearanceSection />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsSection />
      </TabsContent>
      
      <TabsContent value="documentation">
        <DocumentationSection />
      </TabsContent>
      
      <TabsContent value="locations">
        <LocationsSection />
      </TabsContent>
      
      <TabsContent value="maintenance">
        <MaintenanceSection />
      </TabsContent>

      <TabsContent value="features">
        <FeaturesSection />
      </TabsContent>

      <TabsContent value="refactoring">
        <RefactoringRules />
      </TabsContent>
    </>
  );
};

export default SettingsTabsContent;
