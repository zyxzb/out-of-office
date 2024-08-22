import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../shadcn/components/ui/select';

type SelectStatus = {
  selectedStatus: string;
  setSelectedStatus: (id: string) => void;
};

const SelectStatus = ({ selectedStatus, setSelectedStatus }: SelectStatus) => {
  return (
    <Select
      value={selectedStatus}
      onValueChange={(value) => setSelectedStatus(value)}
    >
      <SelectTrigger className='w-[280px] dark:bg-black'>
        <SelectValue placeholder='Select status' />
      </SelectTrigger>
      <SelectContent className='dark:bg-black'>
        <SelectGroup>
          <SelectLabel>Status:</SelectLabel>
          <SelectItem value='inactive'>Inactive</SelectItem>
          <SelectItem value='active'>Active</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectStatus;
