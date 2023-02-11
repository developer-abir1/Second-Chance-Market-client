import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../shared/Loading/Loading';
import moment from 'moment';
import TimeAgo from '../../shared/TimeAgo/TimeAgo';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import ConformModal from '../../shared/confromModal/ConformModal';
const ProductDetails = () => {
  const product: any = useLoaderData();
  const { user } = useContext(AuthContext);
  const [conformBooking, setConformBooking] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<any>(null);
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      const res = await fetch(
        `   https://reseller-products-server.vercel.app/booking`,
        {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  const alradyBooked = bookings?.find(
    (booking: any) => booking.product._id === product._id
  );
  const handleBooking = (data: any) => {
    const bookingData = {
      bookedEmail: user?.email,
      bookedName: user?.displayName,
      bookedPhone: phoneNumber,
      product: { ...product },
      time: moment().format('h:mm:ss a'),
      date: moment().format('MMMM Do YYYY'),
    };
    fetch('   https://reseller-products-server.vercel.app/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        if (results.insertedId) {
          refetch();
          setConformBooking(null);
          toast.success('booking is successfull');
        }
      });
  };
  if (!product) {
    return <Loading />;
  }

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

            <label
              onClick={() => setConformBooking(product)}
              htmlFor="conform-modal"
              className={` bg-green-600  border-0 text-white  hover:bg-green-500   btn w-[80%]  ${
                alradyBooked && ' opacity-50 cursor-not-allowed disabled  '
              } `}
            >
              {' '}
              Book Now
            </label>
          </div>
        </div>
      </div>
      {!alradyBooked && conformBooking && (
        <ConformModal
          title={` Are you sure you want to book this${product.title}`}
          textColor="booked"
          data={conformBooking}
          action={handleBooking}
          addNumber={true}
          message=" Enter your phone number"
          number={setPhoneNumber}
        />
      )}
    </div>
  );
};

export default ProductDetails;
