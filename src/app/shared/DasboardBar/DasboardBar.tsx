import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import images from '../../utils/image';
import { HiOutlineBars3BottomLeft } from 'react-icons/hi2';
const DasboardBar = () => {
  const { user, handleSignOut } = useContext(AuthContext);
  const handleLogout = () => {
    handleSignOut().then(() => {});
  };

  return (
    <div className="navbar bg-white  ">
      <div className="flex-1 ">
        <label
          htmlFor="dashboard-drawer"
          className="btn  ml-4 mr-2     drawer-button btn-ghost text-green-600"
        >
          <HiOutlineBars3BottomLeft className=" " size={40} />
        </label>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal menu-compact px-1 ">
          {user?.email && (
            <li>
              <a>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img src={user?.photoURL} />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <Link to={'/dashboard/profile'}>
                      <li>
                        <a className="justify-between"> {user?.displayName}</a>
                      </li>
                    </Link>

                    <li onClick={handleLogout}>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DasboardBar;
