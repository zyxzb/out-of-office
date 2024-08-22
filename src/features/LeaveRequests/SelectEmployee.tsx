// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../shadcn/components/ui/select';
import useEmployees from '../employees/useEmployees';

type SelectEmployeeProps = {
  selectedItem: number | string;
  setSelectedItem: (id: number | string) => void;
  selectName: string;
  position?: string;
};

const SelectEmployee = ({
  selectedItem,
  setSelectedItem,
  selectName,
  position,
}: SelectEmployeeProps) => {
  const { employees, isLoading, isError, error } = useEmployees();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  if (!employees) return <p>No employees to show</p>;

  let newEmployees: Array<Employee> = [];

  if (position) {
    newEmployees = employees.filter(
      (employee) => employee.position === position,
    );
  } else {
    newEmployees = employees;
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
