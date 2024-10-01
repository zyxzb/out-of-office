import LeaveRequestRow from './LeaveRequestRow';
import useSearchFilterLeaveRequests from './useSearchFilterLeaveRequests';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '../../shadcn/components/ui/table';
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
      <Table
        data={requests}
        render={(request) => (
          <LeaveRequestRow key={request.id} request={request} />
        )}
      >
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Absence Reason</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Operations</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <Pagination count={count} />
    </>
  );
};

export default LeaveRequestTable;
