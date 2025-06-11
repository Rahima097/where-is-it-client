import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useAuth } from '../../contexts/AuthContext/AuthProvider';

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allItems" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
          Lost & Found
        </NavLink>
      </li>
    </>
  );

  const privateDropdownLinks = (
    <>
      <li>
        <NavLink to="/addItems" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
          Add Item
        </NavLink>
      </li>
      <li>
        <NavLink to="/allRecovered" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
          Recovered Items
        </NavLink>
      </li>
      <li>
        <NavLink to="/myItems" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
          Manage My Items
        </NavLink>
      </li>
    </>
  );

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="bg-secondary">
      <div className="navbar w-11/12 shadow-md p-4 mx-auto">
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold text-white">
            WhereIsIt
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu text-white menu-horizontal px-1 gap-4">{publicLinks}</ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          {!user && (
            <Link to="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
          )}

          {user && (
            <>
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <img
                  src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                  alt={user.displayName || 'User'}
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                  title={user.displayName || 'User'}
                />
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-black p-2 z-50">
                    {privateDropdownLinks}
                  </ul>
                )}
              </div>

              <button onClick={handleLogout} className="btn btn-sm btn-error text-white">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
