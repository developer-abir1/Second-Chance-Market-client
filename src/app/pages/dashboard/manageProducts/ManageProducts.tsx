import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../shared/Loading/Loading';
import moment from 'moment';
import TimeAgo from '../../../shared/TimeAgo/TimeAgo';
import { format } from 'date-fns';

const ManageProducts = () => {
  const { data: productData = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(` http://localhost:5000/products`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (productData?.length === 0) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <h2 className="  font-serif text-3xl">You Have no user </h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="ml-16 text-2xl mt-16 mb-4">Manage product</h2>
      <div className="overflow-x-auto px-16  ">
        <table className="table table-compact w-full    ">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Product Title</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number </th>
              <th>Type of user </th>
              <th>Category</th>
              <th>New Price</th>
              <th>Old Price</th>
              <th>Time</th>
              <th>image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product: any, index: number) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product.title}</td>
                <td>{product.name}</td>
                <td>{product.email}</td>
                <td>{product.phoneNumber}</td>
                <td>{product.useOfYear}</td>
                <td>{product.categories}</td>
                <td>{product.newPrice}</td>
                <td>{product.oldPrice}</td>

                <td>
                  <TimeAgo timestap={product.date} />
                </td>

                <td>
                  <img src={product?.image} className="w-12" alt="" />
                </td>

                <td>
                  <button className=" btn btn-sm    btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
