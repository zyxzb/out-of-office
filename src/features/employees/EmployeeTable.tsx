import EmployeeRow from './EmployeeRow';
import useSearchFilterEmployees from './useSearchFilterEmployees';
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
      <Table columns='grid-cols-9'>
        <Table.Header>
          <div>ID</div>
          <div>Full Name</div>
          <div>Subdivision</div>
          <div>Position</div>
          <div>Status</div>
          <div>People Partner ID</div>
          <div>Available day-offs</div>
          <div>Operations</div>
        </Table.Header>
        <Table.Body
          data={employees}
          render={(employee) => (
            <EmployeeRow key={employee.id} employee={employee} />
          )}
        />
      </Table>
      <Pagination count={count} />
    </>
  );
};

export default EmployeeTable;
