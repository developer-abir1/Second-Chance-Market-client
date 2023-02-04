import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import MainLayout from '../../layouts/MainLayout';
import Login from '../../pages/authentication/login/Login';
import Registration from '../../pages/authentication/registration/Registration';
import Dashboard from '../../pages/dashboard/dashboard/Dashboard';
import Home from '../../pages/home/home/Home';
import ElementErrorPages from '../../shared/elementErrorPages/ElementErrorPages';
import ManageUser from '../../pages/dashboard/manage-user/ManageUser';
import AddProducts from '../../pages/dashboard/addProduct/AddProducts';
import ManageProducts from '../../pages/dashboard/manageProducts/ManageProducts';
import Profile from '../../pages/dashboard/profile/Profile';
import ProductDetails from '../../pages/productDetails/ProductDetails';
import MyBooking from '../../pages/dashboard/myBooking/MyBooking';
import CheekedBooked from '../../pages/dashboard/CheekedBooked/CheekedBooked';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ElementErrorPages />,
    children: [
      { path: '/', element: <Home /> },

      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
      {
        path: 'productDetails/:prodId',
        element: <ProductDetails />,
        loader: async ({ params }) => {
          const res = await fetch(
            `http://localhost:5000/products/${params.prodId}`
          );
          const data = await res.json();
          return data;
        },
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: 'manage-user',
        element: <ManageUser />,
      },
      {
        path: 'add-products',
        element: <AddProducts />,
      },
      {
        path: 'manage-products',
        element: <ManageProducts />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'my-booking',
        element: <MyBooking />,
      },

      {
        path: 'cheeked-booked',
        element: <CheekedBooked />,
      },
    ],
  },
]);

export default router;
