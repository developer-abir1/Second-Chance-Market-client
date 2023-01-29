import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import images from '../../utils/image';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout().then(() => {});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar   ">
      <div className="container m-auto">
        <div className="flex-1">
          <Link to={'/'} className="   ">
            <img src={images.logo} className="w-20   " alt="" />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
            <li tabIndex={0}>
              <a>
                Catagory
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>Palser</a>
                </li>
                <li>
                  <a>Discover</a>
                </li>
                <li>
                  <a>Hero</a>
                </li>
              </ul>
            </li>
            {user?.email ? (
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {user?.email && (
              <li>
                <a>{user?.email}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
