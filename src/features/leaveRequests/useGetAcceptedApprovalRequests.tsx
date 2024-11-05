import { useQuery } from '@tanstack/react-query';

import { getAcceptedApprovalRequests } from '../../services/apiLeaveRequests';

const useGetAcceptedApprovalRequests = () => {
  const {
    data: requests,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['acceptedApprovalRequests'],
    queryFn: getAcceptedApprovalRequests,
  });

  return {
    requests,
    isLoading,
    isError,
    error,
  };
};

export default useGetAcceptedApprovalRequests;
