// commented old version of filter and sort

// import { useSearchParams } from 'react-router-dom';

import EmployeeRow from './EmployeeRow';
import useSearchFilterEmployees from './useSearchFilterEmployees';
// import { Employee } from '../../services/apiEmployees';
import Pagination from '../../ui/Pagination';
import Table from '../../ui/Table';
import TableSkeleton from '../../ui/TableSkeleton';

// function isKeyOfEmployee(key: string): key is keyof Employee {
//   return [
//     'id',
//     'full_name',
//     'subdivision',
//     'position',
//     'status',
//     'people_partner',
//     'out_of_office_balance',
//   ].includes(key);
// }

const EmployeeTable = () => {
  const { employees, isLoading, isError, error, count } =
    useSearchFilterEmployees();
  // const [searchParams] = useSearchParams();

  if (isLoading) return <TableSkeleton />;

  if (isError) return <p>{error?.message}</p>;

  if (!employees) return <p>No employees to show</p>;

  // const filterStatus = searchParams.get('status') || 'all';
  // const searchValue = searchParams.get('searchValue') || '';
  // const searchHeader = searchParams.get('searchHeader') || 'full_name';

  // 1. Filter

  // manual version

  // const filteredEmployees = employees.filter(
  //   (employee) =>
  //     ((filterStatus === 'all' || employee.status === filterStatus) &&
  //       employee.full_name.toLowerCase().includes(searchValue.toLowerCase())) ||
  //     employee.id
  //       .toString()
  //       .toLowerCase()
  //       .includes(searchValue.toLowerCase()) ||
  //     employee.subdivision.toLowerCase().includes(searchValue.toLowerCase()) ||
  //     employee.position.toLowerCase().includes(searchValue.toLowerCase()) ||
  //     employee.status.toLowerCase().includes(searchValue.toLowerCase()) ||
  //     employee.people_partner.toLowerCase().includes(searchValue.toLowerCase()),
  // );

  // const filteredEmployees = employees.filter((employee) => {
  //   const matchesFilter =
  //     filterStatus === 'all' || employee.status === filterStatus;
  //   const matchesSearch =
  //     isKeyOfEmployee(searchHeader) &&
  //     String(employee[searchHeader])
  //       .toLowerCase()
  //       .includes(searchValue.toLowerCase());
  //   return matchesFilter && matchesSearch;
  // });

  // 2. Sort

  // const sortBy = searchParams.get('sortBy') || 'id-asc';
  // const [field, direction] = sortBy.split('-');
  // const modifier = direction === 'asc' ? 1 : -1;

  // let sortedEmployees = filteredEmployees;

  // if (isKeyOfEmployee(field)) {
  //   sortedEmployees = filteredEmployees.sort((a, b) => {
  //     if (typeof a[field] === 'string' && typeof b[field] === 'string') {
  //       return a[field].localeCompare(b[field]) * modifier;
  //     } else if (typeof a[field] === 'number' && typeof b[field] === 'number') {
  //       return (a[field] - b[field]) * modifier;
  //     }
  //     return 0;
  //   });
  // }

  return (
    <>
      <Table columns='grid-cols-9'>
        <Table.Header>
          <div>Id</div>
          <div>Full Name</div>
          <div>Subdivision</div>
          <div>Position</div>
          <div>Status</div>
          <div>People Partner</div>
          <div>Available day-offs</div>
          <div>Operations</div>
        </Table.Header>
        <Table.Body
          // data={sortedEmployees}
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
