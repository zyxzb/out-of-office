import ApprovalRequestRow from './ApprovalRequestRow';
import useApprovalRequests from './useApprovalRequests';
import Table from '../../ui/Table';
import TableSkeleton from '../../ui/TableSkeleton';

const ApprovalRequestTable = () => {
  const { approvalRequests, isLoading, isError, error } = useApprovalRequests();

  if (isLoading) return <TableSkeleton />;

  if (isError) return <p>{error?.message}</p>;

  if (!approvalRequests) return <p>No employees to show</p>;

  return (
    <Table columns='grid-cols-6'>
      <Table.Header>
        <div>Id</div>
        <div>Approver</div>
        <div>Leave Request</div>
        <div>Status</div>
        <div>Comment</div>
        <div>Operations</div>
      </Table.Header>
      <Table.Body
        data={approvalRequests}
        render={(approvalRequest) => (
          <ApprovalRequestRow
            key={approvalRequest.id}
            approvalRequest={approvalRequest}
          />
        )}
      />
    </Table>
  );
};

export default ApprovalRequestTable;
