import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FiImage } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import images from '../../../utils/image';

const Registration = () => {
  const bgBanner = {
    backgroundImage: `url(${images.register})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '700px',
  };
  const [value, setValue] = useState<any>(null);

  const [error, setError] = useState('');

  const { createUserAccount, updateUserAccount, handleImageUpload, imageURL } =
    useContext(AuthContext);

  const { register, handleSubmit, watch }: any = useForm();

  const displayName = watch('displayName');
  const email = watch('email');
  const password = watch('password');
  const user = watch('user');
  const seller = watch('seller');
  const gender = watch('gender');
  const isValid = displayName && password && email && gender;

  const naviget = useNavigate();

  const handleImage = (data: any) => {
    handleImageUpload(data);
  };

  const onSubmit = (data: any) => {
    if (data.user === data.seller) {
      return alert('   plasec seta option');
    } else if (data.user === true) {
      const users = data.user;
      const newValue = users && 'user';
      setValue(newValue);
    } else if (data.seller === true) {
      const seller = data.seller;
      const newValue = seller && 'seller';
      setValue(newValue);
    }

    if (value) {
      const user = {
        displayName: data.displayName,
        email: data.email,
        userType: value,
        photoURL: imageURL,
        gender: data.gender,
      };

      createUserAccount(data.email, data.password)
        .then((res: any) => {
          console.log('create users', res);
          if (res.uid) {
          }
          updateUserAccount(data.displayName, imageURL);
          saveUserAccountDB(user);
        })

        .catch((err: any) => {
          console.log(err);
          setError(err.message);
        });
    } else {
      toast.error('please click   again  ');
    }
  };

  const saveUserAccountDB = (data: any) => {
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((data) => {
        console.log('database save data', data);
        if (data.insertedId) {
          toast.success('Registration Successfull');
          naviget('/');
        }
      })
    );
    console.log(data);
  };

  return (
    <div style={bgBanner} className=" flex justify-center items-center">
      <form
        className="bg-white p-6 rounded-lg   "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className=" text-3xl  font-serif text-center">Registration</h2>

        <div className=" grid  grid-cols-2  gap-4">
          <div>
            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Name
            </label>
            <input
              className="input  input-bordered   input-primary w-full max-w-md"
              type="text"
              name="name"
              {...register('displayName', { required: true })}
            />
          </div>
          <div>
            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Email
            </label>
            <input
              className="input  input-bordered   input-primary w-full max-w-md"
              type="email"
              name="email"
              {...register('email', { required: true })}
            />
          </div>
          <div>
            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Password
            </label>
            <input
              className="input  input-bordered   input-primary w-full max-w-md"
              type="password"
              name="password"
              {...register('password', { required: true })}
            />
          </div>

          <div>
            <div className="form">
              <label className="label cursor-pointer">
                <span className="label-text text-xl font-serif">User</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  {...register('user')}
                  disabled={seller}
                />
              </label>
            </div>
            <div className="form">
              <label className="label cursor-pointer">
                <span className="label-text text-xl font-serif">Seller</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary  "
                  {...register('seller')}
                  disabled={user}
                />
              </label>
            </div>
          </div>
          <div>
            {' '}
            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Gender
            </label>
            <select className="select select-primary w-full max-w-md">
              {['male', 'female', 'Other'].map((item) => (
                <option
                  value={item}
                  {...register('gender', { required: true })}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className=" relative border-2 border-dashed">
            <label className="  text-xl   flex justify-center items-center font-serif text-gray-700 font-medium mb-2 mt-4">
              {!imageURL && <FiImage size={60} />}
              {imageURL && (
                <img
                  src={imageURL}
                  className="  absolute top-0 h-full w-full   object-contain "
                  alt=""
                />
              )}
            </label>
            <input
              className="input absolute  top-0 opacity-0 h-full  input-bordered   input-primary w-full max-w-md"
              type="file"
              name="file"
              onChange={(e: any) => handleImage(e.target.files[0])}
            />
          </div>
        </div>

        <div className=" flex justify-end">
          <button
            disabled={!isValid}
            className="bg-indigo-500 btn  text-white py-2 px-4 rounded-lg mt-4 hover:bg-indigo-600"
          >
            Create an account
          </button>
        </div>
        <h2>
          <span>Alrady have a account?</span>
          <Link to="/login" className=" text-primary">
            {' '}
            <span>Login</span>
          </Link>
        </h2>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Registration;
