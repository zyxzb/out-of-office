import { useSearchParams } from 'react-router-dom';

import LeaveRequestRow from './LeaveRequestRow';
import useLeaveRequests from './useLeaveRequests';
import { LeaveRequest } from '../../services/apiLeaveRequests';
import Table from '../../ui/Table';

function isKeyOfLeaveRequest(key: string): key is keyof LeaveRequest {
  return ['id', 'employee', 'absence_reason', 'comment', 'status'].includes(
    key,
  );
}

const LeaveRequestTable = () => {
  const { requests, isLoading, isError, error } = useLeaveRequests();
  const [searchParams] = useSearchParams();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  if (!requests) return <p>No requests to show</p>;

  const searchValue = searchParams.get('searchValue') || '';
  const searchHeader = searchParams.get('searchHeader') || 'employee';

  const filteredLeaveRequests = requests.filter((request) => {
    const matchesSearch =
      isKeyOfLeaveRequest(searchHeader) &&
      String(request[searchHeader])
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    return matchesSearch;
  });

  const sortBy = searchParams.get('sortBy') || 'id-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  let sortedLeaveRequests = filteredLeaveRequests;

  if (isKeyOfLeaveRequest(field)) {
    sortedLeaveRequests = filteredLeaveRequests.sort((a, b) => {
      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return a[field].localeCompare(b[field]) * modifier;
      } else if (typeof a[field] === 'number' && typeof b[field] === 'number') {
        return (a[field] - b[field]) * modifier;
      }
      return 0;
    });
  }

  return (
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
        data={sortedLeaveRequests}
        render={(request) => (
          <LeaveRequestRow key={request.id} request={request} />
        )}
      />
    </Table>
  );
};

export default LeaveRequestTable;
