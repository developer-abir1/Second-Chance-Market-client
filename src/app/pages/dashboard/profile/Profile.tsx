import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { AuthContext } from '../../../context/AuthProvider';
import Loading from '../../../shared/Loading/Loading';
import { IoDiamondSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import ProfileUpdateModal from '../../../shared/profileUpdate/ProfileUpdateModal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { reload } from 'firebase/auth';
import ConformModal from '../../../shared/confromModal/ConformModal';

const Profile = () => {
  const {
    user,
    updateUserAccount,
    updateUserEmail,
    handleImageUpload,
    imageURL,
    loading,
  } = useContext(AuthContext);

  const [updateProfile, setUpdatingProfile] = useState(null);
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://reseller-products-server.vercel.app/users?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  const myAccount = users[0];
  const reloadMe = () => {
    location.reload();
  };
  console.log('myAccount', myAccount);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handlePhoto = (data: any) => {
    handleImageUpload(data);
  };

  const profileUpdate = (data: any) => {
    const updateInfo = {
      displayName: data.displayName,
      email: myAccount.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      photoURL: !imageURL ? myAccount.photoURL : imageURL,
    };
    console.log('disp', updateInfo);

    fetch(
      `https://reseller-products-server.vercel.app/users/${myAccount._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateInfo),
      }
    )
      .then((res) => res.json())
      .then((update: any) => {
        if (update.modifiedCount > 0) {
          updateUserAccount(data.displayName, imageURL)
            .then((res: any) => {})
            .catch((err: any) => {
              console.log('Massage', err.message);
            });
          updateUserEmail(data.email).then((res: any) => {
            console.log('Massage', res.message);
          });
        }
      });
    toast.success('Profile Updated Successfully');

    setUpdatingProfile(null);
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className=" flex justify-center ">
        <div className=" w-full     px-12  rounded-md py-16">
          <div className="w-full     bg-white  h-full   mt-6 rounded-md ">
            <div className=" grid grid-cols-1 md:grid-cols-2  gap-4 px-12 space-x-4 justify-items-center   items-center   ">
              <div className="mt-12">
                <div className="avatar online relative ">
                  <div className="w-48 ml-4   rounded-full border-2 border-teal-400  ">
                    <img src={myAccount?.photoURL} className=" " />
                  </div>
                </div>
              </div>
              <div>
                <div className="  mt-12">
                  <h2 className="text-3xl font-serif capitalize mb-4 flex  space-x-2">
                    <span>Name: {myAccount?.displayName}</span>
                    <span>
                      {' '}
                      <IoDiamondSharp size={30} className=" text-secondary" />
                    </span>
                  </h2>
                  <h2>
                    <span className="text-2xl font-serif mb-4  ">
                      Email: {myAccount?.email}
                    </span>
                  </h2>
                  <h2>
                    <span className="text-2xl font-serif mb-4 capitalize">
                      Phone Number:{' '}
                      {myAccount?.phoneNumber
                        ? '+88' + myAccount?.phoneNumber
                        : 'Not Available'}
                    </span>
                  </h2>
                  <h2>
                    <span className="text-2xl font-serif mb-4 capitalize">
                      Address: {myAccount?.address}
                    </span>
                  </h2>
                  <h2>
                    <span className="text-2xl font-serif mb-4 capitalize">
                      Gender: {myAccount?.gender}
                    </span>
                  </h2>
                  <h2>
                    <span className="text-2xl font-serif mb-4 capitalize">
                      User Type: {myAccount?.userType}
                    </span>
                  </h2>
                  <div className=" flex justify-end">
                    {!user?.email ? (
                      <button
                        onClick={() => reloadMe()}
                        className="btn btn-sm btn-primary"
                      >
                        Reload page
                      </button>
                    ) : (
                      <label
                        htmlFor="update-profile-modal"
                        className="btn flex   btn-sm mt-2"
                        onClick={() => setUpdatingProfile(myAccount)}
                      >
                        {' '}
                        <AiOutlineEdit size={30} /> Eidit
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {updateProfile && (
        <ProfileUpdateModal
          updateInfo={updateProfile}
          fromSubmit={profileUpdate}
          handleSubmit={handleSubmit}
          register={register}
          handlePhoto={handlePhoto}
          imageURL={imageURL}
        />
      )}
    </div>
  );
};

export default Profile;
