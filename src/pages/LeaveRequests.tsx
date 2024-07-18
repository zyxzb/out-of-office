import CreateRequestForm from '../features/LeaveRequests/CreateRequestForm';
import LeaveRequestTable from '../features/LeaveRequests/LeaveRequestTable';
import LeaveRequestTableOperations from '../features/LeaveRequests/LeaveRequestTableOperations';
import Heading from '../ui/Heading';
import Modal from '../ui/Modal';

const LeaveRequests = () => {
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
      >
        <CreateRequestForm />
      </Modal>
    </>
  );
};

export default LeaveRequests;
