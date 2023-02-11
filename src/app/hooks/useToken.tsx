import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';

const useToken = (currentUser: any) => {
  const [token, setToken] = React.useState<string | null>(null);
  const { user, loading } = useContext(AuthContext);
  useEffect(() => {
    fetch(' https://reseller-products-server.vercel.app/jwt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    }).then((response) => {
      response.json().then((data) => {
        localStorage.setItem('accessToken', data.token);
        setToken(data.token);
      });
    });
  }, [user]);

  return [token, loading];
};

export default useToken;
