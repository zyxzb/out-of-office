import { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '../shadcn/components/ui/button';
import { Input } from '../shadcn/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn/components/ui/select';

type SearchProps = {
  options: {
    value: string;
  }[];
};

const Search = ({ options }: SearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState(options[1]?.value || '');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchParams.set('searchHeader', selectValue);
    searchParams.set('searchValue', searchValue);
    setSearchParams(searchParams, { replace: true });
  };

  const handleChange = (value: string) => {
    setSelectValue(value);
  };

  return (
    <form className='flex gap-3' onSubmit={handleSubmit}>
      <Input
        placeholder={`Search by ${selectValue.replace(/_/g, ' ')}`}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Select onValueChange={handleChange}>
        <SelectTrigger className='w-[300px] transition-all'>
          <SelectValue placeholder='Filter By' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.value.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type='submit'>Search</Button>
    </form>
  );
};

export default Search;
