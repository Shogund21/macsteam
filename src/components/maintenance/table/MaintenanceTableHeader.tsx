import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const MaintenanceTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="border-b">
        <TableHead className="w-[180px] whitespace-nowrap">Date</TableHead>
        <TableHead className="w-[180px] whitespace-nowrap">Equipment</TableHead>
        <TableHead className="w-[180px] whitespace-nowrap">Location</TableHead>
        <TableHead className="w-[200px] whitespace-nowrap">Technician</TableHead>
        <TableHead className="w-[150px] whitespace-nowrap">Status</TableHead>
        <TableHead className="w-[100px] text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};