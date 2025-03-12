
import { LucideIcon } from "lucide-react";

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureItem = ({ icon: Icon, title, description }: FeatureItemProps) => {
  return (
    <div className="flex space-x-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
      <div className="mt-0.5">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
