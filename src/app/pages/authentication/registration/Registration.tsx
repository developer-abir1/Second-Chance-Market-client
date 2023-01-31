import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
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

  const { createUserAccount, updateUserAccount } = useContext(AuthContext);

  const { register, handleSubmit, watch }: any = useForm();

  const naviget = useNavigate();

  const onSubmit = (data: any) => {
    if (data.user === data.seller) {
      return alert('   plasec seta option');
    }

    if (data.user === true) {
      const users = data.user;
      const newValue = users && 'user';
      setValue(newValue);
    }
    if (data.seller === true) {
      const seller = data.seller;
      const newValue = seller && 'seller';
      setValue(newValue);
    }
    if (value) {
      createUserAccount(data.email, data.password).then((res: any) => {
        updateUserAccount(data.name)
          .then((result: any) => {
            console.log('hit the res', result);

            setError('');
            const infoData = {
              name: data.name,
              email: data.email,
              gander: data.gander,
              userType: value,
            };

            saveUserAccountDB(infoData);
          })

          .catch((err: any) => {
            setError(err.message);
          });
      });
    } else {
      alert('plase ageing click');
    }
  };

  const saveUserAccountDB = (data: any) => {
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((data) => {
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
        className="bg-white p-6 rounded-lg w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className=" text-3xl  font-serif text-center">Registration</h2>

        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Name
        </label>
        <input
          className="input  input-bordered   input-primary w-full max-w-md"
          type="text"
          name="email"
          {...register('name', { required: true })}
        />
        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Email
        </label>
        <input
          className="input  input-bordered   input-primary w-full max-w-md"
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
          {...register('password')}
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
            <option value={item} {...register('gander', { required: true })}>
              {item}
            </option>
          ))}
        </select>
        <div className=" flex justify-end">
          <button className="bg-indigo-500  text-white py-2 px-4 rounded-lg mt-4 hover:bg-indigo-600">
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
