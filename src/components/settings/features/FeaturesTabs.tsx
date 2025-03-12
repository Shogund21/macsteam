
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import { featuresData } from './featuresData';
import FeatureTabContent from './FeatureTabContent';

const FeaturesTabs: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Tabs defaultValue="dashboard" className="space-y-4">
      <TabsList className="flex flex-wrap">
        {featuresData.map((tab) => (
          <TabsTrigger 
            key={tab.id}
            value={tab.id} 
            className={isMobile ? "text-xs py-1 px-2" : ""}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {featuresData.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          <FeatureTabContent tabData={tab} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FeaturesTabs;
