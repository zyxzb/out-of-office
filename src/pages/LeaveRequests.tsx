import CreateRequestForm from '../features/leaveRequests/CreateRequestForm';
import LeaveRequestTable from '../features/leaveRequests/LeaveRequestTable';
import LeaveRequestTableOperations from '../features/leaveRequests/LeaveRequestTableOperations';
import useModal from '../hooks/useModal';
import Heading from '../ui/Heading';
import Modal from '../ui/Modal';

const LeaveRequests = () => {
  const { closeModal, open, setOpen } = useModal();

  return (
    <>
      <Heading as='h1'>Leave Requests</Heading>
      <LeaveRequestTableOperations />
      <LeaveRequestTable />
      <Modal
        buttonText='Add new request'
        dialogTitle='Leave Request'
        dialogDescription='This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.'
        open={open}
        setOpen={setOpen}
      >
        <CreateRequestForm closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default LeaveRequests;
