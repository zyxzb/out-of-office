import ApprovalRequestRow from './ApprovalRequestRow';
import useSearchFilterApprovalRequests from './useSearchFilterApprovalRequests';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '../../shadcn/components/ui/table';
import Pagination from '../../ui/Pagination';
import Table from '../../ui/Table';
import TableSkeleton from '../../ui/TableSkeleton';

const ApprovalRequestTable = () => {
  const { approvalRequests, isLoading, isError, error, count } =
    useSearchFilterApprovalRequests();

  if (isLoading) return <TableSkeleton />;

  if (isError) return <p>{error?.message}</p>;

  if (!approvalRequests) return <p>No employees to show</p>;

  return (
    <>
      <Table
        data={approvalRequests}
        render={(approvalRequest) => (
          <ApprovalRequestRow
            key={approvalRequest.id}
            approvalRequest={approvalRequest}
          />
        )}
      >
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Approver</TableHead>
            <TableHead>Leave Request</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Operations</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <Pagination count={count} />
    </>
  );
};

export default ApprovalRequestTable;
