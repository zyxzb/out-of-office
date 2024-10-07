import CreateEmployeeForm from '../features/employees/CreateEmployeeForm';
import EmployeesTableOperations from '../features/employees/EmployeesTableOperations';
import EmployeeTable from '../features/employees/EmployeeTable';
import Modal from '../ui/CCPModal';
import Heading from '../ui/Heading';

const Employees = () => {
  return (
    <>
      <Heading as='h1'>Employees</Heading>
      <EmployeesTableOperations />
      <EmployeeTable />
      <Modal>
        <Modal.Trigger className='max-w-max'>Add new employee</Modal.Trigger>
        <Modal.Content dialogTitle='Create new employee'>
          <CreateEmployeeForm />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Employees;
