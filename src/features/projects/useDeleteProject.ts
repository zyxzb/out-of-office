import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteProject as deleteProjectService } from '../../services/apiProjects';

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteProject } = useMutation({
    mutationFn: (id: number) => deleteProjectService(id),
    onSuccess: () => {
      toast.success(`Project successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteProject };
};

export default useDeleteProject;
