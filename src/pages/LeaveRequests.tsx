import LeaveRequestTable from '../features/LeaveRequests/LeaveRequestTable';
import LeaveRequestTableOperations from '../features/LeaveRequests/LeaveRequestTableOperations';
import { Button } from '../shadcn/components/ui/button';
import Heading from '../ui/Heading';
import Modal from '../ui/Modal';

const LeaveRequests = () => {
  return (
    <>
      <Heading as='h1'>Leave Requests</Heading>
      <LeaveRequestTableOperations />
      <LeaveRequestTable />
      <Modal>
        <Button className='max-w-max'>Add New Request</Button>
      </Modal>
    </>
  );
};

export default LeaveRequests;
