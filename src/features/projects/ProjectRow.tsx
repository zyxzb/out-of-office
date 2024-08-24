import { format } from 'date-fns';
import { HiPencil } from 'react-icons/hi2';

import CreateProjectForm from './CreateProjectForm';
import useDeleteProject from './useDeleteProject';
import { Project } from '../../services/apiProjects';
import DeleteModal from '../../ui/DeleteModal';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';

type ProjectRowProps = {
  project: Project;
};

const ProjectRow = ({
  project: {
    id: projectId,
    project_type,
    start_date,
    end_date,
    project_manager,
    comment,
    status,
  },
}: ProjectRowProps) => {
  const { isDeleting, deleteProject } = useDeleteProject();

  return (
    <Table.Row>
      <div>{projectId}</div>
      <div>{project_type}</div>
      <div>{format(new Date(start_date), 'MMM dd yyyy')}</div>
      <div>{format(new Date(end_date), 'MMM dd yyyy')}</div>
      <div>{project_manager}</div>
      <div>{comment}</div>
      <div>{status}</div>

      <div className='flex gap-2'>
        <Modal
          icon={<HiPencil />}
          buttonText='Edit'
          dialogTitle={`Edit Project ${projectId}`}
        >
          <CreateProjectForm />
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
