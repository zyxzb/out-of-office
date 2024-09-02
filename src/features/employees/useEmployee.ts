import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getEmployeeById } from '../../services/apiEmployees';

const useEmployee = () => {
  const { employeeId } = useParams();

  const {
    data: employee,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => getEmployeeById(Number(employeeId)),
    retry: false,
  });

  return { employee, isLoading, isError, error };
};

export default useEmployee;
