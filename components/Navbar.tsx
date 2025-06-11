// Keep your current Navbar component, but add a height utility class to ensure consistent spacing
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  RiLogoutCircleRLine,
  RiMenuLine, RiCloseLine,
  RiUserLine, 
  RiArrowDownSLine
} from 'react-icons/ri';

// Define navbar height constants for consistent spacing
const NAVBAR_HEIGHT_DESKTOP = '64px'; // Adjust based on your navbar height
const NAVBAR_HEIGHT_MOBILE = '64px';  // Adjust based on your mobile navbar height

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

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
      <header className="fixed w-full z-50 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink href="/" active={isActive('/')}>
                Home
              </NavLink>
              <NavLink href="/blogs" active={isActive('/blogs')}>
                Blogs
              </NavLink>
              {hasToken && (
                <>
                  <NavLink href="/blogs/my-blogs" active={isActive('/blogs/my-blogs')}>
                    My Blogs
                  </NavLink>
                  <NavLink href="/blogs/new" active={isActive('/blogs/new')}>
                    Write
                  </NavLink>
                </>
              )}
              <NavLink href="/freelance" active={isActive('/freelance')}>
                Freelance
              </NavLink>
            </nav>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center">
              <button 
                className="p-2 rounded-lg hover:bg-gray-700 transition"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? 
                  <RiCloseLine size={24} className="text-white" /> : 
                  <RiMenuLine size={24} className="text-white" />
                }
              </button>
            </div>

            {/* Auth buttons - Right side */}
            <div className="hidden md:flex items-center space-x-3">
              {hasToken ? (
                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(!showUserMenu);
                    }}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-700 transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
                      {user?.username?.charAt(0).toUpperCase() || "A"}
                    </div>
                    <RiArrowDownSLine size={16} className={`text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 py-2 bg-[#1e293b] rounded-lg shadow-xl border border-gray-600 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 py-2 border-b border-gray-600">
                        <p className="text-sm font-medium text-white">{user?.username || "User"}</p>
                        <p className="text-xs text-gray-400 truncate">user@example.com</p>
                      </div>
                      
                      <Link href="/profile" className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">
                        <RiUserLine size={14} />
                        <span>Profile</span>
                      </Link>
                      
                      <div className="border-t border-gray-600 my-1"></div>
                      
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                      >
                        <RiLogoutCircleRLine size={14} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <>
                  <Link 
                    href="/login"
                    className="px-4 py-2 text-sm text-white hover:text-gray-300 transition-colors"
                  >
                    Login
                  </Link>
                  
                  <Link 
                    href="/register"
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div 
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden bg-black/20 backdrop-blur-sm border-t border-white/10"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-3">
              <MobileNavLink href="/" active={isActive('/')} onClick={() => setIsMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/blogs" active={isActive('/blogs')} onClick={() => setIsMenuOpen(false)}>
                Blogs
              </MobileNavLink>
              {hasToken && (
                <>
                  <MobileNavLink href="/blogs/my-blogs" active={isActive('/blogs/my-blogs')} onClick={() => setIsMenuOpen(false)}>
                    My Blogs
                  </MobileNavLink>
                  <MobileNavLink href="/blogs/write" active={isActive('/blogs/write')} onClick={() => setIsMenuOpen(false)}>
                    Write
                  </MobileNavLink>
                </>
              )}
              <MobileNavLink href="/freelance" active={isActive('/freelance')} onClick={() => setIsMenuOpen(false)}>
                Freelance
              </MobileNavLink>

              {hasToken ? (
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <div className="px-3 py-2 rounded-lg bg-gray-700 flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                      {user?.username?.charAt(0).toUpperCase() || "A"}
                    </div>
                    <div>
                      <div className="text-white font-medium">{user?.username || "User"}</div>
                      <div className="text-xs text-gray-400">View profile</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    <RiLogoutCircleRLine size={18} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-600">
                  <Link 
                    href="/login" 
                    className="w-full py-2.5 px-3 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">Login</span>
                  </Link>
                  
                  <Link 
                    href="/register"
                    className="w-full py-2.5 px-3 rounded-lg flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">Sign up</span>
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
      className={`text-sm font-medium transition-colors duration-200
        ${active 
          ? 'text-white' 
          : 'text-gray-300 hover:text-white'
        }`}
    >
      {children}
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
      className={`py-2 px-3 rounded-lg transition text-center
        ${active 
          ? 'bg-gray-700 text-white font-medium' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;