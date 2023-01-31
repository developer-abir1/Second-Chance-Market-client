import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import images from '../../utils/image';
const DasboardBar = () => {
  const { user } = useContext(AuthContext);

  const pathName = useLocation();
  const dasboardUser = pathName.pathname === '/dashboard/profile';
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        {/* <FaBars size={30} className="  text-white " /> */}
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-circle swap swap-rotate "
        >
          <input type="checkbox" />
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="  m-1 text-accent cursor-pointer">
              <span className="text-xl font-serif ">{user?.displayName} </span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <Link to={'/dashboard/profile'}>
                <li>
                  <a>Profile</a>
                </li>
              </Link>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DasboardBar;
