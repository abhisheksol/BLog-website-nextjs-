'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Blog, User } from '../types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BlogCardProps {
  blog: Blog;
  refreshBlogs: () => void; // Function to refresh blogs after like
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, refreshBlogs }) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
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

  // Image modal functions
  const openImageModal = () => {
    setShowImageModal(true);
    // Remove this line to allow scrolling when modal is open
    // document.body.style.overflow = 'hidden'; 
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    // Remove this line since we're no longer disabling scrolling
    // document.body.style.overflow = 'auto';
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
    <>
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1.5 border border-gray-700">
        {blog.image && blog.image !== 'base64Image' && (
          <div 
            className="w-full h-60 bg-gray-800 relative overflow-hidden cursor-pointer group"
            onClick={openImageModal}
          >
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x250?text=Image+Not+Available';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white bg-blue-600/80 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                Click to view
              </span>
            </div>
          </div>
        )}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-3 text-white hover:text-blue-400 transition-colors duration-200">{blog.title || 'Untitled'}</h2>
          <p className="text-gray-300 mb-5 line-clamp-3">{blog.desc || 'No description'}</p>
          <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-medium mr-2">
                {getUsername().charAt(0).toUpperCase()}
              </div>
              <span>By {getUsername()}</span>
            </div>
            <div className="text-gray-500 bg-gray-800/50 px-2 py-1 rounded-md">
              {blog.createdAt ? formatDate(blog.createdAt) : 'Unknown date'}
            </div>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <button 
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 
                ${blog.likedByUser ? 'text-blue-400 bg-blue-900/20' : 'text-gray-400'}
                ${isLiking ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
            >
              {blog.likedByUser ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
              )}
              <span className="font-medium">{blog.likesCount || 0}</span>
              {isLiking && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
            </button>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Read More →
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal/Lightbox */}
      {showImageModal && blog.image && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 "
          onClick={closeImageModal}
        >
          <div className="relative max-w-6xl w-full my-8">
            <button 
              className="sticky top-2 float-right bg-gray-800/80 text-white p-2 rounded-full hover:bg-gray-700 z-10"
              onClick={(e) => {
                e.stopPropagation();
                closeImageModal();
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-auto object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
              }}
            />
            <div className="sticky bottom-4 left-0 right-0 text-center text-white bg-black/50 py-2 px-4 mx-auto max-w-lg rounded-full backdrop-blur-sm">
              {blog.title || 'Image Preview'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;