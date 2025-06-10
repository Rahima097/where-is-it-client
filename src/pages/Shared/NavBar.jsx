import React from 'react';
import { Link, NavLink } from "react-router";

const NavBar = () => {
    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/allItems">Lost & Found</NavLink></li>
            <li><NavLink to="/addItems">Add Item</NavLink></li>
            <li><NavLink to="/allRecovered">Recovered Items</NavLink></li>
            <li><NavLink to="/myItems">Manage My Items</NavLink></li>
        </>
    );

    return (
        <div className='bg-secondary'>
            <div className="navbar w-11/12 shadow-md p-4 mx-auto ">
                <div className="navbar-start">
                    
                    <Link to="/" className="text-2xl font-bold text-white">WhereIsIt</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu text-white menu-horizontal px-1 gap-4">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end flex flex-row gap-2">
                    <button className="btn btn-sm bg-secondary text-white">Logout</button>
                    <Link to="/login" className="btn btn-sm btn-primary">Login</Link>

                </div>
            </div>
        </div>
    );
};

export default NavBar;