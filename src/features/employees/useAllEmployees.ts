import { useQuery } from '@tanstack/react-query';

import { getAllEmployees } from '../../services/apiEmployees';

const useAllEmployees = () => {
  const {
    data: employees,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['allEmployees'],
    queryFn: () => getAllEmployees(),
  });

  return { employees, isLoading, isError, error };
};

export default useAllEmployees;
