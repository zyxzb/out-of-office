import { format } from 'date-fns';
import { HiPencil } from 'react-icons/hi2';

import CreateRequestForm from './CreateRequestForm';
import useDeleteLeaveRequest from './useDeleteLeaveRequest';
import { LeaveRequest } from '../../services/apiLeaveRequests';
import DeleteModal from '../../ui/DeleteModal';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import useModal from '../../hooks/useModal';

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
    <Table.Row>
      <div>{requestId}</div>
      <div>{employee}</div>
      <div>{absence_reason}</div>
      <div>{format(new Date(start_date), 'MMM dd yyyy')}</div>
      <div>{format(new Date(end_date), 'MMM dd yyyy')}</div>
      <div>{comment}</div>
      <div>{status}</div>

      <div className='flex gap-2'>
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
      </div>
    </Table.Row>
  );
};

export default LeaveRequestRow;
