import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditEmployee, Employee } from '../../services/apiEmployees';

const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  const { mutate: createEmployee, isPending: isCreating } = useMutation({
    mutationFn: (data: Employee) => createEditEmployee(data),
    onSuccess: () => {
      toast.success(`Employee successfully added`);
      queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    createEmployee,
    isCreating,
  };
};

export default useCreateEmployee;
