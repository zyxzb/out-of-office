// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Employee } from '../../services/apiEmployees';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../shadcn/components/ui/select';
import useAllEmployees from '../employees/useAllEmployees';

type SelectEmployeeProps = {
  selectedItem: number | string;
  setSelectedItem: (id: number | string) => void;
  selectName: string;
  position?: string;
  name?: string;
  employee?: Employee;
};

const SelectEmployee = ({
  selectedItem,
  setSelectedItem,
  selectName,
  position,
  employee,
}: SelectEmployeeProps) => {
  const { employees, isLoading, isError, error } = useAllEmployees();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  if (!employees) return <p>No employees to show</p>;

  let newEmployees: Array<Employee> = employees;

  //  can't choose yourself
  if (employee) {
    newEmployees = employees.filter((e) => e.id !== employee.id);
  }

  if (position) {
    newEmployees = employees.filter(
      (employee) => employee.position === position,
    );
  }

  return (
    <Select
      value={selectedItem}
      onValueChange={(value) => setSelectedItem(Number(value))}
    >
      <SelectTrigger className='w-[280px] dark:bg-black'>
        <SelectValue placeholder={selectName} />
      </SelectTrigger>
      <SelectContent className='dark:bg-black'>
        <SelectGroup>
          <SelectLabel>Employees:</SelectLabel>
          {newEmployees.map((employee) => (
            <SelectItem key={employee.id} value={employee.id}>
              {`${employee.full_name} - ID: ${employee.id}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectEmployee;
