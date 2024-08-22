import CreateProjectForm from '../features/projects/CreateProjectForm';
import ProjectTable from '../features/projects/ProjectTable';
import Heading from '../ui/Heading';
import Modal from '../ui/Modal';

const Projects = () => {
  return (
    <>
      <Heading as='h1'>Projects</Heading>
      <ProjectTable />
      <Modal
        buttonText='Add new project'
        dialogTitle='New Project'
        dialogDescription='This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.'
      >
        <CreateProjectForm />
      </Modal>
    </>
  );
};

export default Projects;
