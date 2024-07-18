import CreateEmployeeForm from '../features/employees/CreateEmployeeForm';
import EmployeesTableOperations from '../features/employees/EmployeesTableOperations';
import EmployeeTable from '../features/employees/EmployeeTable';
import Heading from '../ui/Heading';
import Modal from '../ui/Modal';

const Employees = () => {
  return (
    <>
      <Heading as='h1'>Employees</Heading>
      <EmployeesTableOperations />
      <EmployeeTable />
      <Modal
        buttonText='Add new employee'
        dialogTitle='Create new employee'
        dialogDescription='This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.'
      >
        <CreateEmployeeForm />
      </Modal>
    </>
  );
};

export default Employees;
