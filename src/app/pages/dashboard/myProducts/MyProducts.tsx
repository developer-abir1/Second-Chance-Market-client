import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import Loading from '../../../shared/Loading/Loading';
import moment from 'moment';
import TimeAgo from '../../../shared/TimeAgo/TimeAgo';
import { format } from 'date-fns';
import { AuthContext } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ConformModal from '../../../shared/confromModal/ConformModal';

const MyProducts = () => {
  const { user, handleSignOut, loading } = useContext(AuthContext);
  const [conformDeletUser, setConformDeletUser] = useState<any>(null);

  const navigate = useNavigate();
  const {
    data: productData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['product', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `  https://reseller-products-server.vercel.app/product?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      if (res.status === 401 || res.status === 403) {
        return handleSignOut();
      }

      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (id: any) => {
    fetch(` https://reseller-products-server.vercel.app/product/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 1) {
          toast.success('product delete successfully');
        }
        refetch();
        setConformDeletUser(null);
      });
  };

  if (isLoading || loading) {
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
      <h2 className="ml-16 text-2xl mt-16 mb-4">My Products</h2>
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
                  <label
                    htmlFor="conform-modal"
                    className="btn  bg-red-500  btn-xs border-none text-white "
                    onClick={() => setConformDeletUser(product)}
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {conformDeletUser && (
        <ConformModal
          data={conformDeletUser}
          message="are you  sure ? delete this products"
          title={` do you want to delete ${conformDeletUser?.title}`}
          action={handleDelete}
          textColor="delete"
        />
      )}
    </div>
  );
};

export default MyProducts;
