import { format } from 'date-fns';
import { HiPencil } from 'react-icons/hi2';

import CreateProjectForm from './CreateProjectForm';
import useDeleteProject from './useDeleteProject';
import { Project } from '../../services/apiProjects';
import { TableCell, TableRow } from '../../shadcn/components/ui/table';
import Modal from '../../ui/CCPModal';
import DeleteModal from '../../ui/DeleteModal';

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

  return (
    <TableRow>
      <TableCell>{projectId}</TableCell>
      <TableCell>{project_type}</TableCell>
      <TableCell>{format(new Date(start_date), 'MMM dd yyyy')}</TableCell>
      <TableCell>{format(new Date(end_date), 'MMM dd yyyy')}</TableCell>
      <TableCell>{project_manager}</TableCell>
      <TableCell>{comment || '---'}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell className='flex justify-end gap-2'>
        <Modal>
          <Modal.Trigger>
            <HiPencil /> Edit
          </Modal.Trigger>
          <Modal.Content dialogTitle={`Edit Project ${projectId}`}>
            <CreateProjectForm project={project} />
          </Modal.Content>
        </Modal>
        <DeleteModal
          dialogTitle={`Delete Project ${projectId}`}
          onDelete={() => deleteProject(projectId)}
          isDeleting={isDeleting}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
