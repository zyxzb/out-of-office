import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditRequest } from '../../services/apiLeaveRequests';

const useCreateLeaveRequest = () => {
  const queryClient = useQueryClient();

  const { mutate: createLeaveRequest, isPending: isCreating } = useMutation({
    mutationFn: (data) => createEditRequest(data),
    onSuccess: () => {
      toast.success(`LeaveRequest successfully added`);
      queryClient.invalidateQueries({
        queryKey: ['leaveRequest'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    createLeaveRequest,
    isCreating,
  };
};

export default useCreateLeaveRequest;
