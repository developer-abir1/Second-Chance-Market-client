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

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [updateProfile, setUpdatingProfile] = useState(null);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  const myAccount = users[0];
  console.log('my account', myAccount);

  const profileUpdate = ({ e }: any) => {
    e.preventDefault();

    // fetch(`http://localhost:5000/users/${data._id}`, {
    //   method: 'PACTH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // }).then((result) => {
    //   console.log(result);
    //   refetch();
    //   setUpdatingProfile(null);
    // });
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
                <div className="avatar online relative">
                  <div className="w-48 ml-4   rounded-full ">
                    <img
                      src="https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?w=740&t=st=1675172339~exp=1675172939~hmac=fbc3d0739c5c7f11d868d0390183f0e6e1e42a883f7332f4c6b00cf9d3d94936"
                      className=" "
                    />
                  </div>
                  <div className="">
                    <FaCamera
                      size={30}
                      className=" absolute bottom-3 bg-white  rounded-full hover:bg-white btn  btn-ghost p-1  w-10 h-10 right-4 "
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="  mt-12">
                  <h2 className="text-3xl font-serif capitalize mb-4 flex  space-x-2">
                    <span>Name: {myAccount?.name}</span>
                    <span>
                      {' '}
                      <IoDiamondSharp size={30} className=" text-secondary" />
                    </span>
                  </h2>
                  <h2>
                    <span className="text-2xl font-serif mb-4 capitalize">
                      Email: {myAccount?.email}
                    </span>
                  </h2>
                  <h2>
                    <span className="text-2xl font-serif mb-4 capitalize">
                      Phone Number:{' '}
                      {myAccount?.phoneNumber
                        ? '0' + myAccount?.phoneNumber
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
                      Gender: {myAccount?.gander}
                    </span>
                  </h2>
                  <h2>
                    <span className="text-2xl font-serif mb-4 capitalize">
                      User Type: {myAccount?.userType}
                    </span>
                  </h2>
                  <div className=" flex justify-end">
                    <label
                      htmlFor="update-profile-modal"
                      className="btn flex   btn-sm mt-2"
                      onClick={() => setUpdatingProfile(myAccount)}
                    >
                      {' '}
                      <AiOutlineEdit size={30} /> Eidit
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {updateProfile && (
        <ProfileUpdateModal data={updateProfile} fromSubmit={profileUpdate} />
      )}
    </div>
  );
};

export default Profile;
