import React, { useContext } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import images from '../../utils/image';

const Navigation = () => {
  const { user, handleSignOut } = useContext(AuthContext);

  const handleLogout = async () => {
    handleSignOut()
      .then(() => {})
      .catch((error: any) => {});
  };

  const itamsList = (
    <>
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
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
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
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="  container   m-auto    justify-between   ">
        <div className="  navbar-start">
          <Link to={'/'} className="  normal-case text-xl">
            <img src={images.logo} className=" object-contain h-20" alt="" />
          </Link>
        </div>
        <div className="flex-none hidden  md:flex navbar-end ">
          <ul className="menu text-xl menu-horizontal menu-compact px-1 ">
            {itamsList}
          </ul>
        </div>
        <div className="   navbar-end    md:hidden      flex    ">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1   btn-ghost">
              <HiMenuAlt3 className="text-2xl" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {itamsList}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
