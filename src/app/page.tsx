'use client';

import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

// Import modular components
import HeroSection from '../../components/Home/HeroSection';
import GallerySection from '../../components/Home/GallerySection';
import ArticlesSection from '../../components/Home/ArticlesSection';

interface Blog {
  _id: string;
  title: string;
  desc: string;
  image: string;
  createdAt: string;
  likes: string[];
}

export default function Home() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        // First try to fetch user's blogs if logged in
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('http://localhost:3000/api/blogs/getByUser', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBlogs(res.data);
        } else {
          // If not logged in, fetch all blogs
          const res = await axios.get('http://localhost:3000/api/blogs');
          setBlogs(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        // Fallback to all blogs if user blogs fail
        try {
          const res = await axios.get('http://localhost:3000/api/blogs');
          setBlogs(res.data);
        } catch (fallbackError) {
          console.error('Failed to fetch all blogs:', fallbackError);
        }
      }
    };

    fetchAllBlogs();
  }, [user]);
  
  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[#111926]"></div>
        <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-pink-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 right-0 w-80 h-80 bg-gradient-to-l from-blue-500/25 to-cyan-400/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-0 right-20 w-60 h-60 bg-gradient-to-br from-pink-400/20 to-purple-500/15 rounded-full filter blur-2xl"></div>
        
        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Galleries Section */}
          <GallerySection blogs={blogs} />
          
          {/* Latest Articles */}
          <ArticlesSection />
        </div>
      </div>
    </Layout>
  );
}