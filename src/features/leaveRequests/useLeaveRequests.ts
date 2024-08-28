import { useQuery } from '@tanstack/react-query';

import { getRequests } from '../../services/apiLeaveRequests';

const useLeaveRequests = () => {
  const {
    data: requests,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['leaveRequests'],
    queryFn: getRequests,
  });

  return { requests, isLoading, isError, error };
};

export default useLeaveRequests;
