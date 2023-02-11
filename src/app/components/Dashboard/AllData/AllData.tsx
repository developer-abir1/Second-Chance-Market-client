import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../shared/Loading/Loading';

const AllData = () => {
  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      const res = await fetch(
        `  https://reseller-products-server.vercel.app/booking`
      );
      const data = await res.json();
      return data;
    },
  });
  const { data: products, isLoading: productLoading } = useQuery({
    queryKey: ['producs'],
    queryFn: async () => {
      const res = await fetch(
        `  https://reseller-products-server.vercel.app/products`
      );
      const data = await res.json();
      return data;
    },
  });
  const { data: users, isLoading: userLoading } = useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      const res = await fetch(
        ` https://reseller-products-server.vercel.app/users/admin`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading || productLoading || userLoading) return <Loading />;
  return (
    <div className=" grid grid-cols-3 gap-4 px-4  mt-4 ">
      <div className="h-24 bg-red-500  rounded-md">
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">
          Total User
        </h2>
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">
          {users?.length}
        </h2>
      </div>
      <div className="h-24 bg-yellow-500  rounded-md">
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">
          Total Products
        </h2>
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">
          {products?.length}
        </h2>
      </div>
      <div className="h-24 bg-green-500 rounded-md ">
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">
          Total Booking
        </h2>
        <h2 className=" text-2xl text-center mt-2 font-serif text-white">
          {booking?.length}
        </h2>
      </div>
    </div>
  );
};

export default AllData;
