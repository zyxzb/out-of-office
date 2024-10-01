import { format } from 'date-fns';
import { HiPencil } from 'react-icons/hi2';

import CreateRequestForm from './CreateRequestForm';
import useDeleteLeaveRequest from './useDeleteLeaveRequest';
import useModal from '../../hooks/useModal';
import { LeaveRequest } from '../../services/apiLeaveRequests';
import { TableCell, TableRow } from '../../shadcn/components/ui/table';
import DeleteModal from '../../ui/DeleteModal';
import Modal from '../../ui/Modal';

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
  const { closeModal, open, setOpen } = useModal();

  return (
    <TableRow>
      <TableCell>{requestId}</TableCell>
      <TableCell>{employee}</TableCell>
      <TableCell>{absence_reason}</TableCell>
      <TableCell>{format(new Date(start_date), 'MMM dd yyyy')}</TableCell>
      <TableCell>{format(new Date(end_date), 'MMM dd yyyy')}</TableCell>
      <TableCell>{comment}</TableCell>
      <TableCell>{status}</TableCell>

      <TableCell className='flex justify-end gap-2'>
        <Modal
          icon={<HiPencil />}
          buttonText='Edit'
          dialogTitle={`Edit Request ${requestId}`}
          open={open}
          setOpen={setOpen}
        >
          <CreateRequestForm request={request} closeModal={closeModal} />
        </Modal>
        <DeleteModal
          dialogTitle='Delete Request'
          onDelete={() => deleteRequest(requestId)}
          isDeleting={isDeleting}
        />
      </TableCell>
    </TableRow>
  );
};

export default LeaveRequestRow;
