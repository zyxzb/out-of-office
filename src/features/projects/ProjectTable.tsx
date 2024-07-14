import ProjectRow from './ProjectRow';
import useProjects from './useProjects';
import Table from '../../ui/Table';

const ProjectTable = () => {
  const { projects, isLoading, isError, error } = useProjects();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  if (!projects) return <p>No projects to show</p>;

  return (
    <Table columns='grid-cols-8'>
      <Table.Header>
        <div>Id</div>
        <div>Project Type</div>
        <div>Start Date</div>
        <div>End Date</div>
        <div>Project Manager</div>
        <div>Comment</div>
        <div>Status</div>
      </Table.Header>
      <Table.Body
        data={projects}
        render={(project) => <ProjectRow key={project.id} project={project} />}
      />
    </Table>
  );
};

export default ProjectTable;
