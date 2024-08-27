import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getEmployees, SortBy } from '../../services/apiEmployees';

const useSearchFilterEmployees = () => {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get('page')
    ? 1
    : Number(searchParams?.get('page'));

  const sortByRaw = searchParams.get('sortBy') || 'id-asc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy: SortBy = { field, direction: direction as 'asc' | 'desc' };

  const searchHeader = searchParams.get('searchHeader') || 'full_name';
  const searchValue = searchParams.get('searchValue') || '';
  const status = searchParams.get('status') || 'all';

  const filter = {
    filterHeader: searchHeader,
    filterValue: searchValue,
    status: status,
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['employees', page, sortBy, filter],
    queryFn: () => getEmployees({ page, sortBy, filter }),
  });

  const employees = data?.employees || [];
  const count = data?.count || 0;

  return { employees, isLoading, isError, error, count };
};

export default useSearchFilterEmployees;
