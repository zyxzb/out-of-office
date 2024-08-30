import ProjectRow from './ProjectRow';
import useSearchFilterProjects from './useSearchFilterProjects';
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
      <Table columns='grid-cols-9'>
        <Table.Header>
          <div>Id</div>
          <div>Project Type</div>
          <div>Start Date</div>
          <div>End Date</div>
          <div>Project Manager</div>
          <div>Comment</div>
          <div>Status</div>
          <div>Operations</div>
        </Table.Header>
        <Table.Body
          data={projects}
          render={(project) => (
            <ProjectRow key={project.id} project={project} />
          )}
        />
      </Table>
      <Pagination count={count} />
    </>
  );
};

export default ProjectTable;
