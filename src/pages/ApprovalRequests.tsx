import ApprovalRequestTable from '../features/approvalRequests/ApprovalRequestTable';
import ApprovalRequestTableOperations from '../features/approvalRequests/ApprovalRequestTableOperations';
import Heading from '../ui/Heading';

const ApprovalRequests = () => {
  return (
    <>
      <Heading as='h1'>ApprovalRequests</Heading>
      <ApprovalRequestTableOperations />
      <ApprovalRequestTable />
    </>
  );
};

export default ApprovalRequests;
