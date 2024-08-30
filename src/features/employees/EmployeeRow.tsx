import { HiPencil, HiLink } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import CreateEmployeeForm from './CreateEmployeeForm';
import useDeleteEmployee from './useDeleteEmployee';
import useModal from '../../hooks/useModal';
import { Employee } from '../../services/apiEmployees';
import DeleteModal from '../../ui/DeleteModal';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';

type EmployeeRowProps = {
  employee: Employee;
};

const EmployeeRow = ({ employee }: EmployeeRowProps) => {
  const {
    id: employeeId,
    full_name,
    subdivision,
    position,
    status,
    people_partner,
    // photo,
    out_of_office_balance,
  } = employee;
  const { isDeleting, deleteEmployee } = useDeleteEmployee();
  const { closeModal, open, setOpen } = useModal();

  return (
    <Table.Row>
      <div>{employeeId}</div>
      <div>{full_name}</div>
      <div>{subdivision}</div>
      <div>{position}</div>
      <div>{status}</div>
      <div>
        <Link
          className='flex max-w-max items-center gap-2 hover:underline'
          to={`/employees?searchHeader=id&searchValue=${people_partner}`}
        >
          <HiLink />
          {people_partner}
        </Link>
      </div>
      <div>{out_of_office_balance}</div>

      <div className='flex gap-2'>
        <Modal
          icon={<HiPencil />}
          buttonText='Edit'
          dialogTitle={`Edit Employee ${employeeId}`}
          open={open}
          setOpen={setOpen}
        >
          <CreateEmployeeForm employee={employee} closeModal={closeModal} />
        </Modal>
        <DeleteModal
          dialogTitle='Delete Employee'
          isDeleting={isDeleting}
          onDelete={() => deleteEmployee(employeeId)}
        />
      </div>
    </Table.Row>
  );
};

export default EmployeeRow;
