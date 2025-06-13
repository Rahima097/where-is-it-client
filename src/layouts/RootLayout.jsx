import React from 'react';
import NavBar from '../pages/Shared/NavBar';
import Footer from '../pages/Shared/Footer';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='text-right'>
                <ToastContainer></ToastContainer>
            </div>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;