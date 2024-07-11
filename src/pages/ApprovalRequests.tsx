import ApprovalRequestTable from '../features/ApprovalRequests/ApprovalRequestTable';
import NewApprovalRequest from '../features/ApprovalRequests/NewApprovalRequest';
import Heading from '../ui/Heading';

const ApprovalRequests = () => {
  return (
    <>
      <Heading as='h1'>ApprovalRequests</Heading>
      <ApprovalRequestTable />
      <NewApprovalRequest />
    </>
  );
};

export default ApprovalRequests;
