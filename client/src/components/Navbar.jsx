import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import { authService } from '../services/authService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Authentication
  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 z-50 bg-black/70 backdrop-blur md:bg-transparent">
      {/* Logo */}
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-8 md:px-8 py-3 md:rounded-full bg-white/10 md:border border-gray-300/20 backdrop-blur">
        <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
        <Link to="/movies" className="hover:text-blue-400 transition-colors">Movies</Link>
        <Link to="/" className="hover:text-blue-400 transition-colors">Theaters</Link>
        <Link to="/" className="hover:text-blue-400 transition-colors">Releases</Link>
        <Link to="/favorite" className="hover:text-blue-400 transition-colors">Favorites</Link>
        <Link to="/my-bookings" className="hover:text-blue-400 transition-colors">My Bookings</Link>
      </div>

      {/* Auth Section (Separate on Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-white">Welcome, {user.name}!</span>
            <Link to="/profile" className="text-gray-300 hover:text-primary transition">Profile</Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>

      {/* Right Side (Search + Hamburger) */}
      <div className="flex items-center gap-8 md:hidden">
        <SearchIcon className="w-6 h-6 cursor-pointer" />
        <MenuIcon
          className="w-8 h-8 cursor-pointer text-white"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Mobile Menu (overlay) */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center gap-8 bg-black/90 text-white text-lg font-medium z-50">
          {/* Close Button */}
          <XIcon
            className="absolute top-6 right-6 w-6 h-6 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile Links */}
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/movies" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition-colors">Movies</Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition-colors">Theaters</Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition-colors">Releases</Link>
          <Link to="/favorite" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition-colors">Favorites</Link>
          <Link to="/my-bookings" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition-colors">My Bookings</Link>

          {/* Auth Section (Mobile) */}
          {isAuthenticated ? (
            <>
              <span className="text-white">Welcome, {user.name}!</span>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-primary transition">Profile</Link>
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 bg-primary hover:bg-primary-dull rounded-full font-medium transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
