import CreateEmployeeForm from '../features/employees/CreateEmployeeForm';
import EmployeesTableOperations from '../features/employees/EmployeesTableOperations';
import EmployeeTable from '../features/employees/EmployeeTable';
import useModal from '../hooks/useModal';
import Heading from '../ui/Heading';
import Modal from '../ui/Modal';

const Employees = () => {
  const { closeModal, open, setOpen } = useModal();

  return (
    <>
      <Heading as='h1'>Employees</Heading>
      <EmployeesTableOperations />
      <EmployeeTable />
      <Modal
        buttonText='Add new employee'
        dialogTitle='Create new employee'
        open={open}
        setOpen={setOpen}
      >
        <CreateEmployeeForm closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default Employees;
