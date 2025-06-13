'use client';

import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';

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
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[#111926]"></div>
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-l from-pink-400/30 to-cyan-500/30 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full filter blur-3xl"
          animate={{ 
            rotate: [0, 360],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
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