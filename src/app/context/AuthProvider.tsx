import React, { createContext, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  onAuthStateChanged as onAuthStateChangedFirebase,
  updateProfile as updateProfileFirebase,
} from 'firebase/auth';
import app from '../../firebase/firebaseConfig/firebaseConfig';

export const AuthContext = createContext<any>(null);
const AuthProvider = ({ children }: any): any => {
  const auth = getAuth(app);
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const creactEmailAndPassword = (email: any, password: any) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email: any, password: any) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOutFirebase(auth);
  };
  const updateUserInfo = (name: string) => {};

  useEffect(() => {
    const unsubscribe = onAuthStateChangedFirebase(auth, (user: any) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  const loginginfo = {
    creactEmailAndPassword,
    loginUser,
    logout,
    user,
  };
  return (
    <AuthContext.Provider value={loginginfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
