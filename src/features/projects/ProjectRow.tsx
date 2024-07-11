import { format } from 'date-fns';
import { HiEye } from 'react-icons/hi2';

import { Project } from '../../services/apiProjects';
import Menus from '../../ui/Menus';
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
  return (
    <Table.Row>
      <div>{projectId}</div>
      <div>{project_type}</div>
      <div>{format(new Date(start_date), 'MMM dd yyyy')}</div>
      <div>{format(new Date(end_date), 'MMM dd yyyy')}</div>
      <div>{project_manager}</div>
      <div>{comment}</div>
      <div>{status}</div>

      <Menus>
        <Menus.Toggle id={projectId} />
        <Menus.List id={projectId}>
          <Menus.Button icon={<HiEye />}>See details</Menus.Button>
          <Menus.Button icon={<HiEye />}>See details</Menus.Button>
        </Menus.List>
      </Menus>
    </Table.Row>
  );
};

export default ProjectRow;
