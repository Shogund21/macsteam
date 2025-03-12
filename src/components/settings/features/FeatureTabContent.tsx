
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { FeaturesTabData } from './featuresData';
import FeatureItem from './FeatureItem';

interface FeatureTabContentProps {
  tabData: FeaturesTabData;
}

const FeatureTabContent: React.FC<FeatureTabContentProps> = ({ tabData }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-3 md:space-y-4">
      <h3 className="text-sm md:text-lg font-semibold">{tabData.title}</h3>
      <div className="grid gap-2 md:gap-4 md:grid-cols-2">
        {tabData.features.map((feature, index) => (
          <FeatureItem
            key={`${tabData.id}-feature-${index}`}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureTabContent;
