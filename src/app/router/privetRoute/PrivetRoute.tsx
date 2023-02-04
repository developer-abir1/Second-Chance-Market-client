import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../shared/Loading/Loading';

const PrivetRoute = ({ children }: any) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
  if (loading) {
    return <Loading />;
  }

  if (user?.email) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivetRoute;
