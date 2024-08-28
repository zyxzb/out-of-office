import useUser from './useUser';

const UserInfo = () => {
  const { user } = useUser();

  return <p>Welcome, {user?.user_metadata?.fullName || user?.email}</p>;
};

export default UserInfo;
