
import Layout from "@/components/Layout";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useSettingsTabs } from "@/hooks/settings/useSettingsTabs";
import SettingsTabsList from "@/components/settings/SettingsTabsList";
import SettingsTabsContent from "@/components/settings/SettingsTabsContent";
import MobileTabNavigation from "@/components/settings/MobileTabNavigation";

const Settings = () => {
  const {
    tabs,
    activeTab,
    showTabList,
    prevTab,
    nextTab,
    isMobile,
    handleTabChange,
    toggleTabList
  } = useSettingsTabs();

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
            <MobileTabNavigation 
              prevTab={prevTab} 
              nextTab={nextTab} 
              handleTabChange={handleTabChange}
            />
          )}
          
          <Tabs 
            value={activeTab}
            onValueChange={handleTabChange}
            className={`${isMobile ? 'flex flex-col' : 'space-y-4'}`}
          >
            {showTabList && (
              <div className={`${isMobile ? 'mb-4 pb-2 overflow-x-auto -mx-2 px-2' : ''}`}>
                <SettingsTabsList tabs={tabs} isMobile={isMobile} />
              </div>
            )}

            <SettingsTabsContent isMobile={isMobile} />
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
