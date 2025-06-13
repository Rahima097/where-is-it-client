import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router';
import { useAuth } from '../../contexts/AuthContext/AuthProvider';
import {
  Home,
  Search,
  PlusSquare,
  ShieldCheck,
  List,
  LogIn,
  LogOut,
} from 'lucide-react'; 

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
          <div className="flex items-center gap-2">
            <Home size={18} /> Home
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/allItems" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
          <div className="flex items-center gap-2">
            <Search size={18} /> Lost & Found
          </div>
        </NavLink>
      </li>
    </>
  );

  const privateDropdownLinks = (
    <>
      <li>
        <NavLink to="/addItems" onClick={() => setDropdownOpen(false)} className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
          <div className="flex items-center gap-2">
            <PlusSquare size={18} /> Add Item
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/allRecovered" onClick={() => setDropdownOpen(false)} className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} /> Recovered Items
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/myItems" onClick={() => setDropdownOpen(false)} className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
          <div className="flex items-center gap-2">
            <List size={18} /> Manage My Items
          </div>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-secondary">
      <div className="navbar w-11/12 shadow-md p-4 mx-auto">
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold text-white">
            WhereIsIt
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu text-white menu-horizontal px-1 gap-4">
            {publicLinks}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          {!user ? (
            <Link to="/login" className="btn btn-sm btn-primary flex items-center gap-2">
              <LogIn size={16} /> Login
            </Link>
          ) : (
            <>
              <div className="relative" ref={dropdownRef}>
                <img
                  src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                  alt={user.displayName || 'User'}
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                  title={user.displayName || 'User'}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-black p-2 z-50">
                    {privateDropdownLinks}
                  </ul>
                )}
              </div>

              <button onClick={handleLogout} className="btn btn-sm btn-primary text-white flex items-center gap-2">
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
