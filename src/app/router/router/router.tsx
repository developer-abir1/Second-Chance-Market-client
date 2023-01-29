import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Login from '../../pages/authentication/login/Login';
import Registration from '../../pages/authentication/registration/Registration';
import Home from '../../pages/home/home/Home';
import ElementErrorPages from '../../shared/elementErrorPages/ElementErrorPages';

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
    ],
  },
]);

export default router;
