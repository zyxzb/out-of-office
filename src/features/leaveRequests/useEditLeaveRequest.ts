import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  editLeaveRequest as editLeaveRequestService,
  LeaveRequest,
} from '../../services/apiLeaveRequests';

const useEditLeaveRequest = () => {
  const queryClient = useQueryClient();
  const { mutate: editLeaveRequest, isPending: isEditing } = useMutation({
    mutationFn: (data: LeaveRequest) => editLeaveRequestService(data),
    onSuccess: () => {
      toast.success(`Leave Requests successfully edited`);

      queryClient.invalidateQueries({
        queryKey: ['leaveRequests'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editLeaveRequest, isEditing };
};

export default useEditLeaveRequest;
