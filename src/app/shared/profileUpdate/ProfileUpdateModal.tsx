import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

const ProfileUpdateModal = ({ data, fromSubmit }: any) => {
  console.log(data);

  return (
    <>
      <input
        type="checkbox"
        id="update-profile-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form className="bg-white p-6 rounded-lg   " onSubmit={fromSubmit}>
            <h2 className=" text-3xl  font-serif text-center">Login</h2>

            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Name
            </label>
            <input
              className="input  input-bordered   input-primary w-full max-w-md"
              type="text"
              name="name"
              defaultValue={data.name}
            />

            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Email
            </label>
            <input
              className="input  input-bordered   input-primary w-full max-w-md"
              type="text"
              defaultValue={data.email}
              name="email"
              disabled
            />

            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Phone Number
            </label>
            <input
              className="input  input-bordered   input-primary w-full max-w-md"
              type="text"
              name="phoneNamber"
            />
            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Address
            </label>
            <input
              className="input  input-bordered   input-primary w-full max-w-md"
              type="text"
              name="address"
            />

            <div className=" flex justify-end">
              <div className="modal-action">
                <label htmlFor="update-profile-modal" className="btn mr-4">
                  Cancel
                </label>
              </div>
              <button className="  bg-accent  text-white py-2 px-4 rounded-lg mt-4  ">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdateModal;
