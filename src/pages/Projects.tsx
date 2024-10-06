import CreateProjectForm from '../features/projects/CreateProjectForm';
import ProjectsTableOperations from '../features/projects/ProjectsTableOperations';
import ProjectTable from '../features/projects/ProjectTable';
import Modal from '../ui/CCPModal';
import Heading from '../ui/Heading';

const Projects = () => {
  return (
    <>
      <Heading as='h1'>Projects</Heading>
      <ProjectsTableOperations />
      <ProjectTable />
      <Modal>
        <Modal.Trigger>Add new project</Modal.Trigger>
        <Modal.Content
          dialogTitle='New Project'
          dialogDescription='This action will create a new project'
        >
          <CreateProjectForm />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Projects;
