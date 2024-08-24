import { ApprovalRequest } from '../../services/apiApprovalRequests';
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

      {/* <Menus>
        <Menus.Toggle id={approvalRequestId} />
        <Menus.List id={approvalRequestId}>
          <Menus.Button icon={<HiEye />}>See details</Menus.Button>
          <Menus.Button icon={<HiEye />}>See details</Menus.Button>
        </Menus.List>
      </Menus> */}
    </Table.Row>
  );
};

export default ApprovalRequestRow;
