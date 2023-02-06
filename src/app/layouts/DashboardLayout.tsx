import { Link, Outlet } from 'react-router-dom';
import DasboardBar from '../shared/DasboardBar/DasboardBar';
import images from '../utils/image';

const DashboardLayout = () => {
  return (
    <>
      <div className="drawer">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content bg-[#F1F5F9]">
          <DasboardBar />
          <Outlet />
        </div>

        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <Link to={'/'} className="   ">
              <img src={images.logo} className="w-20   " alt="" />
            </Link>
            <Link to={'/dashboard'}>
              <li>
                <a>Dashboard</a>
              </li>
            </Link>

            <Link to={'/dashboard/manage-user'}>
              <li>
                <a>Manage User</a>
              </li>
            </Link>
            <Link to={'/dashboard/my-booking'}>
              <li>
                <a>My Booking</a>
              </li>
            </Link>
            <Link to={'/dashboard/add-products'}>
              <li>
                <a>Add Products</a>
              </li>
            </Link>
            <Link to={'/dashboard/manage-products'}>
              <li>
                <a>Manage Products</a>
              </li>
            </Link>
            <Link to={'/dashboard/cheeked-booked'}>
              <li>
                <a>Cheeked Booking</a>
              </li>
            </Link>
            <Link to={'/dashboard/myProducts'}>
              <li>
                <a>My Products</a>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
