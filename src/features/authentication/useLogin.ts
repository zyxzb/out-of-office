import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login as loginApi, LoginProps } from '../../services/apiAuth';

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginProps) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      // react query will get user from the cache memory and after login spinner will be not shown
      queryClient.setQueryData(['user'], user.user);
      navigate('/', { replace: true });
    },
    onError: (error) => {
      toast.error(`Login error: ${error.message}`);
    },
  });
  return { login, isLoading };
};

export default useLogin;
