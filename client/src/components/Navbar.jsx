import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { syncUserToBackend } from '../lib/api'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user, isLoaded } = useUser();
    const { openSignIn } = useClerk();
    const navigate = useNavigate();

    // Sync user to backend when user logs in (only once per session)
    useEffect(() => {
        const syncUser = async () => {
            if (isLoaded && user) {
                // Check if this user has already been synced in this session
                const syncedUsers = JSON.parse(sessionStorage.getItem('syncedUsers') || '[]');
                
                if (!syncedUsers.includes(user.id)) {
                    try {
                        await syncUserToBackend(user);
                        // Mark user as synced in this session
                        syncedUsers.push(user.id);
                        sessionStorage.setItem('syncedUsers', JSON.stringify(syncedUsers));
                    } catch (error) {
                        console.error('Failed to sync user:', error);
                    }
                }
            }
        };

        syncUser();
    }, [user, isLoaded]);

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 z-50 bg-black/70 backdrop-blur md:bg-transparent">
            {/* Logo */}
            <Link to="/" className="max-md:flex-1">
                <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 md:px-8 py-3 md:rounded-full bg-white/10 md:border border-gray-300/20 backdrop-blur">
                <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
                <Link to="/movies" className="hover:text-blue-400 transition-colors">Movies</Link>
                <Link to="/" className="hover:text-blue-400 transition-colors">Theaters</Link>
                <Link to="/" className="hover:text-blue-400 transition-colors">Releases</Link>
                <Link to="/favorite" className="hover:text-blue-400 transition-colors">Favorites</Link>
                <Link to="/my-bookings" className="hover:text-blue-400 transition-colors">My Bookings</Link>
            </div>

            {/* Right Side (Search + Login + Hamburger) */}
            <div className="flex items-center gap-8">
                <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />

                {!user ? (
                    <button
                        onClick={() => openSignIn()}
                        className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
                    >
                        Login
                    </button>
                ) : (
                    <UserButton/>
                )}

                {/* Hamburger Icon (mobile only) */}
                <MenuIcon
                    className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer text-white"
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
                    <Link
                        to="/"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setIsOpen(false);
                        }}
                        className="hover:text-blue-400 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        to="/movies"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setIsOpen(false);
                        }}
                        className="hover:text-blue-400 transition-colors"
                    >
                        Movies
                    </Link>
                    <Link
                        to="/"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setIsOpen(false);
                        }}
                        className="hover:text-blue-400 transition-colors"
                    >
                        Theaters
                    </Link>
                    <Link
                        to="/"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setIsOpen(false);
                        }}
                        className="hover:text-blue-400 transition-colors"
                    >
                        Releases
                    </Link>
                    <Link
                        to="/favorite"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setIsOpen(false);
                        }}
                        className="hover:text-blue-400 transition-colors"
                    >
                        Favorites
                    </Link>
                    <Link
                        to="/my-bookings"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setIsOpen(false);
                        }}
                        className="hover:text-blue-400 transition-colors"
                    >
                        My Bookings
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Navbar