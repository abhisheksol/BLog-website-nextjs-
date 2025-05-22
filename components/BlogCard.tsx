'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Blog, User } from '../types';
import { useRouter } from 'next/navigation';

interface BlogCardProps {
  blog: Blog;
  refreshBlogs: () => void; // Function to refresh blogs after like
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, refreshBlogs }) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    // Check if user is logged in
  
    
    // Prevent multiple clicks
    if (isLiking) return;
    
    try {
      setIsLiking(true);
      
      // Get token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      
      // Make the API request
      const res = await fetch(`http://localhost:3000/api/blogs/like/${blog._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) {
        throw new Error('Failed to like blog');
      }
      
      // Refresh all blogs to update UI
      refreshBlogs();
      
    } catch (error) {
      console.error('Error liking blog:', error);
      // You could show a toast notification here
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return 'Unknown date';
    }
  };

  const getUsername = (): string => {
    try {
      if (typeof blog.createdBy === 'string') {
        return 'Unknown';
      }
      return (blog.createdBy as User)?.username || 'Unknown';
    } catch (e) {
      return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {blog.image && blog.image !== 'base64Image' && (
        <div className="w-full h-48 bg-gray-200">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x250?text=Image+Not+Available';
            }}
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{blog.title || 'Untitled'}</h2>
        <p className="text-gray-700 mb-4">{blog.desc || 'No description'}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>By {getUsername()}</div>
          <div>{blog.createdAt ? formatDate(blog.createdAt) : 'Unknown date'}</div>
        </div>
        <div className="mt-4">
          {/* Simple like button similar to your working example */}
          <button 
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              blog.likedByUser ? 'text-red-500' : 'text-gray-500'
            } ${isLiking ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-600'}`}
          >
            <span>❤️</span>
            <span>{blog.likesCount || 0}</span>
            {isLiking && <span>...</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;