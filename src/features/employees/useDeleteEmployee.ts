import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { deleteEmployee as deleteEmployeeService } from '../../services/apiEmployees';

const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isDeleting, mutate: deleteEmployee } = useMutation({
    mutationFn: (id: number) => deleteEmployeeService(id),
    onSuccess: () => {
      toast.success(`Employee successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
      navigate('/employees');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteEmployee };
};

export default useDeleteEmployee;
