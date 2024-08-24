import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  createProject as createProjectService,
  Project,
} from '../../services/apiProjects';

const useCreateProject = () => {
  const queryClient = useQueryClient();

  const { mutate: createProject, isPending: isCreating } = useMutation({
    mutationFn: (data: Project) => createProjectService(data),
    onSuccess: () => {
      toast.success(`Project successfully added`);
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    createProject,
    isCreating,
  };
};

export default useCreateProject;
