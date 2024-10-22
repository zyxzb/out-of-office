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

const SelectRole = ({ selectedStatus, setSelectedStatus }: SelectStatus) => {
  return (
    <Select
      value={selectedStatus}
      onValueChange={(value) => setSelectedStatus(value)}
    >
      <SelectTrigger className='w-[280px] dark:bg-black'>
        <SelectValue placeholder='Select role' />
      </SelectTrigger>
      <SelectContent className='dark:bg-black'>
        <SelectGroup>
          <SelectLabel>Role:</SelectLabel>
          <SelectItem value='user'>User</SelectItem>
          <SelectItem value='project manager'>Project Manager</SelectItem>
          <SelectItem value='admin'>Admin</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectRole;
