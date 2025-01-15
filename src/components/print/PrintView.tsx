import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Equipment } from "@/types/equipment";
import { Project } from "@/types/project";

export const PrintView = () => {
  const [view, setView] = useState<"equipment" | "projects">("equipment");

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

  const handlePrint = () => {
    const printContent = document.querySelector('.print-content');
    if (!printContent) return;

    // Store the original styles
    const originalStyles = {
      background: document.body.style.background,
      margin: document.body.style.margin,
      padding: document.body.style.padding
    };

    // Create a new style element for print
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body { background: white; margin: 0; padding: 20px; }
        .print-content { display: block !important; }
        .print-content table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .print-content th, .print-content td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .print-content th { background-color: #f5f5f5; }
        .print-content h2 { margin-bottom: 20px; }
        @page { margin: 20px; }
      }
    `;
    document.head.appendChild(style);

    // Hide all other elements except print content
    const elements = document.body.children;
    const hiddenElements = Array.from(elements).map(element => {
      const wasHidden = element.style.display === 'none';
      if (!printContent.contains(element)) {
        element.style.display = 'none';
      }
      return { element, wasHidden };
    });

    // Trigger print
    window.print();

    // Cleanup: Remove the style element
    document.head.removeChild(style);

    // Restore original styles and visibility
    document.body.style.background = originalStyles.background;
    document.body.style.margin = originalStyles.margin;
    document.body.style.padding = originalStyles.padding;

    hiddenElements.forEach(({ element, wasHidden }) => {
      if (!wasHidden) {
        element.style.display = '';
      }
    });
  };

  return (
    <div className="p-6 space-y-6 print:p-0">
      <div className="flex justify-between items-center print:hidden">
        <div className="space-x-4">
          <Button
            variant={view === "equipment" ? "default" : "outline"}
            onClick={() => setView("equipment")}
            className={view === "equipment" ? "bg-[#1EAEDB] text-black hover:bg-[#33C3F0]" : ""}
          >
            Equipment List
          </Button>
          <Button
            variant={view === "projects" ? "default" : "outline"}
            onClick={() => setView("projects")}
            className={view === "projects" ? "bg-[#1EAEDB] text-black hover:bg-[#33C3F0]" : ""}
          >
            Projects List
          </Button>
        </div>
        <Button 
          onClick={handlePrint}
          className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-black"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>

      <div className="print-content">
        {view === "equipment" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Equipment List</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipmentData?.map((equipment: Equipment) => (
                  <TableRow key={equipment.id}>
                    <TableCell>{equipment.name}</TableCell>
                    <TableCell>{equipment.model}</TableCell>
                    <TableCell>{equipment.serialNumber}</TableCell>
                    <TableCell>{equipment.location}</TableCell>
                    <TableCell>{equipment.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {view === "projects" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Projects List</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsData?.map((project: Project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.status}</TableCell>
                    <TableCell>{project.priority}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>
                      {project.startdate
                        ? new Date(project.startdate).toLocaleDateString()
                        : "Not set"}
                    </TableCell>
                    <TableCell>
                      {project.enddate
                        ? new Date(project.enddate).toLocaleDateString()
                        : "Not set"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};