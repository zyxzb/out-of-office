import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import {
  getApprovalRequests,
  SortBy,
} from '../../services/apiApprovalRequests';
import { useRowsStore } from '../../store/selectRows-store';

const useSearchFilterApprovalRequests = () => {
  const [searchParams] = useSearchParams();
  const { numberOfRows } = useRowsStore();

  const page = !searchParams.get('page')
    ? 1
    : Number(searchParams?.get('page'));

  const sortByRaw = searchParams.get('sortBy') || 'id-asc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy: SortBy = { field, direction: direction as 'asc' | 'desc' };

  const searchHeader = searchParams.get('searchHeader') || 'approver';
  const searchValue = searchParams.get('searchValue') || '';
  const status = searchParams.get('status') || 'all';

  const filter = {
    filterHeader: searchHeader,
    filterValue: searchValue,
    status: status,
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['approvalRequests', page, sortBy, filter, numberOfRows],
    queryFn: () => getApprovalRequests({ page, sortBy, filter, numberOfRows }),
  });

  const approvalRequests = data?.approvalRequests || [];
  const count = data?.count || 0;

  return {
    approvalRequests,
    isLoading,
    isError,
    error,
    count,
  };
};

export default useSearchFilterApprovalRequests;
