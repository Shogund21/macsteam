
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { PrintControls } from "./PrintControls";
import { EquipmentTable } from "./EquipmentTable";
import { ProjectsTable } from "./ProjectsTable";
import { usePrintHandler } from "./usePrintHandler";
import { Equipment } from "@/types/equipment";

export const PrintView = () => {
  const [view, setView] = useState<"equipment" | "projects">("equipment");
  const { handlePrint } = usePrintHandler();

  const { data: equipmentData } = useQuery({
    queryKey: ["equipment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("equipment")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  // Map database fields to Equipment interface
  const equipment: Equipment[] = equipmentData?.map(item => ({
    id: item.id,
    name: item.name,
    model: item.model || '',
    serialNumber: item.serial_number || '', // Map snake_case to camelCase
    location: item.location,
    lastMaintenance: item.lastMaintenance,
    nextMaintenance: item.nextMaintenance,
    status: item.status || ''
  })) || [];

  return (
    <div className="p-6 space-y-6 print:p-0">
      <PrintControls 
        view={view}
        setView={setView}
        onPrint={handlePrint}
      />

      <div className="print-content">
        {view === "equipment" && equipment && (
          <EquipmentTable data={equipment} />
        )}

        {view === "projects" && projectsData && (
          <ProjectsTable data={projectsData} />
        )}
      </div>
    </div>
  );
};
