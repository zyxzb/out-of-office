import { useQuery } from '@tanstack/react-query';

import { getEmployees } from '../../services/apiEmployees';

const useEmployees = () => {
  const {
    data: employees,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });

  return { employees, isLoading, isError, error };
};

export default useEmployees;
