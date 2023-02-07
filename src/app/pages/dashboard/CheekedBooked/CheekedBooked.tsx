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
      const res = await fetch(
        ' https://reseller-products-server.vercel.app/booking'
      );
      const data = await res.json();
      return data;
    },
  });

  const mySellProducts = products.find(
    (product: any) => product.email === user?.email
  );
  console.log('my', mySellProducts);
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
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* {mySellProducts?.map((product: any) => () => (
              <tr>
                <th></th>
                <td>{product.bookedEmail}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheekedBooked;
