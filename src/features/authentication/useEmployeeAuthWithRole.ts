import { useQuery } from '@tanstack/react-query';

import useUser from './useUser';
import { getEmployeeRoleByEmail } from '../../services/apiEmployees';

const useEmployeeAuthWithRole = () => {
  const { isAuthenticated, user } = useUser();

  const {
    data: employeeRole,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['employee-role', user?.email],
    queryFn: () => getEmployeeRoleByEmail(user?.email as string),
    retry: false,
  });

  if (!isAuthenticated || !user || error) {
    const error = 'Not Authenticated, user or role';
    return { error };
  }

  return { employeeRole, isLoading };
};

export default useEmployeeAuthWithRole;
