import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  createEditRequest,
  LeaveRequest,
} from '../../services/apiLeaveRequests';

const useCreateLeaveRequest = () => {
  const queryClient = useQueryClient();

  const { mutate: createLeaveRequest, isPending: isCreating } = useMutation({
    mutationFn: (data: LeaveRequest) => createEditRequest(data),
    onSuccess: () => {
      toast.success(`Request successfully added`);
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
