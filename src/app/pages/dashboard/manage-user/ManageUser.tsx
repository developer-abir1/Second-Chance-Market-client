import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import Loading from '../../../shared/Loading/Loading';
import { getAuth } from 'firebase/auth';
import app from '../../../../firebase/firebaseConfig/firebaseConfig';
import ConformModal from '../../../shared/confromModal/ConformModal';
import { toast } from 'react-hot-toast';
const ManageUser = () => {
  const [conformDeletUser, setConformDeletUser] = useState<any>(null);
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users/admin`);
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id: any) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success('Make Admin Successfully');
          refetch();
        }
      });
  };
  const removeAdmin = (id: any) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.error('admin is remove');
          refetch();
        }
      });
  };

  const removeUser = (id: any) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success('user delete successfully');
          console.log(data);
          setConformDeletUser(null);
          refetch();
        }
      });
  };
  console.log(users);
  if (isLoading) return <Loading />;

  if (users.length === 0) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <h2 className="  font-serif text-3xl">You Have no user </h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="ml-16 text-2xl mt-16 mb-4">Manage User</h2>
      <div className="overflow-x-auto px-16">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
              <th>Add Admin</th>
              <th>Remove</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any, index: number) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>

                <td> {user.role === 'admin' && 'Admin'} </td>
                <td>
                  {user.role !== 'admin' && (
                    <button
                      className="btn  btn-accent  btn-xs  "
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {user?.role === 'admin' && (
                    <button
                      className="btn  btn-accent btn-error  btn-xs  "
                      onClick={() => removeAdmin(user._id)}
                    >
                      Remove Admin
                    </button>
                  )}
                </td>
                <td>
                  <label
                    htmlFor="conform-modal"
                    className="btn  bg-red-500  btn-xs "
                    onClick={() => setConformDeletUser(user)}
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {conformDeletUser && (
          <ConformModal
            title={` Delete User  ${conformDeletUser?.name}`}
            message="Are you sure you want to delete"
            data={conformDeletUser}
            action={removeUser}
          />
        )}
      </div>
    </div>
  );
};

export default ManageUser;
