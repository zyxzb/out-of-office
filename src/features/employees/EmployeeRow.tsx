import { HiEye } from 'react-icons/hi2';

import { Employee } from '../../services/apiEmployees';
import Menus from '../../ui/Menus';
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
  return (
    <Table.Row>
      <div>{employeeId}</div>
      <div>{full_name}</div>
      <div>{subdivision}</div>
      <div>{position}</div>
      <div>{status}</div>
      <div>{people_partner}</div>
      <div>{out_of_office_balance}</div>

      <Menus>
        <Menus.Toggle id={employeeId} />
        <Menus.List id={employeeId}>
          <Menus.Button icon={<HiEye />}>See details</Menus.Button>
          <Menus.Button icon={<HiEye />}>See details</Menus.Button>
        </Menus.List>
      </Menus>
    </Table.Row>
  );
};

export default EmployeeRow;
