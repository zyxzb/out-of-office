import { ApprovalRequest } from '../../services/apiApprovalRequests';
// import RejectModal from '../../ui/RejectModal';
import Table from '../../ui/Table';

type ApprovalRequestProps = {
  approvalRequest: ApprovalRequest;
};

const ApprovalRequestRow = ({
  approvalRequest: {
    id: approvalRequestId,
    approver,
    status,
    comment,
    leave_request,
  },
}: ApprovalRequestProps) => {
  return (
    <Table.Row>
      <div>{approvalRequestId}</div>
      <div>{approver}</div>
      <div>{leave_request}</div>
      <div>{status}</div>
      <div>{comment}</div>

      <div>
        {/* <RejectModal dialogTitle={`Reject request ${approvalRequestId}`} /> */}
      </div>
    </Table.Row>
  );
};

export default ApprovalRequestRow;
