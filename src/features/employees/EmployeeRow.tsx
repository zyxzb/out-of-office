import useDeleteEmployee from './useDeleteEmployee';
import { Employee } from '../../services/apiEmployees';
import DeleteEditModal from '../../ui/DeleteModal';
import Table from '../../ui/Table';

type EmployeeRowProps = {
  employee: Employee;
};

const EmployeeRow = ({
  employee: {
    id: employeeId,
    full_name,
    subdivision,
    position,
    status,
    people_partner,
    // photo,
    out_of_office_balance,
  },
}: EmployeeRowProps) => {
  const { isDeleting, deleteEmployee } = useDeleteEmployee();

  return (
    <Table.Row>
      <div>{employeeId}</div>
      <div>{full_name}</div>
      <div>{subdivision}</div>
      <div>{position}</div>
      <div>{status}</div>
      <div>{people_partner}</div>
      <div>{out_of_office_balance}</div>

      <div>
        <DeleteEditModal
          dialogTitle='Delete Employee'
          isDeleting={isDeleting}
          onDelete={() => deleteEmployee(employeeId)}
        />
      </div>
    </Table.Row>
  );
};

export default EmployeeRow;
