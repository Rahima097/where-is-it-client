import React from 'react';
import {
    createBrowserRouter,
} from "react-router";
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import LogIn from '../pages/LogIn/LogIn';
import ErrorPage from '../pages/ErrorPage/ErrorPage';


const router = createBrowserRouter([
  {
    path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: LogIn
            },
            
        
        ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);

export default router;