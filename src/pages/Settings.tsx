
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSection } from "@/components/settings/sections/GeneralSection";
import { AppearanceSection } from "@/components/settings/sections/AppearanceSection";
import { NotificationsSection } from "@/components/settings/sections/NotificationsSection";
import { DocumentationSection } from "@/components/settings/sections/DocumentationSection";
import { LocationsSection } from "@/components/settings/sections/LocationsSection";
import { MaintenanceSection } from "@/components/settings/sections/MaintenanceSection";
import { RefactoringRules } from "@/components/refactoring/RefactoringRules";
import { FeaturesSection } from "@/components/settings/sections/FeaturesSection";

const Settings = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="refactoring">Refactoring</TabsTrigger>
          </TabsList>

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
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
