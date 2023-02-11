import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../shared/Loading/Loading';

const AdminRoute = ({ children }: any) => {
  const { user, loading, handleSignOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const { data: admin } = useQuery({
    queryKey: ['users', user.email],
    queryFn: async () => {
      setIsLoading(true);
      const res = await fetch(
        ` https://reseller-products-server.vercel.app/users/admin/${user.email}`
      );

      const data = await res.json();
      setIsLoading(false);
      return data;
    },
  });
  console.log(admin);

  if (loading || isLoading) {
    return <Loading />;
  }

  if (user?.email && admin?.isAdmin) {
    return children;
  }

  return <Navigate to="/" />;
};

export default AdminRoute;
