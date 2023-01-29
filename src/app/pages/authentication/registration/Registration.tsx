import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import images from '../../../utils/image';
import toast from 'react-hot-toast';

const bgBanner = {
  backgroundImage: `url(${images.gif})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '700px',
};

const Registration = () => {
  const { creactEmailAndPassword } = useContext(AuthContext);
  const [error, setError] = useState('');
  const { register, handleSubmit }: any = useForm();

  const naviget = useNavigate();

  const onSubmit = (data: any) => {
    const users = data.user;
    const seller = data.seller;

    if (users === seller) {
      return alert('Please select one of the options  user  or seller');
    }

    creactEmailAndPassword(data.email, data.password)
      .then((userCredential: any) => {
        const user = userCredential.user;
        if (user.uid) {
          setError('');
          toast.success('Registration successful');
          naviget('/login');
        }
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  return (
    <div style={bgBanner} className=" flex justify-center items-center">
      <form
        className="bg-white p-6 rounded-lg w-96  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className=" text-3xl  font-serif text-center">Registration</h2>
        <label className="block text-xl font-serif text-gray-700 font-medium mb-2">
          Name
        </label>
        <input
          className="input  input-bordered   input-primary w-full max-w-md"
          type="text"
          name="name"
          {...register('name', { required: true })}
        />
        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Email
        </label>
        <input
          className="input  input-bordered   input-primary  w-full max-w-md"
          type="email"
          name="email"
          {...register('email', { required: true })}
        />
        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Password
        </label>
        <input
          className="input  input-bordered   input-primary w-full max-w-md"
          type="password"
          name="password"
          {...register('password', {
            required: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-xl font-serif">User</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              {...register('user')}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-xl font-serif">Seller</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary  "
              {...register('seller')}
            />
          </label>
        </div>
        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Gander
        </label>
        <select className="select select-primary w-full max-w-md">
          {['Male', 'Female', 'Other'].map((item) => (
            <option value={item} {...register('gender', { required: true })}>
              {item}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500">{error}</p>}
        <div className=" flex justify-end">
          <button className="bg-indigo-500  text-white py-2 px-4 rounded-lg mt-4 hover:bg-indigo-600">
            Registration
          </button>
        </div>
        <h2>
          <span>Alrady Hava a account?</span>
          <Link to="/login" className=" text-primary">
            {' '}
            <span>Login</span>
          </Link>
        </h2>
      </form>
    </div>
  );
};

export default Registration;
