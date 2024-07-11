import EmployeeRow from './ApprovalRequestRow';
import useApprovalRequests from './useApprovalRequests';
import Table from '../../ui/Table';

const ApprovalRequestTable = () => {
  const { approvalRequests, isLoading, isError, error } = useApprovalRequests();

  if (isLoading) return <p>Loading...</p>;

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
      </Table.Header>
      <Table.Body
        data={approvalRequests}
        render={(approvalRequest) => (
          <EmployeeRow
            key={approvalRequest.id}
            approvalRequest={approvalRequest}
          />
        )}
      />
    </Table>
  );
};

export default ApprovalRequestTable;
