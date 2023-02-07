import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Product from '../../home/products/product/Product';

const MyBooking = () => {
  const { data: booking = [] } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      const res = await fetch(
        ` https://reseller-products-server.vercel.app/booking`
      );
      const data = await res.json();
      return data;
    },
  });

  const myBooked = booking
    .slice()
    .sort((a: any, b: any) => b.date.localeCompare(a.date));

  return (
    <div>
      <div className=" grid grid-cols-3 gap-4">
        {myBooked.map((product: any) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
