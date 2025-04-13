
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Equipment from "@/pages/Equipment";
import EquipmentDetails from "@/pages/EquipmentDetails";
import AddEquipment from "@/pages/AddEquipment";
import Projects from "@/pages/Projects";
import AddProject from "@/pages/AddProject";
import MaintenanceChecks from "@/pages/MaintenanceChecks";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import PrintView from "@/pages/PrintView";
import PageTransition from "@/components/PageTransition";
import { CompanyProvider } from "@/contexts/CompanyContext";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <PageTransition>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/equipment/:id" element={<EquipmentDetails />} />
        <Route path="/add-equipment" element={<AddEquipment />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/maintenance-checks" element={<MaintenanceChecks />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/print" element={<PrintView />} />
      </Routes>
    </PageTransition>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CompanyProvider>
        <BrowserRouter>
          <AnimatedRoutes />
          <Toaster />
        </BrowserRouter>
      </CompanyProvider>
    </QueryClientProvider>
  );
}

export default App;
