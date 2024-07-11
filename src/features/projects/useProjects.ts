import { useQuery } from '@tanstack/react-query';

import { getProjects } from '../../services/apiProjects';

const useProjects = () => {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  return { projects, isLoading, isError, error };
};

export default useProjects;
