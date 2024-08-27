import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '../features/authentication/useUser';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading)
    return (
      <div className='grid h-screen w-full place-items-center'>
        <p>Loading...</p>
      </div>
    );

  return children;
};

export default ProtectedRoute;
