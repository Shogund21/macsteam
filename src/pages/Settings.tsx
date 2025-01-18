import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { GeneralSection } from "@/components/settings/sections/GeneralSection";
import { LocationsSection } from "@/components/settings/sections/LocationsSection";
import { DocumentationSection } from "@/components/settings/sections/DocumentationSection";
import { AppearanceSection } from "@/components/settings/sections/AppearanceSection";
import { NotificationsSection } from "@/components/settings/sections/NotificationsSection";
import { MaintenanceSection } from "@/components/settings/sections/MaintenanceSection";

const Settings = () => {
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className={`${isMobile ? 'flex flex-wrap gap-2' : ''}`}>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSection />
          </TabsContent>

          <TabsContent value="locations">
            <LocationsSection />
          </TabsContent>

          <TabsContent value="documentation">
            <DocumentationSection />
          </TabsContent>

          <TabsContent value="appearance">
            <AppearanceSection />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsSection />
          </TabsContent>

          <TabsContent value="maintenance">
            <MaintenanceSection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;