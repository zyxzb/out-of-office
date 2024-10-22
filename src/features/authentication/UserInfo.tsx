import useEmployeeAuthWithRole from './useEmployeeAuthWithRole';
import useUser from './useUser';
import { Skeleton } from '../../shadcn/components/ui/skeleton';

const UserInfo = () => {
  const { user } = useUser();
  const { employeeRole, isLoading } = useEmployeeAuthWithRole();

  return (
    <div className='flex items-center gap-4'>
      Welcome, {user?.user_metadata?.fullName || user?.email}{' '}
      <span className='flex items-center'>
        {isLoading ? (
          <Skeleton className='inline-block h-6 w-16' />
        ) : (
          `(${employeeRole})`
        )}
      </span>
    </div>
  );
};

export default UserInfo;
