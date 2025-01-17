import { Wrench, Briefcase, Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useStatsData } from "@/hooks/dashboard/useStatsData";
import { StatCard } from "./StatCard";

const Stats = () => {
  const { stats, isLoading, hasError, errors } = useStatsData();

  if (hasError) {
    console.error('Error fetching data:', errors);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="col-span-full p-6 bg-red-50">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>Error loading dashboard data. Please try again later.</p>
          </div>
        </Card>
      </div>
    );
  }

  const statsConfig = [
    {
      name: "Total Equipment",
      value: isLoading ? "..." : stats.totalEquipment.toString(),
      icon: Wrench,
      change: "+4.75%",
      changeType: "positive" as const,
    },
    {
      name: "Active Projects",
      value: isLoading ? "..." : stats.activeProjects.toString(),
      icon: Briefcase,
      change: "-0.5%",
      changeType: "negative" as const,
    },
    {
      name: "Pending Tasks",
      value: isLoading ? "..." : stats.pendingTasks.toString(),
      icon: Clock,
      change: "+2.1%",
      changeType: "positive" as const,
    },
    {
      name: "Available Technicians",
      value: isLoading ? "..." : stats.availableTechnicians.toString(),
      icon: AlertCircle,
      change: "-1.5%",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat) => (
        <StatCard key={stat.name} {...stat} />
      ))}
    </div>
  );
};

export default Stats;