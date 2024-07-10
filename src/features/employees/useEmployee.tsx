import { useQuery } from '@tanstack/react-query';

import { getEmployeeById } from '../../services/apiEmployees';

const useEmployee = (id: number) => {
  const {
    data: employee,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['employee'],
    queryFn: () => getEmployeeById(id),
  });

  return { employee, isLoading, isError, error };
};

export default useEmployee;
