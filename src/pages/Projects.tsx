import CreateProjectForm from '../features/projects/CreateProjectForm';
import ProjectsTableOperations from '../features/projects/ProjectsTableOperations';
import ProjectTable from '../features/projects/ProjectTable';
import useModal from '../hooks/useModal';
import Heading from '../ui/Heading';
import Modal from '../ui/Modal';

const Projects = () => {
  const { closeModal, open, setOpen } = useModal();

  return (
    <>
      <Heading as='h1'>Projects</Heading>
      <ProjectsTableOperations />
      <ProjectTable />
      <Modal
        buttonText='Add new project'
        dialogTitle='New Project'
        dialogDescription='This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.'
        open={open}
        setOpen={setOpen}
      >
        <CreateProjectForm closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default Projects;
