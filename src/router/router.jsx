import React from 'react';
import {
    createBrowserRouter,
} from "react-router";
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import LogIn from '../pages/LogIn/LogIn';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import AllItems from '../pages/AllItems/AllItems';
import PrivateRoute from '../routes/PrivateRoute';
import AddItem from '../pages/AddItem/AddItem';
import ItemDetails from '../pages/ItemDetails/ItemDetails';
import MyItems from '../pages/MyItems/MyItems';
import UpdateItem from '../pages/UpdateItem/UpdateItem';
import AllRecovered from '../pages/AllRecovered/AllRecovered';
import AboutUs from '../pages/AboutUs/AboutUs';
import Faq from '../pages/Shared/Faq';
import ContactUs from '../pages/ContactUs/ContactUs';


const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'login',
                element: <LogIn></LogIn>
            },
            {
                path: 'allItems',
                element: <AllItems></AllItems>
            },
            {
                path: 'about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: 'faq',
                element: <Faq></Faq>
            },
            {
                path: 'contact-us',
                element: <ContactUs></ContactUs>
            },
            {
                path: 'addItems',
                element: <PrivateRoute><AddItem></AddItem></PrivateRoute>
            },
            {
                path: 'items/:id',
                element: <PrivateRoute><ItemDetails></ItemDetails></PrivateRoute>
            },
            {
                path: 'myItems',
                element: <PrivateRoute><MyItems></MyItems></PrivateRoute>
            },
            {
                path: 'updateItems/:id',
                element: <PrivateRoute><UpdateItem></UpdateItem></PrivateRoute>
            },
            {
                path: 'allRecovered',
                element: <PrivateRoute><AllRecovered></AllRecovered></PrivateRoute>
            },

        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
]);

export default router;