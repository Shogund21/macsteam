import { Project } from "@/types/project";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProjectsTableProps {
  data: Project[];
}

export const ProjectsTable = ({ data }: ProjectsTableProps) => {
  return (
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
          {data?.map((project: Project) => (
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
  );
};