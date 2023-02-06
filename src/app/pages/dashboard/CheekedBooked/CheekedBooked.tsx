import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import Loading from '../../../shared/Loading/Loading';
import Product from '../../home/products/product/Product';

const CheekedBooked = () => {
  const { user } = useContext(AuthContext);
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/booking');
      const data = await res.json();
      return data;
    },
  });

  const mySellProducts = products.filter(
    (product: any) => product.email === user?.email
  );
  console.log(mySellProducts);
  console.log(products);
  if (isLoading) {
    return <Loading />;
  }

  if (mySellProducts.length === 0) {
    return (
      <div>
        <h1 className="text-center text-2xl">You Have No Products</h1>;
        <Link to="/dashboard/add-products">
          {' '}
          <h2>Plase Upload Your products</h2>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h2 className="mt-2 mb-2 text-xl"> Already booked My products</h2>
      <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2  gap-4 px-4">
        {mySellProducts.map((product: any) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CheekedBooked;
