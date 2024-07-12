import { format } from 'date-fns';
import { HiEye } from 'react-icons/hi2';

import { LeaveRequest } from '../../services/apiLeaveRequests';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';

type LeaveRequestProps = {
  request: LeaveRequest;
};

const LeaveRequestRow = ({
  request: {
    id: requestId,
    employee,
    absence_reason,
    start_date,
    end_date,
    comment,
    status,
  },
}: LeaveRequestProps) => {
  return (
    <Table.Row>
      <div>{requestId}</div>
      <div>{employee}</div>
      <div>{absence_reason}</div>
      <div>{format(new Date(start_date), 'MMM dd yyyy')}</div>
      <div>{format(new Date(end_date), 'MMM dd yyyy')}</div>
      <div>{comment}</div>
      <div>{status}</div>

      <Menus>
        <Menus.Toggle id={requestId} />
        <Menus.List id={requestId}>
          <Menus.Button icon={<HiEye />}>See details</Menus.Button>
        </Menus.List>
      </Menus>
    </Table.Row>
  );
};

export default LeaveRequestRow;
