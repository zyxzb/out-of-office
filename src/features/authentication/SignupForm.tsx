import { useForm, SubmitHandler } from 'react-hook-form';

import useSignup from './useSignup';
import { SignupProps } from '../../services/apiAuth';
import { Button } from '../../shadcn/components/ui/button';
import { Input } from '../../shadcn/components/ui/input';
import FormRow from '../../ui/FormRow';

const SignupForm = () => {
  const { signup, isLoading } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const onSubmit: SubmitHandler<SignupProps> = (data) => {
    const { fullName, email, password } = data;

    signup(
      { fullName, email, password },
      {
        onSettled: () => {
          reset();
        },
      },
    );
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex max-w-[340px] flex-col gap-5'
    >
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <Input
          type='fullName'
          id='fullName'
          disabled={isLoading}
          {...register('fullName', {
            required: 'Password is required',
          })}
        />
      </FormRow>
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
            required: 'Password field is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
      </FormRow>

      <Button size='lg' disabled={isLoading} className='max-w-max'>
        {isLoading ? 'Loading...' : 'Create User'}
      </Button>
    </form>
  );
};

export default SignupForm;
