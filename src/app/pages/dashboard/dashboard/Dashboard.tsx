import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { FiLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AllData from '../../../components/Dashboard/AllData/AllData';
import LineData from '../../../components/Dashboard/LineData/LineData';
import { AuthContext } from '../../../context/AuthProvider';
import Loading from '../../../shared/Loading/Loading';

const Dashboard = () => {
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

  const bookedProduct = booking.filter(
    (book: any) => book.product.email === user.email
  );

  const { data: products = [], isLoading: prod } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await fetch(
        `  https://reseller-products-server.vercel.app/product?email=${user.email}`,
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

  if (isLoading || prod) {
    return <Loading />;
  }
  if (products.length === 0) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <h2>You Have No Products , Plase upload</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className=" text-3xl  my-4 mx-4">User Dashboard</h2>

      <div className=" grid md:grid-cols-2 grid-cols-2 gap-4 px-4 ">
        <Link
          to="/dashboard/myProducts"
          className=" h-24 bg-red-500 rounded-md flex flex-col justify-center items-center"
        >
          <h2 className=" text-white  text-3xl">Total Products</h2>

          <h2 className=" text-white text-3xl font-bold">{products.length}</h2>
        </Link>
        <div className=" h-24 bg-green-500 rounded-md flex flex-col justify-center items-center">
          <h2 className=" text-white  text-3xl">Total Booking</h2>

          <h2 className=" text-white text-3xl font-bold">
            {bookedProduct.length}
          </h2>
        </div>
      </div>
      <div>
        {bookedProduct.length === 0 ? (
          <div className=" h-screen flex justify-center items-center">
            <h2>Booking list is empty {bookedProduct.length}</h2>
          </div>
        ) : (
          <div className="overflow-x-auto px-16 mt-16">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Product Title</th>
                  <th>Booking Date</th>
                  <th>Booking Time</th>
                </tr>
              </thead>
              <tbody>
                {bookedProduct.map((booked: any, i: any) => {
                  const {
                    bookedEmail,
                    product,
                    bookedName,
                    bookedPhone,
                    date,
                    time,
                    _id,
                  } = booked;

                  return (
                    <tr>
                      <th>{i}</th>
                      <td>{bookedName}</td>
                      <td>{bookedEmail}</td>
                      <td> {bookedPhone}</td>
                      <td> {product.title}</td>

                      <td> {date}</td>
                      <td> {time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
