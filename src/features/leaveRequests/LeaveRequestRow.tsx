import { format } from 'date-fns';

import CreateRequestForm from './CreateRequestForm';
import useDeleteLeaveRequest from './useDeleteLeaveRequest';
import { LeaveRequest } from '../../services/apiLeaveRequests';
import { TableCell, TableRow } from '../../shadcn/components/ui/table';
import Dropdown from '../../ui/Dropdown';

type LeaveRequestProps = {
  request: LeaveRequest;
};

const LeaveRequestRow = ({ request }: LeaveRequestProps) => {
  const {
    id: requestId,
    employee,
    absence_reason,
    start_date,
    end_date,
    comment,
    status,
  } = request;

  const { isDeleting, deleteRequest } = useDeleteLeaveRequest();

  return (
    <TableRow>
      <TableCell>{requestId}</TableCell>
      <TableCell>{employee}</TableCell>
      <TableCell>{absence_reason}</TableCell>
      <TableCell>{format(new Date(start_date), 'MMM dd yyyy')}</TableCell>
      <TableCell>{format(new Date(end_date), 'MMM dd yyyy')}</TableCell>
      <TableCell>{comment}</TableCell>
      <TableCell>{status}</TableCell>

      <TableCell className='flex justify-end'>
        <Dropdown
          dialogTitle={`Edit Request ${requestId}`}
          deleteDialogTitle='Delete Request'
          onDelete={() => deleteRequest(requestId)}
          isDeleting={isDeleting}
        >
          <CreateRequestForm request={request} />
        </Dropdown>
      </TableCell>
    </TableRow>
  );
};

export default LeaveRequestRow;
