import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import useLogout from './useLogout';
import { Button } from '../../shadcn/components/ui/button';

const Logout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <Button
      onClick={() => logout()}
      disabled={isLoading}
      variant='secondary'
      className='flex items-center gap-2'
    >
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <HiArrowRightOnRectangle /> <span>Logout</span>
        </>
      )}
    </Button>
  );
};

export default Logout;
