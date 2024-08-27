import { useForm, SubmitHandler } from 'react-hook-form';

import useLogin from './useLogin';
import { LoginProps } from '../../services/apiAuth';
import { Button } from '../../shadcn/components/ui/button';
import { Input } from '../../shadcn/components/ui/input';
import FormRow from '../../ui/FormRow';

function LoginForm() {
  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // test credentials as default
    defaultValues: { email: 'test@test.com', password: 'username' },
  });

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    login(data, {
      onSettled: () => {
        reset;
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex max-w-[340px] flex-col gap-5'
    >
      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          id='email'
          disabled={isLoading}
          {...register('email', {
            required: 'Email name is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Provide a valid email address',
            },
          })}
        />
      </FormRow>
      <FormRow label='Password' error={errors?.password?.message}>
        <Input
          type='password'
          id='password'
          disabled={isLoading}
          {...register('password', {
            required: 'Password is required',
          })}
        />
      </FormRow>
      <Button size='lg' disabled={isLoading} className='max-w-max'>
        {isLoading ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
}

export default LoginForm;
