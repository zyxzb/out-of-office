import { format } from 'date-fns';

import CreateProjectForm from './CreateProjectForm';
import useDeleteProject from './useDeleteProject';
import { Project } from '../../services/apiProjects';
import { TableCell, TableRow } from '../../shadcn/components/ui/table';
import Dropdown from '../../ui/Dropdown';

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
      <TableCell className='flex justify-end'>
        <Dropdown
          dialogTitle={`Edit Project ${projectId}`}
          deleteDialogTitle={`Delete Project ${projectId}`}
          isDeleting={isDeleting}
          onDelete={() => deleteProject(projectId)}
        >
          <CreateProjectForm project={project} />
        </Dropdown>
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
