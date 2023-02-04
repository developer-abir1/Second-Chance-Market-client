import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdImage } from 'react-icons/io';
const ProfileUpdateModal = ({
  updateInfo,
  fromSubmit,
  register,
  handleSubmit,
  handlePhoto,
  imageURL,
}: any) => {
  return (
    <>
      <input
        type="checkbox"
        id="update-profile-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form
            className="bg-white p-6 rounded-lg   "
            onSubmit={handleSubmit(fromSubmit)}
          >
            <h2 className=" text-3xl  font-serif text-center">
              Update own Data
            </h2>

            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Name
            </label>
            <input
              className="input  input-bordered   input-primary w-full max-w-md"
              type="text"
              name="name"
              defaultValue={updateInfo?.displayName}
              {...register('displayName')}
            />
            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Email
            </label>
            <input
              className="input  input-bordered   input-primary w-full max-w-md"
              type="text"
              name="name"
              disabled
              defaultValue={updateInfo?.email}
              {...register('email')}
            />

            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Phone Number
            </label>
            <input
              className="input  input-bordered   input-primary w-full max-w-md"
              type="text"
              defaultValue={updateInfo?.phoneNumber}
              name="phoneNamber"
              {...register('phoneNumber')}
            />
            <label className="block text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
              Address
            </label>
            <input
              className="input  input-bordered   input-primary w-full max-w-md"
              type="text"
              name="address"
              defaultValue={updateInfo?.address}
              {...register('address')}
            />
            <div className=" relative">
              <label className="  border-2 w-32 h-20 flex justify-center flex-col border-dashed  items-center    text-xl font-serif text-gray-700 font-medium mb-2 mt-4">
                {!imageURL && (
                  <div>
                    <span className="text-xs">Upload a Photo</span>

                    <span>
                      {' '}
                      <IoMdImage size={40} />
                    </span>
                  </div>
                )}
                {imageURL && (
                  <img
                    src={imageURL}
                    className=" object-contain h-full w-full"
                    alt=""
                  />
                )}
              </label>
              <input
                type="file"
                className=" absolute  w-32 opacity-0    bottom-3 bg-white  "
                name=""
                id=""
                onChange={(e: any) => handlePhoto(e.target.files[0])}
              />
            </div>
            <div className=" flex justify-end">
              <div>
                <label
                  htmlFor="update-profile-modal"
                  className="  mr-4 btn-sm   btn-warning   text-white  btn border-none"
                >
                  Cancel
                </label>
              </div>
              <button className=" btn-sm  bg-accent  text-white  btn border-none   ">
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
