import { format } from 'date-fns';
import { HiPencil } from 'react-icons/hi2';

import CreateProjectForm from './CreateProjectForm';
import useDeleteProject from './useDeleteProject';
// import { useModal } from '../../context/ModalContext';
import useModal from '../../hooks/useModal';
import { Project } from '../../services/apiProjects';
import DeleteModal from '../../ui/DeleteModal';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';

type ProjectRowProps = {
  project: Project;
};

const ProjectRow = ({ project }: ProjectRowProps) => {
  const {
    id: projectId,
    project_type,
    start_date,
    end_date,
    project_manager,
    comment,
    status,
  } = project;

  const { isDeleting, deleteProject } = useDeleteProject();
  const { closeModal, open, setOpen } = useModal();

  return (
    <Table.Row>
      <Table.Cell>{projectId}</Table.Cell>
      <Table.Cell>{project_type}</Table.Cell>
      <Table.Cell>{format(new Date(start_date), 'MMM dd yyyy')}</Table.Cell>
      <Table.Cell>{format(new Date(end_date), 'MMM dd yyyy')}</Table.Cell>
      <Table.Cell>{project_manager}</Table.Cell>
      <Table.Cell>{comment}</Table.Cell>
      <Table.Cell>{status}</Table.Cell>

      <div className='flex gap-2'>
        <Modal
          icon={<HiPencil />}
          buttonText='Edit'
          dialogTitle={`Edit Project ${projectId}`}
          open={open}
          setOpen={setOpen}
        >
          <CreateProjectForm project={project} closeModal={closeModal} />
        </Modal>
        <DeleteModal
          dialogTitle={`Delete Project ${projectId}`}
          onDelete={() => deleteProject(projectId)}
          isDeleting={isDeleting}
        />
      </div>
    </Table.Row>
  );
};

export default ProjectRow;
