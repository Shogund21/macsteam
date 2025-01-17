import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TechnicianManagement from "@/components/settings/TechnicianManagement";
import DocumentationViewer from "@/components/settings/DocumentationViewer";
import LocationManagement from "@/components/settings/LocationManagement";
import { useIsMobile } from "@/hooks/use-mobile";
import { FileText, BookOpen, Info, MapPin } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const isMobile = useIsMobile();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const documentationLinks = [
    {
      title: "Equipment Management",
      description: "Learn how to track and maintain HVAC equipment details.",
      icon: FileText,
      path: "/docs/equipment-management.md",
    },
    {
      title: "Maintenance Checks",
      description: "Comprehensive guide for HVAC system maintenance checks.",
      icon: BookOpen,
      path: "/docs/maintenance-checks.md",
    },
    {
      title: "Project Management",
      description: "Guide for tracking and organizing maintenance projects.",
      icon: FileText,
      path: "/docs/project-management.md",
    },
    {
      title: "Technician Management",
      description: "Instructions for managing maintenance staff and assignments.",
      icon: Info,
      path: "/docs/technician-management.md",
    },
  ];

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

          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Location Management</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Add and manage locations for equipment and maintenance checks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LocationManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Documentation</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Access guides and documentation for system features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDoc ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => setSelectedDoc(null)}
                      className="text-sm text-primary hover:underline mb-4"
                    >
                      ← Back to documentation list
                    </button>
                    <DocumentationViewer path={selectedDoc} />
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {documentationLinks.map((doc) => (
                      <button
                        key={doc.title}
                        onClick={() => setSelectedDoc(doc.path)}
                        className="block p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors text-left w-full"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <doc.icon className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">{doc.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </button>
                    ))}
                  </div>
                )}
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