import ProjectRow from './ProjectRow';
import useSearchFilterProjects from './useSearchFilterProjects';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '../../shadcn/components/ui/table';
import Pagination from '../../ui/Pagination';
import Table from '../../ui/Table';
import TableSkeleton from '../../ui/TableSkeleton';

const ProjectTable = () => {
  const { projects, isLoading, isError, error, count } =
    useSearchFilterProjects();

  if (isLoading) return <TableSkeleton />;

  if (isError) return <p>{error?.message}</p>;

  if (!projects) return <p>No projects to show</p>;

  return (
    <>
      <Table
        data={projects}
        render={(project) => <ProjectRow key={project.id} project={project} />}
      >
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Project Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Project Manager</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Operations</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <Pagination count={count} />
    </>
  );
};

export default ProjectTable;
