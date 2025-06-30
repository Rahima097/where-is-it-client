import React from 'react';
import NavBar from '../pages/Shared/NavBar';
import Footer from '../pages/Shared/Footer';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="text-right">
        <ToastContainer />
      </div>

      {/* Main content with min-height */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
