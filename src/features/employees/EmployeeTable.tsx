import EmployeeRow from './EmployeeRow';
import useSearchFilterEmployees from './useSearchFilterEmployees';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '../../shadcn/components/ui/table';
import Pagination from '../../ui/Pagination';
import Table from '../../ui/Table';
import TableSkeleton from '../../ui/TableSkeleton';

const EmployeeTable = () => {
  const { employees, isLoading, isError, error, count } =
    useSearchFilterEmployees();

  if (isLoading) return <TableSkeleton />;

  if (isError) return <p>{error?.message}</p>;

  if (!employees) return <p>No employees to show</p>;

  return (
    <>
      <Table
        data={employees}
        render={(employee) => (
          <EmployeeRow key={employee.id} employee={employee} />
        )}
      >
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Subdivision</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>People Partner ID</TableHead>
            <TableHead>Available day-offs</TableHead>
            <TableHead className='text-right'>Operations</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <Pagination count={count} />
    </>
  );
};

export default EmployeeTable;
