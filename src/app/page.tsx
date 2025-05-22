'use client';

import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-4">Welcome to Blog App</h1>
        <p className="text-xl mb-8 text-center max-w-lg">
          Share your thoughts with the world and connect with other bloggers.
        </p>
        
        <div className="flex space-x-4">
          {user ? (
            <Link href="/blogs/new" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
              Create a Blog
            </Link>
          ) : (
            <>
              <Link href="/login" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
                Login
              </Link>
              <Link href="/register" className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-800">
                Register
              </Link>
            </>
          )}
          <Link href="/blogs" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-100">
            Browse Blogs
          </Link>
        </div>
      </div>
    </Layout>
  );
}