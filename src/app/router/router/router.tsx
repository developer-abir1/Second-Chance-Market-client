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
import MyProducts from '../../pages/dashboard/myProducts/MyProducts';
import PrivetRoute from '../privetRoute/PrivetRoute';
import AdminRoute from '../AdminRoute/AdminRoute';
import AdminDashboard from '../../pages/dashboard/adminDashboard/AdminDashboard';

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
            `  https://reseller-products-server.vercel.app/product/${params.prodId}`,
            {}
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
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: 'add-products',
        element: (
          <PrivetRoute>
            {' '}
            <AddProducts />
          </PrivetRoute>
        ),
      },
      {
        path: 'manage-products',
        element: (
          <AdminRoute>
            {' '}
            <ManageProducts />
          </AdminRoute>
        ),
      },
      {
        path: 'admin-dashboard',
        element: (
          <AdminRoute>
            {' '}
            <AdminDashboard />
          </AdminRoute>
        ),
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
