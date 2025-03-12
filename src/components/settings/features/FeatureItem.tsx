
import { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureItem = ({ icon: Icon, title, description }: FeatureItemProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex space-x-3 p-3 md:p-4 border rounded-lg hover:bg-slate-50 transition-colors">
      <div className="mt-0.5 flex-shrink-0">
        <Icon className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-primary`} />
      </div>
      <div>
        <h4 className={`${isMobile ? 'text-sm' : 'text-base'} font-medium`}>{title}</h4>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mt-1`}>{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
