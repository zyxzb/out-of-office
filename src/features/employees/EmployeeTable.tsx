import { useSearchParams } from 'react-router-dom';

import EmployeeRow from './EmployeeRow';
import useEmployees from './useEmployees';
import { Employee } from '../../services/apiEmployees';
import Table from '../../ui/Table';

function isKeyOfEmployee(key: string): key is keyof Employee {
  return [
    'id',
    'full_name',
    'subdivision',
    'position',
    'status',
    'people_partner',
    'out_of_office_balance',
  ].includes(key);
}

const EmployeeTable = () => {
  const { employees, isLoading, isError, error } = useEmployees();
  const [searchParams] = useSearchParams();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  if (!employees) return <p>No employees to show</p>;

  // 1. Filter

  const filterValue = searchParams.get('status') || 'all';

  let filteredEmployees;

  if (filterValue === 'all') {
    filteredEmployees = employees;
  } else {
    filteredEmployees = employees.filter(
      (employee) => employee.status === filterValue,
    );
  }

  // 2. Sort

  const sortBy = searchParams.get('sortBy') || 'id-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  let sortedEmployees = filteredEmployees;

  if (isKeyOfEmployee(field)) {
    sortedEmployees = filteredEmployees.sort((a, b) => {
      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return a[field].localeCompare(b[field]) * modifier;
      } else if (typeof a[field] === 'number' && typeof b[field] === 'number') {
        return (a[field] - b[field]) * modifier;
      }
      return 0;
    });
  }

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
        data={sortedEmployees}
        render={(employee) => (
          <EmployeeRow key={employee.id} employee={employee} />
        )}
      />
    </Table>
  );
};

export default EmployeeTable;
