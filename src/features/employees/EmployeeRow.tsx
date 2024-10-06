import { HiPencil, HiLink } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import CreateEmployeeForm from './CreateEmployeeForm';
import useDeleteEmployee from './useDeleteEmployee';
import { Employee } from '../../services/apiEmployees';
import { TableCell, TableRow } from '../../shadcn/components/ui/table';
import Modal from '../../ui/CCPModal';
import DeleteModal from '../../ui/DeleteModal';

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

  return (
    <TableRow>
      <TableCell>
        <Link
          className='flex max-w-max items-center gap-2 hover:underline'
          to={`/employee/${employeeId}`}
        >
          <HiLink />

          {employeeId}
        </Link>
      </TableCell>
      <TableCell>{full_name}</TableCell>
      <TableCell>{subdivision}</TableCell>
      <TableCell>{position}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        <Link
          className='flex max-w-max items-center gap-2 hover:underline'
          to={`/employee/${people_partner}`}
        >
          <HiLink />
          {people_partner}
        </Link>
      </TableCell>
      <TableCell>{out_of_office_balance}</TableCell>

      <TableCell className='flex justify-end gap-2'>
        <Modal>
          <Modal.Trigger>
            <HiPencil /> Edit
          </Modal.Trigger>
          <Modal.Content dialogTitle={`Edit Employee ${employeeId}`}>
            <CreateEmployeeForm employee={employee} />
          </Modal.Content>
        </Modal>
        <DeleteModal
          dialogTitle={`Delete Employee ${employeeId}`}
          isDeleting={isDeleting}
          onDelete={() => deleteEmployee(employeeId)}
        />
      </TableCell>
    </TableRow>
  );
};

export default EmployeeRow;
