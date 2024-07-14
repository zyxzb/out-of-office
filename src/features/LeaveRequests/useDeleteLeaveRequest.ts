import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteLeaveRequest } from '../../services/apiLeaveRequests';

const useDeleteLeaveRequest = () => {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteRequest } = useMutation({
    mutationFn: (id: number) => deleteLeaveRequest(id),
    onSuccess: () => {
      toast.success(`LeaveRequest successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: ['leaveRequests'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteRequest };
};

export default useDeleteLeaveRequest;
