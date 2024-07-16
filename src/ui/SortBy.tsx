import { useSearchParams } from 'react-router-dom';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../shadcn/components/ui/select';

type SortByProps = {
  options: {
    value: string;
    label: string;
  }[];
};

const SortBy = ({ options }: SortByProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByValue = searchParams.get('sortBy') || '';

  const handleChange = (value: string) => {
    searchParams.set('sortBy', value);
    setSearchParams(searchParams);
  };
  return (
    <Select value={sortByValue} onValueChange={handleChange}>
      <SelectTrigger className='w-[300px] transition-all'>
        <SelectValue placeholder='Sort By' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By:</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortBy;
