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
  selectedItem: number;
  setSelectedItem: (id: number) => void;
};

const SelectEmployee = ({
  selectedItem,
  setSelectedItem,
}: SelectEmployeeProps) => {
  const { employees, isLoading, isError, error } = useEmployees();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  if (!employees) return <p>No employees to show</p>;

  return (
    <Select
      value={selectedItem}
      onValueChange={(value) => setSelectedItem(Number(value))}
    >
      <SelectTrigger className='w-[280px] dark:bg-black'>
        <SelectValue placeholder='Select an Employee' />
      </SelectTrigger>
      <SelectContent className='font-sono dark:bg-black'>
        <SelectGroup>
          <SelectLabel>Employees:</SelectLabel>
          {employees.map((employee) => (
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
