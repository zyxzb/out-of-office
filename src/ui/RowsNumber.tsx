import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../shadcn/components/ui/select';
import { useRowsStore } from '../store/selectRows-store';

const RowsNumber = () => {
  const { numberOfRows, setNumberOfRows } = useRowsStore();
  const handleChange = (value: string) => {
    setNumberOfRows(Number(value));
  };

  return (
    <Select value={String(numberOfRows)} onValueChange={handleChange}>
      <SelectTrigger className='w-[190px] transition-all'>
        <SelectValue placeholder='Rows:' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Rows per page:</SelectLabel>
          <SelectItem value={'5'}>5 rows per page</SelectItem>
          <SelectItem value={'10'}>10 rows per page</SelectItem>
          <SelectItem value={'15'}>15 rows per page</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RowsNumber;
