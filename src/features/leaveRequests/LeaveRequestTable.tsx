import LeaveRequestRow from './LeaveRequestRow';
import useSearchFilterLeaveRequests from './useSearchFilterLeaveRequests';
import Pagination from '../../ui/Pagination';
import Table from '../../ui/Table';
import TableSkeleton from '../../ui/TableSkeleton';

const LeaveRequestTable = () => {
  const { requests, isLoading, isError, error, count } =
    useSearchFilterLeaveRequests();

  if (isLoading) return <TableSkeleton />;

  if (isError) return <p>{error?.message}</p>;

  if (!requests) return <p>No requests to show</p>;

  return (
    <>
      <Table columns='grid-cols-9'>
        <Table.Header>
          <div>Id</div>
          <div>Employee</div>
          <div>Absence Reason</div>
          <div>Start Date</div>
          <div>End Date</div>
          <div>Comment</div>
          <div>Status</div>
          <div>Operations</div>
        </Table.Header>
        <Table.Body
          data={requests}
          render={(request) => (
            <LeaveRequestRow key={request.id} request={request} />
          )}
        />
      </Table>
      <Pagination count={count} />
    </>
  );
};

export default LeaveRequestTable;
