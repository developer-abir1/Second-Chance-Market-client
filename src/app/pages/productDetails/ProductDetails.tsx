import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../shared/Loading/Loading';
import moment from 'moment';
import TimeAgo from '../../shared/TimeAgo/TimeAgo';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
const ProductDetails = () => {
  const product: any = useLoaderData();
  const { user } = useContext(AuthContext);

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['booking', product._id],
    queryFn: async () => {
      const res = await fetch(
        `https://reseller-products-server.vercel.app/booking`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleBooking = () => {
    const bookingData = {
      bookedEmail: user?.email,
      bookedName: user?.displayName,
      ...product,
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    fetch('https://reseller-products-server.vercel.app/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success('booking is successfull');
        refetch();
      });
  };
  if (!product || isLoading) {
    return <Loading />;
  }
  const alradyBooked = bookings.find(
    (booking: any) => booking._id === product?._id
  );
  console.log('alradyBooked', alradyBooked);
  return (
    <div>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className=" ">
          <figure>
            <img
              src={product?.image}
              className="  object-contain p-2   w-full h-96"
              alt={product.title}
            />
          </figure>
        </div>
        <div className=" grid md:grid-cols-5 grid-cols-4 gap-4  bg-[#d8d8d8a9]  ">
          <div className="card-body    mx-4 my-4 col-span-4">
            <div className=" bg-white   px-4 py-4">
              <h2 className="  text-4xl    font-semibold  flex justify-between ">
                {product.title}{' '}
                <span className="text-xs">
                  {' '}
                  <TimeAgo timestap={product.date} />
                </span>
              </h2>

              <p className=" text-text mt-4">
                Old Price :{' '}
                <span className="  text-accent font-bold ">
                  {' '}
                  ${product.oldPrice}
                </span>
              </p>

              <div className=" flex justify-between  ">
                <p className="   mt-4  font-serif">
                  {product.mileage} KM | {product.model} | {product.useOfYear}{' '}
                  Year
                </p>
                <p className="  text-text mt-4 text-end">
                  {moment(product.date).format('LL ')}
                </p>
              </div>
            </div>
            <div className=" bg-white px-4 py-4">
              <h2 className="  text-3xl font-bold  ">Discription</h2>
              <p className=" text-text  mt-4">{product.discription}</p>
            </div>
            <div className=" bg-white px-4 py-4">
              <h2 className="  text-3xl font-bold mb-4 ">Post Information</h2>
              <p className=" text-text ">Name: {product.name}</p>
              <p className=" text-text ">
                Phone Number : {product.phoneNumber}
              </p>
              <p className=" text-text ">
                <address>Address :</address> {product.address}
              </p>
            </div>
          </div>
          <div className="     xs:col-span-3     flex justify-center items-center flex-col m-2   bg-white md:mx-4    md:my-4  h-32 w-full    ">
            <h2 className=" text-sm md:text-lg   font-bold mb-2">
              New Price $ {product.newPrice}
            </h2>

            <button
              className=" btn btn-primary w-[80%]"
              onClick={handleBooking}
              disabled={alradyBooked}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
