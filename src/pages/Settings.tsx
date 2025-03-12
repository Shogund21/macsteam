
import { useState, useEffect } from "react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import FormSection from "@/components/maintenance/form/FormSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("general");
  const [showTabList, setShowTabList] = useState(!isMobile);

  // Update showTabList when screen size changes
  useEffect(() => {
    setShowTabList(!isMobile);
  }, [isMobile]);

  const tabs = [
    { id: "general", label: "General" },
    { id: "appearance", label: "Appearance" },
    { id: "notifications", label: "Notifications" },
    { id: "documentation", label: "Documentation" },
    { id: "locations", label: "Locations" },
    { id: "maintenance", label: "Maintenance" },
    { id: "features", label: "Features" },
    { id: "refactoring", label: "Refactoring" },
  ];

  const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  const prevTab = tabs[currentTabIndex - 1];
  const nextTab = tabs[currentTabIndex + 1];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (isMobile) {
      setShowTabList(false);
    }
  };

  const toggleTabList = () => {
    setShowTabList(!showTabList);
  };

  return (
    <Layout>
      <div className="container mx-auto py-4 md:py-6 px-2 md:px-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Settings</h1>
          {isMobile && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleTabList} 
              className="flex items-center text-sm"
            >
              {showTabList ? "Hide" : "Show"} Menu
            </Button>
          )}
        </div>
        
        <div className={`${isMobile ? 'flex flex-col' : 'space-y-4'}`}>
          {isMobile && !showTabList && (
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h2 className="font-medium">{tabs.find(tab => tab.id === activeTab)?.label}</h2>
              <div className="flex space-x-2">
                {prevTab && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleTabChange(prevTab.id)}
                    className="flex items-center text-xs p-1"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    {prevTab.label}
                  </Button>
                )}
                {nextTab && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleTabChange(nextTab.id)}
                    className="flex items-center text-xs p-1"
                  >
                    {nextTab.label}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <Tabs 
            defaultValue="general" 
            value={activeTab}
            onValueChange={handleTabChange}
            className={`${isMobile ? 'flex flex-col' : 'space-y-4'}`}
          >
            {showTabList && (
              <div className={`${isMobile ? 'mb-4 pb-2 overflow-x-auto -mx-2 px-2' : ''}`}>
                <TabsList className={`${isMobile ? 'w-full flex' : ''}`}>
                  {tabs.map(tab => (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className={`${isMobile ? 'flex-1 text-xs py-1 px-2' : ''}`}
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            )}

            {isMobile ? (
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
            ) : (
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
            )}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
