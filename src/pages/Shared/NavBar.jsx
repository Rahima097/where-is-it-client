import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router';
import { useAuth } from '../../contexts/AuthContext/AuthProvider';
import logo from '../../assets/Img/whereisit_logo.png';
import {
  Home,
  Search,
  PlusSquare,
  ShieldCheck,
  List,
  LogIn,
  LogOut,
  Info,
  BookText,
  Mail,
  Menu,
  X
} from 'lucide-react';

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const mobileMenuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
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

  const mobileLinks = (
    <>
      {/* Close Icon */}
      <div className="flex justify-end mb-2">
        <button onClick={() => setMobileMenuOpen(false)} className="text-primary">
          <X size={20} />
        </button>
      </div>

      {/* Public Links */}
      <li>
        <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex items-center gap-2">
            <Home size={18} /> Home
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/allItems" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex items-center gap-2">
            <Search size={18} /> Lost & Found Items
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/about-us" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex items-center gap-2">
            <Info size={18} /> About Us
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/faq" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex items-center gap-2">
            <BookText size={18} /> FAQ
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact-us" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex items-center gap-2">
            <Mail size={18} /> Contact Us
          </div>
        </NavLink>
      </li>

      {/* Private Links (only if logged in) */}
      {user && (
        <>
          <li>
            <NavLink to="/addItems" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center gap-2">
                <PlusSquare size={18} /> Add Lost & Found
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/allRecovered" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} /> All Recovered Items
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/myItems" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center gap-2">
                <List size={18} /> Manage My Items
              </div>
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Sticky Top Navbar */}
      <div className="bg-secondary sticky top-0 z-50">
        <div className="navbar w-11/12 shadow-md p-4 mx-auto">
          <div className="navbar-start flex items-center gap-2">
            {/* Mobile Hamburger */}
            <div className="lg:hidden relative" ref={mobileMenuRef}>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white border border-white p-1 rounded-xl">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              {mobileMenuOpen && (
                <ul className="absolute mt-3 left-0 bg-white text-black p-3 rounded-md shadow-md z-50 w-64">
                  {mobileLinks}
                </ul>
              )}
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
              <img src={logo} alt="Logo" className="w-8 h-8" />
              <span className="hidden sm:inline">WhereIsIt</span>
            </Link>
          </div>

          {/* Desktop Center Public Links */}
          <div className="navbar-center hidden md:hidden lg:flex">
            <ul className="menu text-white menu-horizontal px-1 gap-2 lg:gap-4">
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
                  <div className="flex items-center gap-2">
                    <Home size={18} />
                    <span className="hidden sm:inline">Home</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/allItems" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
                  <div className="flex items-center gap-2">
                    <Search size={18} />
                    <span className="hidden sm:inline">Lost & Found Items</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
                  <div className="flex items-center gap-2">
                    <Info size={18} />
                    <span className="hidden sm:inline">About Us</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
                  <div className="flex items-center gap-2">
                    <BookText size={18} />
                    <span className="hidden sm:inline">FAQ</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact-us" className={({ isActive }) => (isActive ? 'text-primary' : undefined)}>
                  <div className="flex items-center gap-2">
                    <Mail size={18} />
                    <span className="hidden sm:inline">Contact Us</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* User section */}
          <div className="navbar-end flex items-center gap-4">
            {!user ? (
              <Link to="/login" className="btn btn-sm btn-primary flex items-center gap-2">
                <LogIn size={16} />
                <span className=" sm:inline">Login</span>
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
                    <ul className="absolute right-0 mt-2 hidden lg:block md:block sm:block lg:w-56 w-48 text-sm lg:text-base bg-white rounded-md shadow-lg text-black p-2 z-50">
                      <li>
                        <NavLink to="/addItems" onClick={() => setDropdownOpen(false)}>
                          <div className="flex items-center gap-2">
                            <PlusSquare size={18} /> Add Lost & Found
                          </div>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/allRecovered" onClick={() => setDropdownOpen(false)}>
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={18} /> All Recovered Items
                          </div>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/myItems" onClick={() => setDropdownOpen(false)}>
                          <div className="flex items-center gap-2">
                            <List size={18} /> Manage My Items
                          </div>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </div>

                <button onClick={handleLogout} className="btn btn-sm btn-primary text-white flex items-center gap-2">
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
