import EmployeesTableOperations from '../features/employees/EmployeesTableOperations';
import EmployeeTable from '../features/employees/EmployeeTable';
import Heading from '../ui/Heading';

const Employees = () => {
  return (
    <>
      <Heading as='h1'>Employees</Heading>
      <EmployeesTableOperations />
      <EmployeeTable />
    </>
  );
};

export default Employees;
