import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Equipment from "@/pages/Equipment";
import Projects from "@/pages/Projects";
import Settings from "@/pages/Settings";
import AddEquipment from "@/pages/AddEquipment";
import AddProject from "@/pages/AddProject";
import MaintenanceChecks from "@/pages/MaintenanceChecks";
import PrintView from "@/pages/PrintView";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-equipment" element={<AddEquipment />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/maintenance-checks" element={<MaintenanceChecks />} />
          <Route path="/print" element={<PrintView />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;