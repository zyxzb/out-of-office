import { useQuery } from '@tanstack/react-query';

import { getApprovalRequests } from '../../services/apiApprovalRequests';

const useApprovalRequests = () => {
  const {
    data: approvalRequests,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['approvalRequests'],
    queryFn: getApprovalRequests,
  });

  return { approvalRequests, isLoading, isError, error };
};

export default useApprovalRequests;
