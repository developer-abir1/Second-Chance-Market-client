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
  console.log(user, 'user');
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={'/'} className="  normal-case text-xl">
          <img src={images.logo} className=" object-contain h-20" alt="" />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu text-xl menu-horizontal menu-compact px-1 ">
          <li>
            <a className="text-lg">Home</a>
          </li>

          <li>
            <a className="text-lg">Blogs</a>
          </li>
          {!user?.email && (
            <li>
              <Link to="login" className="text-lg">
                Login
              </Link>
            </li>
          )}
          {user?.email && (
            <>
              <li>
                <Link to={'/dashboard'} className="text-lg">
                  Dashboard
                </Link>
              </li>
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
                          <a className="justify-between">
                            {' '}
                            {user?.displayName}
                          </a>
                        </li>
                      </Link>
                      <li>
                        <a>Settings</a>
                      </li>
                      <li onClick={handleLogout}>
                        <a>Logout</a>
                      </li>
                    </ul>
                  </div>
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
