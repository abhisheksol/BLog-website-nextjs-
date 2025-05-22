'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    console.log('AuthContext: Initializing...');
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        console.log('AuthContext: Found token in localStorage:', !!token);
        console.log('AuthContext: Found user data in localStorage:', !!userData);
        
        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            console.log('AuthContext: Restoring user session for:', parsedUser.username);
            setUser(parsedUser);
          } catch (parseError) {
            console.error('AuthContext: Failed to parse user data:', parseError);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (storageError) {
        console.error('AuthContext: Error accessing localStorage:', storageError);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    console.log('AuthContext: Login called for user:', userData.username);
    
    try {
      // First update the state
      setUser(userData);
      
      // Then store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('AuthContext: Stored auth data in localStorage');
      }
    } catch (error) {
      console.error('AuthContext: Error in login function:', error);
    }
  };

  const logout = () => {
    console.log('AuthContext: Logout called');
    
    try {
      // First clear the state
      setUser(null);
      
      // Then remove from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('AuthContext: Cleared auth data from localStorage');
      }
      
      router.push('/login');
    } catch (error) {
      console.error('AuthContext: Error in logout function:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);