import React from 'react';

const AllData = () => {
  return (
    <div className=" grid grid-cols-4 gap-4 px-4  mt-4 ">
      <div className="h-24 bg-red-500  rounded-md">
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">
          Total User
        </h2>
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">35</h2>
      </div>
      <div className="h-24 bg-yellow-500  rounded-md">
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">
          Total Products
        </h2>
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">35</h2>
      </div>
      <div className="h-24 bg-green-500 rounded-md ">
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">
          Total Booking
        </h2>
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">35</h2>
      </div>
      <div className="h-24 bg-indigo-500 rounded-md">
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">
          Total Earn
        </h2>
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">
          $ 35
        </h2>
      </div>
    </div>
  );
};

export default AllData;
