import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const useAdmin = () => {
  const { user } = useContext(AuthContext);

  const {
    data: admin = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      const res = await fetch(
        ` https://reseller-products-server.vercel.app/users/admin/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  return [admin];
};

export default useAdmin;
