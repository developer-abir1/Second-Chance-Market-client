import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import images from '../../../utils/image';
import { FaImages } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../shared/Loading/Loading';
import { format, sub } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import moment from 'moment';
const AddProducts = () => {
  const { register, handleSubmit, watch }: any = useForm();
  const { user } = useContext(AuthContext);

  const navigete = useNavigate();
  const {
    data: users = [],
    isLoading: usersLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  // add product
  const onSubmit = (data: any) => {
    const file = data.image[0];
    const fromData = new FormData();
    fromData.append('image', file);
    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBB}`,
      {
        method: 'POST',
        body: fromData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        const dataInfo = {
          name: user?.displayName,
          email: user?.email,
          title: data.title,
          newPrice: data.newPrice,
          oldPrice: data.oldPrice,
          useOfYear: data.useOfYear,
          discription: data.discription,
          categories: data.categories,
          phoneNumber: data.phoneNumber,
          image: result.data.display_url,
          postBy: users[0]?.userType,
          address: {
            division: data.division,
            thana: data.thana,
            upazila: data.upazila,
          },
          date: new Date().toISOString(),
        };
        console.log('result', result);
        if (result.success) {
          fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataInfo),
          })
            .then((res) => res.json())
            .then((products) => {
              console.log('onke pain', products);
              if (products.insertedId) {
                toast.success('product add successfully');

                console.log('product add successfully', products);
              }
            });
        }
      });
    console.log(data);
  };

  const {
    data: divisions = [],

    isLoading: divisionsLoading,
  } = useQuery({
    queryKey: ['division'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/division`);
      const data = await res.json();
      return data;
    },
  });

  const {
    data: thanaName = [],

    isLoading: thanaNameLoading,
  } = useQuery({
    queryKey: ['thana'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/thana`);
      const data = await res.json();
      return data;
    },
  });

  const {
    data: upazilas = [],

    isLoading,
  } = useQuery({
    queryKey: ['upazilas'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/upazilas`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading || divisionsLoading || thanaNameLoading || usersLoading) {
    return <Loading />;
  }
  return (
    <div className=" px-16 mt-16 mb-6">
      <h2 className=" text-3xl  font-serif  ml-8 mb-4">Product Added</h2>
      <form
        className="bg-white p-6 rounded-lg w-full md:max-w-screen-md max-w-screen-sm  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Title
        </label>
        <input
          className="input  input-bordered   input-primary w-full  "
          type="text"
          name="title"
          {...register('title', { required: true })}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              New Price
            </label>
            <input
              className="input  input-bordered   input-primary w-full  "
              type="number"
              name="price"
              {...register('newPrice')}
            />
          </div>
          <div>
            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Old Price
            </label>
            <input
              className="input  input-bordered   input-primary w-full  "
              type="number"
              name="oldPrice"
              {...register('oldPrice')}
            />
          </div>
        </div>

        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Phone Number
        </label>
        <input
          className="input  input-bordered   input-primary w-full  "
          type="number"
          name="number"
          {...register('phoneNumber')}
        />
        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Year of used
        </label>
        <input
          className="input  input-bordered   input-primary w-full  "
          type="text"
          name="useOfYear"
          {...register('useOfYear')}
        />

        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Categories
        </label>

        <select className="select select-primary w-full  ">
          {['hero', 'suzuki', 'yamaha'].map((item) => (
            <option
              value={item}
              {...register('categories', { required: true })}
            >
              {item}
            </option>
          ))}
        </select>
        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Items condition
        </label>
        <select className="select select-primary w-full  ">
          {['Good', 'Excilent'].map((item) => (
            <option value={item} {...register('condition', { required: true })}>
              {item}
            </option>
          ))}
        </select>
        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Location
        </label>
        <div className=" grid md:grid-cols-3 gap-4 grid-cols-1">
          <div>
            <label className="block  font-serif text-gray-700 font-medium mb-2 mt-4">
              Divisions
            </label>
            <select className="select select-primary w-full  ">
              {divisions?.map((division: any, index: any) => (
                <option
                  key={index}
                  value={division.name}
                  {...register('division')}
                >
                  {division.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block  font-serif text-gray-700 font-medium mb-2 mt-4  ">
              Thana Name
            </label>
            <select className="select select-primary w-full  ">
              {thanaName?.map((thana: any, index: any) => (
                <option key={index} value={thana.name} {...register('thana')}>
                  {thana.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block  font-serif text-gray-700 font-medium mb-2 mt-4">
              Upazilas
            </label>
            <select className="select select-primary w-full  ">
              {upazilas?.map((upazila: any, index: any) => (
                <option
                  key={index}
                  value={upazila.name}
                  {...register('upazila')}
                >
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
          Discription
        </label>

        <textarea
          className=" textarea   textarea-primary w-full  text-lg "
          type="text"
          name="discription"
          {...register('discription', { required: true })}
        />
        <div className="  relative  my-6 mb-6">
          <label className="   absolute border-2 w-full    h-32 flex justify-center items-center rounded-md border-dashed  ">
            <div className="flex flex-col justify-center  items-center">
              <h2 className=" text-accent text-xl">Upload photo</h2>
              <FaImages size={60} className=" text-4xl text-primary" />
            </div>
          </label>
          <input
            className="input    opacity-0  border-2 w-full h-32"
            type="file"
            name="image"
            {...register('image', { required: true })}
          />
        </div>

        <div className=" flex justify-end  ">
          <button className="bg-indigo-500  text-white py-2 px-4 rounded-lg mt-4 hover:bg-indigo-600">
            Added
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
