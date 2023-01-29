import React from 'react';
import { useRouteError } from 'react-router-dom';
import images from '../../utils/image';

const ElementErrorPages = () => {
  const error: any = useRouteError();

  return (
    <div className="flex justify-center     min-h-screen  items-center   ">
      <div className=" relative  mt-8">
        <h1 className="text-9xl  text-accent">Oops!</h1>
        <p className="text-2xl">Sorry, an unexpected error has occurred.</p>
        <p>
          <i className="md:text-2xl mb-6  text-red-400 text-xl ">
            Massage: <strong>{error.statusText || error.message}</strong>
          </i>
        </p>
        <div className="flex  space-x-5">
          <h2 className="text-2xl">Please Logout</h2>
          <button className=" btn btn-primary  btn-sm text-white z-10">
            Logout
          </button>
        </div>
        <div>
          <img
            src={images.error}
            className="img-responsive absolute top-0    opacity-10"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ElementErrorPages;
