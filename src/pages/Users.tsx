import { useRef } from 'react';

import useEmployeeAuthWithRole from '../features/authentication/useEmployeeAuthWithRole';
import CreateUserInfo from '../features/users/CreateUserInfo';
import SignupForm from '../features/users/SignupForm';
import Heading from '../ui/Heading';
import SmallText from '../ui/SmallText';

type UsersProps = {
  roles: string[];
};

const Users = ({ roles }: UsersProps) => {
  const { employeeRole, isLoading, error } = useEmployeeAuthWithRole();
  const inputRef = useRef<HTMLInputElement>(null);

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return <p>{error}</p>;
  }

  if (roles && !roles.includes(employeeRole)) {
    return <p>Blocked View - User must be an employee with the role "admin"</p>;
  }

  const handleFocusRef = () => {
    inputRef?.current?.focus();
  };

  return (
    <>
      <Heading as='h1'>
        Create a new user <SmallText>(only for the role "admin")</SmallText>
      </Heading>
      <div className='my-10 grid grid-cols-1 gap-10 md:grid-cols-2'>
        <CreateUserInfo handleFocusRef={handleFocusRef} />
        <SignupForm ref={inputRef} />
      </div>
    </>
  );
};

export default Users;
