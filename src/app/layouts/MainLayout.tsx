import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/footer/Footer';
import Navigation from '../shared/Navigation/Navigation';

const MainLayout = () => {
  return (
    <div className="flex flex-col justify-between  min-h-screen     ">
      <Navigation />

      <Outlet />
    </div>
  );
};

export default MainLayout;
