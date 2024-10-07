import CreateRequestForm from '../features/leaveRequests/CreateRequestForm';
import LeaveRequestTable from '../features/leaveRequests/LeaveRequestTable';
import LeaveRequestTableOperations from '../features/leaveRequests/LeaveRequestTableOperations';
import Modal from '../ui/CCPModal';
import Heading from '../ui/Heading';

const LeaveRequests = () => {
  return (
    <>
      <Heading as='h1'>Leave Requests</Heading>
      <LeaveRequestTableOperations />
      <LeaveRequestTable />
      <Modal>
        <Modal.Trigger className='max-w-max'>Add new request</Modal.Trigger>
        <Modal.Content dialogTitle='Create new leave Request'>
          <CreateRequestForm />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default LeaveRequests;
