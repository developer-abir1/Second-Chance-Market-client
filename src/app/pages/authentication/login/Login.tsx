import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import images from '../../../utils/image';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';
const Login = () => {
  const bgBanner = {
    backgroundImage: `url(${images.login})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '700px',
  };

  const [error, setError] = useState('');

  const { singInUserAccount } = useContext(AuthContext);

  const { register, handleSubmit, watch }: any = useForm();
  const onSubmit = (data: any) => {
    singInUserAccount(data.email, data.password)
      .then((result: any) => {
        toast.success('Login Successfull');
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  return (
    <div style={bgBanner} className=" flex justify-center items-center">
      <form
        className="bg-white p-6 rounded-lg w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className=" text-3xl  font-serif text-center">Login</h2>

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

        <div className=" flex justify-end">
          <button className="bg-indigo-500  text-white py-2 px-4 rounded-lg mt-4 hover:bg-indigo-600">
            Login
          </button>
        </div>
        <h2>
          <span>Don't have a account?</span>
          <Link to="/registration" className=" text-primary">
            {' '}
            <span>Registration</span>
          </Link>
        </h2>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
