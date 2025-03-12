
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsTabsListProps {
  tabs: Array<{ id: string; label: string }>;
  isMobile: boolean;
}

const SettingsTabsList = ({ tabs, isMobile }: SettingsTabsListProps) => {
  return (
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
  );
};

export default SettingsTabsList;
