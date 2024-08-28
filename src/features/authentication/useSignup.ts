import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { signup as signupApi } from '../../services/apiAuth';

const useSignup = () => {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        `Account successfully created! Please verify your account from user's email address`,
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading };
};

export default useSignup;
