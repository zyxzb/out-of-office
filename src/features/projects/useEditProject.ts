import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  editProject as editProjectService,
  Project,
} from '../../services/apiProjects';

const useEditProject = () => {
  const queryClient = useQueryClient();

  const { mutate: editProject, isPending: isEditing } = useMutation({
    mutationFn: (data: Project) => editProjectService(data),
    onSuccess: () => {
      toast.success(`Project successfully edited`);
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editProject, isEditing };
};

export default useEditProject;
