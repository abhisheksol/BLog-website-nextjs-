'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { usePathname } from 'next/navigation';
import {
  FiHome, FiBookOpen, FiList, FiPlusCircle,
  FiLogOut, FiLogIn, FiUserPlus, FiMenu, FiX
} from 'react-icons/fi';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setHasToken(!!token);
    };

    checkToken();
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  const isActive = (path: string) => pathname === path ? 'text-blue-400 font-medium' : 'text-white';

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    setHasToken(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg py-2' : 'bg-gradient-to-r from-gray-900 to-gray-800 py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Blog App
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={24} className="text-white" /> : <FiMenu size={24} className="text-white" />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200 ${isActive('/')}`}>
            <FiHome className="text-blue-400" />
            <span>Home</span>
          </Link>

          <Link href="/blogs" className={`flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200 ${isActive('/blogs')}`}>
            <FiBookOpen className="text-blue-400" />
            <span>Blogs</span>
          </Link>

          {hasToken && (
            <>
              <Link href="/blogs/my-blogs" className={`flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200 ${isActive('/blogs/my-blogs')}`}>
                <FiList className="text-blue-400" />
                <span>My Blogs</span>
              </Link>

              <Link href="/blogs/new" className={`flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200 ${isActive('/blogs/new')}`}>
                <FiPlusCircle className="text-blue-400" />
                <span>New Blog</span>
              </Link>
            </>
          )}

          {hasToken ? (
            <>
              <button onClick={handleLogout} className="flex items-center space-x-1 bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-1.5 rounded-full">
                <FiLogOut />
                <span>Logout</span>
              </button>
              <div className="flex items-center px-3 py-1 bg-gray-700 rounded-full">
                <span className="text-sm text-gray-300">{user?.username}</span>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="flex items-center space-x-1 text-white hover:text-blue-400">
                <FiLogIn className="text-blue-400" />
                <span>Login</span>
              </Link>

              <Link href="/register" className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1.5 rounded-full">
                <FiUserPlus />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 py-4 px-4 flex flex-col space-y-4">
            <Link href="/" className={`flex items-center space-x-2 p-2 rounded-lg ${isActive('/') || 'hover:bg-gray-800'}`} onClick={() => setIsMenuOpen(false)}>
              <FiHome className="text-blue-400" />
              <span>Home</span>
            </Link>

            <Link href="/blogs" className={`flex items-center space-x-2 p-2 rounded-lg ${isActive('/blogs') || 'hover:bg-gray-800'}`} onClick={() => setIsMenuOpen(false)}>
              <FiBookOpen className="text-blue-400" />
              <span>Blogs</span>
            </Link>

            {hasToken && (
              <>
                <Link href="/blogs/my-blogs" className={`flex items-center space-x-2 p-2 rounded-lg ${isActive('/blogs/my-blogs') || 'hover:bg-gray-800'}`} onClick={() => setIsMenuOpen(false)}>
                  <FiList className="text-blue-400" />
                  <span>My Blogs</span>
                </Link>

                <Link href="/blogs/new" className={`flex items-center space-x-2 p-2 rounded-lg ${isActive('/blogs/new') || 'hover:bg-gray-800'}`} onClick={() => setIsMenuOpen(false)}>
                  <FiPlusCircle className="text-blue-400" />
                  <span>New Blog</span>
                </Link>
              </>
            )}

            {hasToken ? (
              <>
                <div className="px-2 py-1 rounded-lg bg-gray-800 text-sm">
                  <span className="text-gray-300">Signed in as: </span>
                  <span className="font-medium text-white">{user?.username}</span>
                </div>
                <button onClick={handleLogout} className="flex items-center space-x-1 bg-red-600 text-white p-2 rounded-lg">
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={`flex items-center space-x-2 p-2 rounded-lg ${isActive('/login') || 'hover:bg-gray-800'}`} onClick={() => setIsMenuOpen(false)}>
                  <FiLogIn className="text-blue-400" />
                  <span>Login</span>
                </Link>

                <Link href="/register" className="flex items-center justify-center space-x-1 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                  <FiUserPlus />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
