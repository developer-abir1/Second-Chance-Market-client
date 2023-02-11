import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import moment from 'moment';
import React, { useContext } from 'react';
import { FiLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import Loading from '../../../shared/Loading/Loading';
import Product from '../../home/products/product/Product';

const MyBooking = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: booking = [], isLoading } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      const res = await fetch(
        `  https://reseller-products-server.vercel.app/booking`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  console.log(booking);
  const myBooking = booking.filter(
    (booked: any) => booked.bookedEmail === user.email
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="overflow-x-auto px-16 mt-16">
        <table className="table w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>owner Name</th>
              <th>owner Email</th>
              <th>Phone Number</th>

              <th>Product Price</th>
              <th>Type</th>
              <th>Product Title</th>
              <th>Booking Date</th>
              <th>Product Link</th>
            </tr>
          </thead>
          <tbody>
            {myBooking.map((booked: any, i: any) => {
              const { product, date, productId, time, productTitle, _id } =
                booked;
              return (
                <tr>
                  <th>{i}</th>
                  <td>{product.name}</td>
                  <td>{product.email}</td>
                  <td>{product.phoneNumber}</td>
                  <td>{product.newPrice}</td>
                  <td>{product.postBy}</td>
                  <td>{product.title}</td>

                  <td>{moment(product.date).format('LL')}</td>
                  <td>
                    {' '}
                    <Link to={`/productDetails/${product._id}`}>
                      <FiLink className="2xl" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
