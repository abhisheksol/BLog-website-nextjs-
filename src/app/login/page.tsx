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
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </div>
      </div>
    </Layout>
  );
}