import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getProjects, SortBy } from '../../services/apiProjects';

const useSearchFilterProjects = () => {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get('page')
    ? 1
    : Number(searchParams?.get('page'));

  const sortByRaw = searchParams.get('sortBy') || 'id-asc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy: SortBy = { field, direction: direction as 'asc' | 'desc' };

  const searchHeader = searchParams.get('searchHeader') || 'project_type';
  const searchValue = searchParams.get('searchValue') || '';
  const status = searchParams.get('status') || 'all';

  const filter = {
    filterHeader: searchHeader,
    filterValue: searchValue,
    status: status,
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['projects', page, sortBy, filter],
    queryFn: () => getProjects({ page, sortBy, filter }),
  });

  console.log(data);

  const projects = data?.projects || [];
  const count = data?.count || 0;

  return {
    projects,
    isLoading,
    isError,
    error,
    count,
  };
};

export default useSearchFilterProjects;
