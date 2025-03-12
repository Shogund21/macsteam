
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const SETTINGS_TABS = [
  { id: "general", label: "General" },
  { id: "appearance", label: "Appearance" },
  { id: "notifications", label: "Notifications" },
  { id: "documentation", label: "Documentation" },
  { id: "locations", label: "Locations" },
  { id: "maintenance", label: "Maintenance" },
  { id: "features", label: "Features" },
  { id: "refactoring", label: "Refactoring" },
];

export const useSettingsTabs = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("general");
  const [showTabList, setShowTabList] = useState(!isMobile);

  // Update showTabList when screen size changes
  useEffect(() => {
    setShowTabList(!isMobile);
  }, [isMobile]);

  const currentTabIndex = SETTINGS_TABS.findIndex(tab => tab.id === activeTab);
  const prevTab = SETTINGS_TABS[currentTabIndex - 1];
  const nextTab = SETTINGS_TABS[currentTabIndex + 1];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (isMobile) {
      setShowTabList(false);
    }
  };

  const toggleTabList = () => {
    setShowTabList(!showTabList);
  };

  return {
    tabs: SETTINGS_TABS,
    activeTab,
    showTabList,
    prevTab,
    nextTab,
    isMobile,
    handleTabChange,
    toggleTabList
  };
};
