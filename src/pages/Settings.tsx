import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TechnicianManagement from "@/components/settings/TechnicianManagement";
import { useIsMobile } from "@/hooks/use-mobile";

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
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Appearance</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Customize the look and feel of the application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  Appearance settings will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Notifications</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Manage your notification preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  Notification settings will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;