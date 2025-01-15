import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const MaintenanceTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[150px]">Date</TableHead>
        <TableHead className="w-[200px]">Equipment</TableHead>
        <TableHead className="w-[200px]">Location</TableHead>
        <TableHead className="w-[200px]">Technician</TableHead>
        <TableHead className="w-[150px]">Status</TableHead>
        <TableHead className="w-[120px] text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};