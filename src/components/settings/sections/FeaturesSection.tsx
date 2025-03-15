
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import FeaturesTabs from "../features/FeaturesTabs";

export const FeaturesSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className={isMobile ? "px-3 py-4" : ""}>
          <CardTitle className="text-lg md:text-xl">Features Overview</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            A comprehensive guide to all features and capabilities of Shogunai's AssetGuardian Maintenance System
          </CardDescription>
        </CardHeader>
        <CardContent className={isMobile ? "px-3 py-3" : ""}>
          <FeaturesTabs />
        </CardContent>
      </Card>
    </div>
  );
};
