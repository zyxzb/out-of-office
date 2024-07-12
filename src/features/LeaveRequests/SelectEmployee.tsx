// import all employees and map

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../shadcn/components/ui/select';

type SelectEmployeeProps = {
  selectedItem: string;
  setSelectedItem: (name: string) => void;
};

const SelectEmployee = ({
  selectedItem,
  setSelectedItem,
}: SelectEmployeeProps) => {
  return (
    <Select
      value={selectedItem}
      onValueChange={(name) => setSelectedItem(name)}
    >
      <SelectTrigger className='w-[280px] dark:bg-black'>
        <SelectValue placeholder='Select an Employee' />
      </SelectTrigger>
      <SelectContent className='font-sono dark:bg-black'>
        <SelectGroup>
          <SelectLabel>Employees:</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='blueberry'>Blueberry</SelectItem>
          <SelectItem value='grapes'>Grapes</SelectItem>
          <SelectItem value='pineapple'>Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectEmployee;
