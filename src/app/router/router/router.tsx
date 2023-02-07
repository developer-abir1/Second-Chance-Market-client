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
import MyProducts from '../../pages/dashboard/myProducts/MyProducts';
import PrivetRoute from '../privetRoute/PrivetRoute';

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
        element: (
          <PrivetRoute>
            <ProductDetails />
          </PrivetRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            ` http://localhost:5000/product/${params.prodId}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            }
          );
          const data = await res.json();
          return data;
        },
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <PrivetRoute>
            {' '}
            <Dashboard />
          </PrivetRoute>
        ),
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
        element: (
          <PrivetRoute>
            <Profile />
          </PrivetRoute>
        ),
      },
      {
        path: 'my-booking',
        element: (
          <PrivetRoute>
            {' '}
            <MyBooking />
          </PrivetRoute>
        ),
      },

      {
        path: 'cheeked-booked',
        element: <CheekedBooked />,
      },
      {
        path: 'myProducts',
        element: (
          <PrivetRoute>
            <MyProducts />
          </PrivetRoute>
        ),
      },
    ],
  },
]);

export default router;
