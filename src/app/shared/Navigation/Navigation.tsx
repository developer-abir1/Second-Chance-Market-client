import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import images from '../../utils/image';

const Navigation = () => {
  const { user, handleSignOut } = useContext(AuthContext);

  const handleLogout = async () => {
    handleSignOut()
      .then(() => {})
      .catch((error: any) => {
        console.log('error', error.message);
      });
  };
  return (
    <div className="navbar   ">
      <div className="container m-auto">
        <div className="flex-1">
          <Link to={'/'} className="   ">
            <img src={images.logo} className="w-20   " alt="" />
          </Link>
        </div>
        <div className="flex-none hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>

            <Link to={'/dashboard'}>
              <li>
                <a>Dashboard</a>
              </li>
            </Link>
            {user?.email ? (
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            ) : (
              <>
                <Link to="/login">
                  <li>
                    <a>Login</a>
                  </li>
                </Link>
              </>
            )}
            {user?.email && (
              <li>
                <a>
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex={0} className="   text-xl font-bold m-1">
                      {user?.displayName}
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a>Profile</a>
                      </li>
                    </ul>
                  </div>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
