import React, { useState } from 'react';
import { createContext } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
  signOut,
  updateEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useEffect } from 'react';
import app from '../../firebase/firebaseConfig/firebaseConfig';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getStorage,
} from 'firebase/storage';
import { toast } from 'react-hot-toast';
const storage = getStorage(app);
export const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const auth: any = getAuth(app);

  const [imageURL, setImageURL] = useState('');
  const createUserAccount = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserAccount = (name: any, photo: any) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const updateUserEmail = (email: any) => {
    setLoading(true);
    return updateEmail(auth.currentUser, email);
  };

  const singInUserAccount = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // delete user account
  const deleteUserAccount = () => {
    setLoading(true);
    return deleteUser(auth.currentUser);
  };
  const handleSignOut = () => {
    localStorage.removeItem('accessToken');

    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user: any) => {
      setUser(user);

      setLoading(false);
    });
    return unsubscribed;
  }, []);

  const handleImageUpload = (file: any) => {
    const storageRef = ref(storage, `images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            toast('wait image is uploading');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
        });
      }
    );
  };

  const userInfo: any = {
    createUserAccount,
    updateUserAccount,
    deleteUserAccount,
    handleSignOut,
    singInUserAccount,
    updateUserEmail,
    user,
    loading,
    handleImageUpload,
    imageURL,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
