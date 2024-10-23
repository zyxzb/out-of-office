import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PageLoader from './PageLoader';
import useUser from '../features/authentication/useUser';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading) return <PageLoader />;

  return children;
};

export default ProtectedRoute;
