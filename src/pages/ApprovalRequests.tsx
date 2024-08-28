import ApprovalRequestTable from '../features/approvalRequests/ApprovalRequestTable';
import Heading from '../ui/Heading';

const ApprovalRequests = () => {
  return (
    <>
      <Heading as='h1'>ApprovalRequests</Heading>
      <ApprovalRequestTable />
    </>
  );
};

export default ApprovalRequests;
