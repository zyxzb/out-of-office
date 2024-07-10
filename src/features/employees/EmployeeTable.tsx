import EmployeeRow from './EmployeeRow';
import useEmployees from './useEmployees';
import Table from '../../ui/Table';

const EmployeeTable = () => {
  const { employees, isLoading, isError, error } = useEmployees();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  if (!employees) return <p>No employees to show</p>;

  return (
    <Table columns='grid-cols-8'>
      <Table.Header>
        <div>Id</div>
        <div>Full Name</div>
        <div>Subdivision</div>
        <div>Position</div>
        <div>Status</div>
        <div>People Partner</div>
        <div>Available day-offs</div>
      </Table.Header>
      <Table.Body
        data={employees}
        render={(employee) => (
          <EmployeeRow key={employee.id} employee={employee} />
        )}
      />
    </Table>
  );
};

export default EmployeeTable;
