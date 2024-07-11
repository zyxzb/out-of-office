import NewApprovalRequest from '../features/ApprovalRequests/NewApprovalRequest';
import LeaveRequestTable from '../features/LeaveRequests/LeaveRequestTable';
import Heading from '../ui/Heading';

const LeaveRequests = () => {
  return (
    <>
      <Heading as='h1'>Leave Requests</Heading>
      <LeaveRequestTable />
      <NewApprovalRequest />
    </>
  );
};

export default LeaveRequests;
