'use client';

import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import BlogCard from '../../../components/BlogCard';
import { getAllBlogs } from '../../../utils/api';
import { Blog } from '../../../types';

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setBlogs(data);
      setError('');
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setError(err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No blogs found</p>
          </div>
        )}
        
        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <BlogCard 
                key={blog._id} 
                blog={blog} 
                refreshBlogs={fetchBlogs}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}