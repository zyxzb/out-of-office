import { useState } from 'react';

import LoginForm from '../features/authentication/LoginForm';
import useClickOutside from '../hooks/useClickOutside';
import { Button } from '../shadcn/components/ui/button';
import { cn } from '../shadcn/lib/utils';
import Heading from '../ui/Heading';

const Login = () => {
  const [show, setShow] = useState(false);

  const close = () => {
    setShow(false);
  };

  const { ref } = useClickOutside<HTMLDivElement>(close);

  return (
    <div className='grid h-screen place-content-center'>
      <div className='mx-4 flex flex-col gap-8'>
        <Heading as='h2'>LogIn to your account</Heading>
        <LoginForm />
      </div>
      <div
        ref={ref}
        className={cn(
          `absolute left-1/2 flex -translate-x-1/2 flex-col gap-2 border transition-all ${show ? 'translate-y-0' : '-translate-y-full'} w-[200px]`,
        )}
      >
        <div className='m-4'>
          <p className='mb-2 border-b pb-2'>Test login data:</p>
          <p className='mb-2 text-xs'>Email: test@test.com</p>
          <p className='text-xs'>Password: username</p>
        </div>
        <Button
          variant='secondary'
          onClick={() => setShow((state) => !state)}
          className='absolute -bottom-4 w-full translate-y-1/2 rounded-none rounded-b'
        >
          {show ? 'Hide Data' : 'Show Data'}
        </Button>
      </div>
    </div>
  );
};

export default Login;
