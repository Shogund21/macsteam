
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Settings, Wrench, Briefcase, ClipboardCheck, ListChecks, BarChart } from "lucide-react";
import { useEffect, useRef } from "react";

interface NavItemProps {
  icon: React.ElementType;
  title: string;
  path: string;
  isActive: boolean;
}

interface SidebarProps {
  onClose?: () => void;
}

const NavItem = ({ icon: Icon, title, path, isActive }: NavItemProps) => (
  <Link
    to={path}
    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
      isActive ? "bg-background/10 text-black" : "text-gray-500 hover:text-black hover:bg-gray-100"
    }`}
    onClick={(e) => {
      // Close sidebar on mobile when a nav item is clicked
      const sidebar = document.querySelector('[data-sidebar]');
      if (sidebar && window.innerWidth < 768) {
        sidebar.dispatchEvent(new CustomEvent('sidebarclose'));
      }
    }}
  >
    <Icon className="w-5 h-5" />
    <span>{title}</span>
  </Link>
);

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const pathname = location.pathname;
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sidebarElement = sidebarRef.current;
    
    if (sidebarElement && onClose) {
      const handleSidebarClose = () => {
        onClose();
      };

      sidebarElement.addEventListener('sidebarclose', handleSidebarClose);
      
      return () => {
        sidebarElement.removeEventListener('sidebarclose', handleSidebarClose);
      };
    }
  }, [onClose]);

  const navItems = [
    { icon: LayoutDashboard, title: "Dashboard", path: "/" },
    { icon: Wrench, title: "Equipment", path: "/equipment" },
    { icon: Briefcase, title: "Projects", path: "/projects" },
    { icon: ClipboardCheck, title: "Maintenance", path: "/maintenance-checks" },
    { icon: BarChart, title: "Analytics", path: "/analytics" },
    { icon: ListChecks, title: "Print Lists", path: "/print" },
    { icon: Settings, title: "Settings", path: "/settings" },
  ];

  return (
    <aside 
      ref={sidebarRef}
      className="w-64 h-screen bg-gray-50 border-r border-gray-200 fixed top-0 left-0 overflow-y-auto z-10"
      data-sidebar
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold">Mac's FMS</h1>
        <p className="text-sm text-gray-500 mt-1">Facilities Maintenance</p>
      </div>
      <nav className="px-4 py-2 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            title={item.title}
            path={item.path}
            isActive={
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path)
            }
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
