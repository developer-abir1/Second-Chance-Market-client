import React, { useState } from 'react';
import { createContext } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useEffect } from 'react';
import app from '../../firebase/firebaseConfig/firebaseConfig';

export const AuthContext = createContext<any>(null);
const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  const auth: any = getAuth(app);
  const createUserAccount = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserAccount = (name: string) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const singInUserAccount = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // delete user account
  const deleteUserAccount = () => {
    return deleteUser(auth.currentUser);
  };
  const handleSignOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user: any) => {
      setUser(user);

      setLoading(false);
    });
    return unsubscribed;
  }, []);

  const userInfo: any = {
    createUserAccount,
    updateUserAccount,
    deleteUserAccount,
    handleSignOut,
    singInUserAccount,
    user,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
