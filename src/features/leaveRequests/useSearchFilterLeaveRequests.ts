import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getRequests, SortBy } from '../../services/apiLeaveRequests';

const useSearchFilterLeaveRequests = () => {
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
    queryKey: ['leaveRequests', page, sortBy, filter],
    queryFn: () => getRequests({ page, sortBy, filter }),
  });

  console.log(data);

  const requests = data?.requests || [];
  const count = data?.count || 0;

  return {
    requests,
    isLoading,
    isError,
    error,
    count,
  };
};

export default useSearchFilterLeaveRequests;