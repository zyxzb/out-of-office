import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { createEditEmployee, Employee } from '../../services/apiEmployees';

type newData = {
  newEmployeeData: Employee;
  id: number;
};

const useEditEmployee = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: editEmployee, isPending: isEditing } = useMutation({
    mutationFn: ({ newEmployeeData, id }: newData) =>
      createEditEmployee(newEmployeeData, id),
    onSuccess: () => {
      toast.success(`Employees successfully edited`);

      queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
      queryClient.invalidateQueries({
        queryKey: ['employee-role'],
      });
      navigate('/employees');
    },
    onError: (err) => toast.error(err.message),
  });

  return { editEmployee, isEditing };
};

export default useEditEmployee;
