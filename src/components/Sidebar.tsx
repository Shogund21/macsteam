import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Wrench, Briefcase, Settings, Gauge } from "lucide-react";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", to: "/", icon: LayoutDashboard },
    { name: "Equipment", to: "/equipment", icon: Wrench },
    { name: "Projects", to: "/projects", icon: Briefcase },
    { name: "Maintenance Checks", to: "/maintenance-checks", icon: Gauge },
    { name: "Settings", to: "/settings", icon: Settings },
  ];

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                      isActive && "bg-primary/10 text-primary"
                    )
                  }
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {link.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;