'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { loginUser } from '../../../utils/api';
import { useAuth } from '../../../contexts/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      console.log('Submitting login for:', formData.username);
      const data = await loginUser(formData);
      console.log('Login response received:', data);
      
      if (!data.token) {
        throw new Error('No token received from server');
      }
      
      let userId = '';
      try {
        // Extract user ID from JWT token
        const tokenParts = data.token.split('.');
        if (tokenParts.length >= 2) {
          const payload = JSON.parse(atob(tokenParts[1]));
          userId = payload.userId || '';
          console.log('Extracted user ID:', userId);
        }
      } catch (tokenErr) {
        console.error('Error parsing token:', tokenErr);
        // Fall back to a placeholder ID
        userId = 'user-id';
      }
      
      // Save token and user data to localStorage directly to debug
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ 
        username: formData.username, 
        _id: userId 
      }));
      
      console.log('Stored in localStorage:');
      console.log('- token:', data.token.substring(0, 20) + '...');
      console.log('- user:', JSON.stringify({ username: formData.username, _id: userId }));
      
      // Now update the auth context
      login({ username: formData.username, _id: userId }, data.token);
      
      // Use window.location for a full page refresh instead of router.push
      // This ensures the auth state is fully refreshed
      console.log('Redirecting to home page...');
      window.location.href = '/';
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl w-full flex rounded-xl shadow-xl overflow-hidden">
          {/* Left side - Image/Illustration */}
          <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-800 to-purple-900 p-8 relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="h-full flex flex-col justify-between relative z-10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Welcome back to the community</h2>
                <p className="text-blue-200 text-base">Share your stories and ideas with readers around the world.</p>
              </div>
              
              <div className="flex justify-center items-center">
                <img 
                  src="https://illustrations.popsy.co/white/writer-at-work.svg" 
                  alt="Blog Illustration" 
                  className="max-w-xs w-full"
                />
              </div>
              
              <div className="text-xs text-blue-200">
                <p>© {new Date().getFullYear()} Blog App. All rights reserved.</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Login Form */}
          <div className="w-full lg:w-1/2 bg-gray-800 p-6">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
              <p className="text-gray-400 text-sm">Enter your credentials to access your account</p>
            </div>
            
            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-200 px-3 py-2 rounded-md mb-4 flex items-start text-sm">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-gray-700 text-white pl-9 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 border border-gray-600 placeholder-gray-400 text-sm"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-700 text-white pl-9 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 border border-gray-600 placeholder-gray-400 text-sm"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-400">
                    Remember me
                  </label>
                </div>
                
                <div className="text-xs">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-200 mt-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg className="h-4 w-4 text-blue-300 group-hover:text-blue-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Sign In
                    </>
                  )}
                </button>
              </div>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <button type="button" className="bg-gray-700 hover:bg-gray-600 flex items-center justify-center px-3 py-1.5 border border-gray-600 rounded-md shadow-sm text-xs font-medium text-gray-300 transition-colors">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button type="button" className="bg-gray-700 hover:bg-gray-600 flex items-center justify-center px-3 py-1.5 border border-gray-600 rounded-md shadow-sm text-xs font-medium text-gray-300 transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Twitter
                </button>
                <button type="button" className="bg-gray-700 hover:bg-gray-600 flex items-center justify-center px-3 py-1.5 border border-gray-600 rounded-md shadow-sm text-xs font-medium text-gray-300 transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </button>
              </div>
            </form>
            
            <div className="mt-5 text-center">
              <p className="text-xs text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}