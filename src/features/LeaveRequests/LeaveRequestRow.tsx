import { format } from 'date-fns';

import useDeleteLeaveRequest from './useDeleteLeaveRequest';
import { LeaveRequest } from '../../services/apiLeaveRequests';
import DeleteEditModal from '../../ui/DeleteModal';
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
  const { isDeleting, deleteRequest } = useDeleteLeaveRequest();

  return (
    <Table.Row>
      <div>{requestId}</div>
      <div>{employee}</div>
      <div>{absence_reason}</div>
      <div>{format(new Date(start_date), 'MMM dd yyyy')}</div>
      <div>{format(new Date(end_date), 'MMM dd yyyy')}</div>
      <div>{comment}</div>
      <div>{status}</div>

      <div>
        <DeleteEditModal
          dialogTitle='Delete Request'
          onDelete={() => deleteRequest(requestId)}
          isDeleting={isDeleting}
        />
      </div>
    </Table.Row>
  );
};

export default LeaveRequestRow;
