import { ApprovalRequest } from '../../services/apiApprovalRequests';
import { TableCell, TableRow } from '../../shadcn/components/ui/table';
// import RejectModal from '../../ui/RejectModal';

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
    <TableRow>
      <TableCell>{approvalRequestId}</TableCell>
      <TableCell>{approver}</TableCell>
      <TableCell>{leave_request}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{comment}</TableCell>

      <TableCell className='flex justify-end gap-2'>
        {/* <RejectModal dialogTitle={`Reject request ${approvalRequestId}`} /> */}
      </TableCell>
    </TableRow>
  );
};

export default ApprovalRequestRow;
