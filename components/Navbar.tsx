// Keep your current Navbar component, but add a height utility class to ensure consistent spacing
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  RiHome5Line, RiHome5Fill,
  RiBook2Line, RiBook2Fill, 
  RiFileList3Line, RiFileList3Fill,
  RiQuillPenLine, RiQuillPenFill,
  RiLogoutCircleRLine,
  RiLoginCircleLine,
  RiUserAddLine,
  RiMenuLine, RiCloseLine,
  RiSearchLine,
  RiUserLine, 
  RiNotification3Line,
  RiArrowDownSLine
} from 'react-icons/ri';

// Define navbar height constants for consistent spacing
const NAVBAR_HEIGHT_DESKTOP = '64px'; // Adjust based on your navbar height
const NAVBAR_HEIGHT_MOBILE = '64px';  // Adjust based on your mobile navbar height

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

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

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    setHasToken(false);
    setIsMenuOpen(false);
    setShowUserMenu(false);
  };

  // Default close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        setShowUserMenu(false);
      }
    };
    
    // Only add listener if menu is open
    if (showUserMenu) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0f111a]/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-[#0f111a] py-3'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">B</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300">
                  Blog App
                </span>
                <span className="text-xs text-gray-400 -mt-1">Share your story</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex relative mx-4 flex-1 max-w-xl">
              <div className={`flex items-center w-full bg-[#1a1d2d]/70 rounded-full overflow-hidden transition-all duration-300 
                ${searchActive ? 'ring-2 ring-indigo-500/30' : 'ring-0'}`}>
                <div className="pl-4 pr-2">
                  <RiSearchLine className="text-gray-400" size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="bg-transparent py-2 px-2 text-sm text-white w-full focus:outline-none"
                  onFocus={() => setSearchActive(true)}
                  onBlur={() => setSearchActive(false)}
                />
              </div>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center">
              <button 
                className="p-2 rounded-full hover:bg-[#1a1d2d]/80 transition"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? 
                  <RiCloseLine size={24} className="text-white" /> : 
                  <RiMenuLine size={24} className="text-white" />
                }
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/" active={isActive('/')}>
                {isActive('/') ? <RiHome5Fill size={18} /> : <RiHome5Line size={18} />}
                <span>Home</span>
              </NavLink>

              <NavLink href="/blogs" active={isActive('/blogs')}>
                {isActive('/blogs') ? <RiBook2Fill size={18} /> : <RiBook2Line size={18} />}
                <span>Blogs</span>
              </NavLink>

              {hasToken && (
                <>
                  <NavLink href="/blogs/my-blogs" active={isActive('/blogs/my-blogs')}>
                    {isActive('/blogs/my-blogs') ? <RiFileList3Fill size={18} /> : <RiFileList3Line size={18} />}
                    <span>My Blogs</span>
                  </NavLink>

                  <NavLink href="/blogs/new" active={isActive('/blogs/new')}>
                    {isActive('/blogs/new') ? <RiQuillPenFill size={18} /> : <RiQuillPenLine size={18} />}
                    <span>Write</span>
                  </NavLink>

                  {/* Notification Bell */}
                  <button className="p-2 rounded-full hover:bg-[#1a1d2d]/80 transition relative text-gray-300 hover:text-white">
                    <RiNotification3Line size={20} />
                    <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
                  </button>
                  
                  {/* User Menu */}
                  <div className="relative ml-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUserMenu(!showUserMenu);
                      }}
                      className="flex items-center gap-2 py-1 px-2 rounded-full hover:bg-[#1a1d2d]/80 transition"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-medium text-sm">
                        {user?.username?.charAt(0).toUpperCase() || "A"}
                      </div>
                      <RiArrowDownSLine size={16} className={`text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown menu */}
                    {showUserMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 py-2 bg-[#171923] rounded-lg shadow-xl border border-gray-800 z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-4 py-2 border-b border-gray-800">
                          <p className="text-sm font-medium text-white">{user?.username || "abhisheksols"}</p>
                          <p className="text-xs text-gray-400 truncate">user@example.com</p>
                        </div>
                        
                        <Link href="/profile" className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800/60">
                          <RiUserLine size={14} />
                          <span>Profile</span>
                        </Link>
                        
                        <Link href="/settings" className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800/60">
                          <RiUserLine size={14} />
                          <span>Settings</span>
                        </Link>
                        
                        <div className="border-t border-gray-800 my-1"></div>
                        
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800/60"
                        >
                          <RiLogoutCircleRLine size={14} />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </div>
                </>
              )}

              {/* Auth buttons for logged out users */}
              {!hasToken && (
                <div className="flex items-center gap-2">
                  <Link 
                    href="/login"
                    className="py-1.5 px-4 text-sm rounded-full text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <RiLoginCircleLine size={18} />
                    <span>Login</span>
                  </Link>
                  
                  <Link 
                    href="/register"
                    className="py-1.5 px-4 text-sm font-medium rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white transition-all duration-200 shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
                  >
                    <RiUserAddLine size={18} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div 
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden bg-[#0f111a]/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-2">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <div className="flex items-center w-full bg-[#1a1d2d]/70 rounded-full overflow-hidden">
                <div className="pl-4 pr-2">
                  <RiSearchLine className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="bg-transparent py-2 px-2 text-sm text-white w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-1 pb-4">
              <MobileNavLink href="/" active={isActive('/')} onClick={() => setIsMenuOpen(false)}>
                {isActive('/') ? <RiHome5Fill size={20} /> : <RiHome5Line size={20} />}
                <span>Home</span>
              </MobileNavLink>

              <MobileNavLink href="/blogs" active={isActive('/blogs')} onClick={() => setIsMenuOpen(false)}>
                {isActive('/blogs') ? <RiBook2Fill size={20} /> : <RiBook2Line size={20} />}
                <span>Explore Blogs</span>
              </MobileNavLink>

              {hasToken && (
                <>
                  <MobileNavLink href="/blogs/my-blogs" active={isActive('/blogs/my-blogs')} onClick={() => setIsMenuOpen(false)}>
                    {isActive('/blogs/my-blogs') ? <RiFileList3Fill size={20} /> : <RiFileList3Line size={20} />}
                    <span>My Blogs</span>
                  </MobileNavLink>

                  <MobileNavLink href="/blogs/new" active={isActive('/blogs/new')} onClick={() => setIsMenuOpen(false)}>
                    {isActive('/blogs/new') ? <RiQuillPenFill size={20} /> : <RiQuillPenLine size={20} />}
                    <span>Write New Blog</span>
                  </MobileNavLink>
                  
                  <div className="mt-2 pt-2 border-t border-gray-800">
                    <div className="px-3 py-2 rounded-lg bg-[#1a1d2d]/50 flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-medium">
                        {user?.username?.charAt(0).toUpperCase() || "A"}
                      </div>
                      <div>
                        <div className="text-white font-medium">{user?.username || "abhisheksols"}</div>
                        <div className="text-xs text-gray-400">View profile</div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                    >
                      <RiLogoutCircleRLine size={18} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </>
              )}

              {!hasToken && (
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-gray-800">
                  <Link 
                    href="/login" 
                    className="w-full py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 bg-[#1a1d2d] text-white hover:bg-[#1f2235] transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <RiLoginCircleLine size={18} />
                    <span className="font-medium">Login</span>
                  </Link>
                  
                  <Link 
                    href="/register"
                    className="w-full py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <RiUserAddLine size={18} />
                    <span className="font-medium">Create Account</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </header>

      {/* Spacer div to prevent content from being hidden under navbar */}
      <div 
        className="w-full"
        style={{ height: isMenuOpen ? 'auto' : NAVBAR_HEIGHT_DESKTOP }}
        aria-hidden="true"
      />
    </>
  );
};

// Desktop Navigation Link
const NavLink: React.FC<{
  href: string;
  active: boolean;
  children: React.ReactNode;
}> = ({ href, active, children }) => {
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all duration-200
        ${active 
          ? 'text-white bg-[#1a1d2d]/70' 
          : 'text-gray-300 hover:text-white hover:bg-[#1a1d2d]/50'
        }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink: React.FC<{
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ href, active, onClick, children }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition
        ${active 
          ? 'bg-[#1a1d2d]/80 text-white font-medium' 
          : 'text-gray-300 hover:bg-[#1a1d2d]/50 hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;