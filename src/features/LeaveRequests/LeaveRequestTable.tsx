import LeaveRequestRow from './LeaveRequestRow';
import useLeaveRequests from './useLeaveRequests';
import Table from '../../ui/Table';

const LeaveRequestTable = () => {
  const { requests, isLoading, isError, error } = useLeaveRequests();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  if (!requests) return <p>No requests to show</p>;

  return (
    <Table columns='grid-cols-8'>
      <Table.Header>
        <div>Id</div>
        <div>Employee</div>
        <div>Absence Reason</div>
        <div>Start Date</div>
        <div>End Date</div>
        <div>Comment</div>
        <div>Status</div>
      </Table.Header>
      <Table.Body
        data={requests}
        render={(request) => (
          <LeaveRequestRow key={request.id} request={request} />
        )}
      />
    </Table>
  );
};

export default LeaveRequestTable;
