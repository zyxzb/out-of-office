import { useSearchParams } from 'react-router-dom';

import { Button } from '../shadcn/components/ui/button';

type FilterProps = {
  filterField: string;
  options: {
    value: string;
    label: string;
  }[];
};

const Filter = ({ filterField, options }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };

  return (
    <div className='flex items-center gap-2'>
      {options.map((option) => (
        <Button
          size='sm'
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default Filter;
